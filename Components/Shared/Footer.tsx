import Link from "next/link";
import Logo from "./Logo";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
import { auth } from "@/auth";

export default async function Footer() {
    const session = await auth()
    return (
        <footer className="w-full bg-secondary pt-5">
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-4 w-11/12 mx-auto my-4 text-sm font-medium">
                <Logo />
                <div className="flex flex-col gap-2">
                    <Link className="trns hover:text-gray-500 w-fit" href="/">Home</Link>
                    <Link className="trns hover:text-gray-500 w-fit" href="/all-items">All Items</Link>
                </div>
                <div className="flex flex-col gap-2">
                    {
                        session ?
                            <>
                                <Link className="trns hover:text-gray-500 w-fit" href="/dashboard">Dashboard</Link>
                                <Link className="trns hover:text-gray-500 w-fit" href="/profile">Profile</Link>
                            </>
                            :
                            <>
                                <Link className="trns hover:text-gray-500 w-fit" href="/login">Login</Link>
                                <Link className="trns hover:text-gray-500 w-fit" href="/register">Register</Link>
                            </>
                    }
                </div>
                <div className="flex flex-col gap-2">
                    <h5 className="text-xl font-semibold">Social Links</h5>
                    <span className="flex gap-2 text-xl">
                        <a className="trns hover:text-gray-500 w-fit" href="http://facebook.com" target="_blank"><FaFacebook /></a>
                        <a className="trns hover:text-gray-500 w-fit" href="http://instagram.com" target="_blank"><AiFillInstagram /></a>
                        <a className="trns hover:text-gray-500 w-fit" href="http://twitter.com" target="_blank"><FaSquareXTwitter /></a>
                    </span>
                </div>
            </section>
            <p className="text-xs font-medium text-center my-6">&copy; 2026 copyright | All rights are reserved by e-mart</p>
        </footer>
    )
}