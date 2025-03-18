import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HrlogoPause from "../components/hrlogo&pause.jsx";

function OpdrachtGebaren() {
    const { lessonId } = useParams();

    const [words, setWords] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = useState([]);
    const [popup, setPopup] = useState(null);
    const [weekData, setWeekData] = useState({});

    const token = import.meta.env.VITE_BEARER_TOKEN;
    const link = import.meta.env.VITE_GENERAL_LINK;

    useEffect(() => {
        fetchWords();
    }, []);

    async function fetchWords() {
        try {
            const res = await fetch(`${link}/words?lesson_id=${lessonId}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error(`HTTP-fout! status: ${res.status}`);

            const data = await res.json();
            setWords(data);
            loadWeekData(data);
        } catch (err) {
            console.error("Fout bij ophalen data:", err);
        }
    }

    function loadWeekData(words) {
        const storedData = JSON.parse(localStorage.getItem("Opdracht1-GebaarNaarWoord")) || {};
        const weekKey = `week_${lessonId}`;
        const savedData = storedData[weekKey] || {};

        const initialWeekData = words.reduce((acc, word) => {
            acc[word.title] = savedData[word.title] ?? null;
            return acc;
        }, {});

        setWeekData(initialWeekData);
    }

    function saveWeekData(updatedWeekData) {
        const storedData = JSON.parse(localStorage.getItem("Opdracht1-GebaarNaarWoord")) || {};
        storedData[`week_${lessonId}`] = updatedWeekData;
        localStorage.setItem("Opdracht1-GebaarNaarWoord", JSON.stringify(storedData));
        setWeekData(updatedWeekData);
    }

    const handleNextWord = () => {
        setPopup(null);
        setCurrentIndex((prev) => (prev < words.length - 1 ? prev + 1 : prev));
        setInputValue("");
    };

    const handleButtonClick = (word) => {
        setInputValue(word);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        checkAnswer(inputValue, words[currentIndex]?.title);
    };

    function checkAnswer(selected, correct) {
        const isCorrect = selected === correct;
        const updatedWeekData = { ...weekData, [correct]: isCorrect };

        saveWeekData(updatedWeekData);

        setPopup(
            <div className={`popup ${isCorrect ? "success" : "error"}`}>
                {isCorrect ? (
                    <>
                        <img src="https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif" alt="Goed gedaan!" />
                        <p>Goed gedaan!</p>
                    </>
                ) : (
                    <>
                        <p>Fout! Het juiste antwoord is:</p>
                        <strong className="text-red-500">{correct}</strong>
                    </>
                )}
                <button onClick={handleNextWord} className="bg-customRed text-white px-4 py-2 rounded-lg mt-4">
                    Volgende
                </button>
            </div>
        );
    }

    if (words.length === 0) return <p>Laden...</p>;

    const currentWord = words[currentIndex];

    return (
        <div className="mx-5">
            <HrlogoPause />
            <h1 className="text-2xl font-bold">Oefening {currentIndex + 1} van {words.length}</h1>
            <p>Welk woord hoort bij dit gebaar?</p>

            <video className="shadow-lg p-5 bg-gray-200 text-center mt-5" src={currentWord?.video_path} controls />

            <div className="relative w-full">
                <input
                    type="text"
                    value={inputValue}
                    readOnly
                    className="my-10 py-4 text-lg text-center bg-white border-customRed border-4 rounded-bl-lg rounded-tl-lg rounded-tr-lg w-full"
                />
                <button
                    onClick={handleSubmit}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-customRed text-white px-4 py-2 rounded-lg hover:bg-customRed transition"
                    disabled={!inputValue}
                >
                    ➤
                </button>
            </div>

            <div className="flex flex-wrap gap-4">
                {generateOptions(words, currentWord?.title).map((option, index) => (
                    <button key={index} onClick={() => handleButtonClick(option)}
                            className="px-4 py-2 bg-white text-lg border-customRed border-2 rounded-bl-lg rounded-tl-lg rounded-tr-lg hover:bg-customRed transition">
                        {option}
                    </button>
                ))}
            </div>

            {popup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">{popup}</div>
                </div>
            )}
        </div>
    );
}

function generateOptions(words, correctWord) {
    let shuffledWords = [...words].map(w => w.title).sort(() => Math.random() - 0.5);
    let filteredWords = shuffledWords.filter(word => word !== correctWord);
    return [correctWord, ...filteredWords.slice(0, 4)].sort(() => Math.random() - 0.5);
}

export default OpdrachtGebaren;
