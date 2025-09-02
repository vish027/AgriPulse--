// src/pages/RecommendationsPage.jsx
import { useLocation, useNavigate } from "react-router-dom";

export default function RecommendationsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const soilInput = location.state?.soilInput || null;
  const results = location.state?.results || [];

  if (!results.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        <p>No recommendations yet. Please go back and enter values.</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
      style={{ backgroundImage: `url("/assets/bg.png")` }}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-5xl w-full mx-auto bg-black/40 p-8 rounded-2xl shadow-lg text-white">
          <h2 className="text-3xl font-bold mb-6 text-green-300 text-center">
            🌱 Top Recommended Crops
          </h2>

          {/* Soil Input */}
          {soilInput && (
            <div className="mb-8 bg-black/30 p-4 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-yellow-300 mb-2">
                🧪 Your Soil Data
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                {Object.entries(soilInput).map(([key, value]) => (
                  <div
                    key={key}
                    className="bg-black/50 px-3 py-2 rounded-lg shadow"
                  >
                    <span className="font-medium capitalize">{key}:</span>{" "}
                    <span className="text-green-300">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          <div className="space-y-6">
            {results.map((crop, idx) => (
              <div
                key={idx}
                className="relative flex flex-col sm:flex-row items-center gap-6 bg-black/50 p-5 rounded-xl shadow-md hover:scale-[1.02] transition"
              >
                {/* Rank Badge */}
                <div
                  className={`absolute top-3 left-3 px-3 py-1 rounded-full text-sm font-bold shadow-md ${
                    idx === 0
                      ? "bg-yellow-500 text-black" // 🏆 Gold for #1
                      : idx === 1
                      ? "bg-gray-300 text-black" // 🥈 Silver for #2
                      : "bg-amber-700 text-white" // 🥉 Bronze for #3
                  }`}
                >
                  #{idx + 1}
                </div>

                {/* Crop Image */}
                {console.log(crop)}
                <img
                  src={crop.crop.image}
                  alt={crop.crop.name}
                  className="w-32 h-32 object-cover rounded-lg border-2 border-green-400 shadow"
                />

                {/* Crop Details */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-green-300 z-10">
                    {crop.crop.name}{" "}
                    <span className="text-sm text-gray-300">
                      ({crop.score}% match)
                    </span>
                  </h3>
                  <p className="text-sm text-gray-200 mt-2 leading-relaxed">
                    {crop.reason}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Back Button */}
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/agriculture-website")}
              className="px-6 py-2 bg-green-500 text-white font-medium rounded-lg shadow-md hover:bg-green-600 transition transform hover:scale-105"
            >
              ⬅ Back to Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
