import React from "react";
import NavbarMobile from "./components/navbar-mobile.jsx"; // Zorg ervoor dat dit klopt met je pad

function MainPage() {
    return (
        <div className="bg-[#F8F2E9] min-h-screen flex flex-col justify-between">
            {/* Logo en Welkomsttekst */}
            <div className="p-6 relative">

                <h1 className="text-3xl font-bold text-black">Welkom Jan</h1>
                <p className="text-lg text-black mt-2 max-w-xs">
                    Alles wat je nodig hebt voor jouw Nederlandse gebarentaalavontuur, op één plek.
                    Leer vingerspellen, bouw zinnen en volg je vooruitgang met onze interactieve lesstof.
                </p>
            </div>

            {/* Lesstof en Vingerspel Secties */}
            <div className="flex flex-col items-center gap-10 mt-6">
                {/* Lesstof */}
                <div className="flex items-center justify-between w-4/5">
                    <img src="/lesstof.jpg" alt="Lesstof" className="w-36 h-36 rounded-lg shadow-md" />
                    <button className="bg-[#A90D3D] text-white font-bold py-4 px-8 rounded-2xl text-xl">
                        Lesstof
                    </button>
                </div>

                {/* Vingerspel */}
                <div className="flex items-center justify-between w-4/5">
                    <img src="/vingerspel.jpg" alt="Vingerspel" className="w-36 h-36 rounded-lg shadow-md" />
                    <button className="bg-[#A90D3D] text-white font-bold py-4 px-8 rounded-2xl text-xl">
                        Vingerspel
                    </button>
                </div>
            </div>

            {/* Navigatiebalk onderaan */}
            <NavbarMobile />
        </div>
    );
}

export default MainPage;
