import manifest from "./assets/manifest.json";

export const gallery = Object.entries(
  import.meta.glob("/src/assets/gallery/*.webp", {
    eager: true,
    import: "default",
  })
)
  .map(([path, url]) => {
    const file = path.split("/").pop();
    const isThumb = file.includes(".thumb.");
    const id = file.replace(/\.thumb\.webp$/, "").replace(/\.webp$/, "");
    return { id, url, isThumb };
  })
  .reduce((acc, item) => {
    const entry = acc.find((e) => e.id === item.id) || { id: item.id, thumb: null, full: null };
    if (item.isThumb) entry.thumb = item.url;
    else entry.full = item.url;
    if (!acc.includes(entry)) acc.push(entry);
    return acc;
  }, [])
  .sort((a, b) => a.id.localeCompare(b.id, "ru", { numeric: true }));

export const galleryImages = gallery.map((g) => g.full || g.thumb);
export const galleryThumbs = gallery.map((g) => g.thumb || g.full);

export function gallerySize(id, kind = "thumb") {
  return manifest[`gallery/${id}.${kind}.webp`] || manifest[`gallery/${id}.webp`];
}
