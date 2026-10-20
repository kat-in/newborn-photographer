import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "public");
const SOURCE = path.join(PUBLIC, "logo.png");
const ICON_SOURCE = path.join(PUBLIC, "favicon.png");

async function png(size, file, source = ICON_SOURCE) {
  await sharp(source)
    .resize(size, size, { fit: "contain", background: { r: 245, g: 240, b: 235, alpha: 1 } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(PUBLIC, file));
  return fs.readFile(path.join(PUBLIC, file));
}

async function main() {
  const logoMeta = await sharp(SOURCE).metadata();
  const logoWidth = 420;
  const logoHeight = Math.round((logoMeta.height / logoMeta.width) * logoWidth);
  const raw = await sharp(SOURCE)
    .resize(logoWidth, logoHeight, { fit: "contain" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 0; i < raw.data.length; i += 4) {
    const lum = (raw.data[i] + raw.data[i + 1] + raw.data[i + 2]) / 3;
    raw.data[i + 3] = Math.round(255 - lum);
  }
  const logo = await sharp(raw.data, { raw: raw.info }).png().toBuffer();
  const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <rect width="1200" height="630" fill="#f5f0eb"/>
    <image href="data:image/png;base64,${logo.toString("base64")}" x="${Math.round((1200 - logoWidth) / 2)}" y="120" width="${logoWidth}" height="${logoHeight}"/>
    <text x="600" y="410" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="44" fill="#1e1e1e">Екатерина Крюкова</text>
    <text x="600" y="472" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="34" fill="#1e1e1e">Фотограф новорожденных в Краснодаре</text>
    <text x="600" y="546" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="#555049">kryukovaphoto.ru</text>
  </svg>`;
  await sharp(Buffer.from(ogSvg)).png({ compressionLevel: 9 }).toFile(path.join(PUBLIC, "og-image.png"));
  console.log("og-image generated");
}

main();
