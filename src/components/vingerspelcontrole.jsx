import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useDarkMode } from "../context/Darkmode.jsx";
import HrlogoPause from "./hrlogo&pause.jsx";
import { letters } from "../letters";

function VingerspelControle() {
    const { letter } = useParams();
    const navigate = useNavigate();
    const { darkMode } = useDarkMode(); // Dark mode ophalen

    const handleNextLetter = () => {
        const currentIndex = letters.indexOf(letter);
        const nextLetter = letters[(currentIndex + 1) % letters.length];
        navigate(`/vingerspel/nieuweletter/${nextLetter}`);
    };

    return (
        <div className={darkMode ? "bg-backgroundDarkMode text-white" : "bg-background text-black"}>
            <HrlogoPause />
            <div className="mt-10">
                <h1 className={`text-3xl font-bold my-2 ml-[5%] ${darkMode ? 'text-white' : 'text-black'}`}>
                    Controleren: {letter}
                </h1>
                <p className={`text-base my-2 ml-[5%] ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                    Zie het gebaar hieronder. Ging het goed?
                </p>

                {/* Gebaar Weergave */}
                <div className={`flex flex-col items-center justify-center w-60 h-80 border-2 
                    rounded-lg font-bold text-2xl pb-3 mx-auto mt-8 ${
                    darkMode ? "border-gray-600 bg-gray-800" : "border-[#CF0245] bg-white"
                }`}
                >
                </div>

                {/* Keuze Knoppen */}
                <div className="flex justify-center mt-[10%] space-x-8">
                    <button
                        onClick={handleNextLetter}
                        className="w-24 h-24 text-4xl font-bold cursor-pointer bg-red-500 text-white
                        rounded-full flex items-center justify-center transition-transform hover:scale-110"
                    >
                        <span>✗</span>
                    </button>
                    <button
                        onClick={handleNextLetter}
                        className="w-24 h-24 text-4xl font-bold cursor-pointer bg-green-500 text-white
                        rounded-full flex items-center justify-center transition-transform hover:scale-110"
                    >
                        <span>✓</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VingerspelControle;
