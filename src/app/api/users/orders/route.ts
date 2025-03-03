import connectDB from "@/config/db";
import Order from "@/models/OrderModel";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest ){
    try {
      await connectDB();
      const body = await req.json();
      const {address: userData, userId, cartData, amount, count} = body;

      const user = await User.findById(userId)
        if(!user) {
            throw new Error("No such user!")
        }
        const order = new Order({
            userId,
            userData,
            cartData,
            amount,
            count
        })
        await order.save()

      return NextResponse.json({message: `Order placed`, status: 201})
    } catch (error) {
      return NextResponse.json({message: "Error placing order", status: 500})
    }
  }

  export async function GET(req: NextRequest ){
    try {
      await connectDB();
        const orders = await Order.find().lean()

    return NextResponse.json(orders)
    } catch (error) {
      return NextResponse.json({message: "Error fetching orders", status: 500})
    }
  }