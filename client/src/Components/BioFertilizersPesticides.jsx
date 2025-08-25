import React from "react";
import { motion } from "framer-motion";
import { FiCircle } from "react-icons/fi";
import BioFertilizerImg from "../assets/bio-fertilizers.jpg"; // adjust path if needed

const sections = [
  {
    id: "intro",
    title: "Introduction to Bio-Fertilizers",
    content: (
      <>
        <p className="mb-4">
          <span className="font-semibold text-green-700">Bio-fertilizers</span>{" "}
          are living microorganisms that enhance soil fertility and promote
          plant growth by supplying essential nutrients naturally. Unlike
          chemical fertilizers, they are eco-friendly and sustainable.
        </p>
        <p>
          They play a crucial role in sustainable agriculture by reducing the
          dependency on synthetic inputs and improving soil health.
        </p>
      </>
    ),
  },
  {
    id: "types",
    title: "1. Types of Bio-Fertilizers",
    content: (
      <>
        <ul className="list-disc list-inside space-y-2 mb-3 text-green-800">
          <li>
            <strong>Rhizobium:</strong> Symbiotic bacteria that fix nitrogen in
            legumes.
          </li>
          <li>
            <strong>Azotobacter:</strong> Free-living nitrogen fixer suitable
            for cereals, vegetables, and cash crops.
          </li>
          <li>
            <strong>Azospirillum:</strong> Beneficial for grasses, millets, and
            sugarcane.
          </li>
          <li>
            <strong>Blue-Green Algae (Cyanobacteria):</strong> Improve soil
            fertility, especially in paddy fields.
          </li>
          <li>
            <strong>Phosphate-Solubilizing Microorganisms (PSM):</strong>{" "}
            Convert insoluble phosphorus into available forms.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "advantages",
    title: "2. Advantages of Bio-Fertilizers",
    content: (
      <>
        <p className="mb-2 font-semibold text-green-700">Key Benefits:</p>
        <ul className="list-disc list-inside space-y-2 text-green-800">
          <li>Improve soil fertility and maintain soil health.</li>
          <li>Provide nutrients naturally at low cost.</li>
          <li>Reduce dependency on chemical fertilizers.</li>
          <li>
            Increase crop yield and improve quality of produce sustainably.
          </li>
          <li>Eco-friendly and safe for the environment.</li>
        </ul>
      </>
    ),
  },
  {
    id: "applications",
    title: "3. Application of Bio-Fertilizers",
    content: (
      <>
        <p className="mb-2">
          Bio-fertilizers can be applied in different forms depending on crop
          and soil requirements:
        </p>
        <ul className="list-disc list-inside space-y-2 text-green-800">
          <li>
            <strong>Seed Treatment:</strong> Seeds coated with bio-fertilizer
            before sowing.
          </li>
          <li>
            <strong>Soil Application:</strong> Direct incorporation into the
            soil.
          </li>
          <li>
            <strong>Root Dipping:</strong> Seedlings dipped in bio-fertilizer
            solution before transplantation.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "future",
    title: "4. Future of Bio-Fertilizers",
    content: (
      <>
        <p>
          With increasing focus on sustainable farming, bio-fertilizers will
          play a vital role in ensuring food security, restoring soil health,
          and reducing environmental pollution. Integration of{" "}
          <span className="font-semibold text-green-700">
            bio-fertilizers with digital AgriTech
          </span>{" "}
          and smart farming practices will further enhance their adoption.
        </p>
      </>
    ),
  },
];

export default function BioFertilizersPesticides() {
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-green-50 via-green-100 to-green-200 text-green-900 px-6 py-16 max-w-7xl mx-auto flex flex-col md:flex-row gap-10"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* Left TOC for desktop */}
      <nav className="hidden md:flex flex-col sticky top-20 h-[80vh] overflow-auto w-52 pr-4 border-r border-green-300 bg-green-50/90 backdrop-blur-sm rounded-md shadow-sm">
        <h2 className="text-2xl font-extrabold mb-8 pt-2 pb-4 sticky top-0 bg-green-50/95 z-20 border-b border-green-300 drop-shadow-sm">
          Contents
        </h2>
        <ul className="space-y-4">
          {sections.map(({ id, title }) => (
            <li key={id} className="flex items-center gap-2">
              <FiCircle className="text-green-600 shrink-0" />
              <a
                href={`#${id}`}
                className="block text-green-700 font-semibold hover:text-green-900 hover:underline transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 rounded"
              >
                {title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main content */}
      <main className="flex-1 max-w-full overflow-x-hidden">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-extrabold mb-10 max-w-3xl mx-auto text-center md:text-left drop-shadow-md"
        >
          Bio-Fertilizers & Sustainable Farming
        </motion.h1>

        {/* Header Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-16 max-w-4xl mx-auto"
        >
          <img
            src={BioFertilizerImg}
            alt="Bio-Fertilizers"
            className="rounded-xl shadow-lg border border-green-200"
          />
        </motion.div>

        {sections.map(({ id, title, content }, i) => (
          <motion.section
            key={id}
            id={id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.25, duration: 0.8, ease: "easeOut" }}
            className="mb-16 max-w-4xl mx-auto px-6 py-8 bg-white rounded-xl shadow-lg border border-green-100"
          >
            <h2 className="text-3xl font-extrabold mb-6 border-l-6 border-green-600 pl-5 text-green-800 drop-shadow-sm">
              {title}
            </h2>
            <div className="prose prose-green prose-lg max-w-none">{content}</div>
          </motion.section>
        ))}
      </main>
    </div>
  );
}
