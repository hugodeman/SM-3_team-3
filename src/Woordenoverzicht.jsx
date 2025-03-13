import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarMobile from './components/navbar-mobile.jsx';
import HrLogo from './components/hrlogo.jsx';

function Woordenoverzicht() {
    const [activePopUp, setActivePopUp] = useState(null);

    // Hook to handle navigation
    const navigate = useNavigate();

    // Functions to open/close pop-ups
    const openPopUp = (buttonName) => setActivePopUp(buttonName);
    const closePopUp = () => setActivePopUp(null);

    return (
        <div className="h-[85vh]">
            {/* Back Arrow */}
            <button
                //navigate -> lessonId
                onClick={() => navigate('/lesstof')} // Navigate to the previous page
                className="absolute top-9 left-4" // Positioning styles
            >
                <img
                    src="/src/assets/Icons/Back arrow.png" // Update the path to your back arrow image
                    alt="Back Arrow"
                    className="h-6 w-auto" // Adjust size as needed
                />
            </button>

            <div>
                <h1 className="text-3xl font-bold mb-4 ml-8 space-y-4">Gebaren</h1>
                <h2 className="text-xl font-bold mb-10 ml-8">Vraagwoorden</h2>
            </div>
            <div className="flex flex-col w-2/3 mx-auto mt-10">
                {/* Buttons with pop-up triggers */}
                <button
                    className="bg-customRed hover:bg-customRedHover font-bold mb-6 py-4 px-10 text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl"
                    onClick={() => openPopUp('algemeen')}
                >
                    Algemeen Vraaggebaar
                </button>
                <button
                    className="bg-customRed hover:bg-customRedHover font-bold mb-6 py-4 px-10 text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl"
                    onClick={() => openPopUp('hoe')}
                >
                    Hoe
                </button>
                <button
                    className="bg-customRed hover:bg-customRedHover font-bold mb-6 py-4 px-10 text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl"
                    onClick={() => openPopUp('hoeveel')}
                >
                    Hoeveel
                </button>
                <button
                    className="bg-customRed hover:bg-customRedHover font-bold mb-6 py-4 px-10 text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl"
                    onClick={() => openPopUp('hoelang')}
                >
                    Hoelang
                </button>
            </div>

            {activePopUp && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                        <h2 className="text-2xl font-bold mb-4">
                            {activePopUp.charAt(0).toUpperCase() + activePopUp.slice(1)} Pop-up
                        </h2>
                        <p className="text-gray-700 mb-6">
                            This is the pop-up content for "{activePopUp}".
                        </p>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={closePopUp}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <NavbarMobile />
        </div>
    );
}

export default Woordenoverzicht;