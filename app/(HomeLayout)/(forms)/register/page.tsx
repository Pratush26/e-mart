import RegistrationForm from "@/Components/Forms/Register";
import Link from "next/link";

export default async function RegistrationPage() {
    return (
        <main className="my-10 w-full">
            <h1 className="text-4xl font-semibold text-center m-6">Create An Account</h1>
            <section className="bg-muted flex flex-col w-11/12 sm:w-2/3 lg:w-1/3 mx-auto items-center gap-2 p-8 rounded-2xl">
                <RegistrationForm />
                <span className="text-xs font-semibold">Already have an account? <Link href="/register" className="text-cyan-600 trns hover:text-cyan-700">Login</Link></span>
            </section>
        </main>
    )
}