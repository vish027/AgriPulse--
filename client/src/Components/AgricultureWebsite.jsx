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
  FaSignInAlt, // Added for Login Icon
  FaSignOutAlt, // Added for Logout Icon
} from "react-icons/fa";

import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom"; 

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
  { title: "Smart Storage", description: "AI-monitored storage to preserve grain quality.", icon: <FaWarehouse size={40} className="text-white" />, link:"/smart", },
  { title: "Crop Rotation", description: "Boost soil health and maximize yields sustainably.", icon: <FaSeedling size={40} className="text-white" />, link: "https://chat-1-4bgv.onrender.com/", },
  { title: "Yield Prediction", description: "Predict harvests with AI-powered analytics.", icon: <FaChartBar size={40} className="text-white" />, link:"/prediction", },
  { title: "Direct Access to Market", description: "Eco-friendly solutions for long-lasting freshness.", icon: <FaBoxOpen size={40} className="text-white" />, link:"/home", },
];

const sustainableBoxesWithIcons = [
  { icon: "🌱", title: "Protect Natural Resources", description: "Conserve water, maintain soil health, and safeguard biodiversity for future generations.", },
  { icon: "♻️", title: "Minimize Environmental Impact", description: "Reduce chemical usage and greenhouse gas emissions to create a healthier planet.", },
  { icon: "📈", title: "Enhance Long-Term Productivity", description: "Adopt practices that improve soil fertility and ensure sustainable yields over time.", },
];

const exploreMoreBoxes = [
  { title: "Irrigation", description: "Efficient water management techniques that enhance crop growth and conserve water.", icon: <FaWater size={28} className="text-[#0B3D20]" />, image: irrigationImg, },
  { title: "Drone Technology", description: "Use of drones for crop monitoring, spraying, and precision agriculture.", icon: <FaLeaf size={28} className="text-[#0B3D20]" />, image: droneImg, },
  { title: "Digital Agri Tech", description: "Implementing digital tools and apps to optimize farm management and yield.", icon: <FaWifi size={28} className="text-[#0B3D20]" />, image: digitalAgriImg, },
  { title: "Pest Mgt Control", description: "Integrated pest management practices to reduce chemical use and protect crops.", icon: <FaBug size={28} className="text-[#0B3D20]" />, image: pestControlImg, },
  { title: "Bio Fertilizers and Pesticides", description: "Natural alternatives to chemical fertilizers and pesticides for sustainable farming.", icon: <FaSprayCan size={28} className="text-[#0B3D20]" />, image: bioFertilizersImg, },
  { title: "Diseases of Plants", description: "Identification and management of common plant diseases to maintain crop health.", icon: <FaHeartbeat size={28} className="text-[#0B3D20]" />, image: plantDiseasesImg, },
];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (customDelay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: customDelay, duration: 0.6, ease: "easeOut" },
  }),
};

