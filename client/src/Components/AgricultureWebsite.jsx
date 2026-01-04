import React, { useState, useEffect } from "react";
import {
  FaWarehouse,
  FaSeedling,
  FaChartBar,
  FaBoxOpen,
  FaWater,
  FaBug,
  FaLeaf,
  FaSprayCan,
  FaHeartbeat,
  FaWifi,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaSignInAlt,
  FaSignOutAlt
} from "react-icons/fa";

import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom"; 
import { useTranslation } from "react-i18next";

import logo from "../assets/logo.png";
import leafImage from "../assets/leaf.png";

import irrigationImg from "../assets/irrigation.jpg";
import droneImg from "../assets/drone.jpg";
import digitalAgriImg from "../assets/digital-agri.jpg";
import pestControlImg from "../assets/pest-control.jpg";
import bioFertilizersImg from "../assets/bio-fertilizers.jpg";
import plantDiseasesImg from "../assets/plant-diseases.jpg";

import "../App.css";

// --- DATA ARRAYS ---
const cardsData = [
  { title: "smartStorage", description: "AI-monitored storage to preserve grain quality.", icon: <FaWarehouse size={40} className="text-white" />, link:"/smart" },
  { title: "cropRotation", description: "Boost soil health and maximize yields sustainably.", icon: <FaSeedling size={40} className="text-white" />, link: "http://127.0.0.1:5000/" },
  { title: "yieldPrediction", description: "Predict harvests with AI-powered analytics.", icon: <FaChartBar size={40} className="text-white" />, link:"/prediction" },
  { title: "directMarket", description: "Eco-friendly solutions for long-lasting freshness.", icon: <FaBoxOpen size={40} className="text-white" />, link:"/shop" }
];

const sustainableBoxesWithIcons = [
  { icon: "🌱", title: "protectResources", description: "Conserve water, maintain soil health, and safeguard biodiversity for future generations." },
  { icon: "♻️", title: "minimizeImpact", description: "Reduce chemical usage and greenhouse gas emissions to create a healthier planet." },
  { icon: "📈", title: "productivity", description: "Adopt practices that improve soil fertility and ensure sustainable yields over time." }
];

const exploreMoreBoxes = [
  { title: "irrigation", description: "Efficient water management techniques that enhance crop growth and conserve water.", icon: <FaWater size={28} className="text-[#0B3D20]" />, image: irrigationImg },
  { title: "droneTech", description: "Use of drones for crop monitoring, spraying, and precision agriculture.", icon: <FaLeaf size={28} className="text-[#0B3D20]" />, image: droneImg },
  { title: "digitalAgriTech", description: "Implementing digital tools and apps to optimize farm management and yield.", icon: <FaWifi size={28} className="text-[#0B3D20]" />, image: digitalAgriImg },
  { title: "pestManagement", description: "Integrated pest management practices to reduce chemical use and protect crops.", icon: <FaBug size={28} className="text-[#0B3D20]" />, image: pestControlImg },
  { title: "bioFertilizers", description: "Natural alternatives to chemical fertilizers and pesticides for sustainable farming.", icon: <FaSprayCan size={28} className="text-[#0B3D20]" />, image: bioFertilizersImg },
  { title: "plantDiseases", description: "Identification and management of common plant diseases to maintain crop health.", icon: <FaHeartbeat size={28} className="text-[#0B3D20]" />, image: plantDiseasesImg }
];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (customDelay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: customDelay, duration: 0.6, ease: "easeOut" }
  })
};

