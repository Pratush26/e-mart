import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href='/' className="flex items-center justify-center gap-2 w-fit">
            <Image src={'/logo.png'} width={40} height={40} alt="logo" style={{aspectRatio: "square"}} className="aspect-square" />
            <p className="text-xl font-semibold">e-mart</p>
        </Link>
    )
}