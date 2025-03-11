import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Navbar from "./components/navbar-mobile.jsx";
import Hrlogo from "./components/hrlogo.jsx";

function Vingerspelmenu() {
    const navigate = useNavigate();
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

    const handleLearnClick = () => {
        navigate('/vingerspel/oefening');
    };

    return (
        <div>
            <Hrlogo />
            <div className="p-9 text-left">
                <h1 className="text-3xl font-bold my-2 ml-[5%]">Vingerspel</h1>
                <p className="text-base my-2 ml-[5%]">Leer hier alle letters in Nederlandse Gebarentaal</p>
                <div className="flex justify-center mt-[10%]">
                    <button
                        onClick={handleLearnClick}
                        className="w-72 px-4 py-3 text-2xl font-bold cursor-pointer bg-[#CF0245] text-white rounded-lg"
                    >
                        Leren
                    </button>
                </div>
                <div className="flex justify-center mt-8">
                    <div className="grid grid-cols-3 gap-8">
                        {alphabet.map((letter) => (
                            <div key={letter}
                                 className="flex flex-col items-center justify-center w-20 h-24 border-2 border-[#CF0245] bg-white rounded-lg font-bold text-2xl pb-3">
                                {letter}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Navbar />
        </div>
    );
}

export default Vingerspelmenu;