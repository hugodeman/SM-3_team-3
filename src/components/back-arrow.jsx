import React from "react";
import { useNavigate } from "react-router-dom";

const BackArrow = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        // Navigate back to the previous page
        navigate(-1);
    };

    return (
        <button
            onClick={handleClick}
            aria-label="Go Back"
            className="absolute top-9 left-4"
        >
            <img
                src="/src/assets/Icons/Back arrow.png"
                alt="Back Arrow Icon"
                className="h-6 w-auto"
            />
        </button>
    );
};

export default BackArrow;