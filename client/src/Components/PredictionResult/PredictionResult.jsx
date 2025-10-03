import React from 'react';
import { useLocation, useNavigate } from "react-router-dom"; 
import CropCard from "../CropCard/CropCard";
 // ⚠️ Ensure this path is correct!

const PredictionResult = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const resultsData = location.state?.results;
    const rawResults = Array.isArray(resultsData) ? resultsData : (resultsData?.results || []);

    if (rawResults.length === 0) {
        return (
            <div 
                className="h-screen flex items-center justify-center relative"
                style={{
                    backgroundImage: `url(${predImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed'
                }}>
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="text-center p-8 bg-black/80 rounded-xl shadow-2xl relative z-10">
                    <p className="text-xl text-gray-300 mb-6">No recommendations found. Please try submitting valid data.</p>
                    <button
                        onClick={() => navigate("/")}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition"
                    >
                        Back to Form
                    </button>
                </div>
            </div>
        );
    }

    // --- Data Processing and Formatting ---
    const safeResults = rawResults.map((res) => {
        let score = res.score ?? res.confidence ?? 0;
        let cropName = res.name ?? res.crop?.name ?? 'Unknown Crop';
        let cropImage = res.image ?? res.crop?.image ?? null;

        // 🎯 FIX: Apply formatting to exactly 2 decimal places (e.g., 0.9444 -> 94.44)
        const formattedScore = parseFloat(score * 100).toFixed(2);
        
        return { 
            crop: { 
                name: cropName, 
                image: cropImage
            }, 
            score: `${formattedScore}%`, // Score sent as "XX.XX%"
            rawScore: score
        };
    });
    
    // Sort and limit to top 3
    safeResults.sort((a, b) => b.rawScore - a.rawScore);
    const topThreeResults = safeResults.slice(0, 3);

    return (
        <div 
            className="h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative"
            style={{
                
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            <div className="absolute inset-0 bg-black opacity-40"></div>
            
            <div className="relative z-10 w-full max-w-lg mx-auto">
                
                <h2 className="text-3xl font-extrabold text-white mb-8 text-center drop-shadow-lg">
                    Top Recommended Crops
                </h2>
                
                {/* Vertical Layout of Crop Cards */}
                <div className="flex flex-col items-center space-y-4">
                    {topThreeResults.map((result) => (
                        <CropCard
                            key={result.crop.name}
                            crop={result.crop}
                            score={result.score} 
                            // 🎯 FIX: The 'rank' prop is OMITTED. This removes the #1, #2 badge.
                            className="w-full" 
                        />
                    ))} 
                </div>

                {/* Back to Form Button */}
                <div className="mt-8 text-center">
                    <button
                        onClick={() => navigate("/")}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition shadow-xl"
                    >
                        &larr; Back to Form
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PredictionResult;