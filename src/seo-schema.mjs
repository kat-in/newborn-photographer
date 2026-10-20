import { absolute, LABELS, SITE } from "./seo-meta.mjs";

const PHONE = "+79787150969";
const PRICE_RANGE = "17000–38000 ₽";

const PACKAGES = [
  {
    name: "Фотосессия новорожденного — пакет «Малыш»",
    price: "17000",
    description: "15 обработанных фотографий, съемка в специализированной студии, все удачные кадры в цветокоррекции.",
  },
  {
    name: "Фотосессия новорожденного — пакет «Стандарт»",
    price: "25000",
    description:
      "20 обработанных фотографий, семейные фото по желанию, фотокнига 20x20 на 10 разворотов в твердой обложке.",
  },
  {
    name: "Фотосессия новорожденного — пакет «Комфорт»",
    price: "38000",
    description:
      "30 обработанных фотографий, семейные фото по желанию, фотокнига 20x20 на 15 разворотов в премиум обложке.",
  },
];

const SOCIAL = [
  "https://instagram.com/kryukovaphoto.ru",
  "https://t.me/katInDev",
  "https://max.ru/u/f9LHodD0cOLURzm_cO8e8A1YaMaDx4AqpjEEXyT_Mht-1ZmPIvNmRlM8BkQ",
];

export function businessSchema(imageUrl) {
  return {
    "@type": "ProfessionalService",
    "@id": `${SITE}/#business`,
    name: "Екатерина Крюкова — фотограф новорожденных",
    alternateName: "Фотограф новорожденных в Краснодаре",
    description:
      "Фотосессии новорожденных (newborn) в специализированной студии в Краснодаре. Авторская обработка и печать фотокниги.",
    url: `${SITE}/`,
    image: imageUrl,
    telephone: PHONE,
    priceRange: PRICE_RANGE,
    currenciesAccepted: "RUB",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Краснодар",
      addressCountry: "RU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "45.0403",
      longitude: "38.9764",
    },
    areaServed: {
      "@type": "City",
      name: "Краснодар",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "09:00",
        closes: "21:00",
      },
    ],
    sameAs: SOCIAL,
    founder: {
      "@type": "Person",
      name: "Екатерина Крюкова",
      jobTitle: "Фотограф новорожденных",
      worksFor: { "@id": `${SITE}/#business` },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Пакеты фотосессии новорожденного",
      itemListElement: PACKAGES.map((p) => ({
        "@type": "Offer",
        price: p.price,
        priceCurrency: "RUB",
        availability: "https://schema.org/InStock",
        areaServed: { "@type": "City", name: "Краснодар" },
        itemOffered: {
          "@type": "Service",
          name: p.name,
          description: p.description,
          provider: { "@id": `${SITE}/#business` },
        },
      })),
    },
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE}/#website`,
    url: `${SITE}/`,
    name: "Екатерина Крюкова — фотограф новорожденных в Краснодаре",
    inLanguage: "ru-RU",
    publisher: { "@id": `${SITE}/#business` },
  };
}

export function webPageSchema({ pathname, title, description, imageUrl }) {
  const url = absolute(pathname);
  const items = [{ name: "Главная", item: `${SITE}/` }];
  if (pathname !== "/") {
    items.push({ name: LABELS[pathname] || pathname, item: url });
  }
  return {
    "@type": pathname === "/gallery" ? "CollectionPage" : "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: "ru-RU",
    isPartOf: { "@id": `${SITE}/#website` },
    about: { "@id": `${SITE}/#business` },
    primaryImageOfPage: { "@type": "ImageObject", url: imageUrl },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: item.item,
      })),
    },
  };
}

export function reviewsSchema(reviews) {
  if (!reviews?.length) return null;
  return {
    "@type": "ItemList",
    "@id": `${SITE}/reviews#reviews`,
    itemListElement: reviews.slice(0, 20).map((review, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Review",
        author: { "@type": "Person", name: review.name },
        reviewBody: review.text.replace(/<br>\s*/g, " ").replace(/\s+/g, " ").trim(),
        itemReviewed: { "@id": `${SITE}/#business` },
      },
    })),
  };
}

export function gallerySchema(images) {
  if (!images?.length) return null;
  return {
    "@type": "ImageGallery",
    "@id": `${SITE}/gallery#gallery`,
    name: "Галерея фотосессий новорожденных",
    numberOfItems: images.length,
    associatedMedia: images.slice(0, 12).map((url) => ({
      "@type": "ImageObject",
      url,
      contentUrl: url,
    })),
  };
}

export function buildSchema({ pathname, title, description, imageUrl, reviews, galleryImages }) {
  const graph = [businessSchema(imageUrl), websiteSchema(), webPageSchema({ pathname, title, description, imageUrl })];
  if (pathname === "/reviews") {
    const reviewsNode = reviewsSchema(reviews);
    if (reviewsNode) graph.push(reviewsNode);
  }
  if (pathname === "/gallery") {
    const galleryNode = gallerySchema(galleryImages);
    if (galleryNode) graph.push(galleryNode);
  }
  return { "@context": "https://schema.org", "@graph": graph };
}
