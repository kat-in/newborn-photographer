import { Link } from "react-router";
import data from "../data/reviews/reviews.json";
import manifest from "../assets/manifest.json";

const avatars = Object.entries(
  import.meta.glob("../assets/reviews/av*.webp", { eager: true, import: "default" })
).reduce((acc, [path, url]) => {
  acc[parseInt(path.match(/av(\d+)\.webp/)[1])] = url;
  return acc;
}, {});

const ALT = "Фото клиента — отзыв о фотосессии";

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
        {num ? <img
            src={avatars[num]}
            alt={ALT}
            width={manifest[`reviews/av${String(num).padStart(2, "0")}.webp`]?.w}
            height={manifest[`reviews/av${String(num).padStart(2, "0")}.webp`]?.h}
            loading="lazy"
            decoding="async"
          /> : <div className="comment-letter">{review.letter}</div>}
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
      <h1 className="sr-only">Отзывы клиентов о фотосессии новорожденных</h1>
      <div className="reviews-intro reveal">
        <h2 className="sr-only">Отзывы о фотосессии новорожденного</h2>
        <p>
          Ниже&nbsp;— отзывы родителей, которые доверили мне съемку своих малышей в&nbsp;Краснодаре.
          Посмотрите <Link to="/gallery/">примеры работ</Link> и&nbsp;<Link to="/pricing/">пакеты услуг</Link>,
          чтобы выбрать формат съемки. Записаться можно на&nbsp;странице <Link to="/contacts/">контактов</Link>.
        </p>
      </div>
      <div className="comments-list">
        {data.map((review, i) => (
          <Comment key={i} review={review} />
        ))}
      </div>
    </main>
  );
}