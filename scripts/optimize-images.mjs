import path from "path";
import { fileURLToPath } from "url";
import { readdir, stat, writeFile } from "fs/promises";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsDir = path.resolve(__dirname, "../src/assets/images");

const sourceExtensions = new Set([".png", ".jpg", ".jpeg"]);

async function listSourceImages() {
  const entries = await readdir(assetsDir);
  return entries.filter((file) =>
    sourceExtensions.has(path.extname(file).toLowerCase()),
  );
}

async function needsUpdate(inputPath, outputPath) {
  try {
    const [inputStat, outputStat] = await Promise.all([
      stat(inputPath),
      stat(outputPath),
    ]);
    return inputStat.mtimeMs > outputStat.mtimeMs;
  } catch (error) {
    // If the output does not exist yet, we need to create it.
    if (error.code === "ENOENT") {
      return true;
    }
    throw error;
  }
}

async function convertImage(sourceFile) {
  const inputPath = path.join(assetsDir, sourceFile);
  const baseName = sourceFile.replace(/\.(png|jpe?g)$/i, "");

  try {
    await stat(inputPath);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.warn(`[optimize-images] Source not found: ${sourceFile}, skipping.`);
      return;
    }
    throw error;
  }

  const targets = [
    {
      format: "webp",
      output: path.join(assetsDir, `${baseName}.webp`),
      options: { quality: 80 },
    },
    {
      format: "avif",
      output: path.join(assetsDir, `${baseName}.avif`),
      options: { quality: 60 },
    },
  ];

  const image = sharp(inputPath);

  for (const target of targets) {
    if (!(await needsUpdate(inputPath, target.output))) {
      continue;
    }

    let buffer;
    if (target.format === "webp") {
      buffer = await image.clone().webp(target.options).toBuffer();
    } else if (target.format === "avif") {
      buffer = await image.clone().avif(target.options).toBuffer();
    } else {
      continue;
    }

    await writeFile(target.output, buffer);
    console.log(
      `Optimized ${sourceFile} -> ${path.basename(target.output)} (${target.format})`,
    );
  }
}

async function run() {
  const sourceImages = await listSourceImages();
  if (sourceImages.length === 0) {
    console.warn("[optimize-images] No PNG/JPG sources found under src/assets.");
    return;
  }

  await Promise.all(sourceImages.map((file) => convertImage(file)));
}

run().catch((error) => {
  console.error("Image optimization failed:", error);
  process.exitCode = 1;
});
