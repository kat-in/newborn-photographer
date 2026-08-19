import data from "../data/reviews/reviews.json";

const avatars = Object.entries(
  import.meta.glob("../data/reviews/av*.jpg", { eager: true, import: "default" })
).reduce((acc, [path, url]) => {
  acc[parseInt(path.match(/av(\d+)\.jpg/)[1])] = url;
  return acc;
}, {});

const ALT = "Отзывы фотограф новорожденных Краснодар — Екатерина Крюкова. Фотограф новорожденных Краснодар — Екатерина Крюкова";

function Comment({ review }) {
  const paragraphs = review.text
    .replace(/<br>\s*/g, "\n")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const num = review.avatar ? parseInt(review.avatar.match(/\d+/)[0]) : null;

  return (
    <article className="comment reveal">
      <div className="comment-avatar">
        {num ? <img src={avatars[num]} alt={ALT} loading="lazy" /> : <div className="comment-letter">{review.letter}</div>}
      </div>
      <div className="comment-content">
        <h3>{review.name}</h3>
        {paragraphs.map((p, j) => (
          <p key={j}>{p}</p>
        ))}
      </div>
    </article>
  );
}

export default function Reviews() {
  return (
    <main className="reviews">
      <h1 className="sr-only">Отзывы</h1>
      <div className="comments-list">
        {data.map((review, i) => (
          <Comment key={i} review={review} />
        ))}
      </div>
    </main>
  );
}