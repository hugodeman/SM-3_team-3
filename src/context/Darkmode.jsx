import React, { createContext, useContext, useState, useEffect } from 'react';

// Maak de DarkModeContext
const DarkModeContext = createContext();

export const useDarkMode = () => {
    return useContext(DarkModeContext);
};

// Maak een provider component
export const DarkModeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("darkMode") === "true";
    });

    // Pas dark mode toe wanneer het verandert
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};