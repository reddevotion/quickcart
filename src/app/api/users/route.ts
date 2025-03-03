import connectDB from "@/config/db";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest ){
    try {
      await connectDB();
      const body = await req.json();
      const {id, userId} = body
      const user = await User.findById(userId)
      if (!user) {
          return NextResponse.json({ message: "User not found", status: 404 });
      }
      const isFavorite = user.favoriteItems.includes(id);
  
      if(!isFavorite) {
          await User.findByIdAndUpdate(user._id, {
              $push:{favoriteItems:id}
          })
      }else {
          await User.findByIdAndUpdate(user._id, {
              $pull:{favoriteItems:id},
          })
      }
  
  
      return NextResponse.json({message: `${isFavorite ? "Item removed" : "Item Added"}`, status: 200})
    } catch (error) {
      return NextResponse.json({message: "Error adding or removing favorite item", status: 500})
    }
  }