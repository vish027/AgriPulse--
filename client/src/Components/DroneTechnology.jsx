// src/components/DroneTechnology.js
import React from "react";
import { motion } from "framer-motion";
import sprayImg from "../assets/spray.png"; // left image
import sprayImg1 from "../assets/spray1.jpg"; // right image

const features = [
  {
    icon: "🍃",
    title: "Crop Health Monitoring",
    desc: "Multispectral sensors detect crop stress, diseases, and nutrient deficiencies early.",
  },
  {
    icon: "⚡",
    title: "Efficient Spraying",
    desc: "Targeted spraying reduces chemical use and environmental impact.",
  },
  {
    icon: "📈",
    title: "Data Analytics",
    desc: "AI algorithms analyze data for predictive insights on yield and pest outbreaks.",
  },
  {
    icon: "🌱",
    title: "Soil & Field Mapping",
    desc: "Detailed maps optimize planting patterns and irrigation planning.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, rotateY: 90 },
  visible: { opacity: 1, rotateY: 0, transition: { duration: 0.6, ease: "easeOut" } },
  hover: { scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.15)" },
};

const advantages = [
  "Avoid Chemical Overuse",
  "Prepare for weather glitches",
  "Crop Spraying",
  "Geo Fencing",
  "Crop Monitoring",
  "Monitor Growth",
  "Plantation",
  "Soil and field analysis",
  "Livestock Management",
  "Check Crop Health",
];

const colors = [
  "bg-red-700",
  "bg-sky-400",
  "bg-red-600",
  "bg-indigo-700",
  "bg-emerald-500",
  "bg-sky-400",
  "bg-emerald-600",
  "bg-orange-600",
  "bg-yellow-600",
  "bg-violet-600",
];

const useCases = [
  {
    icon: "💧",
    title: "Precision Spraying in Vineyards",
    desc: "Apply pesticides and fertilizers accurately to reduce waste and improve crop yield.",
  },
  {
    icon: "🐛",
    title: "Pest Detection in Rice Fields",
    desc: "Early identification of pest infestations helps minimize damage and increase productivity.",
  },
  {
    icon: "📊",
    title: "Crop Yield Forecasting",
    desc: "Analyze aerial data to predict harvest size and optimize resource allocation.",
  },
  {
    icon: "🐄",
    title: "Livestock Tracking in Ranches",
    desc: "Monitor livestock locations and health with aerial surveillance for better farm management.",
  },
];

export default function DroneTechnology() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-green-50 via-green-100 to-green-200 text-green-900 flex flex-col items-center py-20 px-6 overflow-x-hidden relative">
      {/* Left oval image container */}
      <div className="absolute top-10 left-10 w-52 h-52 bg-black rounded-full shadow-lg flex items-center justify-center overflow-hidden z-20 border-4 border-green-800">
        <img src={sprayImg} alt="Spray Drone" className="w-full h-full object-cover" />
      </div>

      {/* Right oval image container */}
      <div className="absolute top-10 right-10 w-52 h-52 bg-black rounded-full shadow-lg flex items-center justify-center overflow-hidden z-20">
        <img src={sprayImg1} alt="Spray Drone 1" className="w-full h-full object-cover" />
      </div>

      <main className="max-w-6xl w-full mx-auto flex flex-col items-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl font-extrabold mb-12 text-center tracking-tight leading-tight max-w-4xl"
        >
          Revolutionizing Agriculture with <span className="text-green-700">Drone Technology</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-lg md:text-xl max-w-3xl mb-16 text-center text-green-800 tracking-wide leading-relaxed"
        >
          Drones are transforming farming into a precise, data-driven science. They provide real-time aerial
          insights that empower farmers to monitor crop health at a granular level, apply treatments exactly where
          needed, and conserve resources effectively.
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full max-w-6xl"
        >
          {features.map(({ icon, title, desc }, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover="hover"
              className="bg-white rounded-3xl p-8 shadow-lg cursor-pointer text-center flex flex-col items-center text-green-900 border-2 border-black"
              style={{ perspective: 1000 }}
            >
              <div className="text-6xl mb-5 select-none">{icon}</div>
              <h3 className="text-2xl font-bold mb-3">{title}</h3>
              <p className="text-md leading-relaxed text-green-700">{desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-center text-4xl font-extrabold mt-20 mb-12 text-green-900"
        >
          Drone Use Advantages in Agriculture
        </motion.h2>

        <DroneAdvantages />

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="w-full max-w-4xl mt-16 mb-20 px-6"
        >
          <h2 className="text-4xl font-extrabold mb-8 text-center text-green-900">
            Some Real-World Applications of Agricultural Drones
          </h2>

          <div className="flex flex-col gap-6">
            {useCases.map(({ icon, title, desc }, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02, boxShadow: "0 8px 18px rgba(0,0,0,0.18)" }}
                className="bg-white rounded-3xl p-6 shadow-lg cursor-pointer flex items-center text-green-900 border-2 border-black"
              >
                <div className="text-7xl mr-6 select-none">{icon}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-1">{title}</h3>
                  <p className="text-md leading-relaxed text-green-700">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Summary Section */}
       <motion.section
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.7, duration: 0.8 }}
  className="w-full mt-16 mb-20 px-6 text-center"
>
  <h2 className="text-4xl font-extrabold mb-6 text-green-900">Summary</h2>
  <p className="text-lg md:text-xl text-green-800 leading-relaxed">
    Drone technology is revolutionizing modern agriculture by providing precise, real-time insights that
    improve crop health monitoring, optimize resource use, and boost farm productivity. From efficient spraying
    to livestock tracking, drones empower farmers to adopt sustainable and data-driven practices, leading to
    better yields and environmental conservation.
  </p>
</motion.section>

      </main>
    </div>
  );
}

// ========== DroneAdvantages Component ==========
export function DroneAdvantages() {
  const containerSize = 480;
  const center = containerSize / 2;

  const centerRadius = 80;
  const bubbleRadius = 72;
  const ringRadius = centerRadius + bubbleRadius + 80;

  function getBubblePos(index, total) {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    const x = center + ringRadius * Math.cos(angle);
    const y = center + ringRadius * Math.sin(angle);
    return { x, y };
  }

  function getLineStyle(pos) {
    const dx = pos.x - center;
    const dy = pos.y - center;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const lineLength = dist - centerRadius - bubbleRadius;
    const angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
    const startX = center + centerRadius * Math.cos(Math.atan2(dy, dx));
    const startY = center + centerRadius * Math.sin(Math.atan2(dy, dx));
    return {
      position: "absolute",
      top: `${startY}px`,
      left: `${startX}px`,
      width: "2px",
      height: `${lineLength}px`,
      backgroundColor: "transparent",
      borderLeft: "2px dotted gray",
      transformOrigin: "top center",
      transform: `rotate(${angleDeg}deg)`,
      zIndex: 0,
    };
  }

  return (
    <div
      className="relative mx-auto my-24"
      style={{ width: containerSize, height: containerSize, position: "relative" }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute bg-black text-white rounded-full w-40 h-40 flex items-center justify-center text-center font-semibold text-lg p-4 shadow-xl z-10 border-2 border-black"
        style={{ top: center - centerRadius, left: center - centerRadius }}
      >
        Drone Use <br /> Advantages <br /> in Agriculture
      </motion.div>

      {advantages.map((text, i) => {
        const pos = getBubblePos(i, advantages.length);

        return (
          <React.Fragment key={i}>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              style={getLineStyle(pos)}
            />

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 * i, duration: 0.6, ease: "easeOut" }}
              className={`${colors[i]} absolute rounded-full p-4 w-36 h-36 flex items-center justify-center text-white text-center font-medium text-sm shadow-lg cursor-default border-2 border-black`}
              style={{
                top: pos.y - bubbleRadius,
                left: pos.x - bubbleRadius,
              }}
              title={text}
            >
              {text}
            </motion.div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
