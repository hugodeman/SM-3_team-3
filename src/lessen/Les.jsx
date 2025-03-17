import Buttons from "../components/buttons.jsx";
import Navbar from "../components/navbar-mobile.jsx";
import HrLogo from "../components/hrlogo.jsx";
import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";

const link = import.meta.env.VITE_GENERAL_LINK;
const token = import.meta.env.VITE_BEARER_TOKEN;

function Les () {
    const [words, setWords] = useState([]);
    const { lessonId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${link}/words?lesson_id=${lessonId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })

            .then(res => res.json())
            .then(data => setWords(data))
            .catch(err => console.error(err));
    }, [lessonId]);

    return(
        <>
            {/* Back Arrow */}
            <button
                onClick={() => navigate(-1)} // Navigate to the previous page
                className="absolute top-9 left-4" // Positioning styles
            >
                <img
                    src="/src/assets/Icons/Back arrow.png" // Update the path to your back arrow image
                    alt="Back Arrow"
                    className="h-6 w-auto" // Adjust size as needed
                />
            </button>
            <HrLogo/>
            <div className={'mr-5 ml-5'}>
                <h1 className={'m-1 text-2xl font-bold '}>Les {lessonId}</h1>
                <h2 className={'font-bold text-xl py-4'}> Leer de gebaren </h2>
                <div className={'pb-5'}>
                    <Buttons text="Bekijk gebaren" to="/lesstof/week1/woordenoverzicht"/>
                {/* <Buttons text="Bekijk gebaren" to={`/woordenoverzicht/${lessonId}`}/>*/}
                </div>

                <div className={'border-t border-black pt-5'}>
                    <h2 className={'font-bold text-xl pb-5'}>Oefen de gebaren en de woorden</h2>
                    <div className={'flex justify-between items-center'}>
                        <h3 className={'text-lg mr-10 pb-3 font-bold'}>Opdracht 1</h3>
                        <Buttons text="30/30"/>
                    </div>
                    <div>
                        <p className={'text-lg py-4'}>Oefen de gebaren naar de woorden</p>
                    </div>
                    <div className={'pb-5'}>
                        <Buttons text="Oefen" to={`/opdracht1/${lessonId}`}/>
                    </div>
                </div>

                <div className={'border-t border-black pt-5'}>
                    <div className={'flex justify-between items-center'}>
                        <h3 className={'text-lg pb-3 font-bold'}>Opdracht 2</h3>
                        <Buttons text="30/30"/>
                    </div>
                    <div>
                        <p className={'text-lg py-4'}>Oefen de woorden naar de gebaren</p>
                    </div>
                    <div className={'pb-5'}>
                        <Buttons text="Oefen" to={`/opdracht2/${lessonId}`}/>
                    </div>
                </div>

                <div className={'border-t border-black pt-5'}>
                    <div className={'flex justify-between items-center'}>
                        <h3 className={'text-lg pb-3 font-bold'}>Opdracht 3</h3>
                        <Buttons text="0/30"/>
                    </div>
                    <div>
                        <p className={'text-lg py-4'}>Oefen zinnen</p>
                    </div>
                    <div className={'pb-5'}>
                        <Buttons text="Oefen" to={`/opdracht3/${lessonId}`}/>
                    </div>
                </div>

                <div className={'border-t border-black pt-5'}>
                    <h2 className={'font-bold text-xl pb-5'}>Toets de oefeningen</h2>
                    <div className={'flex justify-between items-center'}>
                        <h3 className={'text-lg mr-10 font-bold'}></h3>
                        <Buttons text="0/10"/>
                    </div>
                    <div>
                        <p className={'text-lg py-4'}>Toets </p>
                    </div>
                    <div className={'pb-5 mb-20'}>
                        <Buttons text="Oefen" to="/toets1"/>
                    </div>
                </div>
            </div>
            <Navbar/>
        </>
    )
}

export default Les