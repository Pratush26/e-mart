import { auth } from "@/auth"
import { SignOutBtn } from "@/Components/Buttons/Logout"
import Image from "next/image"

export default async function Dashboard() {
    const session = await auth()
    return (
        <main>
            <section className="flex items-center justify-center gap-4 my-6">
                <Image src={session?.user?.image ?? '/logo.png'} width={60} height={60} alt="logo" style={{ objectFit: "cover" }} className="aspect-square rounded-full" />
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