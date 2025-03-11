// src/components/HrLogo.jsx
import React from "react";
import { useDarkMode } from '../context/Darkmode.jsx';

const HrLogo = () => {
    const { darkMode } = useDarkMode();

    return (
        <div className={darkMode ? "bg-backgroundDarkMode text-white" : "bg-background"}>
            <img
                className="absolute right-0 top-0 m-4 max-w-16"
                src="../src/assets/Logo/HR-Logo-200px.png"
                alt="HR Logo"
            />
        </div>
    );
};

export default HrLogo;
