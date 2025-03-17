import React from "react";
import {Link, useParams} from "react-router-dom";
import NavbarMobile from "./components/navbar-mobile.jsx";
import HrLogo from "./components/hrlogo.jsx";

function Lessons() {
    const {lessonId} = useParams();

    const weeks = [
        "Week 1", "Week 2", "Week 3", "Week 4",
        "Week 5", "Week 6", "Week 7"
    ];

    return (
        <>
            <HrLogo/>
            <div>
                <h1 className="text-3xl font-bold mb-10 ml-8">Lesstof</h1>
            </div>
            <div className="pb-10 mb-10">
                {Array.from({length: Math.ceil(weeks.length / 2)}).map((_, rowIndex) => (
                    <div key={rowIndex} className="flex justify-around mb-20">
                        {weeks.slice(rowIndex * 2, rowIndex * 2 + 2).map((week, columnIndex) => {
                            const weekNumber = rowIndex * 2 + columnIndex + 1;

                            return (
                                <div key={columnIndex} className="relative">
                                    <Link
                                        to={`/les/${weekNumber}`}
                                        className="bg-customRed hover:bg-customRedHover font-bold py-4 px-10 text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl"
                                    >
                                        {week}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            <NavbarMobile/>
        </>
    );
}

export default Lessons;