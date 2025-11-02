// server/Routes/AddressRouter.js
import express from "express";
import Address from "../Models/AddressModel.js";


const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { address, payment, cart } = req.body;
    const newAddress = new Address({
      ...address,
      payment,
      cartItems: cart,
      createdAt: new Date(),
    });
    await newAddress.save();
    res.status(200).json({ message: "Address saved successfully!" });
  } catch (err) {
    console.error("Error saving address:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
