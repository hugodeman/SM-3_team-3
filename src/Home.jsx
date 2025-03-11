import Navbar from "./components/navbar-mobile.jsx";
import Hrlogo from "./components/hrlogo.jsx";
import React from "react";

function Home() {
    return (
        <div>
            <Hrlogo />
            <div>Dit is de home pagina</div>
            <Navbar />
        </div>
    );
}

export default Home;