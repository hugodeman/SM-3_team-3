import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import HrlogoPause from "./hrlogo&pause.jsx";
import { letters } from "../letters";

function Vingerspelcontrole() {
    const { id } = useParams();
    const navigate = useNavigate();
    const letter = letters[id - 3]; // Assuming id 3 corresponds to 'a'

    const handleNextLetter = () => {
        const nextId = parseInt(id) + 1; // Increment id by 1
        if (nextId > 28) {
            navigate('/vingerspel'); // Navigate back to Vingerspelmenu if id exceeds 28
        } else {
            navigate(`/vingerspel/nieuweletter/${nextId}`);
        }
    };

    return (
        <div className="min-h-screen">
            <HrlogoPause/>
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

export default Vingerspelcontrole;