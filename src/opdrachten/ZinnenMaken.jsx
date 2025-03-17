import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Buttons from "../components/buttons.jsx";
import Navbar from "../components/navbar-mobile.jsx";
import HrLogo from "../components/hrlogo.jsx";
import HrlogoPause from "../components/hrlogo&pause.jsx";

const link = import.meta.env.VITE_GENERAL_LINK;
const token = import.meta.env.VITE_BEARER_TOKEN;

function ZinnenMaken() {
    const [words, setWords] = useState([]);
    const { lessonId } = useParams();
    const navigate = useNavigate();
    const [sentence, setSentence] = useState("");

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

    const handleCheck = () => {
        console.log("Ingevoerde zin:", sentence);
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-background p-4">

            <HrlogoPause />
            <h1 className="text-2xl font-bold my-4">Zinnen Maken</h1>

            {/* Video Weergave */}
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden mb-4">
                <video controls className="w-full">
                    <source src="/" type="video/mp4" />
                    Je browser ondersteunt geen video-element.
                </video>
            </div>

            {/* Input veld */}
            <input
                type="text"
                value={sentence}
                onChange={(e) => setSentence(e.target.value)}
                className="w-full max-w-2xl p-2 border border-customRed rounded-md shadow-sm focus:ring focus:ring-blue-300 mb-4"
                placeholder="Typ hier je zin..."
            />

            {/* Check knop */}
            <button
                onClick={handleCheck}
                className="bg-customRed text-white px-6 py-2 rounded-lg hover:bg-customRedHover transition"
            >
                Controleer
            </button>
        </div>
    );
}

export default ZinnenMaken;
