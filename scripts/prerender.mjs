import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientOutDir = path.resolve(__dirname, "../build");
const ssrBundleCandidates = [
  path.resolve(__dirname, "../build/server/entry-server.js"),
  path.resolve(__dirname, "../build/server/entry-server.mjs"),
];
const indexHtmlPath = path.join(clientOutDir, "index.html");

async function resolveSsrBundlePath() {
  for (const candidate of ssrBundleCandidates) {
    try {
      await fs.access(candidate);
      return candidate;
    } catch {
      // continue searching
    }
  }
  return null;
}

async function ensureArtifactsExist() {
  try {
    await fs.access(clientOutDir);
    const ssrBundlePath = await resolveSsrBundlePath();
    if (!ssrBundlePath) {
      throw new Error("SSR bundle not found.");
    }
  } catch (error) {
    const message = [
      "SSG build is missing artifacts.",
      "Run `vite build` (client) and `vite build --ssr src/entry-server.tsx --outDir build/server` before executing this script.",
    ].join(" ");
    throw new Error(message);
  }
}

async function injectMarkup() {
  await ensureArtifactsExist();

  const template = await fs.readFile(indexHtmlPath, "utf-8");
  const ssrBundlePath = await resolveSsrBundlePath();

  if (!ssrBundlePath) {
    throw new Error("Unable to locate the SSR bundle in build/server.");
  }

  const { render } = await import(pathToFileURL(ssrBundlePath).href);
  const appHtml = await render();

  const renderedHtml = template
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
    .replace(/(["'])\/assets\//g, "$1./assets/");

  await fs.writeFile(indexHtmlPath, renderedHtml, "utf-8");
  console.log("SSG build: prerendered React app into build/index.html");
}

injectMarkup().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
