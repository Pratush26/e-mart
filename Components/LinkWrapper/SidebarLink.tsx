"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarLink({children, href}: {children: React.ReactNode; href: string}) {
    const path = usePathname()
    return (
        <Link href={href} className={`${path === href ? "bg-gray-500" : "hover:bg-gray-600"} trns pl-5 pr-10 py-2 rounded-lg`}>{children}</Link>
    )
}