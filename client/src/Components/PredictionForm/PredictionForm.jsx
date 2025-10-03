// src/pages/PredictionForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// NOTE: Since I cannot access your assets folder, I'll use a placeholder variable. 
// Replace 'predImage' with the actual import if needed. 
const predImage = "/src/assets/pred.png"; // Placeholder for the actual image path/import

const PredictionForm = () => {
    const [formData, setFormData] = useState({
        nitrogen: "",
        phosphorus: "",
        potassium: "",
        ph: "",
        rainfall: "",
        temperature: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            // Convert to float, but keep empty string as is for controlled input
            [name]: value === "" ? "" : parseFloat(value),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting formData:", formData);

        // Basic validation to ensure all fields are filled and valid numbers
        const values = Object.values(formData);
        const isValid = values.every(val => val !== "" && !isNaN(val));

        if (!isValid) {
            alert("Please ensure all fields are filled with valid numbers.");
            return;
        }

        try {
            // Using fetch to communicate with the local backend
            const response = await fetch("http://localhost:4000/api/soil", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("✅ Server Response:", data);

                // Redirect and pass soilInput + results
                navigate("/recommendations", {
                    state: { soilInput: data.soilInput, results: data },
                });
            } else {
                console.error("❌ Server Error:", response.statusText);
                alert(`Error submitting form: ${response.statusText}`);
            }
        } catch (err) {
            console.error("❌ Request Failed:", err);
            alert("Failed to connect to server. Ensure the backend server is running on port 4000.");
        }
    };

    return (
        <div
            // 🌟 FIX: Use h-screen and flex-col to fill and manage viewport height
            className="h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative"
            style={{
                backgroundImage: `url(${predImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            {/* Semi-transparent black overlay for image lightening */}
            <div className="absolute inset-0 bg-black opacity-40"></div>

            {/* Content wrapper with relative Z-index */}
            <div className="max-w-5xl w-full mx-auto relative z-10">
                <div
                    className="rounded-2xl shadow-2xl overflow-hidden"
                    // Transparent box with black transparent background
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
                >
                    {/* Header */}
                    <div className="bg-green-700/80 p-6 text-center">
                        <h1 className="text-3xl font-bold text-white">
                            Crop Yield Prediction System
                        </h1>
                        
                        {/* MARQUEE EFFECT */}
                        <marquee 
                            className="mt-2 text-xl font-medium text-green-200" 
                            behavior="scroll" 
                            direction="left" 
                            scrollamount="6" 
                        >
                            Enter your soil conditions to get crop recommendations
                        </marquee>
                    </div>

                    {/* Form */}
                    {/* Adjusted padding slightly to fit better, p-8 is safer than p-10 */}
                    <form onSubmit={handleSubmit} className="p-8 text-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> {/* Reduced gap */}
                            
                            {/* Nitrogen */}
                            <div>
                                <label className="block text-white text-lg font-semibold mb-1">
                                    Nitrogen (N) content 
                                </label>
                                <input
                                    type="number"
                                    name="nitrogen"
                                    value={formData.nitrogen}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 text-lg border border-gray-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-900/70 text-white"
                                    placeholder="e.g. 50"
                                    required
                                />
                            </div>

                            {/* Phosphorus */}
                            <div>
                                <label className="block text-white text-lg font-semibold mb-1">
                                    Phosphorus (P) content
                                </label>
                                <input
                                    type="number"
                                    name="phosphorus"
                                    value={formData.phosphorus}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 text-lg border border-gray-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-900/70 text-white"
                                    placeholder="e.g. 30"
                                    required
                                />
                            </div>

                            {/* Potassium */}
                            <div>
                                <label className="block text-white text-lg font-semibold mb-1">
                                    Potassium (K) content 
                                </label>
                                <input
                                    type="number"
                                    name="potassium"
                                    value={formData.potassium}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 text-lg border border-gray-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-900/70 text-white"
                                    placeholder="e.g. 40"
                                    required
                                />
                            </div>

                            {/* Soil pH */}
                            <div>
                                <label className="block text-white text-lg font-semibold mb-1">
                                    Soil pH level
                                </label>
                                <input
                                    type="number"
                                    name="ph"
                                    value={formData.ph}
                                    onChange={handleChange}
                                    min="0"
                                    max="14"
                                    step="0.1"
                                    className="w-full px-4 py-3 text-lg border border-gray-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-900/70 text-white"
                                    placeholder="e.g. 6.5"
                                    required
                                />
                            </div>

                            {/* Rainfall */}
                            <div>
                                <label className="block text-white text-lg font-semibold mb-1">
                                    Annual Rainfall (mm)
                                </label>
                                <input
                                    type="number"
                                    name="rainfall"
                                    value={formData.rainfall}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 text-lg border border-gray-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-900/70 text-white"
                                    placeholder="e.g. 1200"
                                    required
                                />
                            </div>

                            {/* Temperature */}
                            <div>
                                <label className="block text-white text-lg font-semibold mb-1">
                                    Average Temperature (°C)
                                </label>
                                <input
                                    type="number"
                                    name="temperature"
                                    value={formData.temperature}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 text-lg border border-gray-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-900/70 text-white"
                                    placeholder="e.g. 25"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-8"> {/* Reduced top padding */}
                            <button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700 text-white text-lg font-bold py-4 px-6 rounded-lg transition duration-200 shadow-xl transform hover:scale-[1.01]"
                            >
                                Predict Crop Recommendation 🌿
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PredictionForm;