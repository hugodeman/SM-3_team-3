import {useDarkMode} from "./context/Darkmode.jsx";
import {useEffect, useState} from "react";

function AdminPanel (){
    const darkMode = useDarkMode()

    const token = localStorage.getItem('token')
    const link = import.meta.env.VITE_GENERAL_LINK
    const appUrl = import.meta.env.VITE_APP_URL;
    const bearerToken = import.meta.env.VITE_BEARER_TOKEN;
    const [studentToken, setStudentToken] = useState()

    const removeToken = () => {
        localStorage.removeItem("token");
    };

    const [formData, setFormData] = useState({
        release_date: ''
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    async function inviteStudents(user) {
        try {
            const response = await fetch(`${link}/allowed-users`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${bearerToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ emails: user.email })
            });

            const data = await response.json();
            console.log("API Response:", data);

            if (!response.ok) {
                throw new Error(`Fout bij uitnodigen: ${data.message || response.status}`);
            }

            alert("Gebruiker succesvol uitgenodigd!");
        } catch (error) {
            console.error("Error bij uitnodigen:", error);
            alert("Er ging iets mis, probeer opnieuw.");
        }
    }

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const newToken = params.get("sso_token");

        if (newToken) {
            localStorage.setItem("token", newToken);
            setStudentToken(newToken);
        }
    }, [location.search]);

    const handleSubmit = async (e) => {
        e.preventDefault()

        await inviteStudents(formData);
    }

    return (
            <div className={`${darkMode ? 'bg-backgroundDarkMode' : 'bg-background'}`}>
                <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-black'} text-center`}>Welkom, Admin</h1>
                <div className={'flex flex-col gap-10'}>
                    <a href={`http://cmgt.hr.nl/chat-login/logout/${token}?redirect=http://${appUrl}`}
                       onClick={removeToken}
                       className="bg-customRed hover:bg-customRedHover py-4 px-10 font-bold text-white text-center rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl w-1/4">
                        Uitloggen
                    </a>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <label htmlFor='emails'>Nodig studenten uit</label>
                        </div>
                        <div>
                            <input type='text' name={'emails'} id={'emails'} onChange={handleInputChange}
                            className={`${darkMode ? 'text-black' : 'text-white'}`}
                            />
                        </div>
                    </div>
                    <div>
                        <button type={"submit"}>
                            Verstuur
                        </button>
                    </div>
                </form>
            </div>
    )
}

export default AdminPanel