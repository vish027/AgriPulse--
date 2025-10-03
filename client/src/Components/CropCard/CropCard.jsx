// src/CropCard/CropCard.jsx (or correct path)
import React from 'react';

const CropCard = ({ crop, score }) => {
    // The 'rank' prop MUST NOT be used here.
    const cardBgColor = 'bg-gray-700'; 

    return (
        <div 
            className={`flex items-center w-full p-4 rounded-lg shadow-xl ${cardBgColor} text-white transition-transform hover:scale-[1.01]`}
        >
            {/* Rank badge is removed */}

            {/* Image Section */}
            <div className="flex-shrink-0 w-24 h-24 mr-4 rounded-lg overflow-hidden border-2 border-green-500/50">
                <img
                    src={crop.image} 
                    alt={crop.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Text Content */}
            <div className="flex-grow">
                {/* Score is fixed to 2 decimals and rank badge is gone. */}
                <p className="text-2xl font-semibold">{crop.name}</p>
                
                {/* Displays the clean string, e.g., (94.44% match) */}
                <p className="text-lg font-medium text-green-300 mt-1">
                    ({score} match) 
                </p>
            </div>
        </div>
    );
};

export default CropCard;