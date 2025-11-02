import express from "express";
import multer from "multer";
import { addProduct, getProducts } from "../Controllers/ProductController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// ✅ allow 4 images
router.post("/add", upload.array("images", 4), addProduct);
router.get("/", getProducts);

export default router;
