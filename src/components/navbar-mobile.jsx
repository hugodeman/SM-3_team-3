import { Link } from "react-router-dom";
import Home from "../assets/Icons/Home.png";
import Progress from "../assets/Icons/progress.png";
import Profile from "../assets/Icons/Profile-1.png";

const NavbarMobile = () => {
    return (
        <nav className="bg-[#A90D3D] p-4 text-white fixed bottom-0 rounded-t-2xl w-full">
            <div className="flex justify-around items-center">
                <img src={Home} alt="Home" className="w-12 h-12" />
                <img src={Progress} alt="Progress" className="w-12 h-12" />
                <img src={Profile} alt="Profile" className="w-12 h-12" />
            </div>
        </nav>
    );
};

export default NavbarMobile;
