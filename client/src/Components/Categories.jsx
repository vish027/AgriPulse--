import React from "react";
import { categories } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-16 text-center px-4 md:px-10 lg:px-16">
      {/* Heading */}
      <p className="text-2xl md:text-3xl font-medium mb-8">Categories</p>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 
                      gap-8 justify-items-center"> {/* gap-6 adds uniform spacing */}
        {categories.map((category, index) => (
          <div
  key={index}
  className={`group cursor-pointer flex flex-col justify-center items-center 
              border border-black-800 hover:shadow-xl transition-all duration-300 
              rounded-xl w-full max-w-[200px] md:max-w-[220px] p-6
              ${index % 5 === 0 ? "bg-green-100" :
                index % 5 === 1 ? "bg-yellow-100" :
                index % 5 === 2 ? "bg-blue-100" :
                index % 5 === 3 ? "bg-pink-100" :
                "bg-purple-100"}`}

            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              window.scrollTo(0, 0);
            }}
          >
            <img
              src={category.image}
              alt={category.text}
              className="group-hover:scale-110 transition-transform duration-300 max-w-24 md:max-w-28"
            />
            <p className="text-sm md:text-base font-semibold mt-4 text-center">{category.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
