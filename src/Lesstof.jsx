import NavbarMobile from "./components/navbar-mobile.jsx";

function Les() {
    const weeks = [
        "Week 1", "Week 2", "Week 3", "Week 4",
        "Week 5", "Week 6", "Week 7", "Week 8"
    ];

    return (
        <>
            <div>
                <h1>Les stof</h1>
            </div>
            <div className="pb-10 mb-10">
                {/* Map through weeks and render buttons in pairs */}
                {Array.from({ length: weeks.length / 2 }).map((_, i) => (
                    <div key={i} className="flex justify-around mb-6">
                        {weeks.slice(i * 2, i * 2 + 2).map((week, j) => (
                            <div key={j}>
                                <button className="bg-[#A90D3D] py-4 px-10 text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl">
                                    {week}
                                </button>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <NavbarMobile />
        </>
    );
}

export default Les;