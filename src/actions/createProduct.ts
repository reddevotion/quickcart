"use server"

import connectDB from "@/config/db";
import Product from "@/models/ProductModel";
import User from "@/models/UserModel";

async function createProduct(userId: string, images: string[], previousState: any, formData: FormData) {
    const description = formData.get("desc")
    const name = formData.get("name")
    const price = formData.get("price")
    const offerPrice = formData.get("offerPrice")
    const category = formData.get("category")
    try {
        await connectDB();
        const user = await User.findOne({clerkUserId: userId})
        if(!user) {
            throw new Error("No such user!")
        }
        const product = new Product({
            name,
            price,
            offerPrice,
            category,
            description,
            image: images,
            userId: user._id,
        })
        await product.save()
        return {
            message: `The product was created successfully`,
            status: "success"
        }
    } catch (error) {
        return {
            message: `Error adding a product ${error}`,
            status: "error"
        }
    }
}

export default createProduct