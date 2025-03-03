import mongoose from "mongoose";

const connectDB = async () => {
    if(mongoose.connections[0].readyState) {
        return true;
    }

    try {
        if(!process.env.MONGODB_URI) {
            throw new Error("MongoDB URI is not defined")
        }
        await mongoose.connect(process.env.MONGODB_URI as string)
        console.log("MongoDB connected")
        return true;
    } catch (error) {
        console.log(error)
        throw new Error("Error connecting MongoDB")
    }
}

export default connectDB