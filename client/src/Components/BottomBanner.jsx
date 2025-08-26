import React from "react";
import { assets, features } from "../assets/assets";

const BottomBanner = () => {
  return (
    <section className="relative mt-24">
      {/* Background Images */}
      <img
        src={assets.bottom_banner_image}
        alt="Agriculture Banner"
        className="w-full hidden md:block"
      />
      <img
        src={assets.bottom_banner_image_sm}
        alt="Agriculture Banner"
        className="w-full md:hidden"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-24">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-primary mb-6">
            Why We Are the Best?
          </h1>
          {features.map((feature) => (
            <div
              key={feature.id || feature.title} // Use unique id or fallback to title
              className="flex items-center gap-4 mt-2"
            >
              <img
                src={feature.icon}
                alt={feature.title || "Feature Icon"}
                className="md:w-11 w-9"
              />
              <div>
                <h3 className="text-lg md:text-xl font-semibold">
                  {feature.title}
                </h3>
                <p className="text-gray-500/70 text-xs md:text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BottomBanner;
