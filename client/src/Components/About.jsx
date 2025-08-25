import { motion } from "framer-motion";
import { FaLeaf, FaChartLine, FaUsers, FaLightbulb, FaHandsHelping } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // ✅ Import for navigation
import SeedsImage from "../assets/seeds.png";
import Seeds1Image from "../assets/seeds1.png";
import BackImage from "../assets/back.png"; // ✅ Import back button image

export default function AboutPage() {
  const navigate = useNavigate(); // ✅ Initialize navigation

  return (
    <div className="bg-[#f5fdf8] text-[#0b3d20] relative">
      
      {/* Back Button (Top Left) */}
      <div className="absolute top-4 left-4 z-20">
        <img
          src={BackImage}
          alt="Back"
          className="w-10 h-10 cursor-pointer hover:scale-110 transition-transform"
          onClick={() => navigate("/agriculture-website")} // ✅ Navigate back
        />
      </div>

      {/* Hero Section with Background */}
      <section className="relative h-[80vh] flex items-center justify-center text-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${SeedsImage})` }}
        ></div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 px-6">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold mb-6 text-white drop-shadow-lg"
          >
            About <span className="text-green-300">AgriPulse</span>
          </motion.h1>
          <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-100 drop-shadow-md">
            🌱 <span className="font-semibold">AgriPulse</span> is your farming
            companion — designed for <span className="font-bold">small-scale farmers</span>.  
            We blend <span className="text-green-300 font-semibold">AI, IoT, and traditional wisdom </span>  
            to empower agriculture with smart decisions, better yields, and sustainable growth. 🚀
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-semibold">Our Mission 🌍</h2>
            <p className="text-lg leading-relaxed">
              At <span className="font-bold text-green-700">AgriPlay</span>, our mission is to 
              <span className="font-semibold"> empower farmers</span> through
              smart technology, sustainable practices, and community-driven solutions.
              From <span className="text-green-700 font-semibold">crop rotation</span> to 
              <span className="text-green-700 font-semibold"> market access</span>, 
              we build tools that make agriculture smarter, easier, and more rewarding.
            </p>
          </motion.div>

          {/* Image */}
          <motion.img
            src={Seeds1Image}
            alt="Seeds"
            className="rounded-2xl shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-green-50">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
          
          {/* Crop Rotation */}
          <motion.div whileHover={{ scale: 1.1 }} className="flex flex-col items-center text-center">
            <div className="bg-green-100 p-6 rounded-full shadow-lg">
              <FaLeaf className="text-green-700 text-5xl" />
            </div>
            <h3 className="text-xl font-semibold mt-4">Crop Rotation</h3>
            <p className="mt-2 max-w-xs">
              Plan and manage crop cycles to maintain soil fertility and ensure sustainability.
            </p>
          </motion.div>

          {/* Yield Prediction */}
          <motion.div whileHover={{ scale: 1.1 }} className="flex flex-col items-center text-center">
            <div className="bg-green-100 p-6 rounded-full shadow-lg">
              <FaChartLine className="text-green-700 text-5xl" />
            </div>
            <h3 className="text-xl font-semibold mt-4">Yield Prediction</h3>
            <p className="mt-2 max-w-xs">
              AI-driven models predict crop yield, helping farmers make informed decisions.
            </p>
          </motion.div>

          {/* Direct Access */}
          <motion.div whileHover={{ scale: 1.1 }} className="flex flex-col items-center text-center">
            <div className="bg-green-100 p-6 rounded-full shadow-lg">
              <FaUsers className="text-green-700 text-5xl" />
            </div>
            <h3 className="text-xl font-semibold mt-4">Direct Access</h3>
            <p className="mt-2 max-w-xs">
              Farmers gain direct access to tools, markets, and insights, cutting out middlemen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Core Values 🌟</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-xl shadow-lg bg-white">
            <FaLightbulb className="text-green-700 text-5xl mx-auto mb-4" />
            <h3 className="font-semibold text-xl">Innovation</h3>
            <p className="mt-2">We believe in blending tradition with technology to empower farmers.</p>
          </div>
          <div className="p-6 rounded-xl shadow-lg bg-white">
            <FaHandsHelping className="text-green-700 text-5xl mx-auto mb-4" />
            <h3 className="font-semibold text-xl">Collaboration</h3>
            <p className="mt-2">We grow together by working with farmers, communities, and researchers.</p>
          </div>
          <div className="p-6 rounded-xl shadow-lg bg-white">
            <FaLeaf className="text-green-700 text-5xl mx-auto mb-4" />
            <h3 className="font-semibold text-xl">Sustainability</h3>
            <p className="mt-2">We aim for eco-friendly practices that preserve resources for the future.</p>
          </div>
        </div>
      </section>

      {/* Impact / Stats */}
      <section className="py-20 bg-green-100">
        <h2 className="text-3xl font-bold text-center mb-12">Our Impact 📊</h2>
        <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6 rounded-xl shadow-lg bg-white text-center">
            <h3 className="text-3xl font-bold text-green-700">10K+</h3>
            <p className="mt-2 text-lg">Farmers Reached</p>
          </div>
          <div className="p-6 rounded-xl shadow-lg bg-white text-center">
            <h3 className="text-3xl font-bold text-green-700">500+</h3>
            <p className="mt-2 text-lg">Communities Supported</p>
          </div>
          <div className="p-6 rounded-xl shadow-lg bg-white text-center">
            <h3 className="text-3xl font-bold text-green-700">95%</h3>
            <p className="mt-2 text-lg">Improved Productivity</p>
          </div>
        </div>
      </section>
    </div>
  );
}
