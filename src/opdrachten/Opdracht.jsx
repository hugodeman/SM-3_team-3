import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";


function Opdracht(){
    const { lessonId } = useParams();

    const [words, setWords] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

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
    //
    const currentWord = words[currentIndex];
    //
    console.log(currentWord)
    //
    if (!currentWord || !currentWord.video_path) {
        return <p>Onjuiste data ontvangen of leeg.</p>;
    }
    //
    const handleNextWord = () => {
    //     setCurrentIndex(prevIndex => {
    //         if (prevIndex < words.length - 1) {
    //             return prevIndex + 1;
    //         } else {
    //             alert("Je hebt alle woorden geoefend!");
    //             return prevIndex;
    //         }
    //     });
    };

    return (
        <div>
            <h1>Oefening {currentIndex + 1} van {words.length}</h1>
            <p>Welk woord hoort bij dit gebaar?</p>

            <video src={currentWord.video_path} controls />

            {/*<div>*/}
            {/*    {generateOptions(words, currentWord.word).map((option, index) => (*/}
            {/*        <button key={index} onClick={() => checkAnswer(option, currentWord.word, handleNextWord)}>*/}
            {/*            {option}*/}
            {/*        </button>*/}
            {/*    ))}*/}
            {/*</div>*/}
        </div>
    );
}

function generateOptions(words, correctWord) {
    let options = [correctWord];

    while (options.length < 4) {
        let randomWord = words[Math.floor(Math.random() * words.length)].word;
        if (!options.includes(randomWord)) {
            options.push(randomWord);
        }
    }

    return options.sort(() => Math.random() - 0.5);
}

function checkAnswer(selected, correct, nextWord) {
    if (selected === correct) {
        alert("Goed!");
        nextWord();
    } else {
        alert("Fout, probeer opnieuw.");
    }
}

export default Opdracht