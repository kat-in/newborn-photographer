import { Link, useLocation } from "react-router";

export default function Logo() {
    const { pathname } = useLocation();

    return (
        <Link to="/" key={pathname}>
            <div className="logo logo-in">
                <img
                    className="logo_img"
                    src="/logo.png"
                    alt="Екатерина Крюкова — фотограф новорожденных, Краснодар"
                    width="724"
                    height="347"
                    fetchPriority="high"
                    decoding="async"
                />
            </div>
        </Link>
    )
}