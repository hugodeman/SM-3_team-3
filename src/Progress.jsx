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
        const opdracht3 = JSON.parse(localStorage.getItem("Opdracht3-ZinnenMaken")) || [];

        // We gaan ervan uit dat de weken worden opgeslagen als week_1 t/m week_7
        const combinedWeeks = mergeWeekData(opdracht1, opdracht2, opdracht3);
        setProgressData(combinedWeeks);
    }

    function mergeWeekData(opdracht1, opdracht2, opdracht3) {
        const weeks = [...Array(7).keys()].map(i => `week_${i + 1}`);

        return weeks.map(week => {
            const opdracht1Data = opdracht1[week] || {};
            const opdracht2Data = opdracht2[week] || {};
            const opdracht3Data = opdracht3.filter(sentence => sentence.status !== null); // Filter alleen ingevulde opdrachten

            const completedOpdracht1 = countCompleted(opdracht1Data);
            const completedOpdracht2 = countCompleted(opdracht2Data);
            const completedOpdracht3 = countCompleted(opdracht3Data);

            const correctOpdracht1 = countCorrectAnswers(opdracht1Data);
            const correctOpdracht2 = countCorrectAnswers(opdracht2Data);
            const correctOpdracht3 = countCorrectAnswers(opdracht3Data); // Opdracht 3 correct tellen

            return {
                week,
                opdracht1: {
                    completed: completedOpdracht1,
                    total: Object.keys(opdracht1Data).length,
                    correct: correctOpdracht1,
                },
                opdracht2: {
                    completed: completedOpdracht2,
                    total: Object.keys(opdracht2Data).length,
                    correct: correctOpdracht2,
                },
                opdracht3: {
                    completed: completedOpdracht3,
                    total: opdracht3.length,
                    correct: correctOpdracht3,
                }
            };
        });
    }

    // Telt het aantal voltooide opdrachten (waar de waarde niet null is)
    function countCompleted(opdracht) {
        if (Array.isArray(opdracht)) {
            return opdracht.length; // Voor Opdracht 3, gewoon het aantal items tellen
        }
        return Object.values(opdracht).filter(value => value !== null).length;
    }

    // Telt het aantal correcte antwoorden (waar de waarde 'true' is)
    function countCorrectAnswers(opdracht) {
        if (Array.isArray(opdracht)) {
            return opdracht.filter(item => item.status === true).length; // Voor Opdracht 3
        }
        return Object.values(opdracht).filter(value => value === true).length;
    }

    function getProgressPercentage(completed, total) {
        return total > 0 ? (completed / total) * 100 : 0;
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
                            {progressData.map(({ week, opdracht1, opdracht2, opdracht3 }) => (
                                <li key={week} className="text-lg mb-9">
                                    <strong>{week.replace("week_", "Week ")}</strong>:

                                    {/* Opdracht 1 */}
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
                                        <div className="mt-1 text-sm text-green-600 font-semibold">
                                            Goede Antwoorden: <strong>{opdracht1.correct}</strong> van {opdracht1.total}
                                        </div>
                                    </div>

                                    {/* Opdracht 2 */}
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
                                        <div className="mt-1 text-sm text-green-600 font-semibold">
                                            Goede Antwoorden: <strong>{opdracht2.correct}</strong> van {opdracht2.total}
                                        </div>
                                    </div>

                                    {/* Opdracht 3 */}
                                    <div className="mt-3">
                                        <div className="flex justify-between">
                                            <span>Opdracht 3: {opdracht3.completed} van de {opdracht3.total}</span>
                                            <span>{Math.round(getProgressPercentage(opdracht3.completed, opdracht3.total))}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 h-4 mt-1 rounded">
                                            <div
                                                className="bg-customRed h-4 rounded"
                                                style={{
                                                    width: `${getProgressPercentage(opdracht3.completed, opdracht3.total)}%`
                                                }}
                                            />
                                        </div>
                                        <div className="mt-1 text-sm text-green-600 font-semibold">
                                            Goede Antwoorden: <strong>{opdracht3.correct}</strong> van {opdracht3.total}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <NavbarMobile />
        </>
    );
}

export default Progress;
