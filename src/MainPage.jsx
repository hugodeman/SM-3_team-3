import React from "react";

function MainPage() {
    return (
        <div className="bg-[#F8F2E9] min-h-screen flex flex-col items-center p-6">

            <header className="text-center mt-10">
                <h1 className="text-3xl font-bold text-black">Welkom Jan</h1>
                <p className="text-lg text-black mt-4 max-w-xs mx-auto">
                    Alles wat je nodig hebt voor jouw gebarentaalavontuur, op één plek.
                    Leer vingerspellen, bouw zinnen en volg je vooruitgang met onze interactieve lesstof.
                </p>
            </header>

            {/* Grid voor de afbeeldingen en buttons */}
            <div className="grid grid-cols-2 gap-6 mt-10">
                {/* Lesstof */}
                <div className="flex flex-col items-center">
                    <img src="/lesstof.jpg" alt="Lesstof" className="w-40 h-40 rounded-lg shadow-md" />
                    <button className="bg-[#A90D3D] text-white font-bold py-2 px-6 rounded-full mt-2">
                        Les stof
                    </button>
                </div>

                {/* Vingerspel */}
                <div className="flex flex-col items-center">
                    <img src="/vingerspel.jpg" alt="Vingerspel" className="w-40 h-40 rounded-lg shadow-md" />
                    <button className="bg-[#A90D3D] text-white font-bold py-2 px-6 rounded-full mt-2">
                        Vingerspel
                    </button>
                </div>

                {/* Theorie */}
                <div className="flex flex-col items-center">
                    <img src="/theorie.jpg" alt="Theorie" className="w-40 h-40 rounded-lg shadow-md" />
                    <button className="bg-[#A90D3D] text-white font-bold py-2 px-6 rounded-full mt-2">
                        Theorie
                    </button>
                </div>

                {/* Vooruitgang */}
                <div className="flex flex-col items-center">
                    <img src="/vooruitgang.jpg" alt="Vooruitgang" className="w-40 h-40 rounded-lg shadow-md" />
                    <button className="bg-[#A90D3D] text-white font-bold py-2 px-6 rounded-full mt-2">
                        Vooruitgang
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
