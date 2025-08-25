// src/components/PlantDisease.js
import React from "react";
import { motion } from "framer-motion";
import plantImg from "../assets/plant.png";

export default function PlantDisease() {
  return (
    <div className="bg-gradient-to-b from-green-50 to-green-100 min-h-screen overflow-hidden">
      {/* Hero Section */}
      <div className="relative w-full h-[70vh] flex items-center justify-center">
        <img
          src={plantImg}
          alt="Plant Disease"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-green-900/40"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            🌿 Understanding Plant Diseases
          </h1>
          <p className="mt-4 text-lg md:text-xl text-green-100 max-w-2xl mx-auto">
            Protecting crops means understanding the threats they face — from tiny fungi to invisible bacteria.
          </p>
        </motion.div>
      </div>

      {/* Info Cards */}
      <div className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-3 gap-10">
        {[
          {
            title: "Causes of Plant Diseases",
            desc: "Plant diseases are caused by fungi, bacteria, viruses, nematodes, and environmental stress. Poor soil health, excessive watering, nutrient deficiencies, and pest infestations are major contributors.",
            color: "from-green-200 to-green-400",
          },
          {
            title: "Prevention is Better",
            desc: "Adopting practices like crop rotation, resistant seed varieties, timely irrigation, mulching, and integrated pest management (IPM) can significantly reduce the risk of infections.",
            color: "from-yellow-200 to-yellow-400",
          },
          {
            title: "Impact on Agriculture",
            desc: "Unchecked plant diseases can reduce yields by up to 50%, increase production costs, and threaten food security worldwide, especially in developing regions.",
            color: "from-red-200 to-red-400",
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className={`p-6 rounded-2xl shadow-lg bg-gradient-to-br ${card.color} text-green-900 relative`}
          >
            <h2 className="text-xl font-bold mb-3">{card.title}</h2>
            <p className="text-sm leading-relaxed">{card.desc}</p>
            <div className="absolute -top-4 -right-4 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow">
              🌱
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Info Section */}
      <div className="bg-green-50 py-12 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-green-800 mb-4">Common Plant Diseases</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Powdery Mildew:</strong> Fungal disease causing white spots on leaves.</li>
              <li><strong>Rust:</strong> Orange or brown pustules on leaves, reducing photosynthesis.</li>
              <li><strong>Late Blight:</strong> Caused by water mold, affects potatoes and tomatoes.</li>
              <li><strong>Bacterial Wilt:</strong> Blocks water transport, causing wilting and death.</li>
              <li><strong>Leaf Spot:</strong> Circular spots due to fungi or bacteria, weakening plants.</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-green-800 mb-4">Best Practices for Control</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Maintain optimal soil pH and nutrient balance.</li>
              <li>Remove and destroy infected plants promptly.</li>
              <li>Ensure proper air circulation between crops.</li>
              <li>Use organic and chemical treatments judiciously.</li>
              <li>Regularly monitor and inspect crops for early signs.</li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Closing Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center max-w-3xl mx-auto pb-20 px-6"
      >
        <h2 className="text-3xl font-extrabold text-green-800">
          Healthy Plants = Healthy Future
        </h2>
        <p className="mt-4 text-gray-700">
          By learning about plant diseases and preventing them early, we can ensure sustainable agriculture and food security for generations to come.
        </p>
      </motion.div>
    </div>
  );
}
