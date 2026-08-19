import { NavLink } from "react-router"

export default function NavBar() {
    return (
        <div className="nav">
            <ul className="nav_bar">
                <li><NavLink to="/" end>Главная</NavLink></li>
                <li><NavLink to="/gallery">Галерея</NavLink></li>
                <li><NavLink to="/about">Обо мне</NavLink></li>
                <li><NavLink to="/pricing">Пакеты услуг</NavLink></li>
                <li><NavLink to="/reviews">Отзывы</NavLink></li>
                <li><NavLink to="/contacts">Контакты</NavLink></li>
            </ul>
        </div>
    )
}