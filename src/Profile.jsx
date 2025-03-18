import React, { useEffect, useState } from "react";
import { useDarkMode } from './context/Darkmode.jsx';
import Navbar from "./components/navbar-mobile.jsx";
import HrLogo from "./components/HrLogo";
import trofee_0 from "./assets/Trophy/Trophy-0.png";
import trofee_7 from "./assets/Trophy/Trophy-7.png";

function Profile() {
    const { darkMode, toggleDarkMode } = useDarkMode();
    const [userData, setUserData] = useState([]);

    const [user, setUser] = useState([])
    const [formData, setFormData] = useState({
        display_name: ''
    });

    const test1 = trofee_0;
    const test2 = trofee_7;

    const [token, setToken] = useState(localStorage.getItem("token") || "");

    console.log(token)
    const link = import.meta.env.VITE_GENERAL_LINK
    const bearerToken = import.meta.env.VITE_BEARER_TOKEN

    // API ophalen met useEffect
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${link}/badges`, {
                    headers: {
                        "Authorization": `Bearer ${bearerToken}`,
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error("Fout bij ophalen van data");
                }

                const data = await response.json();
                console.log("📌 API Data:", data); // Log de data in de console
                setUserData(data);
            } catch (error) {
                console.error("❌ Fout bij ophalen API:", error);
            }
        };

        fetchData();
    }, []);

    async function fetchUser() {
        try {
            const response = await fetch(`http://145.24.223.169/api/v1/users?token=${token}`,{
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${bearerToken}`,
                }
            });

            const data = await response.json();
            console.log(data)
            
            setUser(data)
            // placeholders
            setFormData({
                display_name: data.display_name || ''
            });
        } catch (error) {
            console.error('Fout bij het ophalen van het product:', error);
        }
    }

    useEffect(() => {
        fetchUser()
    },[])

    async function updateName() {
        try {
            const response = await fetch(`http://145.24.223.169/api/v1/users?token=${token}`, {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${bearerToken}`,
                },
                body: JSON.stringify({
                    display_name: formData.display_name, // Stuur de gewijzigde naam
                }),
            });

            const data = await response.json();
            console.log('Favorite updated:', data);

            // update state van vorige data
            setUser(prevUser => ({
                ...prevUser,
                display_name: data.display_name
            }));

        } catch (error) {
            console.error('Error updating favorite status:', error);
        }
    }

    // useEffect(() => {
    //     updateName()
    // },[])

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Formulier verzonden:', formData);

        await updateName()
    };

    return (
        <div className={darkMode ? "bg-backgroundDarkMode text-white" : "bg-background text-black"}>
            <HrLogo />
            <section id="profile-container" className="p-4">
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Profiel</h1>
                <h2 className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-800'}`}>{user.full_name}</h2>

                <form onSubmit={handleSubmit} >
                    <div>
                        <label htmlFor="name" className="">Pas gebruikersnaam aan:</label>
                        <input type="text" name="display_name" id="display_name" value={formData.display_name} onChange={handleInputChange}
                               className="px-4 py-2 bg-white text-lg border-customRed border-2 rounded-bl-lg rounded-tl-lg rounded-tr-lg hover:bg-customRed transition"
                        />
                    </div>
                    <button type={"submit"}
                            className="my-10 py-2 text-lg text-center text-white bg-customRed border-customRed border-4 rounded-bl-lg rounded-tl-lg rounded-tr-lg w-1/2"
                    >Update</button>
                </form>
                
                {/* Darkmode Toggle */}
                <label className="inline-flex items-center cursor-pointer my-4">
                    <input
                        type="checkbox"
                        checked={darkMode}
                        onChange={toggleDarkMode}
                        className="sr-only peer"
                    />
                    <span className={`ms-3 text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Darkmode</span>
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-customRed dark:peer-checked:bg-customRed"></div>
                </label>

                {/* Trofeeën Sectie */}
                <p className={`text-lg font-semibold mt-4 ${darkMode ? 'text-white' : 'text-black'}`}>Trofeeën:</p>
                <div className="grid grid-cols-3 gap-6 mt-6">
                    {userData.length > 0 ? (
                        userData.map((trofee) => (
                            <div
                                key={trofee.id}
                                className={`p-4 rounded-2xl shadow-xl flex flex-col items-center justify-center transition-transform hover:scale-105 border-2 text-center ${
                                    darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-800"}`}>
                                <img src={`${trofee.image_url}`} alt={trofee.title} className="w-20 h-20 object-contain drop-shadow-md mb-2"/>
                                <p className="text-sm">Voltooi de toets van week {trofee.required_score+1}.</p>
                            </div>
                        ))
                    ) : (
                        <p>Geen trofeeën beschikbaar...</p>
                    )}
                </div>
            </section>

            <div className="grid grid-cols-3 gap-6 mt-6">
                {/* Trofee die je nog moet verdienen (bijvoorbeeld test1) */}
                <div
                    className={`p-4 rounded-2xl shadow-xl flex flex-col items-center justify-center transition-transform hover:scale-105 border-2 text-center ${
                        darkMode
                            ? "bg-gray-600 border-gray-500 text-white" // Grijs voor niet-verdiende trofee
                            : "bg-gray-300 border-gray-400 text-gray-800"
                    }`}>
                    <img src={test1} alt="test img" className="w-20 h-20 object-contain drop-shadow-md mb-2"/>
                    <p className="text-sm">Voltooi de toets van week.</p>
                </div>

                {/* Verdiende trofee (bijvoorbeeld test2) */}

            </div>

            <Navbar />
        </div>
    );
}

export default Profile;
