import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import HrlogoPause from "./hrlogo&pause.jsx";
import { letters } from "../letters";

function vingerspelcontrole() {
    const { letter } = useParams();
    const navigate = useNavigate();

    const handleNextLetter = () => {
        const currentIndex = letters.indexOf(letter);
        const nextLetter = letters[(currentIndex + 1) % letters.length];
        navigate(`/vingerspel/nieuweletter/${nextLetter}`);
    };

    return (
        <div className="mb-10">
            <HrlogoPause />
            <div className="mt-10">
                <h1 className="text-3xl font-bold my-2 ml-[5%]">Controleren: {letter}</h1>
                <p className="text-base my-2 ml-[5%]">Zie het gebaar hieronder. Ging het goed?</p>

                <div
                    className="flex flex-col items-center justify-center w-60 h-80 border-2 border-[#CF0245] rounded-lg font-bold text-2xl pb-3 mx-auto mt-8">
                </div>

                <div className="flex justify-center mt-[10%] space-x-8">
                    <button
                        onClick={handleNextLetter}
                        className="w-24 h-24 text-4xl font-bold cursor-pointer bg-red-500 text-white rounded-full flex items-center justify-center">
                        <span className="text-white">✗</span>
                    </button>
                    <button
                        onClick={handleNextLetter}
                        className="w-24 h-24 text-4xl font-bold cursor-pointer bg-green-500 text-white rounded-full flex items-center justify-center">
                        <span className="text-white">✓</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default vingerspelcontrole;