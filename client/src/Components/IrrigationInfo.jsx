import React, { useEffect } from "react"; // ⬅️ IMPORT useEffect
import { useLocation } from "react-router-dom"; // ⬅️ IMPORT useLocation (optional but good practice)

// Import images from assets folder
import irriImg from "../assets/irri.jpg";
import dripIrrigationImg from "../assets/drip-irrigation.jpg";
import sprinklerIrrigationImg from "../assets/sprinkler-irrigation.jpg";
import surfaceIrrigationImg from "../assets/surface-irrigation.jpg";
import subsurfaceIrrigationImg from "../assets/subsurface-irrigation.jpg";

export default function IrrigationInfo() {
  const location = useLocation(); // Initialize useLocation
  
  // 💡 FIX: Scroll the window to the top (0, 0) when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0); 
    // You can also use: window.scrollTo({ top: 0, behavior: 'smooth' }); 
  }, [location.pathname]); // Dependency on pathname ensures it runs when navigating back to this component
    
  const sections = [
    {
      title: "Efficient Irrigation Techniques for Sustainable Farming",
      description:
        "Proper irrigation is the backbone of productive agriculture. Using water efficiently not only maximizes crop yields but also conserves precious natural resources. Employing modern irrigation technologies helps farmers optimize water use, reduce costs, and promote environmental sustainability.",
      imgUrl: irriImg,
      imgAlt: "Irrigation system in a farm",
    },
    {
      title: "Drip Irrigation",
      description:
        "Delivers water directly to plant roots through a network of valves and tubes. This method reduces water wastage by minimizing evaporation and runoff. Drip irrigation is especially effective for row crops, orchards, and vineyards, promoting healthy plant growth while conserving water and fertilizer usage.",
      imgUrl: dripIrrigationImg,
      imgAlt: "Drip irrigation system",
    },
    {
      title: "Sprinkler Irrigation",
      description:
        "Sprays water in a controlled manner over the crops, simulating natural rainfall. It's effective for a variety of crops and soil types. Sprinkler systems can be fixed or portable and allow for uniform water distribution, reducing soil erosion and providing flexibility in water scheduling.",
      imgUrl: sprinklerIrrigationImg,
      imgAlt: "Sprinkler irrigation system",
    },
    {
      title: "Surface Irrigation",
      description:
        "Water flows over the soil by gravity. While simple and low cost, it requires proper leveling to avoid waterlogging and soil erosion. Types include furrow, basin, and border irrigation, suitable for flat terrains and crops like rice, wheat, and sugarcane.",
      imgUrl: surfaceIrrigationImg,
      imgAlt: "Surface irrigation field",
    },
    {
      title: "Subsurface Irrigation",
      description:
        "Involves burying pipes or tubes below the soil surface, delivering water directly to roots, reducing evaporation significantly. This technique enhances water efficiency and root zone moisture control, ideal for high-value crops and areas with water scarcity concerns.",
      imgUrl: subsurfaceIrrigationImg,
      imgAlt: "Subsurface irrigation pipes",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-300 via-green-100 to-green-50 py-16 px-6 md:px-16 lg:px-32 text-[#0B3D20] flex flex-col items-center">
      {/* Main Heading with glow + shine + underline */}
      <h1 className="text-5xl md:text-6xl font-extrabold mb-8 text-center tracking-wide leading-tight relative cursor-default select-none">
        Efficient Irrigation Techniques <br /> 
        <span className="text-green-900 underline decoration-green-700 decoration-4 underline-offset-8">
          for Sustainable Farming
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-green-400 via-green-200 to-green-400 opacity-30 blur-3xl rounded-lg -z-10 animate-glow"
        />
      </h1>

      {/* Intro paragraph about irrigation with subtle shadow */}
      <p className="max-w-3xl mb-16 text-lg md:text-xl leading-relaxed text-gray-700 text-center shadow-md px-4 py-6 rounded-lg bg-white/70 backdrop-blur-sm">
        Irrigation is a vital agricultural practice that involves supplying water to crops to help them grow optimally, especially in regions where rainfall is insufficient or irregular. By adopting efficient irrigation methods, farmers can enhance crop production, conserve water, and promote sustainable farming practices that protect the environment.
      </p>

      {/* Content Sections */}
      {sections.map((section, index) => {
        const isEven = index % 2 === 0;
        return (
          <section
            key={index}
            className={`flex flex-col md:flex-row items-center gap-12 mb-24 w-full max-w-6xl ${
              !isEven ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image with floating and hover zoom effect */}
            <div className="md:w-1/2 w-full rounded-3xl overflow-hidden shadow-2xl animate-floatSlow hover:scale-105 transition-transform duration-500 cursor-pointer">
              <img
                src={section.imgUrl}
                alt={section.imgAlt}
                className="w-full h-80 md:h-96 object-cover object-center rounded-3xl border-8 border-green-700 shadow-lg"
                loading="lazy"
              />
            </div>

            {/* Text content with fade-in and smooth scale on hover */}
            <div className="md:w-1/2 w-full animate-fadeIn px-4">
              {index !== 0 && (
                <h2 className="text-4xl font-extrabold mb-6 tracking-wide text-green-900 hover:text-green-700 transition-colors duration-300 cursor-default select-none">
                  {section.title}
                </h2>
              )}
              <p className="text-lg leading-relaxed text-gray-800 prose max-w-none hover:text-green-800 transition-colors duration-300">
                {section.description}
              </p>
            </div>
          </section>
        );
      })}

      {/* Extra info footer */}
      <p className="mt-20 max-w-4xl text-center text-sm text-green-900 opacity-80 italic">
        Sustainable irrigation practices conserve water, improve crop quality, and help build resilient farms. Explore our irrigation techniques and take a step towards a greener future!
      </p>

      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-floatSlow {
          animation: floatSlow 6s ease-in-out infinite;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1.2s ease forwards;
        }

        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 5px #34D399); }
          50% { filter: drop-shadow(0 0 15px #10B981); }
        }
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }

        .shine-border {
          position: relative;
          overflow: hidden;
          --shine-color: rgba(255,255,255,0.3);
        }
        .shine-border::before {
          content: '';
          position: absolute;
          top: 0; left: -75%;
          width: 50%;
          height: 100%;
          background: linear-gradient(120deg, transparent, var(--shine-color), transparent);
          transform: skewX(-20deg);
          animation: shine 2.5s infinite;
          pointer-events: none;
          z-index: 10;
        }
        @keyframes shine {
          0% { left: -75%; }
          100% { left: 125%; }
        }
      `}</style>
    </main>
  );
}