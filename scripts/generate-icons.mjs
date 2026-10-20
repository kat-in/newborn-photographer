import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "public");
const SOURCE = path.join(PUBLIC, "logo.png");

async function png(size, file) {
  await sharp(SOURCE)
    .resize(size, size, { fit: "contain", background: { r: 245, g: 240, b: 235, alpha: 1 } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(PUBLIC, file));
  return fs.readFile(path.join(PUBLIC, file));
}

function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = 6 + images.length * 16;
  const entries = [];
  for (const { size, data } of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size === 256 ? 0 : size, 0);
    entry.writeUInt8(size === 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    entries.push(entry);
  }
  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

async function main() {
  const sizes = [16, 32, 48];
  const images = [];
  for (const size of sizes) {
    images.push({ size, data: await png(size, `.favicon-${size}.png`) });
  }
  await fs.writeFile(path.join(PUBLIC, "favicon.ico"), ico(images));
  for (const size of sizes) {
    await fs.rm(path.join(PUBLIC, `.favicon-${size}.png`), { force: true });
  }

  await png(180, "apple-touch-icon.png");
  await png(192, "icon-192.png");
  await png(512, "icon-512.png");

  await fs.writeFile(
    path.join(PUBLIC, "site.webmanifest"),
    JSON.stringify(
      {
        name: "Екатерина Крюкова — фотограф новорожденных в Краснодаре",
        short_name: "Крюкова фото",
        description: "Фотосессии новорожденных в специализированной студии в Краснодаре",
        start_url: "/",
        display: "standalone",
        background_color: "#f5f0eb",
        theme_color: "#f5f0eb",
        lang: "ru",
        icons: [
          { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
        ],
      },
      null,
      2
    )
  );

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

  console.log("icons generated");
}

main();
