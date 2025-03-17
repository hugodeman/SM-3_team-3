import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import HrlogoPause from "./hrlogo&pause.jsx";

function Vingerspelcontrole() {
    const { id } = useParams();
    const navigate = useNavigate();
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

    const handleNextLetter = () => {
        const nextId = parseInt(id) + 1;
        if (nextId > 28) {
            navigate('/vingerspel');
        } else {
            navigate(`/vingerspel/nieuweletter/${nextId}`);
        }
    };

    const letter = letters[id - 3];

    return (
        <div className="min-h-screen">
            <HrlogoPause/>
            <div className="mt-10">
                <h1 className="text-3xl font-bold my-2 ml-[5%]">Controleren: {letter ? letter.letter : 'Loading...'}</h1>
                <p className="text-base my-2 ml-[5%]">Zie het gebaar hieronder. Ging het goed?</p>

                <div
                    className="flex flex-col items-center justify-center w-60 h-80 border-2 border-[#CF0245] rounded-lg font-bold text-2xl pb-3 mx-auto mt-8">
                    <img src={letter ? letter.sign : ''} alt={`Letter ${letter ? letter.letter : 'Loading...'}`} className="w-full h-full object-contain" />
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