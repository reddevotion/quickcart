"use server"

import connectDB from "@/config/db";
import User from "@/models/UserModel";



async function addAddress(userId: string, previousState: any, formData: FormData) {
    const fullName = formData.get("fullName")
    const phoneNumber = formData.get("phoneNumber")
    const pincode = formData.get("pincode")
    const area = formData.get("area")
    const city = formData.get("city")
    const state = formData.get("state")
    try {
        await connectDB();
        const user = await User.findById(userId)
        if(!user) {
            throw new Error("No such user!")
        }

        if (!Array.isArray(user.addresses)) {
            user.addresses = [];
          }
          user.addresses.push({
            fullName,
            phoneNumber,
            pincode,
            area,
            city,
            state,
          });

        await user.save()
        return {
            message: `The address was added successfully`,
            status: "success"
        }
    } catch (error) {
        return {
            message: `Error adding address ${error}`,
            status: "error"
        }
    }
}

export default addAddress