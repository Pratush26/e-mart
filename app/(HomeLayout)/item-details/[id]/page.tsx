import AddToCartBtn from "@/Components/Buttons/AddToCart";
import BuyNowBtn from "@/Components/Buttons/BuyNow";
import { connectDB } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import Image from "next/image"

interface createrType {
    name: string;
    email: string;
    phone: string;
    photo: string;
}
interface ItemType {
    _id: ObjectId;
    title: string;
    description: string;
    category: string;
    photo: string;
    price: number;
    stock: number;
    unit: string;
    createdBy: createrType;
    createdAt: string;
}

export default async function ProjectDetails({ params }: { params: Promise<{ id: string }> }) {
    let data: Partial<ItemType> = {};

    try {
        const { id } = await params
        const { db } = await connectDB();
        const filter = { _id: new ObjectId(id) };

        const result = await db.collection("items").aggregate([
            { $match: filter },
            {
                $lookup: {
                    from: "users",
                    let: { sellerId: "$seller" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$sellerId"] }
                            }
                        },
                        { $project: { name: 1, email: 1, photo: 1, phone: 1, _id: 0 } }
                    ],
                    as: "createdBy"
                }
            },
            {
                $unwind: {
                    path: "$createdBy",
                    preserveNullAndEmptyArrays: true
                }
            },
            { $project: { title: 1, description: 1, category: 1, photo: 1, price: 1, stock: 1, unit: 1, createdBy: 1, createdAt: 1 } }
        ]).toArray();
        data = result[0] ?? {};

    } catch (err) {
        console.error("FETCH_ERROR:", err);
    }
    console.log(data)
    return (
        <main className="w-11/12 mx-auto my-10">
            <div className="mb-6 p-6 space-y-1 rounded-2xl bg-secondary">
                <h1 className="text-3xl font-bold">{data.title ?? "Item details"}</h1>
                <p className="text-sm opacity-70">Category: {data.category ?? "—"}</p>
                {/* <p className="text-sm opacity-70 mt-2">Posted: {data.createdAt ?? "—"}</p> */}
            </div>

            {/* Main grid */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image */}
                <div className="w-full">
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-secondary">
                        <Image
                            src={data.photo ?? "/placeholder.png"}
                            alt={data.title ?? "Item photo"}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Quick stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                        <div className="p-4 rounded-xl bg-secondary">
                            <p className="text-xs opacity-70">Price</p>
                            <p className="text-lg font-semibold">
                                {typeof data.price === "number" ? `৳${data.price}` : "—"}
                            </p>
                        </div>
                        <div className="p-4 rounded-xl bg-secondary">
                            <p className="text-xs opacity-70">Stock</p>
                            <p className="text-lg font-semibold">
                                {Number(data.stock) ?? "—"}{" "}
                                <span className="text-sm opacity-70">{data.unit ?? ""}</span>
                            </p>
                        </div>
                        <div className="p-4 rounded-xl bg-secondary col-span-2 sm:col-span-1">
                            <p className="text-xs opacity-70">Status</p>
                            <p className="text-lg font-semibold">
                                {Number(data.stock) > 0 ? "Available" : "Out of stock"}
                            </p>
                        </div>
                    </div>
                </div>

                <article className="flex flex-col gap-6">
                    <div className="p-6 rounded-2xl bg-secondary">
                        <h2 className="text-xl font-semibold mb-2">Description</h2>
                        <p className="leading-relaxed opacity-90 whitespace-pre-line">
                            {data.description ?? "No description provided."}
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-secondary">
                        <h2 className="text-xl font-semibold mb-4">Seller</h2>

                        <div className="flex items-center gap-4">
                            <div className="relative h-14 w-14 rounded-full overflow-hidden bg-background">
                                <Image
                                    src={data.createdBy?.photo ?? "/avatar.png"}
                                    alt={data.createdBy?.name ?? "Seller"}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="min-w-0">
                                <p className="font-semibold">{data.createdBy?.name ?? "—"}</p>
                                <p className="text-sm opacity-60">{data.createdBy?.email ?? "—"}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                            <div className="p-4 rounded-xl bg-background/40">
                                <p className="text-xs opacity-70">Email</p>
                                <p className="font-medium break-all">{data.createdBy?.email ?? "—"}</p>
                            </div>
                            <div className="p-4 rounded-xl bg-background/40">
                                <p className="text-xs opacity-70">Phone</p>
                                <p className="font-medium">{data.createdBy?.phone ?? "—"}</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 mt-5">
                            {data.createdBy?.email && (
                                <a
                                    className="btn btn-out trns rounded-full"
                                    href={`mailto:${data.createdBy.email}`}
                                >
                                    Email seller
                                </a>
                            )}
                            {data.createdBy?.phone && (
                                <a
                                    className="btn btn-out trns rounded-full"
                                    href={`tel:${data.createdBy.phone}`}
                                >
                                    Call seller
                                </a>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <BuyNowBtn title={data.title ?? ""} id={data._id ? data._id.toString() : ""} />
                        <AddToCartBtn title={data.title ?? ""} id={data._id ? data._id.toString() : ""} />
                    </div>
                </article>
            </section>
        </main>
    )
}