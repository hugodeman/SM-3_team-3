import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";


function OpdrachtGebaren(){
    const { lessonId } = useParams();

    const [words, setWords] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [inputValue, setInputValue] = useState("");

    const token = import.meta.env.VITE_BEARER_TOKEN;
    const link = import.meta.env.VITE_GENERAL_LINK;


    async function fetchWord(){
        try {
            const res = await fetch(`${link}/words?lesson_id=${lessonId}`, {
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
            setWords(data);
        } catch (err) {
            console.error("Fout bij ophalen data:", err);
        }
    }

    useEffect(() => {
        fetchWord()
    },[])

    console.log(words)

    if (words.length === 0) return <p>Laden...</p>;

    const currentWord = words[currentIndex];

    console.log(currentWord)

    if (!currentWord || !currentWord.video_path) {
        return <p>Onjuiste data ontvangen of leeg.</p>;
    }

    const handleNextWord = () => {
        setCurrentIndex(prevIndex => {
            if (prevIndex < words.length - 1) {
                return prevIndex + 1;
            } else {
                alert("Je hebt alle woorden geoefend!");
                return prevIndex;
            }
        });
        setInputValue("");
    };

    const handleButtonClick = (word) => {
        setInputValue(word);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        checkAnswer(inputValue, currentWord.title, handleNextWord);
    };

    return (
        <div className={'mx-5'}>
            <h1 className={'text-2xl font-bold'}>Oefening {currentIndex + 1} van {words.length}</h1>
            <p>Welk woord hoort bij dit gebaar?</p>

            <video className={'shadow-lg p-5 bg-gray-200 text-center mt-5'} src={currentWord.video_path} controls/>

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
                {generateOptions(words, currentWord.title).map((option, index) => (
                    <button key={index} onClick={() => handleButtonClick(option)}
                            className="px-4 py-2 bg-white text-lg border-customRed border-2 rounded-bl-lg rounded-tl-lg rounded-tr-lg hover:bg-customRed transition"
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}

function generateOptions(words, correctWord) {
    let shuffledWords = [...words].map(w => w.title).sort(() => Math.random() - 0.5);
    let filteredWords = shuffledWords.filter(word => word !== correctWord);

    return [correctWord, ...filteredWords.slice(0, 4)].sort(() => Math.random() - 0.5);
}


function checkAnswer(selected, correct, nextWord) {
    if (selected === correct) {
        alert("Goed!");
        nextWord();
    } else {
        alert("Fout, probeer opnieuw.");
    }
}

export default OpdrachtGebaren