import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Buttons from "../components/buttons.jsx";
import Navbar from "../components/navbar-mobile.jsx";
import HrLogo from "../components/hrlogo.jsx";
import HrlogoPause from "../components/hrlogo&pause.jsx";

const token = import.meta.env.VITE_BEARER_TOKEN;
const link = import.meta.env.VITE_GENERAL_LINK;

function ZinnenMaken() {
    const [sentences, setSentences] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { lessonId } = useParams();
    const navigate = useNavigate();
    const [sentence, setSentence] = useState("");

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
            setSentences(data);
            console.log(data)
        } catch (err) {
            console.error("Fout bij ophalen data:", err);
        }
    }

    useEffect(() => {
        fetchSentences();
    }, [lessonId]);

    const handleCheck = () => {
        console.log("Ingevoerde zin:", sentence);
    };

    const currentSentence = sentences[currentIndex];

    return (
        <div className="flex flex-col items-center min-h-screen bg-background p-4">
            <HrlogoPause />
            <h1 className="text-2xl font-bold my-4">Zinnen Maken</h1>

            {/* Video Weergave */}
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden mb-4">
                {currentSentence && (
                    <video className="w-full" controls src={currentSentence.video_path} />
                )}
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