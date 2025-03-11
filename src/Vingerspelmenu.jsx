import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from './context/Darkmode.jsx'; // Import Dark Mode Context
import Navbar from "./components/navbar-mobile.jsx";
import Hrlogo from "./components/hrlogo.jsx";
import NavbarMobile from "./components/navbar-mobile.jsx";

function Vingerspelmenu() {
    const navigate = useNavigate();
    const { darkMode } = useDarkMode(); // Dark mode ophalen
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const [selectedLetter, setSelectedLetter] = useState(null);

    const handleLearnClick = () => {
        navigate('/vingerspel/nieuweletter/a');
    };

    const handleLetterClick = (letter) => {
        setSelectedLetter(letter);
    };

    const handleClosePopup = () => {
        setSelectedLetter(null);
    };

    return (
        <div className={darkMode ? "bg-backgroundDarkMode text-white" : "bg-background text-black"}>
            <Hrlogo />
            <div className="p-9 text-left">
                <h1 className={`text-3xl font-bold my-2 ml-[5%] ${darkMode ? 'text-white' : 'text-black'}`}>Vingerspel</h1>
                <p className={`text-base my-2 ml-[5%] ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                    Leer hier alle letters in Nederlandse Gebarentaal
                </p>

                {/* Leren Button */}
                <div className="flex justify-center mt-[10%]">
                    <button
                        onClick={handleLearnClick}
                        className="w-72 px-4 py-3 text-2xl font-bold cursor-pointer bg-[#CF0245] text-white rounded-lg transition-transform hover:scale-105"
                    >
                        Leren
                    </button>
                </div>

                {/* Letter Grid */}
                <div className="flex justify-center mt-8">
                    <div className="grid grid-cols-3 gap-8">
                        {alphabet.map((letter) => (
                            <div
                                key={letter}
                                onClick={() => handleLetterClick(letter)}
                                className={`flex flex-col items-center justify-center w-20 h-24 border-2 
                                    rounded-lg font-bold text-2xl pb-3 cursor-pointer transition-transform 
                                    hover:scale-105 ${
                                    darkMode
                                        ? "bg-gray-800 border-gray-600 text-white"
                                        : "bg-white border-[#CF0245] text-black"
                                }`}
                            >
                                {letter}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Pop-up bij klikken op een letter */}
            {selectedLetter && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className={`p-5 rounded-lg flex flex-col items-center ${
                        darkMode ? "bg-gray-800 text-white border border-gray-600" : "bg-white text-black"
                    }`}>
                        <h2 className="text-5xl font-bold">{selectedLetter}</h2>
                        <div className={`flex flex-col items-center justify-center w-60 h-80 border-2 
                            rounded-lg font-bold text-2xl pb-3 mx-auto mt-8 ${
                            darkMode ? "border-gray-600 bg-gray-700" : "border-[#CF0245] bg-white"
                        }`}
                        >
                            {/* Leeg vak */}
                        </div>
                        <button
                            onClick={handleClosePopup}
                            className="mt-4 px-4 py-2 bg-[#CF0245] text-white rounded-lg transition-transform hover:scale-105"
                        >
                            Sluiten
                        </button>
                    </div>
                </div>
            )}

            {!selectedLetter && <NavbarMobile />}
        </div>
    );
}

export default Vingerspelmenu;
