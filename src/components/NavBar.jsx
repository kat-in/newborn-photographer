import { Link } from "react-router"

export default function NavBar() {
    return (
        <div className="nav">
            <ul className="nav_bar">
                <li><Link to="/">Главная</Link></li>
                <li><Link to="/gallery">Галерея</Link></li>
                <li><Link to="/about">Обо мне</Link></li>
                <li><Link to="/pricing">Пакеты услуг</Link></li>
                <li><Link to="/contacts">Контакты</Link></li>
            </ul>
        </div>
    )
}