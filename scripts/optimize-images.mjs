import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "src/data");
const OUT = path.join(ROOT, "src/assets");

const RULES = [
  {
    from: "home",
    to: "home",
    width: 1400,
    quality: 76,
    overrides: {
      "intro.jpg": { width: 1100, quality: 80 },
      "work.jpg": { width: 1100, quality: 80 },
      "deliver.jpg": { width: 1100, quality: 80 },
      "before.jpg": { width: 1100, quality: 80 },
      "after.jpg": { width: 1100, quality: 80 },
      "video-poster.jpg": { width: 1280, quality: 74 },
    },
  },
  {
    from: "about",
    to: "about",
    width: 1200,
    quality: 78,
    overrides: {
      "intro.jpg": { width: 1000, quality: 80 },
      "education.jpg": { width: 1000, quality: 80 },
      "award-left.jpg": { width: 800, quality: 80 },
      "award-right.jpg": { width: 800, quality: 80 },
    },
  },
  {
    from: "reviews",
    to: "reviews",
    match: /^av\d+\.jpg$/i,
    width: 200,
    quality: 75,
  },
];

const GALLERY = {
  from: "images",
  to: "gallery",
  full: { width: 1800, quality: 80 },
  thumb: { width: 700, quality: 70 },
};

const manifest = {};

async function convert(src, dest, { width, quality }) {
  await fs.mkdir(path.dirname(dest), { recursive: true });
  const image = sharp(src).rotate();
  const meta = await image.metadata();
  if (meta.width > width) {
    await image.resize({ width, withoutEnlargement: true }).webp({ quality }).toFile(dest);
  } else {
    await image.webp({ quality }).toFile(dest);
  }
  const out = await sharp(dest).metadata();
  manifest[path.relative(OUT, dest).split(path.sep).join("/")] = {
    w: out.width,
    h: out.height,
  };
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(full)));
    else if (/\.(jpe?g|png)$/i.test(e.name)) files.push(full);
  }
  return files;
}

async function main() {
  await fs.rm(OUT, { recursive: true, force: true });
  let count = 0;

  for (const rule of RULES) {
    const dir = path.join(SRC, rule.from);
    const files = await walk(dir);
    for (const file of files) {
      const name = path.basename(file);
      if (rule.match && !rule.match.test(name)) continue;
      const opts = { ...rule, ...(rule.overrides?.[name] || {}) };
      const dest = path.join(OUT, rule.to, name.replace(/\.(jpe?g|png)$/i, ".webp"));
      await convert(file, dest, opts);
      count++;
    }
  }

  const galleryDir = path.join(SRC, GALLERY.from);
  const galleryFiles = await walk(galleryDir);
  for (const file of galleryFiles) {
    const name = path.basename(file).replace(/\.(jpe?g|png)$/i, "");
    const full = path.join(OUT, GALLERY.to, `${name}.webp`);
    const thumb = path.join(OUT, GALLERY.to, `${name}.thumb.webp`);
    await convert(file, full, GALLERY.full);
    await convert(file, thumb, GALLERY.thumb);
    count += 2;
  }

  await fs.writeFile(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2));
  console.log(`optimized ${count} files -> ${path.relative(ROOT, OUT)}`);
}

main();
