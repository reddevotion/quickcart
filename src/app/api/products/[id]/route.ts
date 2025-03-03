import connectDB from "@/config/db";
import Product from "@/models/ProductModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ){
  try {
    const id = (await params).id
    await connectDB();
    const product = await Product.findById(id).lean()
    return NextResponse.json(product)
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({message: "Error fetching products", status: 400})
  }
}