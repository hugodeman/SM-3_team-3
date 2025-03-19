import React, { useEffect, useState } from "react";
import { useDarkMode } from './context/Darkmode.jsx';
import Navbar from "./components/navbar-mobile.jsx";
import HrLogo from "./components/HrLogo";

// Trofee-afbeeldingen importeren
import trofee_0 from "./assets/Trophy/Trophy-0.png";
import trofee_1 from "./assets/Trophy/Trophy-1.png";
import trofee_2 from "./assets/Trophy/Trophy-2.png";
import trofee_3 from "./assets/Trophy/Trophy-3.png";
import trofee_4 from "./assets/Trophy/Trophy-4.png";
import trofee_5 from "./assets/Trophy/Trophy-5.png";
import trofee_6 from "./assets/Trophy/Trophy-6.png";
import trofee_7 from "./assets/Trophy/Trophy-7.png";

// Array met trofee-afbeeldingen
const trofeeImages = [trofee_0, trofee_1, trofee_2, trofee_3, trofee_4, trofee_5, trofee_6, trofee_7];

function Profile() {
    const { darkMode } = useDarkMode();
    const [user, setUser] = useState({});
    const [formData, setFormData] = useState({ display_name: '' });
    const [progressData, setProgressData] = useState([]);

    const token = localStorage.getItem("token") || "";
    const link = import.meta.env.VITE_GENERAL_LINK;
    const bearerToken = import.meta.env.VITE_BEARER_TOKEN;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://145.24.223.169/api/v1/users?token=${token}`, {
                    method: "GET",
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${bearerToken}`,
                    }
                });

                const data = await response.json();
                setUser(data);
                setFormData({ display_name: data.display_name || '' });
            } catch (error) {
                console.error('Fout bij het ophalen van gebruiker:', error);
            }
        };

        fetchUser();
    }, []);

    const fetchProgress = () => {
        const opdracht1 = JSON.parse(localStorage.getItem("Opdracht1-GebaarNaarWoord")) || {};
        const opdracht2 = JSON.parse(localStorage.getItem("Opdracht2-WoordNaarGebaar")) || {};
        const opdracht3 = JSON.parse(localStorage.getItem("Opdracht3-ZinnenMaken")) || [];

        const weeks = [...Array(7).keys()].map(i => `week_${i + 1}`);

        const progress = weeks.map(week => ({
            week,
            opdracht1: opdracht1[week] || {},
            opdracht2: opdracht2[week] || {},
            opdracht3: opdracht3.filter(sentence => sentence.week === week),
        }));

        setProgressData(progress);
    };

    useEffect(() => {
        fetchProgress();
    }, []);

    const updateName = async () => {
        try {
            const response = await fetch(`http://145.24.223.169/api/v1/users?token=${token}`, {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${bearerToken}`,
                },
                body: JSON.stringify({ display_name: formData.display_name }),
            });

            const data = await response.json();
            setUser(prevUser => ({ ...prevUser, display_name: data.display_name }));
        } catch (error) {
            console.error('Error updating username:', error);
        }
    };

    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await updateName();
    };

    // Controleert of een week volledig is voltooid
    const checkForTrophy = (weekData) => {
        if (!weekData) return false;
        const { opdracht1, opdracht2, opdracht3 } = weekData;

        const isCorrect = (opdracht) => Object.values(opdracht).every(value => value === true);
        const isCorrectOpdracht3 = opdracht3.every(item => item.status === true);

        return isCorrect(opdracht1) && isCorrect(opdracht2) && isCorrectOpdracht3;
    };

    return (
        <div className={darkMode ? "bg-backgroundDarkMode text-white" : "bg-background text-black"}>
            <HrLogo />
            <section id="profile-container" className="p-4">
                <h1 className="text-2xl font-bold">Profiel</h1>
                <h2 className="text-lg">{user.full_name}</h2>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="display_name">Pas gebruikersnaam aan:</label>
                        <input
                            type="text"
                            name="display_name"
                            id="display_name"
                            value={formData.display_name}
                            onChange={handleInputChange}
                            className={`px-4 py-2 text-lg text-center border-customRed border-2 rounded-lg 
                                ${darkMode ? 'text-white bg-gray-800 bg-opacity-30' : 'text-black'}`}
                        />
                    </div>
                    <button type="submit"
                            className="my-10 py-2 text-lg text-white bg-customRed border-customRed border-4 rounded-lg w-1/2">
                        Update
                    </button>
                </form>

                <p className="text-lg font-semibold mt-4">Trofeeën:</p>
                <div className="grid grid-cols-3 gap-6 mt-6">
                    {progressData.map((weekData, index) => {
                        const hasTrophy = checkForTrophy(weekData);
                        const trophyImage = hasTrophy ? trofeeImages[index + 1] : trofee_0;

                        return (
                            <div key={index} className={`p-4 rounded-2xl shadow-xl flex flex-col items-center justify-center transition-transform hover:scale-105 border-2 text-center 
                                ${hasTrophy ? (darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300") : (darkMode ? "bg-gray-600 border-gray-500" : "bg-gray-300 border-gray-400")}`}>
                                <img src={trophyImage} alt={`Trophy week ${index + 1}`} className="w-20 h-20 object-contain drop-shadow-md mb-2"/>
                                <p className="text-sm">{hasTrophy ? `Trofee voor Week ${index + 1}` : `Nog te verdienen voor Week ${index + 1}`}</p>
                            </div>
                        );
                    })}
                </div>
            </section>
            <Navbar />
        </div>
    );
}

export default Profile;
