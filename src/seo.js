import { useEffect } from "react";
import { useLocation } from "react-router";

const SITE = "https://kryukovaphoto.ru.website.yandexcloud.net";
const SUFFIX = "Фотограф новорожденных в Краснодаре — Екатерина Крюкова";

export const SEO_META = {
  "/": {
    title: "Фотограф новорожденных в Краснодаре — Екатерина Крюкова",
    description:
      "Фотосессии newborn в специализированной студии в Краснодаре. Фотокниги, авторская обработка. Съемка малышей 5–14 дней, запись по ПДР.",
  },
  "/gallery": {
    title: `Галерея работ — ${SUFFIX}`,
    description:
      "Фотографии новорожденных из моего портфолио. Примеры работ в студии в Краснодаре: позы, обработка, фотокниги.",
  },
  "/about": {
    title: `Обо мне — ${SUFFIX}`,
    description:
      "Екатерина Крюкова — фотограф новорожденных с опытом более 10 лет. Обучение ньюборн-съемке, диплом, топ фото конкурса 35awards.",
  },
  "/pricing": {
    title: `Стоимость фотосессии новорожденных — ${SUFFIX}`,
    description:
      "Цены на фотосессию newborn в Краснодаре: пакеты Малыш, Стандарт, Комфорт от 17 000 руб. Фотокниги и авторская обработка включены.",
  },
  "/reviews": {
    title: `Отзывы — ${SUFFIX}`,
    description:
      "Отзывы родителей о фотосессиях новорожденных. Что говорят клиенты о съемке с Екатериной Крюковой в Краснодаре.",
  },
  "/contacts": {
    title: `Контакты — ${SUFFIX}`,
    description:
      "Свяжитесь со мной для записи на фотосессию новорожденного в Краснодаре. Телефон, Telegram и Max для быстрой связи.",
  },
};

function setMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function useSEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = SEO_META[pathname] || SEO_META["/"];
    const url = `${SITE}${pathname === "/" ? "/" : pathname}`;

    document.title = meta.title;
    setMeta("name", "description", meta.description);
    setMeta("property", "og:title", meta.title);
    setMeta("property", "og:description", meta.description);
    setMeta("property", "og:url", url);
    setMeta("name", "twitter:title", meta.title);
    setMeta("name", "twitter:description", meta.description);
    setCanonical(url);
  }, [pathname]);
}
