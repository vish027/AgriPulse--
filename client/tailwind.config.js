/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",                 // for Vite
    "./src/**/*.{js,jsx,ts,tsx}",   // all JS/TSX files
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0B3D20",
        secondary: "#6AB547",
        lightGreen: "#D1E7C2",
        darkGreen: "#02351b",
      },
      keyframes: {
        fadeSlide: {
          "0%": { opacity: 0, transform: "translateY(30px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        borderGlow: {
          "0%": { borderColor: "#22c55e" },
          "50%": { borderColor: "#166534" },
          "100%": { borderColor: "#22c55e" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        scaleUp: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
        fadeInOpacity: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        "fade-slide": "fadeSlide 0.8s ease-out forwards",
        "border-animate": "borderGlow 3s infinite ease-in-out",
        "float-slow": "floatSlow 4s ease-in-out infinite",
        "scale-up": "scaleUp 0.6s ease-in-out infinite",
        "fade-in": "fadeInOpacity 0.8s ease-in forwards",
      },
      spacing: {
        70: "17.5rem", // for your custom gap in Categories
      },
    },
  },
  plugins: [],
};
