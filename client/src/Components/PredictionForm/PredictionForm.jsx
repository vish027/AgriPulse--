import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";

const predImage = "/src/assets/pred.png";

const PredictionForm = () => {
    const [formData, setFormData] = useState({
        nitrogen: "",
        phosphorus: "",
        potassium: "",
        ph: "",
        rainfall: "",
        temperature: "",
    });

    const [infoBox, setInfoBox] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value === "" ? "" : parseFloat(value),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const values = Object.values(formData);
        const isValid = values.every(val => val !== "" && !isNaN(val));

        if (!isValid) {
            alert("Please ensure all fields are filled with valid numbers.");
            return;
        }

        try {
            const response = await fetch("http://localhost:4000/api/soil", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                navigate("/recommendations", {
                    state: { soilInput: data.soilInput, results: data },
                });
            } else {
                alert(`Error submitting form`);
            }
        } catch (err) {
            alert("Failed to connect to server.");
        }
    };

    const InfoIcon = ({ text, id }) => (
        <span className="relative ml-2 cursor-pointer">
            <FaInfoCircle
                className="text-green-400 hover:text-green-300"
                onClick={() => setInfoBox(infoBox === id ? null : id)}
            />
            {infoBox === id && (
                <div className="absolute z-50 top-7 left-0 w-64 bg-black text-white text-sm p-3 rounded-lg shadow-lg border border-green-500">
                    {text}
                </div>
            )}
        </span>
    );

    return (
        <div
            className="h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative"
            style={{
                backgroundImage: `url(${predImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed"
            }}
        >
            <div className="absolute inset-0 bg-black opacity-40"></div>

            <div className="max-w-5xl w-full mx-auto relative z-10">
                <div className="rounded-2xl shadow-2xl overflow-hidden" style={{ backgroundColor: "rgba(0,0,0,0.8)" }}>

                    <div className="bg-green-700/80 p-6 text-center">
                        <h1 className="text-3xl font-bold text-white">
                            Crop Yield Prediction System
                        </h1>

                        <marquee className="mt-2 text-xl font-medium text-green-200">
                            Enter your soil conditions to get crop recommendations
                        </marquee>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 text-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            {/* Nitrogen */}
                            <div>
                                <label className="flex items-center text-lg font-semibold mb-1">
                                    Nitrogen (N) content
                                    <InfoIcon
                                        id="nitrogen"
                                        text="Enter nitrogen value in soil (important for leaf growth). Example: 50"
                                    />
                                </label>
                                <input
                                    type="number"
                                    name="nitrogen"
                                    value={formData.nitrogen}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 text-lg border border-gray-500 rounded-lg bg-gray-900/70 text-white"
                                    placeholder="e.g. 50"
                                    required
                                />
                            </div>

                            {/* Phosphorus */}
                            <div>
                                <label className="flex items-center text-lg font-semibold mb-1">
                                    Phosphorus (P) content
                                    <InfoIcon
                                        id="phosphorus"
                                        text="Helps in root growth and flowering. Example: 30"
                                    />
                                </label>
                                <input
                                    type="number"
                                    name="phosphorus"
                                    value={formData.phosphorus}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 text-lg border border-gray-500 rounded-lg bg-gray-900/70 text-white"
                                    placeholder="e.g. 30"
                                    required
                                />
                            </div>

                            {/* Potassium */}
                            <div>
                                <label className="flex items-center text-lg font-semibold mb-1">
                                    Potassium (K) content
                                    <InfoIcon
                                        id="potassium"
                                        text="Improves disease resistance and crop quality. Example: 40"
                                    />
                                </label>
                                <input
                                    type="number"
                                    name="potassium"
                                    value={formData.potassium}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 text-lg border border-gray-500 rounded-lg bg-gray-900/70 text-white"
                                    placeholder="e.g. 40"
                                    required
                                />
                            </div>

                            {/* pH */}
                            <div>
                                <label className="flex items-center text-lg font-semibold mb-1">
                                    Soil pH level
                                    <InfoIcon
                                        id="ph"
                                        text="Soil acidity or alkalinity (0–14). Ideal range: 5.5–7.5"
                                    />
                                </label>
                                <input
                                    type="number"
                                    name="ph"
                                    step="0.1"
                                    value={formData.ph}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 text-lg border border-gray-500 rounded-lg bg-gray-900/70 text-white"
                                    placeholder="e.g. 6.5"
                                    required
                                />
                            </div>

                            {/* Rainfall */}
                            <div>
                                <label className="flex items-center text-lg font-semibold mb-1">
                                    Annual Rainfall (mm)
                                    <InfoIcon
                                        id="rainfall"
                                        text="Total rainfall received yearly in mm. Example: 1200"
                                    />
                                </label>
                                <input
                                    type="number"
                                    name="rainfall"
                                    value={formData.rainfall}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 text-lg border border-gray-500 rounded-lg bg-gray-900/70 text-white"
                                    placeholder="e.g. 1200"
                                    required
                                />
                            </div>

                            {/* Temperature */}
                            <div>
                                <label className="flex items-center text-lg font-semibold mb-1">
                                    Average Temperature (°C)
                                    <InfoIcon
                                        id="temperature"
                                        text="Average temperature of the area. Example: 25°C"
                                    />
                                </label>
                                <input
                                    type="number"
                                    name="temperature"
                                    value={formData.temperature}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 text-lg border border-gray-500 rounded-lg bg-gray-900/70 text-white"
                                    placeholder="e.g. 25"
                                    required
                                />
                            </div>
                        </div>

                        <div className="pt-8">
                            <button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700 text-white text-lg font-bold py-4 px-6 rounded-lg transition duration-200 shadow-xl"
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
