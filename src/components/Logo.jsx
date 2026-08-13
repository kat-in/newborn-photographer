import { Link } from "react-router"

export default function Logo() {
    return (
        <Link to="/">
            <div className="logo">
                <img className="logo_img" src="/src/data/logo.png" alt="kryukovaphoto.ru" />
            </div>
        </Link>
    )
}