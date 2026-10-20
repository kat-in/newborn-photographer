export const SITE = "https://kryukovaphoto.ru.website.yandexcloud.net";

export const ROUTES = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/gallery/", priority: "0.9", changefreq: "monthly" },
  { path: "/pricing/", priority: "0.9", changefreq: "monthly" },
  { path: "/about/", priority: "0.7", changefreq: "yearly" },
  { path: "/reviews/", priority: "0.7", changefreq: "monthly" },
  { path: "/contacts/", priority: "0.8", changefreq: "yearly" },
];

export const SEO_META = {
  "/": {
    title: "Фотограф новорожденных в Краснодаре — Екатерина Крюкова",
    description:
      "Фотосессии newborn в специализированной студии в Краснодаре. Фотокниги, авторская обработка. Съемка малышей 5–14 дней, запись по ПДР.",
  },
  "/gallery": {
    title: "Галерея работ — фотограф новорожденных в Краснодаре",
    description:
      "Фотографии новорожденных из моего портфолио. Примеры работ в студии в Краснодаре: позы, обработка, фотокниги.",
  },
  "/about": {
    title: "Обо мне — фотограф новорожденных в Краснодаре",
    description:
      "Екатерина Крюкова — фотограф новорожденных с опытом более 10 лет. Обучение ньюборн-съемке, диплом, топ фото конкурса 35awards.",
  },
  "/pricing": {
    title: "Стоимость фотосессии новорожденного в Краснодаре",
    description:
      "Цены на фотосессию newborn в Краснодаре: пакеты Малыш, Стандарт, Комфорт от 17 000 руб. Фотокниги и авторская обработка включены.",
  },
  "/reviews": {
    title: "Отзывы о фотосессии новорожденного в Краснодаре",
    description:
      "Отзывы родителей о фотосессиях новорожденных. Что говорят клиенты о съемке с Екатериной Крюковой в Краснодаре.",
  },
  "/contacts": {
    title: "Контакты — фотограф новорожденных в Краснодаре",
    description:
      "Свяжитесь со мной для записи на фотосессию новорожденного в Краснодаре. Телефон, Telegram и Max для быстрой связи.",
  },
};

export const SEO_META_SLASH = Object.fromEntries(
  Object.entries(SEO_META).map(([k, v]) => [k === "/" ? k : `${k}/`, v])
);

export const LABELS = {
  "/": "Главная",
  "/gallery": "Галерея",
  "/about": "Обо мне",
  "/pricing": "Пакеты услуг",
  "/reviews": "Отзывы",
  "/contacts": "Контакты",
};

export function absolute(path) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const withSlash = clean === "/" ? "/" : `${clean.replace(/\/$/, "")}/`;
  return `${SITE}${withSlash}`;
}
