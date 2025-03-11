import React from 'react';

// Importeer de trofeeën
import trofee_0 from "../src/assets/Trophy/Trophy-0.png";
import trofee_1 from "../src/assets/Trophy/Trophy-1.png";
import trofee_2 from "../src/assets/Trophy/Trophy-2.png";
import trofee_3 from "../src/assets/Trophy/Trophy-3.png";
import trofee_4 from "../src/assets/Trophy/Trophy-4.png";
import trofee_5 from "../src/assets/Trophy/Trophy-5.png";
import trofee_6 from "../src/assets/Trophy/Trophy-6.png";
import trofee_7 from "../src/assets/Trophy/Trophy-7.png";
import Navbar from "./components/navbar-mobile.jsx";
import Hrlogo from "./components/hrlogo.jsx";

const trofeeën = [trofee_0, trofee_1, trofee_2, trofee_3, trofee_4, trofee_5, trofee_6, trofee_7];

function Profile() {
    return (
        <div className="bg-background">
            <Hrlogo />
            <section id="profile-container" className="p-4">
                <h1 className="text-2xl font-bold">Profile</h1>
                <h2 className="text-lg">Welkom gebruiker</h2>

            {/* Darkmode Toggle */}
            <label className="inline-flex items-center cursor-pointer my-4">
                <input type="checkbox" value="" className="sr-only peer" />
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-black">Darkmode</span>
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-customRed dark:peer-checked:bg-customRed"></div>
            </label>


                {/* Trofeeën Sectie */}
                <p className="text-lg font-semibold mt-4">Trofeeën:</p>
                <div className="grid grid-cols-3 gap-6 mt-6 ">
                    {trofeeën.map((trofee, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-white p-4 rounded-2xl shadow-xl flex flex-col items-center justify-center transition-transform hover:scale-105 border-2 border-gray-300 dark:border-gray-700 text-center"
                        >
                            <img src={trofee} alt={`Trofee ${index}`} className="w-20 h-20 object-contain drop-shadow-md mb-2"/>
                            <p className="text-sm text-gray-800 dark:text-gray-800">Voltooi de toets van week {index}.</p>
                        </div>
                    ))}
                </div>
            </section>
            <Navbar />
        </div>
    );
}

export default Profile;
