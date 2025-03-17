import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Fout from "../assets/Icons/Fout.png";
import Goed from "../assets/Icons/Goed.png";
import { useDarkMode } from '../context/Darkmode.jsx'; // Zorg ervoor dat je darkMode uit de context haalt

function Opdracht_2() {
    const { lessonId } = useParams();
    const { darkMode } = useDarkMode();  // Haal darkMode uit de context
    const [words, setWords] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [feedback, setFeedback] = useState(null); // Houdt bij of de gebruiker correct of incorrect heeft geantwoord
    const [weekData, setWeekData] = useState({}); // Houdt de weekstatus bij (goed/fout per woord)

    const token = import.meta.env.VITE_BEARER_TOKEN;
    const link = import.meta.env.VITE_GENERAL_LINK;

    async function fetchWord() {
        try {
            const res = await fetch(`${link}/words?lesson_id=${lessonId}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error(`HTTP-fout! status: ${res.status}`);
            }
            const data = await res.json();
            setWords(data);
            loadWeekData(data);  // Laad de weekstatus wanneer de woorden geladen zijn
        } catch (err) {
            console.error("Fout bij ophalen data:", err);
        }
    }

    useEffect(() => {
        fetchWord();
    }, []);

    // Laad de weekstatus uit localStorage
    function loadWeekData(words) {
        const week = `week_${lessonId}`;
        const savedData = JSON.parse(localStorage.getItem(week)) || {};

        // Vul de weekData met de bestaande gegevens, als die er zijn
        const initialWeekData = words.reduce((acc, word, index) => {
            acc[index] = savedData[index] || null; // null betekent dat het woord nog niet beantwoord is
            return acc;
        }, {});

        setWeekData(initialWeekData);
    }

    // Opslaan van de weekstatus in localStorage
    function saveWeekData() {
        const week = `week_${lessonId}`;
        localStorage.setItem(week, JSON.stringify(weekData));
    }

    // Ga naar het vorige woord
    const previousWord = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setShowAnswer(false);
            setFeedback(null); // Reset feedback
        }
    };

    // Ga naar het volgende woord
    const nextWord = () => {
        if (currentIndex < words.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setShowAnswer(false);
            setFeedback(null); // Reset feedback
        }
    };

    // Update de feedback en sla de gegevens op in localStorage
    const handleFeedback = (isCorrect) => {
        const updatedWeekData = { ...weekData, [currentIndex]: isCorrect };
        setWeekData(updatedWeekData);
        saveWeekData(); // Sla de nieuwe gegevens op in localStorage
        setFeedback(isCorrect);
    };

    return (
        <div className={`${darkMode ? "bg-backgroundDarkMode text-white" : "bg-background text-black"} min-h-screen`}>
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

                {/* Knoppen */}
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

                {/* Antwoord sectie met voorbeeld video */}
                {showAnswer && (
                    <div className={`fixed bottom-0 left-0 w-full ${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 shadow-xl border-t flex flex-col items-center`}>
                        <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>Voorbeeld Gebaar</p>
                        <video
                            className="w-full max-w-md rounded-lg mt-2"
                            controls
                            src={words.length > 0 ? words[currentIndex]?.video_path : ""}
                        />

                        {/* Feedback opties */}
                        <div className="flex gap-4 mt-4">
                            <button
                                className={`w-16 h-16 rounded-full text-white text-2xl flex items-center justify-center 
                                    ${feedback === true ? "bg-green-500 scale-110" : "bg-green-500 text-green-500 border-2 border-green-500 hover:bg-green-100"}`}
                                onClick={() => handleFeedback(true)}
                            >
                                <img src={Goed} alt="Goed" />
                            </button>

                            <button
                                className={`w-16 h-16 rounded-full text-white text-2xl flex items-center justify-center 
                                    ${feedback === false ? "bg-red-500 scale-110" : "bg-red-400 hover:bg-red-700"}`}
                                onClick={() => handleFeedback(false)}
                            >
                                <img src={Fout} alt="Fout" />
                            </button>
                        </div>

                        <button
                            className="mt-3 px-4 py-2 bg-customRed text-white rounded-lg hover:bg-customRedHover"
                            onClick={() => setShowAnswer(false)}
                        >
                            Sluiten
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Opdracht_2;
