import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useParams} from 'react-router-dom';

const link = import.meta.env.VITE_GENERAL_LINK;
const token = import.meta.env.VITE_BEARER_TOKEN;

function Woordenoverzicht() {
    const [activePopUp, setActivePopUp] = useState(null);
    const [words, setWords] = useState([]);
    const navigate = useNavigate();

    // Toegevoegde state voor pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(words.length / itemsPerPage);

    const {lessonId} = useParams();

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

    const openPopUp = (word) => setActivePopUp(word);
    const closePopUp = () => setActivePopUp(null);

    // Bereken de woorden voor de huidige pagina
    const indexOfLastWord = currentPage * itemsPerPage;
    const indexOfFirstWord = indexOfLastWord - itemsPerPage;
    const currentWords = words.slice(indexOfFirstWord, indexOfLastWord);

    return (
        <div className="h-[85vh]">
            <button
                onClick={() => navigate("/les/" + lessonId)}
                aria-label="Go Back"
                className="absolute top-9 left-4"
            >
                <img
                    src="/src/assets/Icons/Back arrow.png"
                    alt="Back Arrow Icon"
                    className="h-6 w-auto"
                />
            </button>
            <div>
                <h1 className="text-3xl font-bold mb-4 ml-8 space-y-4">Gebaren</h1>
                <h2 className="text-xl font-bold mb-10 ml-8">Vraagwoorden</h2>
            </div>
            <div className="flex flex-col w-2/3 mx-auto mt-10">

                {currentWords.map((word) => (
                    <button
                        key={word.id}
                        className="bg-customRed hover:bg-customRedHover font-bold mb-6 py-4 px-10 text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl"
                        onClick={() => openPopUp(word)}
                    >
                        {word.title}
                    </button>
                ))}

                <div className="mt-4 flex justify-center items-center space-x-2">
                    <button
                        className={`font-bold py-2 px-8 text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl transition-colors duration-200 ${currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-customRed hover:bg-customRedHover'}`}
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    >
                        Vorige
                    </button>

                    <p className="text-center font-semibold px-2 py-2 whitespace-nowrap">
                        {currentPage}/{totalPages}
                    </p>

                    <button
                        className={`font-bold py-2 px-6 text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl transition-colors duration-200 ${(currentPage === totalPages || words.length === 0) ? 'bg-gray-400 cursor-not-allowed' : 'bg-customRed hover:bg-customRedHover'}`}
                        disabled={currentPage === totalPages || words.length === 0}
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    >
                        Volgende
                    </button>
                </div>

            </div>

            {activePopUp && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-2xl font-bold mb-4">{activePopUp.title}</h2>
                        <video controls className="w-full mb-6">
                            <source src={activePopUp.video_path} type="video/mp4"/>
                            Je browser ondersteunt de video tag niet.
                        </video>
                        <button
                            className="bg-customRed hover:bg-customRedHover text-white font-bold py-2 px-4 rounded"
                            onClick={closePopUp}
                        >
                            Sluiten
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Woordenoverzicht;