// src/pages/RecommendationsPage.jsx
import { useLocation, useNavigate } from "react-router-dom";
// Import the image from the src/assets folder
import backgroundImage from "../assets/pred.png";

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
      className="min-h-screen px-4 sm:px-6 lg:px-8 bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay for background image darkening */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Main centering wrapper */}
      <div className="flex items-center justify-center min-h-screen relative z-10">
        <div
          className="max-w-5xl w-full mx-auto p-8 rounded-2xl shadow-2xl text-white"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
        >
          <h2 className="text-3xl font-bold mb-6 text-green-300 text-center">
            🌱 Top Recommended Crops
          </h2>

          {/* Soil Input Display */}
          {soilInput && (
            <div className="mb-8 bg-white/10 p-4 rounded-xl shadow-md">
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

          {/* --- MODIFICATION START --- */}

          {/* Images in a single horizontal line */}
          <div className="flex justify-center items-end flex-wrap gap-6 mb-8">
            {results.map((crop, idx) => (
              <div key={`img-${idx}`} className="flex flex-col items-center">
                <img
                  src={crop.crop.image}
                  alt={crop.crop.name}
                  className="w-32 h-32 object-cover rounded-full border-4 border-green-400 shadow-lg transform hover:scale-105 transition-transform duration-200"
                />
                {/* Optional: Add crop name below image if desired */}
                {/* <p className="text-sm mt-2 font-medium text-green-200">{crop.crop.name}</p> */}
              </div>
            ))}
          </div>

          {/* Details displayed below the image row, potentially in separate cards or a combined list */}
          <div className="space-y-6">
            {results.map((crop, idx) => (
              <div
                key={`detail-${idx}`}
                className="flex flex-col sm:flex-row items-center gap-6 bg-white/10 p-5 rounded-xl shadow-md hover:scale-[1.02] transition"
              >
                {/* No image here, just details */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-green-300 z-10">
                    {crop.crop.name}{" "}
                    <span className="text-sm text-gray-300">
                      ({crop.score.toFixed(2)}% match)
                    </span>
                  </h3>
                  <p className="text-sm text-gray-200 mt-2 leading-relaxed">
                    {crop.reason}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* --- MODIFICATION END --- */}

          {/* Back Button */}
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/agriculture-website")}
              className="px-6 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-xl transition transform hover:scale-[1.01]"
            >
              ⬅ Back to Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}