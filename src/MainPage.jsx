import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import NavbarMobile from "./components/navbar-mobile.jsx";
import { useDarkMode } from './context/Darkmode.jsx';

function MainPage() {
    const { darkMode, toggleDarkMode } = useDarkMode();

    const appUrl = import.meta.env.VITE_APP_URL;

    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetch("http://145.24.223.169/api/auth/users", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((data) => setUser(data))
                .catch(() => setUser(null));
        }
        console.log(token)
        console.log(user)
    }, []);


    return (
        <div className={darkMode ? "bg-backgroundDarkMode text-white" : "bg-background text-black min-h-screen flex flex-col justify-between pb-24"}>
            <div>
                <button
                    onClick={() => window.location.href = `https://cmgt.hr.nl/chat-login/handle/tle2-1?redirect=http://145.24.223.169/api/auth/redirect-back-url/${appUrl}/`}
                    className="bg-customRed text-white ml-5 px-6 py-3 rounded-lg hover:bg-customRedHover transition"
                >
                    Inloggen
                </button>
            </div>

            {/* Welkomsttekst */}
            <div className="p-6 relative">
                <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Welkom Jan</h1>
                <p className={`text-lg mt-2 max-w-xs ${darkMode ? 'text-gray-300' : 'text-black'}`}>
                    Alles wat je nodig hebt voor jouw Nederlandse gebarentaalavontuur, op één plek.
                    Leer vingerspellen, bouw zinnen en volg je vooruitgang met onze interactieve lesstof.
                </p>
            </div>

            {/* Lesstof en Vingerspel Secties */}
            <div className="flex flex-col items-center gap-10 mt-6 mb-16">
                {/* Lesstof */}
                <div className="flex flex-col items-center w-4/5">
                    <img src="/lesstof.jpg" alt="Lesstof" className="w-44 h-44 rounded-lg shadow-md" />
                    <Link to="/lesstof">
                        <button className="bg-customRed  hover:bg-customRedHover text-white font-bold py-4 w-44 rounded-2xl text-xl mt-4">
                            Lesstof
                        </button>
                    </Link>
                </div>

                {/* Vingerspel */}
                <div className="flex flex-col items-center w-4/5">
                    <img src="/vingerspel.jpg" alt="Vingerspel" className="w-44 h-44 rounded-lg shadow-md" />
                    <Link to="/vingerspel">
                        <button className="bg-customRed hover:bg-customRedHover text-white font-bold py-4 w-44 rounded-2xl text-xl mt-4">
                            Vingerspellen
                        </button>
                    </Link>
                </div>
            </div>

            {/* Navigatiebalk onderaan */}
            <NavbarMobile />
        </div>
    );
}

export default MainPage;
