import React, {useState} from "react";
import NavbarMobile from "./components/navbar-mobile.jsx";

function Lesson() {
    const weeks = [
        "Week 1", "Week 2", "Week 3", "Week 4",
        "Week 5", "Week 6", "Week 7", "Week 8"
    ];

    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (index) => {
        setOpenDropdown((prev) => (prev === index ? null : index));
    };

    return (
        <>
            <div>
                <h1 className="text-3xl font-bold mb-10 ml-8">Les stof</h1>
            </div>
            <div className="pb-10 mb-10">
                {Array.from({length: weeks.length / 2}).map((_, i) => (
                    <div key={i} className="flex justify-around mb-16">
                        {weeks.slice(i * 2, i * 2 + 2).map((week, j) => {
                            const currentIndex = i * 2 + j;
                            return (
                                <div key={j} className="relative">
                                    <button
                                        className="bg-customRed hover:bg-customRedHover py-4 px-10 text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl"
                                        onClick={() => toggleDropdown(currentIndex)}
                                    >
                                        {week}
                                    </button>
                                    <div
                                        className={`${
                                            openDropdown === currentIndex
                                                ? "max-h-screen translate-y-0 opacity-100"
                                                : "max-h-0 -translate-y-2 opacity-0 pointer-events-none"
                                        } transition-all duration-500 left-0 mt-2 bg-white shadow-lg rounded-lg overflow-hidden`}
                                    >
                                        <ul>
                                            <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
                                                Opdrachten
                                            </li>
                                            <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
                                                Theorie
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
            <NavbarMobile/></>
    );
}

export default Lesson