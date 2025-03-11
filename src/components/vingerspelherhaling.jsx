import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import HrlogoPause from "./hrlogo&pause.jsx";

function vingerspelherhaling() {
    const navigate = useNavigate();
    const { letter } = useParams();

    const handleShowAnswerClick = () => {
        navigate(`/vingerspel/controle/${letter}`);
    };

    return (
        <div className="mb-10">
            <HrlogoPause />
            <div className="mt-10">
                <h1 className="text-3xl font-bold my-2 ml-[5%]">Herhaling: {letter}</h1>
                <p className="text-base my-2 ml-[5%]">Gebaar de letter in Nederlandse Gebarentaal</p>

                <div
                    className="flex flex-col items-center justify-center w-60 h-80 border-2 border-[#CF0245] bg-white rounded-lg font-bold text-6xl pb-3 mx-auto mt-8">
                    {letter}
                </div>

                <div className="flex justify-center mt-[10%]">
                    <button
                        onClick={handleShowAnswerClick}
                        className="w-72 px-4 py-3 text-2xl font-bold cursor-pointer bg-[#CF0245] text-white rounded-lg">
                        Laat antwoord zien
                    </button>
                </div>
            </div>
        </div>
    );
}

export default vingerspelherhaling;