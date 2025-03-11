import { Link } from "react-router-dom";

const Buttons = ({ text, to }) => {
    return (
        <div>
            {to ? (
                <Link to={to}>
                    <button className="bg-customRed hover:bg-customRedHover py-4 px-10 font-bold text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl w-full">
                        {text}
                    </button>
                </Link>
            ) : (
                <button className="bg-customRed py-2.5 px-8 text-white font-bold rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-2xl w-32">
                    {text}
                </button>
            )}
        </div>
    );
};

export default Buttons;
