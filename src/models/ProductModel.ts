import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true, min: [20, 'Price must be at least $20']},
    offerPrice: {type: Number, required: true, min: [10, 'offerPrice must be at least $10']},
    image: {type: [String], required: true},
    category: { 
        type: String, 
        required: true, 
        enum: ['earphones', 'headphones', 'watch', 'smartphone', 'laptop', 'camera', 'accessories'], 
        message: '{VALUE} is not a valid category',
    },
}, {timestamps: true})

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product