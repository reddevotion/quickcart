import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    pincode: { type: String, required: true },
    area: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
  }, { _id: false });

const userSchema = new mongoose.Schema({
    clerkUserId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    imageUrl: {type: String, required: true,},
    cartItems: { 
        type: Object, 
        default: {}
    },
    favoriteItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: []}],
    addresses: [addressSchema], 
}, {timestamps: true})

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User