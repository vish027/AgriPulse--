// src/pages/ProductList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../Components/ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products", { withCredentials: true });
        setProducts(res.data.products || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        🛍 Our Products
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-600">No products available yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
