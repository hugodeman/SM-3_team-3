import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useDarkMode } from "../context/Darkmode.jsx"; // Dark mode context importeren
import HrlogoPause from "./hrlogo&pause.jsx";

function VingerspelNieuweLetter() {
    const navigate = useNavigate();
    const { letter } = useParams();
    const { darkMode } = useDarkMode(); // Dark mode state ophalen

    const handleNextClick = () => {
        navigate(`/vingerspel/herhaling/${letter}`);
    };

    return (
        <div className={darkMode ? "bg-backgroundDarkMode text-white" : "bg-background text-black"}>
            <HrlogoPause />
            <div className="mt-10">
                <h1 className={`text-3xl font-bold my-2 ml-[5%] ${darkMode ? "text-white" : "text-black"}`}>
                    Nieuwe Letter: {letter}
                </h1>
                <p className={`text-base my-2 ml-[5%] ${darkMode ? "text-gray-300" : "text-gray-800"}`}>
                    Bekijk de video en voer het gebaar uit in Nederlandse Gebarentaal
                </p>

                {/* Video/Placeholder Box */}
                <div
                    className={`flex flex-col items-center justify-center w-60 h-80 border-2 rounded-lg font-bold text-2xl pb-3 mx-auto mt-8 transition-transform
                        ${darkMode
                        ? "border-gray-600 bg-gray-800 text-white"
                        : "border-[#CF0245] bg-white text-black"}`
                    }
                >
                    📹 Video hier
                </div>

                {/* Volgende knop */}
                <div className="flex justify-center mt-[10%]">
                    <button
                        onClick={handleNextClick}
                        className="w-72 px-4 py-3 text-2xl font-bold cursor-pointer bg-[#CF0245] text-white rounded-lg transition-transform hover:scale-105"
                    >
                        Volgende
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VingerspelNieuweLetter;
