// src/components/HrLogo.jsx
import React from "react";
import { useDarkMode } from '../context/Darkmode.jsx';
import hrLogo from '../assets/Logo/HR-Logo-200px.png';

// blablabla

const HrLogo = () => {
    const { darkMode } = useDarkMode();

    return (
        <div className={darkMode ? "bg-backgroundDarkMode text-white" : "bg-background"}>
            <img
                className="absolute right-0 top-0 m-4 max-w-16"
                src={hrLogo}
                alt="HR Logo"
            />
        </div>
    );
};

export default HrLogo;
