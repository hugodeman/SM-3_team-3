import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import Buttons from "../components/buttons.jsx";
import HrLogo from "../components/hrlogo.jsx";
import backarrow from "../assets/Icons/Back-arrow.png"

function Les() {
    const {lessonId} = useParams();
    const navigate = useNavigate();
    const [words, setWords] = useState([]);
    const [opdrachtData, setOpdrachtData] = useState({
        opdracht1: { completed: 0, total: 0 },
        opdracht2: { completed: 0, total: 0 },
        opdracht3: { completed: 0, total: 0 }
    });

    useEffect(() => {
        fetch(`http://145.24.223.169/api/v1/words?lesson_id=${lessonId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer 5|LVAIuyWxZqzKHNVw50jc2c6vCjk2NFBy4yxULA4m17c40042`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => setWords(data))
            .catch(err => console.error(err));

        loadProgress();
    }, [lessonId]);

    function loadProgress() {
        const opdracht1 = JSON.parse(localStorage.getItem("Opdracht1-GebaarNaarWoord")) || {};
        const opdracht2 = JSON.parse(localStorage.getItem("Opdracht2-WoordNaarGebaar")) || {};
        const opdracht3 = JSON.parse(localStorage.getItem("Opdracht3-OefenZinnen")) || {}; // indien van toepassing

        setOpdrachtData({
            opdracht1: {
                completed: countCompleted(opdracht1[`week_${lessonId}`] || {}),
                total: Object.keys(opdracht1[`week_${lessonId}`] || {}).length
            },
            opdracht2: {
                completed: countCompleted(opdracht2[`week_${lessonId}`] || {}),
                total: Object.keys(opdracht2[`week_${lessonId}`] || {}).length
            },
            opdracht3: {
                completed: countCompleted(opdracht3[`week_${lessonId}`] || {}),
                total: Object.keys(opdracht3[`week_${lessonId}`] || {}).length
            }
        });
    }

    function countCompleted(opdracht) {
        return Object.values(opdracht).filter(value => value !== null).length;
    }

    return (
        <>
            <button onClick={() => navigate("/lesstof")} aria-label="Go Back" className="absolute top-9 left-4">
                <img src={backarrow} alt="Back Arrow Icon" className="h-6 w-auto"/>
            </button>
            <HrLogo/>
            <div className={'mr-5 ml-5'}>
                <h1 className={'m-1 text-2xl font-bold '}>Les {lessonId}</h1>
                <h2 className={'font-bold text-xl py-4'}> Leer de gebaren </h2>
                <Buttons text="Bekijk gebaren" to={`/woordenoverzicht/${lessonId}`}/>

                <div className={'border-t border-black pt-5'}>
                    <h2 className={'font-bold text-xl pb-5'}>Oefen de gebaren en de woorden</h2>

                    {/* Dynamische buttons hier toevoegen */}
                    <div className={'flex justify-between items-center'}>
                        <h3 className={'text-lg mr-10 pb-3 font-bold'}>Opdracht 1</h3>
                        <Buttons text={`${opdrachtData.opdracht1.completed}/${opdrachtData.opdracht1.total}`} />
                    </div>
                    <p className={'text-lg py-4'}>Oefen de gebaren naar de woorden</p>
                    <Buttons text="Oefen" to={`/opdracht1/${lessonId}`}/>

                    <div className={'flex justify-between items-center mt-5 border-t border-black pt-5'}>
                        <h3 className={'text-lg pb-3 font-bold'}>Opdracht 2</h3>
                        <Buttons text={`${opdrachtData.opdracht2.completed}/${opdrachtData.opdracht2.total}`} />
                    </div>
                    <p className={'text-lg py-4'}>Oefen de woorden naar de gebaren</p>
                    <Buttons text="Oefen" to={`/opdracht2/${lessonId}`}/>

                    <div className={'flex justify-between items-center mt-5 border-t border-black pt-5'}>
                        <h3 className={'text-lg pb-3 font-bold'}>Opdracht 3</h3>
                        <Buttons text={`${opdrachtData.opdracht3.completed}/${opdrachtData.opdracht3.total}`} />
                    </div>
                    <p className={'text-lg py-4'}>Oefen zinnen</p>
                    <Buttons text="Oefen" to={`/opdracht3/${lessonId}`}/>
                </div>
            </div>
        </>
    );
}

export default Les;