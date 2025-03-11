import {useEffect, useState} from "react";

function Exercise1(){
    const [inputValue, setInputValue] = useState("")

    const handleButtonClick = (word) => {
        setInputValue(word);
    };

    return(
        <>
            <div className={'mx-5'}>
                <div>
                    <h1 className={'text-2xl font-bold'}>Vertalen</h1>
                    <p>
                        Vertaal het gebaar dat hieronder in de video wordt gebaard.
                    </p>
                    <div className={'shadow p-5 bg-gray-200 text-center mt-5'}>
                        video
                        {/*<img src={`${words.video_path}`} alt={exercise_sign}/>*/}
                    </div>
                    <div>
                        <input type="text" value={inputValue} readOnly={true}
                               className={'my-10 py-4 text-lg text-center bg-#FFFFFF border-customRed border-4 rounded-bl-lg rounded-tl-lg rounded-tr-lg w-full'}/>
                    </div>
                </div>
                <div className="flex flex-wrap gap-4">
                    {["Rood", "Blauw", "Groen", "Geel"].map((word) => (
                        <button key={word} onClick={() => handleButtonClick(word)}
                            className="px-4 py-2 bg-[#FFFFFF] text-lg border-customRed border-2 rounded-bl-lg rounded-tl-lg rounded-tr-lg hover:bg-customRed transition">
                            {word}
                        </button>
                    ))}
                </div>

                <div>
                    {/*<p>{words.title}</p>*/}
                </div>
            </div>
        </>
    )
}

export default Exercise1