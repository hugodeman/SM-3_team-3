// src/components/Profile.jsx
import React from "react";
import { useDarkMode } from './context/Darkmode.jsx';
import trofee_0 from "./assets/Trophy/Trophy-0.png";
import trofee_1 from "./assets/Trophy/Trophy-1.png";
import trofee_2 from "./assets/Trophy/Trophy-2.png";
import trofee_3 from "./assets/Trophy/Trophy-3.png";
import trofee_4 from "./assets/Trophy/Trophy-4.png";
import trofee_5 from "./assets/Trophy/Trophy-5.png";
import trofee_6 from "./assets/Trophy/Trophy-6.png";
import trofee_7 from "./assets/Trophy/Trophy-7.png";
import Navbar from "./components/navbar-mobile.jsx";
import HrLogo from "./components/HrLogo";

// Array met trofeeën
const trofeeën = [trofee_0, trofee_1, trofee_2, trofee_3, trofee_4, trofee_5, trofee_6, trofee_7];

function Profile() {
    const { darkMode, toggleDarkMode } = useDarkMode();

    return (
        <div className={darkMode ? "bg-backgroundDarkMode text-white" : "bg-background text-black"}>
            <HrLogo /> {/* Je HR logo component */}
            <section id="profile-container" className="p-4">
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Profiel</h1>
                <h2 className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-800'}`}>Welkom gebruiker</h2>

                {/* Darkmode Toggle */}
                <label className="inline-flex items-center cursor-pointer my-4">
                    <input
                        type="checkbox"
                        checked={darkMode}
                        onChange={toggleDarkMode}
                        className="sr-only peer"
                    />
                    <span className={`ms-3 text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Darkmode</span>
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-customRed dark:peer-checked:bg-customRed"></div>
                </label>

                {/* Trofeeën Sectie */}
                <p className={`text-lg font-semibold mt-4 ${darkMode ? 'text-white' : 'text-black'}`}>Trofeeën:</p>
                <div className="grid grid-cols-3 gap-6 mt-6">
                    {trofeeën.map((trofee, index) => (
                        <div
                            key={index}
                            className={`p-4 rounded-2xl shadow-xl flex flex-col items-center justify-center transition-transform hover:scale-105 border-2 text-center ${
                                darkMode
                                    ? "bg-gray-800 border-gray-700 text-white"
                                    : "bg-white border-gray-300 text-gray-800"
                            }`}
                        >
                            <img src={trofee} alt={`Trofee ${index}`} className="w-20 h-20 object-contain drop-shadow-md mb-2"/>
                            <p className="text-sm">Voltooi de toets van week {index}.</p>
                        </div>
                    ))}
                </div>
            </section>
            <Navbar />
        </div>
    );
}

export default Profile;
