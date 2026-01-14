import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectDB } from "@/lib/dbConnect";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, photo, phone, address } = body ?? {};
    if (!name || !email || !password) return NextResponse.json( { success: false, message: "Name, email, and password are required." }, { status: 400 } );

    const { db } = await connectDB();
    const exists = await db.collection("users").findOne({ email });
    if (exists) return NextResponse.json( { success: false, message: "User already exists." }, { status: 409 } );

    const hashedPassword = await bcrypt.hash(String(password), 10);
    const result = await db.collection("users").insertOne({ name, email, password: hashedPassword, photo, phone, address, role: "user", createdAt: new Date(), updatedAt: new Date()});
    
    if(!result.acknowledged) return NextResponse.json( { success: false, message: "Failed to register user" }, { status: 500 } );
    return NextResponse.json( { success: true, message: "User registered successfully." }, { status: 201 } );

  } catch (err) {
    console.error("REGISTER_ERROR:", err);
    return NextResponse.json( { success: false, message: "Internal server error." }, { status: 500 } );
  }
}