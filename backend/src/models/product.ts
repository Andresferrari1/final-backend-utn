import { Schema, model } from "mongoose"

const productSchema = new Schema({
    name: { type: String, required: true },
    price: Number,
    stock: Number
}, {
    versionKey: false,
    timestamps: true
})

export const Product = model("Product", productSchema)
