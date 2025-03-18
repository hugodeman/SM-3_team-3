import { useEffect, useState } from "react";
import NavbarMobile from "./components/navbar-mobile.jsx";

function Progress() {
    const [progressData, setProgressData] = useState([]);

    useEffect(() => {
        loadProgress();
    }, []);

    function loadProgress() {
        const opdracht1 = JSON.parse(localStorage.getItem("Opdracht1-GebaarNaarWoord")) || {};
        const opdracht2 = JSON.parse(localStorage.getItem("Opdracht2-WoordNaarGebaar")) || {};

        const combinedWeeks = mergeWeekData(opdracht1, opdracht2);
        setProgressData(combinedWeeks);
    }

    function mergeWeekData(opdracht1, opdracht2) {
        const allWeeks = new Set([...Object.keys(opdracht1), ...Object.keys(opdracht2)]);

        return Array.from(allWeeks).map(week => {
            const opdracht1Data = opdracht1[week] || {};
            const opdracht2Data = opdracht2[week] || {};

            const completedOpdracht1 = countCompleted(opdracht1Data);
            const completedOpdracht2 = countCompleted(opdracht2Data);

            return {
                week,
                opdracht1: {
                    completed: completedOpdracht1,
                    total: Object.keys(opdracht1Data).length
                },
                opdracht2: {
                    completed: completedOpdracht2,
                    total: Object.keys(opdracht2Data).length
                }
            };
        });
    }

    function countCompleted(opdracht) {
        return Object.values(opdracht).filter(value => value !== null).length;
    }

    function getProgressPercentage(completed, total) {
        return (completed / total) * 100;
    }

    return (
        <>
            <div className="mx-5">
                <h1 className="text-2xl font-bold mb-4">Voortgang Overzicht</h1>
                <p>Bekijk hier hoeveel opdrachten je per week hebt voltooid.</p>

                <div className="mt-5">
                    {progressData.length === 0 ? (
                        <p>Nog geen voortgang opgeslagen.</p>
                    ) : (
                        <ul className="list-disc pl-5">
                            {progressData.map(({ week, opdracht1, opdracht2 }) => (
                                <li key={week} className="text-lg mb-9">
                                    <strong>{week.replace("week_", "Week ")}</strong>:

                                    {/* Opdracht 1 Progress */}
                                    <div className="mt-3">
                                        <div className="flex justify-between">
                                            <span>Opdracht 1: {opdracht1.completed} van de {opdracht1.total}</span>
                                            <span>{Math.round(getProgressPercentage(opdracht1.completed, opdracht1.total))}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 h-4 mt-1 rounded">
                                            <div
                                                className="bg-customRed h-4 rounded"
                                                style={{
                                                    width: `${getProgressPercentage(opdracht1.completed, opdracht1.total)}%`
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Opdracht 2 Progress */}
                                    <div className="mt-3">
                                        <div className="flex justify-between">
                                            <span>Opdracht 2: {opdracht2.completed} van de {opdracht2.total}</span>
                                            <span>{Math.round(getProgressPercentage(opdracht2.completed, opdracht2.total))}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 h-4 mt-1 rounded">
                                            <div
                                                className="bg-customRedHover h-4 rounded"
                                                style={{
                                                    width: `${getProgressPercentage(opdracht2.completed, opdracht2.total)}%`
                                                }}
                                            />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Add NavbarMobile component */}
            <NavbarMobile />
        </>
    );
}

export default Progress;
