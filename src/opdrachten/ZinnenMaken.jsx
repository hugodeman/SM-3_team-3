import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HrLogo from "../components/hrlogo.jsx";
import HrlogoPause from "../components/hrlogo&pause.jsx";
import { useDarkMode } from "../context/Darkmode.jsx";
import NavbarMobile from "../components/navbar-mobile.jsx";

const token = import.meta.env.VITE_BEARER_TOKEN;
const link = import.meta.env.VITE_GENERAL_LINK;

function ZinnenMaken() {
    const { darkMode, toggleDarkMode } = useDarkMode();
    const [sentences, setSentences] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { lessonId } = useParams();
    const navigate = useNavigate();
    const [sentence, setSentence] = useState("");
    const [popup, setPopup] = useState(null);

    async function fetchSentences() {
        try {
            const res = await fetch(`${link}/sentence-building`, {
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

            const sentencesWithStatus = data.map((sentence, index) => ({
                full_sentence: sentence.full_sentence,
                video_path: sentence.video_path,
                status: null
            }));

            localStorage.setItem(`Opdracht3-ZinnenMaken`, JSON.stringify(sentencesWithStatus));
            setSentences(sentencesWithStatus);
        } catch (err) {
            console.error("Fout bij ophalen data:", err);
        }
    }

    useEffect(() => {
        fetchSentences();
        loadProgress(); // Load progress on mount
    }, [lessonId]);

    function loadProgress() {
        const savedProgress = JSON.parse(localStorage.getItem(`Opdracht3-ZinnenMaken`)) || [];
        setSentences(savedProgress);
        const currentWeekProgress = savedProgress[currentIndex] || {};
        setCurrentIndex(currentWeekProgress.index || 0);
    }

    const handleCheck = () => {
        const currentSentence = sentences[currentIndex].full_sentence;
        checkAnswer(sentence, currentSentence);
    };

    const handleNextWord = () => {
        setPopup(null);
        if (currentIndex < sentences.length - 1) {
            setCurrentIndex(prevIndex => prevIndex + 1);
            setSentence(""); // Reset the input field
        } else {
            navigate(`/les/${lessonId}`);
        }
        saveProgress(); // Save progress after moving to the next sentence
    };

    function checkAnswer(userAnswer, correctSentence) {
        const correct = correctSentence.trim().toLowerCase();
        const updatedSentences = [...sentences]; // Make a copy of the sentences array

        if (userAnswer.trim().toLowerCase() === correct) {
            updatedSentences[currentIndex].status = true;  // Mark as correct
            setPopup(
                <div className="popup success">
                    <img src="https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif" alt="Gefeliciteerd!" />
                    <p>Goed gedaan!</p>
                    <strong className="text-red-500">{sentences[currentIndex].full_sentence}</strong>
                    <br />
                    <button onClick={handleNextWord} className="bg-customRed text-white px-4 py-2 rounded-lg mt-4">Volgende</button>
                </div>
            );
        } else {
            updatedSentences[currentIndex].status = false;  // Mark as incorrect
            setPopup(
                <div className="popup error">
                    <p>Goed geprobeerd! Het juiste antwoord is:</p>
                    <strong className="text-red-500">{sentences[currentIndex].full_sentence}</strong>
                    <br />
                    <button onClick={handleNextWord} className="bg-customRed text-white px-4 py-2 rounded-lg mt-4">Volgende</button>
                </div>
            );
        }

        localStorage.setItem(`Opdracht3-ZinnenMaken`, JSON.stringify(updatedSentences));
        setSentences(updatedSentences);
    }

    return (
        <>
            <HrlogoPause />
            <div className={`flex flex-col items-center min-h-screen p-4 ${darkMode ? "bg-backgroundDarkMode text-white" : "bg-background text-black"}`}>
                <div className="mt-4">
                    <span>{currentIndex + 1} van {sentences.length}</span>
                </div>
                <h1 className="text-2xl font-bold my-4">Zinnen Maken</h1>

                <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden mb-4">
                    {sentences[currentIndex] && (
                        <video className="w-full" controls src={sentences[currentIndex].video_path} />
                    )}
                </div>

                <input
                    type="text"
                    value={sentence}
                    onChange={(e) => setSentence(e.target.value)}
                    className="w-full max-w-2xl p-2 border border-customRed rounded-md shadow-sm focus:ring focus:ring-blue-300 mb-4"
                    placeholder="Typ hier je zin..."
                />

                <button
                    onClick={handleCheck}
                    className="bg-customRed text-white px-6 py-2 rounded-lg hover:bg-customRedHover transition"
                >
                    Controleer
                </button>

                {popup && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-10 rounded-lg shadow-lg text-center max-w-lg w-full">
                            {popup}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default ZinnenMaken;
