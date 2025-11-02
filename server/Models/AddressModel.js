// server/models/AddressModel.js
import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  fullName: String,
  phone: String,
  street: String,
  city: String,
  state: String,
  pincode: String,
  payment: String,
  cartItems: Array,
  createdAt: Date,
});

export default mongoose.model("Address", addressSchema);
