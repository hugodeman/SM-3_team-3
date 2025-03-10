import React from "react";

function vingerspelnieuweletter(){
    return (
        <div>
            <h1 className="text-3xl font-bold my-2 ml-[5%]">Nieuwe Letter</h1>
            <p className="text-base my-2 ml-[5%]">Bekijk de video en voer het gebaar uit in Nederlandse Gebarentaal</p>

            <div
                className="flex flex-col items-center justify-center w-60 h-24 border-2 border-[#CF0245] bg-white rounded-lg font-bold text-2xl pb-3 mx-auto">
            </div>

            <div className="flex justify-center mt-[10%]">
                <button
                    className="w-72 px-4 py-3 text-2xl font-bold cursor-pointer bg-[#CF0245] text-white rounded-lg">Volgende
                </button>
            </div>
        </div>
    )
}

export default vingerspelnieuweletter;