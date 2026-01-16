import { auth } from "@/auth";
import { ThemeToggleBtn } from "../Buttons/theme";
import NavLink from "../LinkWrapper/NavLink";
import Logo from "./Logo";

export default async function Navbar() {
    const session = await auth()
    return (
        <header className="w-full bg-secondary sticky top-0 shadow-md/30">
            <nav className="w-11/12 mx-auto my-4 flex items-center justify-between gap-4">
                <Logo />
                <div className="space-x-2 text-sm font-medium">
                    <NavLink href="/all-items">All Items</NavLink>
                    {
                        session ?
                            <>
                                <NavLink href="/dashboard">Dashboard</NavLink>
                            </>
                            :
                            <>
                                <NavLink href="/register">Register</NavLink>
                                <NavLink href="/login">Login</NavLink>
                            </>
                    }
                </div>
                <ThemeToggleBtn />
            </nav>
        </header>
    )
}