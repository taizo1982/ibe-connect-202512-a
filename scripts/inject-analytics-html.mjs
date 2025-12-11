import fs from "node:fs/promises";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { loadEnv } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const buildIndexPath = path.resolve(projectRoot, "build", "index.html");
const buildDir = path.dirname(buildIndexPath);
const markerStart = "<!-- analytics:start -->";
const markerEnd = "<!-- analytics:end -->";
const cacheBustTargets = ["assets/", "img/"];
const defaultSocialMeta = {
  type: "website",
};

const normalizeVersionTag = (tag) => {
  if (typeof tag !== "string") {
    return tag;
  }
  const trimmed = tag.trim();
  if (!trimmed) {
    return trimmed;
  }

  // Remove a leading "v" (case-insensitive) when it is followed by a digit (e.g., v1.0.5).
  const withoutPrefix = trimmed.replace(/^v(?=\d)/i, "");
  return withoutPrefix || trimmed;
};

const sanitize = (value) => {
  if (typeof value !== "string") {
    return "";
  }
  const trimmed = value.trim();
  return trimmed && trimmed !== "undefined" ? trimmed : "";
};

const createGoogleTagBlock = (gaMeasurementId, gaAdsId) => {
  if (!gaMeasurementId && !gaAdsId) {
    return "";
  }

  const primaryId = gaMeasurementId || gaAdsId;
  const loaderTag = `<script async src="https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(primaryId)}"></script>`;

  const lines = [
    "<script>",
    "  window.dataLayer = window.dataLayer || [];",
    "  function gtag(){dataLayer.push(arguments);}",
    "  gtag('js', new Date());",
  ];

  if (gaMeasurementId) {
    lines.push(`  // gtag('config', '${gaMeasurementId}', { debug_mode: true });`);
    lines.push(`  gtag('config', '${gaMeasurementId}');`);
  }

  if (gaAdsId) {
    lines.push(`  gtag('config', '${gaAdsId}');`);
  }

  lines.push("</script>");

  return [loaderTag, lines.join("\n")].join("\n");
};

const createMetaPixelBlock = (metaPixelId, metaAppId) => {
  if (!metaPixelId) {
    return "";
  }

  const stubScript = [
    "<script>",
    "  (function(f){",
    "    if (f.fbq) return;",
    "    const n = function () {",
    "      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);",
    "    };",
    "    if (!f._fbq) f._fbq = n;",
    "    n.push = n;",
    "    n.loaded = true;",
    "    n.version = '2.0';",
    "    n.queue = [];",
    "    f.fbq = n;",
    "  })(window);",
    "</script>",
  ].join("\n");

  const loaderScript = `<script async src="https://connect.facebook.net/en_US/fbevents.js"></script>`;

  const initLines = [
    "<script>",
    metaAppId
      ? `  fbq('init', '${metaPixelId}', { app_id: '${metaAppId}' });`
      : `  fbq('init', '${metaPixelId}');`,
    "  fbq('track', 'PageView');",
    "</script>",
  ].join("\n");

  const noscript = `<noscript><img height="1" width="1" style="display:none" alt="" src="https://www.facebook.com/tr?id=${encodeURIComponent(metaPixelId)}&ev=PageView&noscript=1"/></noscript>`;

  return [stubScript, loaderScript, initLines, noscript].join("\n");
};

