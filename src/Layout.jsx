import { Link, Outlet } from "react-router-dom";
import { useDarkMode } from './context/Darkmode.jsx';
import hrLogo from './assets/Logo/HR-Logo-200px.png';
import { useEffect, useState } from "react";

function Layout() {
    const { darkMode, toggleDarkMode } = useDarkMode();

    return (
        <div className={darkMode ? "bg-backgroundDarkMode text-white" : "bg-background"}>
            <img className="absolute right-0 top-0 m-4 max-w-16" src={hrLogo} alt="HR Logo"/>
            <div className={darkMode ? "bg-backgroundDarkMode pt-20 text-white" : "bg-background pt-20"}>
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;