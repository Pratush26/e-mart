"use client"
import { toast } from "sonner";

export default function AddToCartBtn({ title, id }: { title: string; id: string }) {
    const handleClick = () => {
        if (!id) {
            toast.error("Product not found!")
            return;
        }
        toast.success(` ${title} successfully added to your cart`)
        console.log(id)
    }
    return (
        <button onClick={handleClick} className="btn btn-out trns rounded-full">Add to Cart</button>
    )
}