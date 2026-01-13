import { ThemeToggleBtn } from "../Buttons/theme";
import NavLink from "../LinkWrapper/NavLink";
import Logo from "./Logo";

export default function Navbar() {
    return (
        <header className="w-full">
            <nav className="w-11/12 mx-auto my-4 flex justify-between gap-4">
                <Logo />
                <div className="space-x-2 text-sm font-medium">
                    <NavLink href="/register">Register</NavLink>
                    <NavLink href="/login">Login</NavLink>
                </div>
                <ThemeToggleBtn />
            </nav>
        </header>
    )
}