const getGitVersionTag = () => {
  const fallbackTag = `build-${Date.now()}`;
  try {
    const tag = execSync("git describe --tags --dirty --always", {
      cwd: projectRoot,
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return tag || fallbackTag;
  } catch (error) {
    console.warn(
      `[cache-bust] Failed to read git version tag (${error?.message ?? "unknown error"}). Falling back to "${fallbackTag}".`,
    );
    return fallbackTag;
  }
};

const shouldCacheBust = (url) => {
  if (!url) {
    return false;
  }
  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("//") ||
    url.startsWith("data:") ||
    url.startsWith("mailto:") ||
    url.startsWith("tel:") ||
    url.startsWith("#")
  ) {
    return false;
  }

  const normalized = url.replace(/^(\.{1,2}\/)+/, "").replace(/^\//, "");
  return cacheBustTargets.some((target) => normalized.startsWith(target));
};

const appendVersionQuery = (url, version) => {
  if (!version) {
    return url;
  }

  const hashIndex = url.indexOf("#");
  const hash = hashIndex >= 0 ? url.slice(hashIndex) : "";
  const base = hashIndex >= 0 ? url.slice(0, hashIndex) : url;

  const queryIndex = base.indexOf("?");
  const pathOnly = queryIndex >= 0 ? base.slice(0, queryIndex) : base;
  const queryString = queryIndex >= 0 ? base.slice(queryIndex + 1) : "";
  const params = new URLSearchParams(queryString);

  if (params.has("v")) {
    return url;
  }

  params.append("v", version);
  const query = params.toString();
  const updatedBase = query ? `${pathOnly}?${query}` : pathOnly;
  return `${updatedBase}${hash}`;
};

const applyCacheBusting = (html, version) => {
  let replacements = 0;
  const attributePattern = /(src|href)=("|\')(.*?)\2/gi;

  const updatedHtml = html.replace(attributePattern, (match, attr, quote, value) => {
    if (!shouldCacheBust(value)) {
      return match;
    }

    const nextValue = appendVersionQuery(value, version);
    if (nextValue === value) {
      return match;
    }

    replacements += 1;
    return `${attr}=${quote}${nextValue}${quote}`;
  });

  return { html: updatedHtml, replacements };
};

const normalizeAssetPath = (url) => {
  if (!url) {
    return null;
  }

  const withoutQuery = url.split("?")[0];
  return withoutQuery.replace(/^\.\//, "").replace(/^\//, "");
};

const inlineStylesheetLink = async (html) => {
  const linkPattern = /<link\s+[^>]*rel=["']stylesheet["'][^>]*>/i;
  const match = html.match(linkPattern);
  if (!match) {
    return { html, inlined: false };
  }

  // Avoid re-processing if we already inlined (no href attribute present).
  if (!/href=("|\')/i.test(match[0])) {
    return { html, inlined: false };
  }

  const hrefMatch = match[0].match(/href=(["'])(.*?)\1/i);
  if (!hrefMatch) {
    return { html, inlined: false };
  }

  const hrefValue = hrefMatch[2];
  const relativePath = normalizeAssetPath(hrefValue);
  if (!relativePath) {
    return { html, inlined: false };
  }

  const cssPath = path.resolve(buildDir, relativePath);
  try {
    const cssContent = await fs.readFile(cssPath, "utf-8");
    const styleTag = [
      '<style data-inline-critical="app-styles">',
      cssContent,
      "</style>",
    ].join("\n");

    return {
      html: html.replace(match[0], styleTag),
      inlined: true,
      href: hrefValue,
    };
  } catch (error) {
    console.warn(
      `[inline-css] Failed to inline stylesheet "${hrefValue}": ${error?.message ?? error}`,
    );
    return { html, inlined: false };
  }
};

const applySocialMetaPlaceholders = (html, placeholders) => {
  let replacements = 0;
  let result = html;

  for (const [token, value] of Object.entries(placeholders)) {
    if (!result.includes(token)) {
      continue;
    }
    const safeValue = value ?? "";
    result = result.split(token).join(safeValue);
    replacements += 1;
  }

  return { html: result, replacements };
};

const removeEmptySocialMetaTags = (html) => {
  const pattern = /\s*<meta[^>]+(?:property="og:[^"]+"|name="twitter:[^"]+")[^>]*content=""[^>]*>\s*/gi;
  return html.replace(pattern, "");
};

const injectAnalytics = async () => {
  try {
    await fs.access(buildIndexPath);
  } catch {
    // Nothing to do if build/index.html does not exist.
    return;
  }

  const gitVersionTagRaw = getGitVersionTag();
  const gitVersionTag = normalizeVersionTag(gitVersionTagRaw);
  const mode = process.env.NODE_ENV || "production";
  const env = loadEnv(mode, projectRoot, "");

  const gaMeasurementId = sanitize(env.VITE_GA_MEASUREMENT_ID);
  const gaAdsId = sanitize(env.VITE_GA_ADS_ID);
  const metaPixelId = sanitize(env.VITE_META_PIXEL_ID);
  const metaAppId = sanitize(env.VITE_META_APP_ID);

  const blocks = [
    createGoogleTagBlock(gaMeasurementId, gaAdsId),
    createMetaPixelBlock(metaPixelId, metaAppId),
  ].filter(Boolean);

  let html = await fs.readFile(buildIndexPath, "utf-8");
  const markerPattern = new RegExp(`${markerStart}[\\s\\S]*?${markerEnd}\\n?`, "g");
  html = html.replace(markerPattern, "");

  const ogTitle = sanitize(env.VITE_OG_TITLE);
  const ogDescription = sanitize(env.VITE_OG_DESCRIPTION);
  const ogSiteName = sanitize(env.VITE_OG_SITE_NAME);
  const ogUrl = sanitize(env.VITE_OG_URL);
  const ogImage = sanitize(env.VITE_OG_IMAGE_URL);
  const twitterCard = sanitize(env.VITE_TWITTER_CARD);
  const twitterSite = sanitize(env.VITE_TWITTER_SITE);
  const twitterCreator = sanitize(env.VITE_TWITTER_CREATOR);

  const hasOgMeta = Boolean(ogTitle || ogDescription || ogSiteName || ogUrl || ogImage);

  const placeholderValues = {
    "__OG_TYPE__": hasOgMeta ? defaultSocialMeta.type : "",
    "__OG_TITLE__": ogTitle,
    "__OG_DESCRIPTION__": ogDescription,
    "__OG_SITE_NAME__": ogSiteName,
    "__OG_URL__": ogUrl,
    "__OG_IMAGE_URL__": ogImage,
    "__TWITTER_CARD__": twitterCard,
    "__TWITTER_SITE__": twitterSite,
    "__TWITTER_CREATOR__": twitterCreator,
  };

  const socialMetaResult = applySocialMetaPlaceholders(html, placeholderValues);
  html = removeEmptySocialMetaTags(socialMetaResult.html);
  if (socialMetaResult.replacements > 0) {
    console.log(`[ogp] Replaced ${socialMetaResult.replacements} social meta placeholders.`);
  }

  const inlineResult = await inlineStylesheetLink(html);
  html = inlineResult.html;
  if (inlineResult.inlined && inlineResult.href) {
    console.log(`[inline-css] Inlined "${inlineResult.href}" directly into index.html.`);
  }

  const { html: cacheBustedHtml, replacements } = applyCacheBusting(html, gitVersionTag);
  html = cacheBustedHtml;

  if (blocks.length === 0) {
    await fs.writeFile(buildIndexPath, html, "utf-8");
    if (gitVersionTag && replacements > 0) {
      console.log(
        `[cache-bust] Applied git tag "${gitVersionTag}" to ${replacements} asset reference${replacements > 1 ? "s" : ""}.`,
      );
    }
    return;
  }

  const analyticsBlock = [markerStart, ...blocks, markerEnd].join("\n");
  if (html.includes("</head>")) {
    html = html.replace("</head>", `${analyticsBlock}\n</head>`);
  } else {
    html += `\n${analyticsBlock}\n`;
  }

  await fs.writeFile(buildIndexPath, html, "utf-8");
  if (replacements > 0) {
    console.log(
      `[cache-bust] Applied git tag "${gitVersionTag}" to ${replacements} asset reference${replacements > 1 ? "s" : ""}.`,
    );
  }
  console.log("Injected analytics tags into build/index.html");
};

injectAnalytics().catch((error) => {
  console.error("[analytics] Failed to inject tags:", error);
  process.exitCode = 1;
});
