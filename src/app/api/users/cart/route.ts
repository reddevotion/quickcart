import connectDB from "@/config/db";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest ){
    try {

      const {cartData, userId} = await req.json()

      await connectDB();
      const user = await User.findById(userId)

      if(!user) {
        return NextResponse.json({message: "No user found", status: 404})
      }

      user.cartItems = cartData
      await user.save()
      return NextResponse.json({message: "Cart updated successfully", status: 200})
    } catch (error) {
      return NextResponse.json({message: "Error updating Cart", status: 500})
    }
  }

  export async function PATCH(req: NextRequest ){
    try {

      const {cartData, userId} = await req.json()

      await connectDB();
      const user = await User.findById(userId)

      if(!user) {
        return NextResponse.json({message: "No user found", status: 404})
      }
      user.cartItems = cartData
      await user.save()
      return NextResponse.json({message: "Cart updated successfully", status: 200})
    } catch (error) {
      return NextResponse.json({message: "Error updating Cart", status: 500})
    }
  }


