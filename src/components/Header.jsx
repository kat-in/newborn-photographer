import Logo from "./Logo"
import NavBar from "./NavBar"

export default function Header(){
    return (
        <div className="header">
            <Logo />
            <NavBar />
        </div>
    )
}