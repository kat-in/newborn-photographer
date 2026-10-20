import { Link } from "react-router";

export default function NotFound() {
  return (
    <main className="page-section">
      <div className="page-intro reveal">
        <h1>Страница не найдена</h1>
        <p>
          Такой страницы на&nbsp;сайте нет. Возможно, ссылка устарела или&nbsp;в&nbsp;ней опечатка.
        </p>
        <p>
          Посмотрите <Link to="/gallery/">галерею фотосессий новорожденных</Link>, узнайте
          <Link to="/pricing/">стоимость съемки</Link> или&nbsp;запишитесь на&nbsp;фотосессию через
          страницу <Link to="/contacts/">контактов</Link>.
        </p>
        <p>
          <Link to="/" className="home-cta">
            На главную
          </Link>
        </p>
      </div>
    </main>
  );
}
