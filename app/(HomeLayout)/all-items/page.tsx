import Card from "@/Components/Card";
import { connectDB } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
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

interface PageProps {
    searchParams: {
        page?: string;
    };
}

const LIMIT = 4;

export default async function AllItems({ searchParams }: PageProps) {
    const page = Number(searchParams.page || "1");
    const skip = (page - 1) * LIMIT;

    let items: ItemType[] = [];
    let total = 0;

    try {
        const { db } = await connectDB();

        items = await db.collection<ItemType>("items")
            .find({})
            .skip(skip)
            .limit(LIMIT)
            .sort({ createdAt: -1 })
            .toArray();

        total = await db.collection("items").countDocuments();
    } catch (err) {
        console.error("FETCH_ERROR:", err);
    }

    const totalPages = Math.ceil(total / LIMIT);

    return (
        <main>
            <h1 className="text-3xl font-bold text-center m-6">All Items</h1>

            <section className="grid grid-cols-4 items-center-safe justify-items-center-safe gap-5 w-11/12 mx-auto">
                {items.map((item) => <Card key={item._id.toString()} e={item} />)}
            </section>

            {/* Pagination */}
            <div className="w-fit mx-auto m-8">
                {page > 1 && <Link href={{ pathname: "/items", query: { ...searchParams, page: page - 1 } }}>⬅ Prev </Link>}

                <span className="mx-2">Page {page} of {totalPages}</span>

                {page < totalPages && <Link href={`?page=${page + 1}`}>Next ➡</Link>}
            </div>
        </main>
    );
}