const FAQSection = ({ handleRestrictedAction }) => {
  const { t } = useTranslation();
  
  const faqs = [
    { question: "What is sustainable farming?", answer: "Sustainable farming involves methods that protect the environment, public health, human communities, and animal welfare while producing sufficient food." },
    { question: "How does crop rotation benefit the soil?", answer: "Crop rotation helps improve soil fertility and reduces soil erosion by alternating crops with different nutrient needs and pest resistances." },
    { question: "What are bio-fertilizers?", answer: "Bio-fertilizers are natural fertilizers containing living microorganisms that enhance nutrient availability and promote healthy plant growth." },
    { question: "How can drones improve farming?", answer: "Drones assist in crop monitoring, spraying pesticides or fertilizers precisely, and collecting data to optimize farm management." },
    { question: "Why is pest management important in agriculture?", answer: "Effective pest management protects crops from damage while minimizing chemical usage, helping maintain ecosystem balance and food safety." }
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => setOpenIndex(prev => (prev === index ? null : index));

  return (
    <section id="faq" className="bg-[#D1E7C2] py-16 px-6 w-full">
      <h2 className="text-3xl font-bold mb-8 text-center text-[#0B3D20] max-w-4xl mx-auto">
        {t("faq")}
      </h2>

      <div className="space-y-4 max-w-4xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-black rounded-lg overflow-hidden bg-white">
            <button
              className="w-full flex justify-between items-center px-6 py-4 text-left text-[#0B3D20] font-semibold text-lg"
              onClick={(e) => {
                handleRestrictedAction(e);
                if (e.defaultPrevented) return;
                toggleFAQ(index);
              }}
            >
              <span>{faq.question}</span>
              <span className={`text-2xl font-bold ${openIndex === index ? "rotate-45" : ""}`}>+</span>
            </button>

            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={
                openIndex === index
                  ? { height: "auto", opacity: 1, marginTop: "0.5rem" }
                  : { height: 0, opacity: 0, marginTop: 0 }
              }
              transition={{ duration: 0.3 }}
              className="px-6 pb-4 text-[#0B3D20] overflow-hidden"
            >
              <p>{faq.answer}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default function AgricultureWebsite() {
  const { t, i18n } = useTranslation();

  const [activeIndex, setActiveIndex] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const location = useLocation(); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location.pathname]);

  const handleRestrictedAction = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      alert("Please log in to access this feature.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    alert("You have been logged out.");
  };

  return (
    <div className="min-h-screen bg-[#0B3D20] flex flex-col relative">

      {/* Navbar */}
<nav className="bg-[#02351b] p-4 shadow-lg flex items-center justify-between">

  {/* Logo */}
  <div className="flex items-center space-x-3">
    <img src={logo} alt="Logo" className="w-14 h-14 object-contain" />
  </div>

  {/* Navbar Items */}
  <ul className="flex space-x-6 text-[#eefcf4] font-medium items-center">

    {/* ABOUT */}
    <li className="hover:underline cursor-pointer">
      <Link to="/about">{t("about")}</Link>
    </li>

    {/* LANGUAGE SWITCH (close to About, NO SPACE) */}
    <li className="flex gap-1 items-center">
      <button
        onClick={() => i18n.changeLanguage("en")}
        className="px-2 py-1 bg-[#6AB547] text-[#0B3D20] rounded"
      >
        EN
      </button>
      <button
        onClick={() => i18n.changeLanguage("kn")}
        className="px-2 py-1 bg-[#6AB547] text-[#0B3D20] rounded"
      >
        KN
      </button>
    </li>

    {/* OTHER NAV ITEMS */}
    <li
      className="hover:underline cursor-pointer"
      onClick={() => scrollToSection("sustainability")}
    >
      {t("sustainability")}
    </li>

    <li
      className="hover:underline cursor-pointer"
      onClick={() => scrollToSection("explore-more")}
    >
      {t("exploreMore")}
    </li>

    <li
      className="hover:underline cursor-pointer"
      onClick={() => scrollToSection("contact")}
    >
      {t("contact")}
    </li>

    {/* LOGIN / LOGOUT */}
    <li>
      {!isLoggedIn ? (
        <Link
          to="/login"
          className="ml-2 px-4 py-2 bg-[#6AB547] text-[#0B3D20] font-bold rounded-full hover:bg-white transition-colors flex items-center space-x-2"
        >
          <FaSignInAlt />
          <span>{t("login")}</span>
        </Link>
      ) : (
        <button
          onClick={handleLogout}
          className="ml-2 px-4 py-2 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-colors flex items-center space-x-2"
        >
          <FaSignOutAlt />
          <span>{t("logout")}</span>
        </button>
      )}
    </li>

  </ul>
</nav>


      {/* HERO SECTION */}
      <section className="text-center py-16 bg-[#E6F0DB] text-[#0B3D20]">
        <h2 className="text-4xl font-bold mb-4">{t("heroTitle")}</h2>
        <p className="text-lg max-w-2xl mx-auto">{t("heroSubtitle")}</p>
      </section>

      {/* THE REST OF YOUR COMPONENT CONTINUES... */}
      {/* Cards Section */}
      <div className="relative p-6 grid grid-cols-1 sm:grid-cols-2 gap-8 place-items-center">
        {cardsData.map((card, index) => {
          const cardContent = (
            <div
              className="w-full max-w-[380px] min-h-[180px] p-6 border-2 border-white/60 rounded-xl text-center shadow-lg 
                         bg-white/10 backdrop-blur-sm transition-colors duration-300 opacity-80 animate-floatSlow
                         hover:border-white cursor-pointer shine-border"
              style={{ animationDelay: `${index * 0.4}s` }}
            >
              <div className="mb-4">{card.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {t(card.title)}
              </h3>
              <p className="text-white/80">{card.description}</p>
            </div>
          );

          return card.link ? (
            <Link
              key={index}
              to={card.link}
              className="w-full flex justify-center"
              onClick={handleRestrictedAction}
            >
              {cardContent}
            </Link>
          ) : (
            <div key={index} className="w-full flex justify-center">
              {cardContent}
            </div>
          );
        })}

        {/* Center Leaf Image */}
        <img
          src={leafImage}
          alt="Leaf Icon"
          className="absolute w-56 h-56 border-4 border-black rounded-full shadow-2xl glow-center"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      {/* Sustainability Section */}
      <motion.section
        id="sustainability"
        className="bg-[#D1E7C2] text-[#0B3D20] py-16 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUpVariant}
      >
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {t("sustainability")}
          </h2>
          <p className="text-lg">
            <strong>Sustainable farming</strong> protects ecosystems and promotes long-term agricultural health.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {sustainableBoxesWithIcons.map((box, i) => (
            <motion.div
              key={i}
              className="group [perspective:1000px] w-full h-60"
              onClick={handleRestrictedAction}
              variants={fadeUpVariant}
            >
              <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                
                {/* FRONT */}
                <div className="absolute inset-0 bg-white rounded-lg shadow-md flex flex-col items-center justify-center border border-black [backface-visibility:hidden]">
                  <div className="text-5xl mb-3">{box.icon}</div>
                  <h3 className="text-lg font-semibold text-[#0B3D20]">
                    {t(box.title)}
                  </h3>
                  <div className="mt-2 text-gray-500">▼</div>
                </div>

                {/* BACK */}
                <div className="absolute inset-0 bg-green-600 text-white rounded-lg p-6 flex items-center justify-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <p>{box.description}</p>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Explore More Section */}
      <motion.section
        id="explore-more"
        className="bg-[#02351b] text-[#eefcf4] py-20 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUpVariant}
      >
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-2 tracking-wide">
            {t("exploreIdeas")}
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-[#A3C293] italic">
            {t("exploreIdeasSubtitle")}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto px-4">
          {exploreMoreBoxes.map((box, i) => {
            const path =
  box.title === "pestManagement"
    ? "/pest-mgt"
    : box.title === "digitalAgriTech"
    ? "/digital-agri-tech"
    : box.title === "bioFertilizers"
    ? "/bio-fertilizers-and-pesticides"
    : box.title === "droneTech"
    ? "/drone-technology"
    : box.title === "plantDiseases"
    ? "/diseases-of-plants"
    : "/" + box.title.toLowerCase();


            return (
              <motion.div
                key={i}
                className={`rounded-xl p-6 shadow-md cursor-pointer relative
                           w-full sm:w-[45%] md:w-[30%]
                           transition-shadow duration-300 border border-black`}
                style={{ backgroundColor: "rgba(163, 194, 147, 0.85)" }}
                variants={fadeUpVariant}
              >
                <Link to={path} className="w-full h-full block" onClick={handleRestrictedAction}>
                  <img
                    src={box.image}
                    alt={box.title}
                    className="w-full h-40 object-cover rounded-md mb-4 border border-black"
                  />
                  <div className="flex items-center gap-3">
                    {box.icon}
                    <h3 className="text-2xl font-semibold text-[#0B3D20]">
                      {t(box.title)}
                    </h3>
                  </div>

                  <p className="mt-2 text-[#0B3D20] text-base">
                    {box.description}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* FAQ Section */}
      <FAQSection handleRestrictedAction={handleRestrictedAction} />

      {/* Contact Form Section */}
      <section className="bg-[#0B3D20] text-white py-16 px-6 flex justify-center">
        <div className="w-full max-w-lg bg-[#0f4727] p-8 rounded-2xl shadow-2xl border border-white/20">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#6AB547]">
            {t("letsTalk")}
          </h2>

          <form action="https://formspree.io/f/manbgypp" method="POST" className="space-y-5">
            <input type="text" name="name" placeholder={t("yourName")} required className="w-full px-4 py-3 bg-[#1a5a35] text-white rounded-xl" />
            <input type="email" name="email" placeholder={t("yourEmail")} required className="w-full px-4 py-3 bg-[#1a5a35] text-white rounded-xl" />
            <textarea name="message" rows="5" placeholder={t("yourMessage")} required className="w-full px-4 py-3 bg-[#1a5a35] text-white rounded-xl"></textarea>

            <button type="submit" className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl">
              📩 {t("sendMessage")}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#02351b] text-[#eefcf4] mt-12 px-8 py-10 flex flex-col md:flex-row md:justify-between md:items-center">

        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 mb-6 md:mb-0">
          <a href="#about" className="hover:text-[#6AB547]">{t("footerAbout")}</a>
          <a href="#privacy" className="hover:text-[#6AB547]">{t("footerPrivacy")}</a>
          <a href="#contact" className="hover:text-[#6AB547]">{t("footerContact")}</a>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} Agriculture Co. {t("rightsReserved")}</p>
          
          <div className="flex gap-5 text-lg">
            <FaFacebookF onClick={() => window.open("https://facebook.com", "_blank")} />
            <FaTwitter onClick={() => window.open("https://twitter.com", "_blank")} />
            <FaInstagram onClick={() => window.open("https://instagram.com", "_blank")} />
            <FaLinkedinIn onClick={() => window.open("https://linkedin.com", "_blank")} />
          </div>
        </div>

        <div className="bg-white p-1 rounded-full">
  <img
    src={logo}
    alt="Agriculture Logo"
    className="h-14 w-14 object-contain rounded-full"
  />
</div>


      </footer>

    </div>
  );
}
