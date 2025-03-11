import React from 'react';
import { useNavigate } from 'react-router-dom';

const HrLogoPause = () => {
    const navigate = useNavigate();

    const goToPauzeMenu = () => {
        navigate('/pauze');
    };

    return (
        <div>
            <div className="absolute left-0 top-0 m-4 flex items-center">
                <button onClick={goToPauzeMenu} className="mr-4 text-3xl" style={{ fontSize: '64px' }}>
                    ☰
                </button>
            </div>
            <div>
                <img className="absolute right-0 top-0 m-4 max-w-16" src="../src/assets/Logo/HR-Logo-200px.png"
                     alt="HR Logo"/>
            </div>
        </div>
    );
}

export default HrLogoPause;