import fs from "node:fs/promises";
import path from "node:path";
import http from "node:http";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");

const CHROME =
  process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const { ROUTES, SEO_META, absolute } = await import(path.join(ROOT, "src/seo-meta.mjs"));

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".json": "application/json",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json",
};

function startServer() {
  const server = http.createServer(async (req, res) => {
    const url = decodeURIComponent(req.url.split("?")[0]);
    let file = path.join(DIST, url);
    try {
      if ((await fs.stat(file)).isDirectory()) file = path.join(file, "index.html");
      const body = await fs.readFile(file);
      res.writeHead(200, { "Content-Type": MIME[path.extname(file)] || "application/octet-stream" });
      res.end(body);
    } catch {
      const body = await fs.readFile(path.join(DIST, "index.html"));
      res.writeHead(200, { "Content-Type": MIME[".html"] });
      res.end(body);
    }
  });
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve({ server, port: server.address().port }));
  });
}

async function renderPage(browser, port, route) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  const expectedTitle = SEO_META[route]?.title;
  await page.goto(`http://127.0.0.1:${port}${route}`, { waitUntil: "networkidle2", timeout: 60000 });
  await page.waitForFunction(
    (title) =>
      document.getElementById("seo-schema") && (!title || document.title === title),
    { timeout: 30000 },
    expectedTitle
  );
  const html = await page.evaluate(() => document.documentElement.outerHTML);
  await page.close();
  return html.replace(
    /<script[^>]*src="https:\/\/mc\.yandex\.ru\/metrika\/tag_phono\.js"[^>]*><\/script>/g,
    ""
  );
}

async function writeRoute(route, html) {
  const dir = route === "/" ? DIST : path.join(DIST, route.replace(/^\//, ""));
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, "index.html"), html);
}

async function writeSitemap() {
  const now = new Date().toISOString().slice(0, 10);
  const urls = ROUTES.map(
    (r) => `  <url>
    <loc>${absolute(r.path)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  ).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  await fs.writeFile(path.join(DIST, "sitemap.xml"), xml);
  await fs.writeFile(
    path.join(DIST, "robots.txt"),
    `User-agent: *
Allow: /

Sitemap: ${absolute("/sitemap.xml")}
`
  );
}

async function main() {
  const { server, port } = await startServer();
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });

  try {
    for (const route of ROUTES.map((r) => r.path)) {
      const html = await renderPage(browser, port, route);
      await writeRoute(route, html);
      console.log(`prerendered ${route} (${(html.length / 1024).toFixed(0)} KB)`);
    }

    const notFound = await renderPage(browser, port, "/__404__");
    await fs.writeFile(path.join(DIST, "404.html"), notFound);
    console.log("prerendered 404.html");

    await writeSitemap();
    console.log(`sitemap.xml: ${ROUTES.length} urls`);
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
