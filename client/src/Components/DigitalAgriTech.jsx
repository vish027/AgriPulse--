import React from "react";
import { motion } from "framer-motion";
import { FiCircle } from "react-icons/fi";

const sections = [
  {
    id: "intro",
    title: "Digital AgriTech: Transforming Agriculture in India",
    content: (
      <>
        <p className="mb-4">
          Digital agriculture technology, or{" "}
          <span className="font-semibold text-green-700">"AgriTech"</span>, is
          revolutionizing the farming sector in India, leveraging advanced
          technologies to enhance productivity, efficiency, and sustainability.
        </p>
        <p>Here's how digital AgriTech is impacting Indian agriculture:</p>
      </>
    ),
  },
  {
    id: "precision-farming",
    title: "1. Precision Farming and Resource Optimization",
    content: (
      <>
        <p className="mb-3">
          <strong>Definition:</strong> Precision farming uses technology like
          GPS, sensors, drones, and data analytics to optimize farming
          practices by applying inputs (water, fertilizers, pesticides) based
          on the specific needs of different sections of land, minimizing waste
          and improving efficiency.
        </p>
        <p className="mb-2 font-semibold underline text-green-700">Technologies:</p>
        <ul className="list-disc list-inside space-y-1 mb-3 text-green-800">
          <li>
            <strong>GPS and GIS Mapping:</strong> Accurately map fields,
            monitor machinery movement, and track input application, according
            to Farmonaut.
          </li>
          <li>
            <strong>IoT and Soil Sensors:</strong> Measure soil moisture,
            temperature, and nutrient levels in real-time for optimized
            irrigation and fertilizer application.
          </li>
          <li>
            <strong>Remote Sensing and Drones:</strong> Capture field
            conditions, detect crop health issues, pest infestations, and
            stress, enabling timely interventions.
          </li>
          <li>
            <strong>Variable Rate Technology (VRT):</strong> Automates the
            application of materials like fertilizers, pesticides, and seeds,
            adjusting the rate based on soil type and other field variations.
          </li>
        </ul>
        <p className="font-semibold text-green-700">Benefits:</p>
        <p>
          Increased yields, reduced input costs, minimized environmental impact,
          and improved soil health.
        </p>
      </>
    ),
  },
  {
    id: "data-ai",
    title: "2. Data Analytics and Artificial Intelligence",
    content: (
      <>
        <p className="mb-2">
          <strong>Role:</strong> AI and data analytics are crucial for making
          informed decisions by processing vast amounts of agricultural data.
        </p>
        <p className="mb-2 font-semibold underline text-green-700">Applications:</p>
        <ul className="list-disc list-inside space-y-1 mb-3 text-green-800">
          <li>
            <strong>Predictive Analytics:</strong> Analyze weather data, soil
            information, and crop performance to predict yields, pest outbreaks,
            and disease.
          </li>
          <li>
            <strong>Real-time Advisory:</strong> Generate actionable
            recommendations on optimal planting times, irrigation schedules,
            and nutrient management.
          </li>
          <li>
            <strong>Automated Decision-making:</strong> AI algorithms can
            optimize resource allocation and automate certain farming
            operations.
          </li>
        </ul>
        <p className="font-semibold text-green-700">Benefits:</p>
        <p>
          Enhanced decision-making, improved risk management, higher
          productivity, and reduced losses.
        </p>
      </>
    ),
  },
  {
    id: "digital-platforms",
    title: "3. Digital Platforms for Market Access and Advisory",
    content: (
      <>
        <p className="mb-2">
          Various platforms bridge information gaps and empower farmers with
          market access and financial inclusion.
        </p>
        <ul className="list-disc list-inside space-y-1 mb-3 text-green-800">
          <li>
            <strong>SMS Advisory Services:</strong> Deliver real-time info on
            weather, market prices, pest warnings, and crop management tips
            directly to farmers' phones.
          </li>
          <li>
            <strong>Mobile Apps:</strong> Provide crop calendars, soil health
            analysis, pest ID, and virtual marketplaces.
          </li>
          <li>
            <strong>Kisan Credit Card (Digital KCC):</strong> Easy credit
            access, flexible repayment, integrated with mobile banking for
            cashless transactions.
          </li>
          <li>
            <strong>Crop Price Info Systems:</strong> Real-time price updates,
            forecasts, storage, and transport info.
          </li>
        </ul>
        <p className="font-semibold text-green-700">Benefits:</p>
        <p>
          Bridging info gaps, empowering farmers with market access, improving
          financial inclusion, and reducing intermediaries.
        </p>
      </>
    ),
  },
  {
    id: "blockchain",
    title: "4. Blockchain Technology",
    content: (
      <>
        <p className="mb-2">
          <strong>Role:</strong> Enhances transparency, trust, and efficiency
          in agricultural value chains by providing secure transactions and
          traceability from farm to market.
        </p>
        <p className="font-semibold text-green-700">Benefits:</p>
        <p>
          Ensures food safety and quality, reduces intermediaries, promotes fair
          trading practices, and aids verified origin certification.
        </p>
      </>
    ),
  },
  {
    id: "challenges-government",
    title: "Challenges and Government Initiatives",
    content: (
      <>
        <p className="mb-3">
          Challenges like high costs, limited digital literacy, connectivity
          issues, and data security hinder adoption.
        </p>
        <p className="mb-2 font-semibold underline text-green-700">
          Government Initiatives:
        </p>
        <ul className="list-disc list-inside space-y-1 mb-3 text-green-800">
          <li>
            <strong>Digital Agriculture Mission:</strong> Supports DPI creation,
            crop estimation surveys, IT initiatives.
          </li>
          <li>
            <strong>AgriStack:</strong> Farmer-centric digital infrastructure
            with registries and geo-mapped data.
          </li>
          <li>
            <strong>Precision Farming Development Centers (PFDCs):</strong>{" "}
            Regional research and technology dissemination.
          </li>
          <li>
            <strong>Financial Support:</strong> Agriculture Infrastructure Fund
            for smart and precision agri projects.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "future",
    title: "The Future of Digital Agriculture",
    content: (
      <>
        <p>
          Driven by AI, 5G, automation, and biotech, digital agriculture will
          empower faster decisions and ensure food security. The rise of
          AgriTech startups, affordable devices, and farmer-focused innovation
          are key to overcoming challenges.
        </p>
        <p className="mt-3 font-semibold text-green-700">
          In essence, digital AgriTech is moving India towards a precise,
          efficient, and sustainable agriculture model.
        </p>
      </>
    ),
  },
];

export default function Digital() {
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
          className="text-4xl md:text-5xl font-extrabold mb-16 max-w-3xl mx-auto text-center md:text-left drop-shadow-md"
        >
          Digital AgriTech: Transforming Agriculture in India
        </motion.h1>

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
