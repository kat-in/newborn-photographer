import { useCallback, useEffect, useState } from "react";

const images = Object.entries(
  import.meta.glob("/src/data/images/*.{jpg,JPG}", {
    eager: true,
    import: "default",
  })
)
  .map(([path, url]) => ({ url, num: parseInt(path.match(/(\d+)\./)[1]) }))
  .sort((a, b) => a.num - b.num)
  .map((i) => i.url);

export default function Gallery() {
  const [selected, setSelected] = useState(null);

  const close = useCallback(() => setSelected(null), []);
  const prev = useCallback(
    () => setSelected((s) => (s === null ? s : (s - 1 + images.length) % images.length)),
    []
  );
  const next = useCallback(
    () => setSelected((s) => (s === null ? s : (s + 1) % images.length)),
    []
  );

  useEffect(() => {
    if (selected === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, close, prev, next]);

  return (
    <main className="page-section">
      <h1 className="sr-only">Галерея</h1>
      <div className="gallery-grid reveal">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`Фото ${i + 1}`}
            loading="lazy"
            onClick={() => setSelected(i)}
          />
        ))}
      </div>

      {selected !== null && (
        <div className="lightbox" onClick={close}>
          <div
            className="lightbox-overlay"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lightbox-close"
              onClick={close}
              aria-label="Закрыть"
            >
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path d="M6 6 L18 18 M18 6 L6 18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            </button>
            <button
              className="lightbox-nav lightbox-prev"
              onClick={prev}
              aria-label="Предыдущее"
            >
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path d="M14 6 L8 12 L14 18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <img
              className="lightbox-img"
              src={images[selected]}
              alt={`Фото ${selected + 1}`}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="lightbox-nav lightbox-next"
              onClick={next}
              aria-label="Следующее"
            >
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path d="M10 6 L16 12 L10 18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </main>
  );
}