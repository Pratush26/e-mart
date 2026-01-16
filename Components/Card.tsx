import { ObjectId } from "mongodb";
import Image from "next/image";
import Link from "next/link";

interface ItemType {
    _id: ObjectId;
    title: string;
    description: string;
    category: string;
    photo: string;
    stock: number;
    unit: string;
    price: number;
    seller: ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export default function Card({ e }: { e: ItemType }) {
    return (
        <div className='shadow-md/30 bg-card h-full rounded-xl p-5 flex flex-col justify-between gap-2 text-sm'>
            <h6 className='text-lg font-bold'>{e.title}</h6>
            <div className='flex items-center justify-between w-full gap-2 font-medium text-xs'>
                <span className="px-4 py-1 rounded-full bg-gray-300 text-black font-medium">{e?.category}</span>
            </div>
            <div className="relative w-full aspect-square">
                <Image
                    src={e.photo}
                    alt="product image"
                    fill
                    className="object-cover rounded-xl"
                />
            </div>
            <p className='line-clamp-2'>{e.description}</p>
            <Link href={`/product-details/${e._id.toString()}`} className='hover:underline italic'>View Details</Link>
        </div>
    )
}