# Сайт фотографа новорожденных (Екатерина Крюкова, Краснодар)

SPA на React + Vite. Собранная версия — статические файлы в `dist/`, деплойятся на
статический хостинг (Яндекс.Облако / Cloudflare Pages / Netlify).

## Команды

```bash
npm run dev              # разработка (http://localhost:5173)
npm run lint             # eslint
npm run optimize:images  # пересобрать оптимизированные картинки из src/data
npm run icons            # пересобрать favicon.ico, apple-touch-icon, og-image
npm run build            # production-сборка + пререндер (готово к деплою)
npm run build:fast       # только vite build, без пререндера
npm run prerender        # только пререндер уже собранного dist
npm run preview          # локальный просмотр собранного сайта
```

`npm run build` = `vite build` + `node scripts/prerender.mjs`. Пререндер нужен, чтобы
поисковые роботы получали готовый HTML каждой страницы, а не пустой `<div id="root">`.

## Структура

| Путь | Назначение |
|---|---|
| `src/pages/` | страницы сайта |
| `src/assets/` | оптимизированные изображения (webp) + `manifest.json` с размерами |
| `src/data/` | исходные фотографии (только для пересборки картинок, в сборку не попадают) |
| `src/seo-meta.mjs` | маршруты, title/description, адрес сайта |
| `src/seo-schema.mjs` | микроразметка Schema.org (ProfessionalService, WebPage, Review, ImageGallery) |
| `src/seo.js` | хук `useSEO()`: обновляет meta, canonical, og:image и JSON-LD при навигации |
| `scripts/optimize-images.mjs` | ресайз + webp + миниатюры для галереи (sharp) |
| `scripts/prerender.mjs` | статический HTML для каждого маршрута + sitemap.xml + robots.txt + 404.html |
| `scripts/generate-icons.mjs` | favicon.ico, apple-touch-icon.png, иконки PWA, og-image.png |

## Адреса страниц

Все внутренние ссылки ведут на адреса **со слешем** в конце: `/gallery/`, `/pricing/`,
`/about/`, `/reviews/`, `/contacts/`. Так статический хостинг отдаёт папку
`dist/gallery/index.html` без дополнительных rewrite-правил, а адрес `/gallery`
автоматически редиректит на `/gallery/` (см. `src/main.jsx`).

Канонические адреса, sitemap и микроразметка используют тот же формат со слешем.

## Что нужно сделать при деплое

1. Собрать: `npm run build`.
2. Залить **только `dist/`** на хостинг.
3. В корне баккета должны лежать `index.html`, `sitemap.xml`, `robots.txt`, `404.html`
   и папки `gallery/`, `pricing/`, `about/`, `reviews/`, `contacts/` с `index.html` внутри.
4. Проверить, что всё отдаётся правильно:

   ```bash
   SITE=https://ваш-домен node scripts/check-deploy.mjs
   ```

   Скрипт покажет статус каждого адреса, наличие нужного контента, canonical,
   количество URL в sitemap и статус несуществующего адреса.

5. Если хостинг умеет «страницу ошибки» — указать `/404.html`, иначе неизвестные
   адреса отдадут 200 (soft 404).
6. В `index.html` вписать коды верификации Яндекс.Вебмастера и Google Search Console
   (закомментированные placeholders там же).

### Если хостинг не умеет отдавать папки (проверка показала 404 на `/gallery/`)

Значит статический хостинг не поддерживает `папка/index.html` и отдаёт на такой
адрес страницу ошибки. Тогда статические HTML-страницы не будут отдаваться, и сайт
работает как раньше (SPA). Варианты:

- настроить rewrite на хостинге (`/gallery` → `/index.html`), если хостинг его умеет;
- перенести сайт на хостинг со SPA-поддержкой из коробки (Cloudflare Pages, Netlify,
  Vercel) — они бесплатны и отдают пререндер напрямую;
- оставить как есть: индексация будет после отрисовки JS, как сейчас.

## Картинки

Исходники лежат в `src/data/` (~160 МБ) и в сборку не попадают. В `src/assets/` — уже
оптимизированные версии: webp, ширина до 1400 px для слайдера, миниатюры 700 px для
галереи, аватары 200 px. Пересобрать: `npm run optimize:images`.
Размеры картинок для `width`/`height` берутся из `src/assets/manifest.json`.

## Микроразметка и разметка страниц

- `ProfessionalService` + `WebSite` + `WebPage` + `BreadcrumbList` — на всех страницах.
- `Review` (список отзывов) — на `/reviews/`.
- `ImageGallery` — на `/gallery/`.
- `OfferCatalog` с ценами на три пакета — в `ProfessionalService`.
- Рейтинг `aggregateRating` намеренно не проставлен: выдумывать оценки нельзя.
  Если появятся реальные оценки на Яндекс.Картах/Google — добавить в `src/seo-schema.mjs`.
