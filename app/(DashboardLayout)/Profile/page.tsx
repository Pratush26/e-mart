import { auth } from "@/auth"
import { SignOutBtn } from "@/Components/Buttons/Logout"
import Image from "next/image"
import { FaUser } from "react-icons/fa"

export default async function Profile() {
    const session = await auth()
    return (
        <main>
            <section className="flex items-center justify-center gap-4 my-6">
                {
                    session?.user?.image ?
                        <Image src={session?.user?.image} width={60} height={60} alt="logo" style={{ objectFit: "cover" }} className="aspect-square rounded-full" />
                        :
                        <FaUser className="h-10 w-10 aspect-square" />
                }
                <div className="font-medium">
                    <p className="text-xl">{session?.user?.name}</p>
                    <p className="text-xs">{session?.user?.email}</p>
                </div>
            </section>
            <div className="w-fit mx-auto">
                <SignOutBtn />
            </div>
        </main>
    )
}