const FAQSection = ({ handleRestrictedAction }) => {
  const faqs = [
    { question: "What is sustainable farming?", answer: "Sustainable farming involves methods that protect the environment, public health, human communities, and animal welfare while producing sufficient food.", },
    { question: "How does crop rotation benefit the soil?", answer: "Crop rotation helps improve soil fertility and reduces soil erosion by alternating crops with different nutrient needs and pest resistances.", },
    { question: "What are bio-fertilizers?", answer: "Bio-fertilizers are natural fertilizers containing living microorganisms that enhance nutrient availability and promote healthy plant growth.", },
    { question: "How can drones improve farming?", answer: "Drones assist in crop monitoring, spraying pesticides or fertilizers precisely, and collecting data to optimize farm management.", },
    { question: "Why is pest management important in agriculture?", answer: "Effective pest management protects crops from damage while minimizing chemical usage, helping maintain ecosystem balance and food safety.", },
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="bg-[#D1E7C2] py-16 px-6 w-full">
      <h2 className="text-3xl font-bold mb-8 text-center text-[#0B3D20] max-w-4xl mx-auto">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4 max-w-4xl mx-auto">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-black rounded-lg overflow-hidden bg-white"
            // Apply restriction to the FAQ button, not the wrapper div
          >
            <button
              className="w-full flex justify-between items-center px-6 py-4 text-left text-[#0B3D20] font-semibold text-lg focus:outline-none"
              onClick={(e) => { 
                handleRestrictedAction(e); // Check login first
                if (e.defaultPrevented) return; // If blocked, stop here
                toggleFAQ(index); 
            }}
            >
              <span>{faq.question}</span>
              <span
                className={`text-2xl font-bold transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-45" : "rotate-0"
                }`}
                aria-hidden="true"
              >
                +
              </span>
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
  const [activeIndex, setActiveIndex] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const location = useLocation(); 

  // --- CRITICAL FIX: Ensures state is synced with localStorage on navigation ---
  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);

    // Check for authentication token set by Login.jsx
    const token = localStorage.getItem('token');
    if (token) {
        setIsLoggedIn(true);
    } else {
        setIsLoggedIn(false);
    }
  }, [location.pathname]);

  // --- LOGIN RESTRICTION HANDLER ---
  const handleRestrictedAction = (e) => {
      if (!isLoggedIn) {
          e.preventDefault(); // Stop the navigation/action
          alert("Please log in to access this feature.");
      }
      // If isLoggedIn is TRUE, the function does nothing and the default action proceeds.
  };

  // Handler for logout: clear token and update state
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token
    setIsLoggedIn(false); // Update state
    alert("You have been logged out.");
  };


  const handleMouseEnter = (index) => setActiveIndex(index);
  const handleMouseLeave = () => setActiveIndex(null);
  const handleTouch = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const scrollToSection = (id) => {
    // Check login only for restricted sections
    if (!isLoggedIn && id !== 'contact' && id !== 'about') {
      alert("Please log in to view site features.");
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B3D20] flex flex-col relative overflow-hidden">
      {/* Navbar */}
      <nav className="bg-[#02351b] p-4 shadow-lg flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="w-14 h-14 object-contain" />
        </div>
        <ul className="flex space-x-6 text-[#eefcf4] font-medium items-center">
          <li className="hover:underline cursor-pointer">
            <Link to="/about">About</Link>
          </li>
          <li
            className="hover:underline cursor-pointer"
            onClick={() => scrollToSection("sustainability")}
          >
            Sustainability
          </li>
          <li
            className="hover:underline cursor-pointer"
            onClick={() => scrollToSection("explore-more")}
          >
            Explore more
          </li>
          <li
            className="hover:underline cursor-pointer"
            onClick={() => scrollToSection("contact")}
          >
            Contact
          </li>
          
          {/* LOGIN/LOGOUT Button */}
          <li>
            {!isLoggedIn ? (
              <Link
                to="/login"
                className="ml-4 px-4 py-2 bg-[#6AB547] text-[#0B3D20] font-bold rounded-full hover:bg-white transition-colors flex items-center space-x-2"
              >
                <FaSignInAlt />
                <span>Login</span>
              </Link>
            ) : (
              <button 
                onClick={handleLogout} 
                className="ml-4 px-4 py-2 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-colors flex items-center space-x-2"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            )}
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section id="about" className="text-center py-16 bg-[#E6F0DB] text-[#0B3D20]">
        <h2 className="text-4xl font-bold mb-4">
          Farming with Heart and Technology in Harmony
        </h2>
        <p className="text-lg max-w-2xl mx-auto">
          Cultivating the future of farming through AI and sustainable
          practices.
        </p>
      </section>

      {/* Cards + Center Image (Restricted Links) */}
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
                {card.title}
              </h3>
              <p className="text-white/80">{card.description}</p>
            </div>
          );

          return card.link ? (
            <Link
              key={index}
              to={card.link} 
              className="w-full flex justify-center"
              onClick={handleRestrictedAction} // Apply restriction to navigation
            >
              {cardContent}
            </Link>
          ) : (
            <div key={index} className="w-full flex justify-center">
              {cardContent}
            </div>
          );
        })}

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

      {/* Sustainable Farming Section (Restricted Interaction) */}
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
            Why Sustainable Farming Solutions Matter
          </h2>
          <p className="text-lg leading-relaxed">
            <strong>Sustainable farming practices</strong> highlight the
            essential function of eco-friendly food production in protecting our
            ecosystems. In contrast, established agricultural practices often
            contribute to the unsustainable depletion of natural resources,
            leading to issues such as soil erosion, overconsumption of water,
            and reliance on chemical fertilizers and pesticides.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {sustainableBoxesWithIcons.map((box, i) => (
            <motion.div
              key={i}
              className="group [perspective:1000px] w-full h-60"
              variants={fadeUpVariant}
              onClick={handleRestrictedAction} // Keep restriction on box click/flip
            >
              <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front Side */}
                <div className="absolute inset-0 bg-white rounded-lg shadow-md flex flex-col items-center justify-center border border-black [backface-visibility:hidden]">
                  <div className="text-5xl mb-3">{box.icon}</div>
                  <h3 className="text-lg font-semibold text-[#0B3D20]">
                    {box.title}
                  </h3>
                  <div className="mt-2 text-gray-500">▼</div>
                </div>
                {/* Back Side */}
                <div className="absolute inset-0 bg-green-600 text-white rounded-lg p-6 flex items-center justify-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <p>{box.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Explore More Ideas Section (Restricted Links) */}
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
            Explore More Ideas
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-[#A3C293] italic">
            Discover innovative agricultural techniques and tools for
            sustainable farming.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto px-4">
          {exploreMoreBoxes.map((box, i) => {
            const path =
              box.title === "Digital Agri Tech"
                ? "/digital-agri-tech"
                : box.title === "Bio Fertilizers and Pesticides"
                ? "/bio-fertilizers-and-pesticides"
                : "/" + box.title.toLowerCase().replace(/\s+/g, "-");

            return (
              <motion.div
                key={i}
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={handleMouseLeave}
                onTouchStart={() => handleTouch(i)}
                className={`rounded-xl p-6 shadow-md cursor-pointer relative
                  w-full sm:w-[45%] md:w-[30%]
                  transition-shadow duration-300 flex flex-col items-start gap-3
                  border border-black
                  ${activeIndex === i ? "shadow-2xl border-2 border-[#6AB547]" : ""}`}
                style={{
                  backgroundColor: "rgba(163, 194, 147, 0.85)",
                }}
                variants={fadeUpVariant}
              >
                <Link to={path} className="w-full h-full block" onClick={handleRestrictedAction}> {/* Apply restriction to navigation */}
                  <img
                    src={box.image}
                    alt={box.title}
                    className="w-full h-40 object-cover rounded-md mb-4 border border-black"
                    loading="lazy"
                  />
                  <div className="flex items-center gap-3">
                    {box.icon}
                    <h3
                      className={`text-2xl font-semibold text-[#0B3D20]
                        border-b-4 border-transparent transition-colors duration-300 ${
                          activeIndex === i ? "border-[#6AB547]" : "hover:border-[#6AB547]"
                        }`}
                    >
                      {box.title}
                    </h3>
                  </div>
                  <p
                    className={`mt-2 text-[#0B3D20] text-base leading-relaxed transition-opacity duration-500 ${
                      activeIndex === i ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                  >
                    {box.description}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* FAQ Section (Restricted Interaction) */}
      <FAQSection handleRestrictedAction={handleRestrictedAction} />

      {/* Contact Form Section (Restricted Submission) */}
      <section
        id="contact-form"
        className="bg-[#0B3D20] text-white py-16 px-6 flex justify-center items-center"
      >
        <div className="w-full max-w-lg bg-[#0f4727] p-8 rounded-2xl shadow-2xl border border-white/20">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#6AB547]">
            Let's Talk
          </h2>
          <form
            action="https://formspree.io/f/manbgypp"
            method="POST"
            className="space-y-5"
            onSubmit={handleRestrictedAction} // Apply restriction to form submission
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full px-4 py-3 bg-[#1a5a35] text-white rounded-xl border border-white/20 focus:ring-2 focus:ring-[#6AB547] outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full px-4 py-3 bg-[#1a5a35] text-white rounded-xl border border-white/20 focus:ring-2 focus:ring-[#6AB547] outline-none"
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              required
              className="w-full px-4 py-3 bg-[#1a5a35] text-white rounded-xl border border-white/20 focus:ring-2 focus:ring-[#6AB547] outline-none resize-none"
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl shadow-md text-white font-semibold hover:opacity-90 transition"
            >
              📩 Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="bg-[#02351b] text-[#eefcf4] mt-12 px-8 py-10 flex flex-col md:flex-row md:justify-between md:items-center"
      >
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 mb-6 md:mb-0">
          <a href="#about" className="hover:text-[#6AB547] font-semibold">
            About
          </a>
          <a href="#privacy" className="hover:text-[#6AB547] font-semibold">
            Privacy
          </a>
          <a href="#contact" className="hover:text-[#6AB547] font-semibold">
            Contact
          </a>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} Agriculture Co. All rights reserved.</p>
          <div className="flex gap-5 text-lg">
            <button onClick={() => window.open("https://facebook.com", "_blank")}>
              <FaFacebookF />
            </button>
            <button onClick={() => window.open("https://twitter.com", "_blank")}>
              <FaTwitter />
            </button>
            <button onClick={() => window.open("https://instagram.com", "_blank")}>
              <FaInstagram />
            </button>
            <button onClick={() => window.open("https://linkedin.com", "_blank")}>
              <FaLinkedinIn />
            </button>
          </div>
        </div>
        <div className="flex justify-center md:justify-end mt-6 md:mt-0">
          <img
            src={logo}
            alt="Agriculture Logo"
            className="h-16 w-16 object-contain border-2 border-white rounded-full"
          />
        </div>
      </footer>
    </div>
  );
}