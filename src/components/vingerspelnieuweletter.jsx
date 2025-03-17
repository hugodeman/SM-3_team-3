import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import HrlogoPause from "./hrlogo&pause.jsx";

function VingerspelNieuweLetter() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [letters, setLetters] = useState([]);

    const token = import.meta.env.VITE_BEARER_TOKEN;

    async function fetchLetters() {
        try {
            const res = await fetch(`Http://145.24.223.169/api/v1/alphabet-letters/`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });

            if (!res.ok) {
                throw new Error(`HTTP-fout! status: ${res.status}`);
            }

            const data = await res.json();
            setLetters(data);
        } catch (err) {
            console.error("Fout bij ophalen data:", err);
        }
    }

    useEffect(() => {
        fetchLetters();
    }, []);

    const handleNextClick = () => {
        navigate(`/vingerspel/herhaling/${id}`);
    };

    const letter = letters[id - 3];

    return (
        <div className="min-h-screen">
            <HrlogoPause/>
            <div className="mt-10">
                <h1 className="text-3xl font-bold my-2 ml-[5%]">Nieuwe
                    Letter: {letter ? letter.letter : 'Loading...'}</h1>
                <p className="text-base my-2 ml-[5%]">Bekijk de afbeelding en maak het gebaar in Nederlandse
                    Gebarentaal</p>

                <div
                    className="flex flex-col items-center justify-center w-60 h-80 border-2 border-[#CF0245] rounded-lg font-bold text-2xl mx-auto mt-8">
                    <img src={letter ? letter.sign : ''} alt={`Letter ${letter ? letter.letter : 'Loading...'}`}
                         className="w-full h-full object-cover"/>
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