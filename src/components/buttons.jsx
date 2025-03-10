import { Link } from "react-router-dom";

const Buttons = ({ text, to }) => {
    return (
        <div>
            {to ? (
                <Link to={to}>
                    <button className="bg-[#A90D3D] py-4 px-10 font-bold text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl w-96">
                        {text}
                    </button>
                </Link>
            ) : (
                <button className="bg-[#A90D3D] py-2.5 px-8 text-white font-bold rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-2xl">
                    {text}
                </button>
            )}
        </div>
    );
};

export default Buttons;
