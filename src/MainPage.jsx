import "./index.css";

function MainPage() {
    return (
        <div className="container">
            <header>
                <h1>Welkom Jan</h1>
                <p>
                    Alles wat je nodig hebt voor jouw gebarentaalavontuur, op één plek.
                    Leer vingerspellen, bouw zinnen en volg je vooruitgang met onze
                    interactieve lesstof.
                </p>
            </header>

            <div className="grid">
                <div className="item">
                    <img src="/lesstof.jpg" alt="Les stof" />
                    <button>Les stof</button>
                </div>
                <div className="item">
                    <img src="/vingerspel.jpg" alt="Vingerspel" />
                    <button>Vingerspel</button>
                </div>
                <div className="item">
                    <img src="/theorie.jpg" alt="Theorie" />
                    <button>Theorie</button>
                </div>
                <div className="item">
                    <img src="/vooruitgang.jpg" alt="Vooruitgang" />
                    <button>Vooruitgang</button>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
