import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  offerPrice: Number,
  images: [String], // array of URLs
});

export default mongoose.model("Product", ProductSchema);
