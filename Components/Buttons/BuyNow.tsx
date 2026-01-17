"use client"
import { toast } from "sonner";

export default function BuyNowBtn({ title, id }: { title: string; id: string }) {
    const handleClick = () => {
        if (!id) {
            toast.error("Product not found!")
            return;
        }
        toast.success(`successfully purchashed ${title}`)
        console.log(id)
    }
    return (
        <button onClick={handleClick} className="btn btn-primary trns rounded-full">Buy Now</button>
    )
}