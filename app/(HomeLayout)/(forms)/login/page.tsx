import { FcGoogle } from "react-icons/fc"
import { signIn } from "@/auth"
import LoginForm from "@/Components/Forms/Login"

export const dynamic = "force-dynamic"

export default async function LoginPage() {
    return (
        <main className="my-10 w-full">
            <h1 className="text-4xl font-semibold text-center m-6">Login</h1>
            <section className="bg-muted flex flex-col w-11/12 sm:w-2/3 lg:w-1/3 mx-auto items-center gap-2 p-8 rounded-2xl">
                <LoginForm />
                <form className="mx-auto w-fit m-2"
                    action={async () => {
                        "use server"
                        await signIn("google")
                    }}
                >
                    <button type="submit" className="trns btn btn-out flex gap-2 items-center rounded-md"><FcGoogle /> Signin with Google</button>
                </form>
            </section>
        </main>
    )
}