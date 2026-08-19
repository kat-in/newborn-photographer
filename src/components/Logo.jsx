import { Link, useLocation } from "react-router";

export default function Logo() {
    const { pathname } = useLocation();

    return (
        <Link to="/" key={pathname}>
            <div className="logo logo-in">
                <img className="logo_img" src="/src/data/logo.png" alt="kryukovaphoto.ru" />
            </div>
        </Link>
    )
}