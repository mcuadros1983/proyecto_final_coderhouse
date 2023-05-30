import mongoose from 'mongoose';
import productSchema from "./products.js";

const cartSchema = new mongoose.Schema({ 
    email: { type: String, require: true },
    products: { type: [productSchema], require: true },
    delivery_address: { type: String, require: true },
    total: { type: Number, default: 0 }
}, { timestamps: true })

export default cartSchema