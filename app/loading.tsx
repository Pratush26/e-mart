import { Spinner } from "@/Components/ui/spinner";

export default function loading() {
    return (
        <main className="flex items-center justify-center min-h-screen">
            <Spinner className="size-8" />
        </main>
    )
}