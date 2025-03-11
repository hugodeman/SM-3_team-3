import React from 'react';

function pauzemenu() {
    return (
        <div className="mt-20">
            <h1 className="text-3xl font-bold my-2 ml-[13%]">Pauze</h1>
            <p className="text-base my-2 ml-[13%]">Het leren is gepauzeerd</p>

            <div className="flex flex-col items-center">
                <button className="w-72 px-4 py-3 text-2xl font-bold cursor-pointer bg-[#CF0245] text-white rounded-lg mb-4 mt-5">
                    Hervatten
                </button>

                <button className="w-72 px-4 py-3 text-2xl font-bold cursor-pointer bg-white text-[#CF0245] border border-[#CF0245] rounded-lg">
                    Stoppen
                </button>
            </div>
        </div>
    );
}

export default pauzemenu;