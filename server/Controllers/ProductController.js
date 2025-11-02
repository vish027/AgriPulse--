import Product from "../Models/ProductModel.js";

export const addProduct = async (req, res) => {
  try {
    // ✅ Safely map uploaded images
    const imageUrls = (req.files || []).map(
      (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    );

    const newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      offerPrice: req.body.offerPrice,
      images: imageUrls,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("❌ Error adding product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add product",
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};
