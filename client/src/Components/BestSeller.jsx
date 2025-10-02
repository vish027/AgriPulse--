import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";

const BestSeller = () => {
  const { products } = useAppContext();

  return (
    <div className="mt-20 px-4 md:px-10 lg:px-16">
      {/* Heading with gradient underline */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 relative inline-block">
          Best Sellers
          <span className="absolute left-0 -bottom-2 w-full h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 rounded-full"></span>
        </h2>
        <p className="text-gray-500 mt-3 text-sm md:text-base">
          Discover our most popular picks loved by customers
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-8 mt-10">
        {products
          .filter((product) => product.inStock)
          .slice(0, 5)
          .map((product, index) => (
            <div
              key={index}
              className="transform transition duration-300 hover:scale-105 hover:shadow-lg rounded-2xl"
            >
              <ProductCard product={product} />
            </div>
          ))}
      </div>

     
    </div>
  );
};

export default BestSeller;
