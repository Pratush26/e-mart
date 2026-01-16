import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { title, description, category, photo, stock, unit, price } = body ?? {};
        if (!title || !description || !category || !photo || !stock || !unit || !price) return NextResponse.json({ success: false, message: "Some values are missing" }, { status: 400 });

        const { db } = await connectDB();
        const session = await auth()
        const user = await db.collection("users").findOne({ email: session?.user?.email }, { projection: { _id: 1, role: 1 } });
        if (user?.role !== "seller" && user?.role !== "admin") return NextResponse.json({ success: false, message: "Unauthorized access" }, { status: 401 });

        const normalizedCategory = category.toLowerCase();
        await db.collection("categories").updateOne({ name: normalizedCategory },
            {
                $setOnInsert: {
                    name: normalizedCategory,
                    createdAt: new Date(),
                },
            },
            { upsert: true }
        );

        const result = await db.collection("items").insertOne({ title, description, category: normalizedCategory, photo, stock: Number(stock), price: Number(price), unit, seller: user?._id, createdAt: new Date(), updatedAt: new Date() });

        if (!result.acknowledged) return NextResponse.json({ success: false, message: "Failed to create product" }, { status: 500 });
        return NextResponse.json({ success: true, message: "Product created successfully." }, { status: 201 });

    } catch (err) {
        console.error("REGISTER_ERROR:", err);
        return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
    }
}
// export async function GET() {
//     try {
//     const { db } = await connectDB();
//     const categories = [...new Set(datalist.map(d => d.category.toLowerCase().trim()))];

//     if (categories.length) {
//       await db.collection("categories").bulkWrite(
//         categories.map((name) => ({
//           updateOne: {
//             filter: { name },
//             update: { $setOnInsert: { name, createdAt: new Date() } },
//             upsert: true,
//           },
//         }))
//       );
//     }

//     // 2) prepare items
//     const docs = datalist.map((e) => ({
//       title: e.title,
//       description: e.description,
//       category: e.category.toLowerCase().trim(),
//       photo: e.photo,
//       stock: Number(e.stock),
//       unit: e.unit,
//       price: Number(e.price),
//       seller: new ObjectId(e.seller),
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     }));

//     const result = await db.collection("items").insertMany(docs);

//     return NextResponse.json(
//       { success: true, insertedCount: result.insertedCount },
//       { status: 201 }
//     );
//   } catch (err) {
//     console.error("SEED_ERROR:", err);

//     return NextResponse.json(
//       { success: false, message: "Internal server error."},
//       { status: 500 }
//     );
//   }
// }