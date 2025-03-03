import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    userData: {type: {
        fullName: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        pincode: { type: String, required: true },
        area: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
      }, required: true},
    cartData: {type: {}, required: true},
    amount: {
        type: Number,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
}, {timestamps: true})

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order