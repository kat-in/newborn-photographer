import { useEffect, useState } from "react";
import { NavLink } from "react-router"

export default function NavBar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e) => {
      if (!e.target.closest(".nav")) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  return (
    <div className="nav">
      <button
        type="button"
        className={"nav-toggle" + (open ? " open" : "")}
        aria-label="Меню"
        aria-expanded={open}
        aria-controls="site-nav"
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>
      <ul className={"nav_bar" + (open ? " open" : "")} id="site-nav">
        <li><NavLink to="/" end onClick={() => setOpen(false)}>Главная</NavLink></li>
        <li><NavLink to="/gallery" onClick={() => setOpen(false)}>Галерея</NavLink></li>
        <li><NavLink to="/about" onClick={() => setOpen(false)}>Обо мне</NavLink></li>
        <li><NavLink to="/pricing" onClick={() => setOpen(false)}>Пакеты услуг</NavLink></li>
        <li><NavLink to="/reviews" onClick={() => setOpen(false)}>Отзывы</NavLink></li>
        <li><NavLink to="/contacts" onClick={() => setOpen(false)}>Контакты</NavLink></li>
      </ul>
    </div>
  )
}