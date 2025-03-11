import React from "react";
import { Link } from "react-router-dom";
import NavbarMobile from "./components/navbar-mobile.jsx";
import Hrlogo from "./components/hrlogo.jsx";

function Lessons() {
    const weeks = [
        "Week 1", "Week 2", "Week 3", "Week 4",
        "Week 5", "Week 6", "Week 7"
    ];

    return (
        <>
            <Hrlogo />
            <div>
                <h1 className="text-3xl font-bold mb-10 ml-8">Lesstof</h1>
            </div>
            <div className="pb-10 mb-10">
                {Array.from({length: weeks.length}).map((_, i) => (
                    <div key={i} className="flex justify-around mb-20">
                        {weeks.slice(i * 2, i * 2 + 2).map((week, j) => (
                            <div key={j} className="relative">
                                <Link
                                    to={`/lesstof/${week.toLowerCase().replace(" ", "")}`}
                                    className="bg-customRed hover:bg-customRedHover py-4 px-10 text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl"
                                >
                                    {week}
                                </Link>

                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <NavbarMobile />
        </>
    );
}

export default Lessons;