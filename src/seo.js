import { useEffect } from "react";
import { useLocation } from "react-router";
import { SEO_META, absolute } from "./seo-meta.mjs";
import { buildSchema } from "./seo-schema.mjs";
import { galleryThumbs } from "./gallery.js";
import reviews from "./data/reviews/reviews.json";
import manifest from "./assets/manifest.json";

import ogHome from "./assets/home/slide01.webp";
import ogGallery from "./assets/gallery/001.webp";
import ogAbout from "./assets/about/intro.webp";
import ogPricing from "./assets/gallery/113.webp";
import ogReviews from "./assets/gallery/007.webp";
import ogContacts from "./assets/gallery/007.webp";

const OG_IMAGES = {
  "/": { url: ogHome, key: "home/slide01.webp" },
  "/gallery": { url: ogGallery, key: "gallery/001.webp" },
  "/about": { url: ogAbout, key: "about/intro.webp" },
  "/pricing": { url: ogPricing, key: "gallery/113.webp" },
  "/reviews": { url: ogReviews, key: "gallery/007.webp" },
  "/contacts": { url: ogContacts, key: "gallery/007.webp" },
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

function setSchema(data) {
  let el = document.getElementById("seo-schema");
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = "seo-schema";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function useSEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    const key = pathname.replace(/\/$/, "") || "/";
    const meta = SEO_META[key] || SEO_META["/"];
    const url = absolute(pathname);
    const og = OG_IMAGES[key] || OG_IMAGES["/"];
    const image = absolute(og.url);
    const ogSize = manifest[og.key];

    document.title = meta.title;
    setMeta("name", "description", meta.description);
    setMeta("property", "og:title", meta.title);
    setMeta("property", "og:description", meta.description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", image);
    setMeta("property", "og:image:width", String(ogSize?.w || 1400));
    setMeta("property", "og:image:height", String(ogSize?.h || 933));
    setMeta("property", "og:type", "website");
    setMeta("name", "twitter:title", meta.title);
    setMeta("name", "twitter:description", meta.description);
    setMeta("name", "twitter:image", image);
    setMeta("name", "twitter:card", "summary_large_image");
    setCanonical(url);

    setSchema(
      buildSchema({
        pathname: key,
        title: meta.title,
        description: meta.description,
        imageUrl: image,
        reviews,
        galleryImages: galleryThumbs.map((url) => absolute(url)),
      })
    );
  }, [pathname]);
}
