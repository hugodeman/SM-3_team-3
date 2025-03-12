import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import HrlogoPause from "./hrlogo&pause.jsx";
import { letters } from "../letters";

function VingerspelNieuweLetter() {
    const navigate = useNavigate();
    const { letter } = useParams();

    const handleNextClick = () => {
        navigate(`/vingerspel/herhaling/${letter}`);
    };

    return (
        <div className="min-h-screen">
            <HrlogoPause/>
            <div className="mt-10">
                <h1 className="text-3xl font-bold my-2 ml-[5%]">Nieuwe Letter: {letter} </h1>
                <p className="text-base my-2 ml-[5%]">Bekijk de video en voer het gebaar uit in Nederlandse
                    Gebarentaal</p>

                <div
                    className="flex flex-col items-center justify-center w-60 h-80 border-2 border-[#CF0245] rounded-lg font-bold text-2xl pb-3 mx-auto mt-8">
                </div>

                <div className="flex justify-center mt-[10%]">
                    <button
                        onClick={handleNextClick}
                        className="w-72 px-4 py-3 text-2xl font-bold cursor-pointer bg-[#CF0245] text-white rounded-lg">
                        Volgende
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VingerspelNieuweLetter;