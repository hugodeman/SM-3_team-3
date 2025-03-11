import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "./components/navbar-mobile.jsx";
import Hrlogo from "./components/hrlogo.jsx";
import NavbarMobile from "./components/navbar-mobile.jsx";

function Vingerspelmenu() {
    const navigate = useNavigate();
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
        <div>
            <Hrlogo />
            <div className="p-9 text-left">
                <h1 className="text-3xl font-bold my-2 ml-[5%]">Vingerspel</h1>
                <p className="text-base my-2 ml-[5%]">Leer hier alle letters in Nederlandse Gebarentaal</p>
                <div className="flex justify-center mt-[10%]">
                    <button
                        onClick={handleLearnClick}
                        className="w-72 px-4 py-3 text-2xl font-bold cursor-pointer bg-[#CF0245] text-white rounded-lg"
                    >
                        Leren
                    </button>
                </div>
                <div className="flex justify-center mt-8">
                    <div className="grid grid-cols-3 gap-8">
                        {alphabet.map((letter) => (
                            <div
                                key={letter}
                                onClick={() => handleLetterClick(letter)}
                                className="flex flex-col items-center justify-center w-20 h-24 border-2 border-[#CF0245] bg-white rounded-lg font-bold text-2xl pb-3 cursor-pointer"
                            >
                                {letter}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {selectedLetter && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 rounded-lg flex flex-col items-center">
                        <h2 className="text-5xl font-bold">{selectedLetter}</h2>
                        <div className="flex flex-col items-center justify-center w-60 h-80 border-2 border-[#CF0245] rounded-lg font-bold text-2xl pb-3 mx-auto mt-8">
                            {/* Leeg vak */}
                        </div>
                        <button
                            onClick={handleClosePopup}
                            className="mt-4 px-4 py-2 bg-[#CF0245] text-white rounded-lg"
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