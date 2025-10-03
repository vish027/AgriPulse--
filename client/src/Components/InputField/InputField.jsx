import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import ReactTooltip from "react-tooltip";

const InputField = ({ label, name, value, onChange, placeholder, infoText, ...rest }) => {
    
    // Determine tooltip ID and classes for input styling consistency
    const tooltipId = `tooltip-${name}`;

    return (
        <div className="mb-6"> {/* Increased bottom margin for better spacing */}
            <label className="block text-sm font-medium text-white mb-2 capitalize flex items-center">
                <span>{label}</span>
                
                {/* Info icon right next to label */}
                {infoText && (
                    <>
                        <AiOutlineInfoCircle
                            data-tip
                            data-for={tooltipId}
                            // 🌟 FIX: Change icon color to white/light gray for visibility against a dark form
                            className="text-gray-300 hover:text-white cursor-pointer ml-2 transition duration-150"
                            title={infoText} // Accessibility: add title attribute for hover text
                        />
                        {/* ReactTooltip (Note: Consider replacing this with a modern library or custom CSS) */}
                        <ReactTooltip 
                            id={tooltipId} 
                            place="right" 
                            effect="solid" 
                            className="text-sm px-3 py-1 opacity-100 !bg-gray-800 !text-white !rounded-md" // Custom styling for a modern look
                        >
                            {infoText}
                        </ReactTooltip>
                    </>
                )}
            </label>
            <input
                type="number"
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                // 🌟 Added dark theme input styling to match your PredictionForm
                className="w-full h-14 px-5 text-lg border border-gray-500 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-900/70 text-white"
                // Pass through any other props like min, max, step
                {...rest}
            />
        </div>
    );
};

export default InputField;