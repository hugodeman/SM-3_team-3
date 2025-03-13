import { Link } from "react-router-dom";
import Home from "../assets/Icons/Home.png";
import Progress from "../assets/Icons/progress.png";
import Profile from "../assets/Icons/Profile-1.png";

const NavbarMobile = () => {
    return (
        <>
            {/* Onzichtbare ruimte om te voorkomen dat content erachter komt */}
            <div className="h-[70px]"></div>

            <nav className="bg-customRed p-4 text-white fixed bottom-0 rounded-t-2xl w-full">
                <div className="flex justify-around items-center">
                    <a href={'/'}> <img src={Home} alt="Home" className="w-12 h-12"/></a>
                    <img src={Progress} alt="Progress" className="w-12 h-12" />
                    <a href={'/profile'}> <img src={Profile} alt="Profile" className="w-12 h-12" /> </a>
                </div>
            </nav>
        </>
    );
};

export default NavbarMobile;