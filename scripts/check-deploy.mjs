/**
 * Проверка деплоя: SITE=<домен> node scripts/check-deploy.mjs
 * Показывает, что реально отдаёт хостинг роботу поисковика.
 */
const SITE = process.env.SITE || "https://kryukovaphoto.ru.website.yandexcloud.net";

const ROUTES = [
  { path: "/", marker: "Фотограф новорожденных в Краснодаре" },
  { path: "/gallery/", marker: "Галерея фотосессий новорожденных" },
  { path: "/pricing/", marker: "Стоимость фотосессии новорожденного" },
  { path: "/about/", marker: "Меня зовут Екатерина" },
  { path: "/reviews/", marker: "Отзывы о фотосессии новорожденного" },
  { path: "/contacts/", marker: "Как записаться на фотосессию" },
];

const pad = (s, n) => String(s).padEnd(n);

async function probe(path, { follow = false } = {}) {
  const url = `${SITE}${path}`;
  try {
    const res = await fetch(url, { redirect: follow ? "follow" : "manual" });
    const body = await res.text();
    return { status: res.status, type: res.headers.get("content-type"), body, location: res.headers.get("location") };
  } catch (e) {
    return { status: 0, error: e.message };
  }
}

async function main() {
  console.log(`Сайт: ${SITE}\n`);

  console.log("=== Основные страницы (как их увидит робот) ===");
  let ok = true;
  for (const route of ROUTES) {
    const r = await probe(route.path);
    const hasMarker = r.body?.includes(route.marker);
    const title = r.body?.match(/<title>([^<]*)<\/title>/)?.[1] ?? "—";
    const canonical = r.body?.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? "—";
    const good = r.status === 200 && hasMarker;
    if (!good) ok = false;
    console.log(
      `${good ? "OK  " : "!!! "}${pad(route.path, 12)} status=${pad(r.status, 4)} ${pad((r.type || "").split(";")[0], 24)} контент:${hasMarker ? "да" : "НЕТ"}`
    );
    console.log(`     title:     ${title}`);
    console.log(`     canonical: ${canonical}`);
  }

  console.log("\n=== Адреса без слеша (редирект) ===");
  for (const route of ROUTES.filter((r) => r.path !== "/")) {
    const noSlash = route.path.replace(/\/$/, "");
    const r = await probe(noSlash);
    console.log(`${pad(noSlash, 12)} status=${pad(r.status, 4)} location=${r.location || "—"}`);
  }

  console.log("\n=== Служебные файлы ===");
  for (const f of ["/sitemap.xml", "/robots.txt", "/favicon.ico", "/og-image.png", "/site.webmanifest"]) {
    const r = await probe(f);
    console.log(`${pad(f, 20)} status=${pad(r.status, 4)} ${(r.type || "").split(";")[0]}`);
  }
  const sm = await probe("/sitemap.xml");
  const urls = (sm.body.match(/<loc>/g) || []).length;
  console.log(`     URL в sitemap: ${urls}`);
  if (urls < ROUTES.length) ok = false;

  console.log("\n=== Несуществующий адрес (soft-404?) ===");
  const nf = await probe("/this-page-does-not-exist-12345/");
  console.log(`status=${nf.status} ${nf.status === 404 ? "OK — настоящий 404" : "ВНИМАНИЕ — soft 404 (страница отдаётся с 200)"}`);
  if (nf.status !== 404) ok = false;

  console.log(`\nИтог: ${ok ? "всё в порядке" : "есть проблемы (см. !!! выше)"}`);
}

main();
