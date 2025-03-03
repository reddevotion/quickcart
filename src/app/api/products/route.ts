import connectDB from "@/config/db";
import Product from "@/models/ProductModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const products = await Product.find().lean()
    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({message: "Error fetching products", status: 400})
  }
}