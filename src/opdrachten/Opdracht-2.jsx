import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Fout from "../assets/Icons/Fout.png";
import Goed from "../assets/Icons/Goed.png";
import { useDarkMode } from '../context/Darkmode.jsx';
import HrlogoPause from "../components/hrlogo&pause.jsx";

function Opdracht_2() {
    const { lessonId } = useParams();
    const { darkMode } = useDarkMode();
    const [words, setWords] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [weekData, setWeekData] = useState({});

    const token = import.meta.env.VITE_BEARER_TOKEN;
    const link = import.meta.env.VITE_GENERAL_LINK;

    useEffect(() => {
        fetchWord();
    }, []);

    function fetchWord() {
        fetch(`${link}/words?lesson_id=${lessonId}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                setWords(data);
                loadWeekData(data);
            })
            .catch(err => console.error("Fout bij ophalen data:", err));
    }

    function loadWeekData(words) {
        const storedData = JSON.parse(localStorage.getItem("Opdracht2-WoordNaarGebaar")) || {};
        const weekKey = `week_${lessonId}`;
        const savedWeekData = storedData[weekKey] || {};

        const initialWeekData = words.reduce((acc, word) => {
            acc[word.title] = savedWeekData[word.title] ?? null;
            return acc;
        }, {});

        setWeekData(initialWeekData);
    }

    function saveWeekData(updatedWeekData) {
        const storedData = JSON.parse(localStorage.getItem("Opdracht2-WoordNaarGebaar")) || {};
        const weekKey = `week_${lessonId}`;

        storedData[weekKey] = updatedWeekData;
        localStorage.setItem("Opdracht2-WoordNaarGebaar", JSON.stringify(storedData));

        setWeekData(updatedWeekData);
    }

    const handleFeedback = (isCorrect) => {
        const updatedWeekData = { ...weekData, [words[currentIndex]?.title]: isCorrect };
        saveWeekData(updatedWeekData);
        setFeedback(isCorrect);
    };

    const previousWord = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setShowAnswer(false);
            setFeedback(null);
        }
    };

    const nextWord = () => {
        if (currentIndex < words.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setShowAnswer(false);
            setFeedback(null);
        }
    };

    return (
        <div className={`${darkMode ? "bg-backgroundDarkMode text-white" : "bg-background text-black"} min-h-screen`}>
            <HrlogoPause/>
            <div className="flex flex-col items-center justify-center p-4">
                <h1 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>Gebaar het woord</h1>
                <h2 className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Woord {currentIndex + 1} van {words.length}
                </h2>

                <div className={`flex items-center justify-center w-full h-64 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-xl p-6 my-6`}>
                    <p className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {words.length > 0 ? words[currentIndex]?.title : "Laden..."}
                    </p>
                </div>

                <div className="flex gap-4 mt-4">
                    <button
                        className={`px-4 py-2 rounded-lg text-lg shadow-md transition 
                            ${currentIndex === 0 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-customRed text-white hover:bg-customRedHover"}`}
                        onClick={previousWord}
                        disabled={currentIndex === 0}>
                        Vorige
                    </button>

                    <button
                        className="bg-customRed text-white px-6 py-3 rounded-lg text-lg shadow-md hover:bg-customRedHover transition"
                        onClick={() => setShowAnswer(true)}>
                        Kijk antwoord
                    </button>

                    <button
                        className={`px-4 py-2 rounded-lg text-lg shadow-md transition 
                            ${currentIndex === words.length - 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-customRed text-white hover:bg-customRedHover"}`}
                        onClick={nextWord}
                        disabled={currentIndex === words.length - 1}>
                        Volgende
                    </button>
                </div>

                {showAnswer && (
                    <div className={`fixed bottom-0 left-0 w-full ${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 shadow-xl border-t flex flex-col items-center`}>
                        <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>Voorbeeld Gebaar</p>
                        <video
                            className="w-full max-w-md rounded-lg mt-2"
                            controls
                            src={words.length > 0 ? words[currentIndex]?.video_path : ""}
                        />

                        <div className="flex gap-4 mt-4">
                            <button
                                className={`w-16 h-16 rounded-full flex items-center justify-center 
                                    ${feedback === true ? "bg-green-500 scale-110" : "bg-green-500 hover:bg-green-100"}`}
                                onClick={() => handleFeedback(true)}>
                                <img src={Goed} alt="Goed" />
                            </button>

                            <button
                                className={`w-16 h-16 rounded-full flex items-center justify-center 
                                    ${feedback === false ? "bg-red-500 scale-110" : "bg-red-400 hover:bg-red-700"}`}
                                onClick={() => handleFeedback(false)}>
                                <img src={Fout} alt="Fout" />
                            </button>
                        </div>

                        <button
                            className="mt-3 px-4 py-2 bg-customRed text-white rounded-lg hover:bg-customRedHover"
                            onClick={() => setShowAnswer(false)}>
                            Sluiten
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Opdracht_2;
