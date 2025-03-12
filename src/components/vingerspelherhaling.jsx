import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import HrlogoPause from "./hrlogo&pause.jsx";
import { useDarkMode } from "../context/Darkmode.jsx";

function Vingerspelherhaling() {
    const navigate = useNavigate();
    const { letter } = useParams();
    const { darkMode } = useDarkMode();

    const handleShowAnswerClick = () => {
        navigate(`/vingerspel/controle/${letter}`);
    };

    return (
        <div className={`min-h-screen ${darkMode ? "bg-backgroundDarkMode text-white" : "bg-background text-black"}`}>
            <HrlogoPause/>
            <div className="mt-10">
                <h1 className={`text-3xl font-bold my-2 ml-[5%] ${darkMode ? "text-white" : "text-black"}`}>Herhaling: {letter}</h1>
                <p className={`text-base my-2 ml-[5%] ${darkMode ? "text-gray-300" : "text-gray-800"}`}>Gebaar de letter in Nederlandse Gebarentaal</p>

                <div
                    className={`flex flex-col items-center justify-center w-60 h-80 border-2 rounded-lg font-bold text-6xl pb-3 mx-auto mt-8 ${
                        darkMode ? "border-gray-600 bg-gray-700" : "border-[#CF0245] bg-white"
                    }`}>
                    {letter}
                </div>

                <div className="flex justify-center mt-[10%]">
                    <button
                        onClick={handleShowAnswerClick}
                        className="w-72 px-4 py-3 text-2xl font-bold cursor-pointer bg-[#CF0245] text-white rounded-lg">
                        Laat antwoord zien
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Vingerspelherhaling;