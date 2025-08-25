module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // fixed the double slash issue
  theme: {
    extend: {
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
      },
      animation: {
        "fade-slide": "fadeSlide 0.8s ease-out",
        "border-animate": "borderGlow 3s infinite ease-in-out",
        "float-slow": "floatSlow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
