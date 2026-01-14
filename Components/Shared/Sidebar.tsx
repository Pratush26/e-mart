"use client"

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import SidebarLink from "../LinkWrapper/SidebarLink";
import Logo from "./Logo";
import { FaUser } from "react-icons/fa";

export default function Sidebar() {
    const [isOpened, setIsOpened] = useState(false)
    const { data: session } = useSession()
    return (
        <header className="w-full">
            <nav className="w-11/12 mx-auto my-4 flex justify-between gap-4">
                <Logo />
                <button onClick={() => setIsOpened(!isOpened)} className="cursor-pointer text-xl">
                    {
                        isOpened ?
                            <RxCross2 />
                            :
                            <RxHamburgerMenu />
                    }
                </button>
                <aside className={`fixed ${isOpened ? "translate-x-0" : "translate-x-full"} top-16 right-0 bg-(--base-200) flex flex-col justify-center gap-2 trns p-3 rounded-lg`}>
                    {
                        session?.user ?
                            <>
                                <div className="flex items-center gap-2">
                                    {
                                        session?.user?.image ?
                                            <Image src={session?.user?.image} height={40} width={40} style={{ objectFit: "cover" }} alt="user image" className="rounded-full aspect-square" />
                                            :
                                            <FaUser className="h-10 w-10 aspect-square" />
                                    }
                                    <button onClick={() => signOut()} className="btn btn-primary trns rounded-md">Log Out</button>
                                </div>
                                <SidebarLink href="/dashboard">Dashboard</SidebarLink>
                                {
                                    session.user?.role === "admin" ?
                                        <>
                                            <SidebarLink href="/create-project">Create Project</SidebarLink>
                                            <SidebarLink href="/manage-projects">Manage Projects</SidebarLink>
                                            <SidebarLink href="/register">Register</SidebarLink>
                                        </>
                                        :
                                        session.user?.role === "employee" ?
                                            <>
                                                <SidebarLink href="/submit-task">Submit Task</SidebarLink>
                                            </>
                                            :
                                            <>
                                                <SidebarLink href="/see-projects">See Projects</SidebarLink>
                                            </>
                                }
                            </>
                            :
                            <>
                                <SidebarLink href="/login">Login</SidebarLink>
                            </>
                    }
                </aside>
            </nav>
        </header>
    )
}