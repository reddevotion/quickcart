"use server"
import User from "@/models/UserModel";

import connectDB from "@/config/db";

interface UserData  {
    id: string,
    name: string, 
    email: string, 
    imageUrl: string
}

export const createUser = async (userData: UserData) => {

    try {
        await connectDB();

        const existingUser = await User.findOne({clerkUserId: userData.id})

        if(existingUser) {
            console.log("User already exists")
            throw new Error("User already exists")
        }

        const user = await new User({
            clerkUserId: userData.id,
            name: userData.name,
            email: userData.email,
            imageUrl: userData.imageUrl,
        })

        user.save()

        return user
    } catch (error) {
        throw new Error(`Error creating user`)
    }
}

export const updateUser = async (userData: UserData) => {

    try {
        await connectDB();

        const user = await User.findOneAndUpdate(
            { clerkUserId: userData.id },
            {
              $set: {
                name: userData.name,
                email: userData.email,
                imageUrl: userData.imageUrl,
              },
            },
            { new: true }
          );

        user.save()

        

        return user
    } catch (error) {
        throw new Error(`Error updating user`)
    }
}

export const deleteUser = async (id: string) => {

    try {
        await connectDB();

        await User.findOneAndDelete({clerkUserId: id})
    } catch (error) {
        throw new Error(`Error creating or updating user ${error}`)
    }
}

