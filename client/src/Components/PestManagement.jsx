// src/components/PestManagementControl.js
import React from "react";
import { motion } from "framer-motion";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import pestImage from "../assets/pest-control.jpg";
import cropImage from "../assets/crop-protection.jpg";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function PestManagementControl() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  // Updated labels & green bar color
  const pestData = {
   labels: ["Vegetables", "Fruits", "Grains", "Herbs", "Legumes"],

    datasets: [
      {
        label: "Yield Loss (%) due to Pests",
        data: [20, 15, 18, 25, 10],
        backgroundColor: "rgba(34, 197, 94, 0.7)", // green shade
        borderRadius: 8
      }
    ]
  };

  const pestOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Pest Impact on Fruits & Vegetables" }
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-100 via-green-50 to-white text-gray-900 px-6 py-16 overflow-x-hidden">
      {/* Title Section */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold text-green-900">Pest Management & Control</h1>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          Pests can severely damage crops, reduce yields, and threaten food security. 
          This page explains easy, eco-friendly ways to protect crops and ensure sustainable farming.
        </p>
      </motion.section>

      {/* Image and Content */}
      <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        <motion.img
          src={pestImage}
          alt="Pest Control"
          className="rounded-3xl shadow-lg w-full h-[350px] object-cover"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          className="space-y-4"
        >
          <h2 className="text-3xl font-semibold text-green-800">Eco-Friendly Pest Control Methods</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>Biological Control:</strong> Using natural predators like ladybugs to control pests.</li>
            <li><strong>Neem Extract:</strong> Organic spray to repel harmful insects.</li>
            <li><strong>Crop Rotation:</strong> Changing crops to break pest life cycles.</li>
            <li><strong>Trap Crops:</strong> Growing plants that attract pests away from main crops.</li>
          </ul>
        </motion.div>
      </div>

      {/* Chart Section */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        className="mt-20 max-w-5xl mx-auto"
      >
        <h2 className="text-3xl font-semibold text-center text-green-800 mb-6">
          Pest Impact Statistics
        </h2>
        <Bar data={pestData} options={pestOptions} />
      </motion.section>

      {/* Extra Image & Tips */}
      <motion.section
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-20 grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto"
      >
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-green-800">Quick Pest Management Tips</h2>
          <p className="text-gray-700">
            Preventing pest outbreaks is better than controlling them later. 
            Here are some quick tips farmers can follow to protect crops year-round.
          </p>
          <ul className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Inspect crops regularly for early signs of pests.</li>
            <li>Use pheromone traps to monitor pest activity.</li>
            <li>Encourage beneficial insects in your fields.</li>
            <li>Reduce pesticide use to maintain ecological balance.</li>
          </ul>
        </div>

        <img
          src={cropImage}
          alt="Crop Protection"
          className="rounded-3xl shadow-lg w-full h-[350px] object-cover"
        />
      </motion.section>
    </main>
  );
}
