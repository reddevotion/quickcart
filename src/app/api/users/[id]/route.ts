import connectDB from "@/config/db";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ){
  try {
    const id = (await params).id
    await connectDB();
    const user = await User.findOne({clerkUserId: id}).lean()
    return NextResponse.json(user)
  } catch (error) {
    console.error("Error fetching User:", error);
    return NextResponse.json({message: "Error fetching User", status: 400})
  }
}

