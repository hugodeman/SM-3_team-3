import {useEffect, useState} from "react";
import {useDarkMode} from "./context/Darkmode.jsx";

function AdminPanel (){
    const darkMode = useDarkMode()
    const token = localStorage.getItem('token')
    const link = "145.24.223.153/api/v1"
    const appUrl = "145.24.223.153";
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
            const response = await fetch(`http://145.24.223.169/api/v1/allowed-users`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer 5|LVAIuyWxZqzKHNVw50jc2c6vCjk2NFBy4yxULA4m17c40042`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ emails: user.email })
            });

            const data = await response.json();
            console.log("API Response:", data);

            if (!response.ok) {
                throw new Error(`Fout bij uitnodigen: ${data.message || response.status}`);
            }

            alert("Gebruikers succesvol uitgenodigd!");
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
            <div className={`ml-10`}>
                <h1 className={`text-3xl font-bold text-center`}>Welkom, Admin</h1>
                <div className={'flex gap-10 my-14 justify-around mr-10'}>
                    <a href="/"
                       className="bg-customRed hover:bg-customRedHover py-4 px-10 font-bold text-white text-center rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl w-1/4">
                        Home
                    </a>
                    <a href={`http://cmgt.hr.nl/chat-login/logout/${token}?redirect=http://145.24.223.153`}
                       onClick={removeToken}
                       className="bg-customRed hover:bg-customRedHover py-4 px-10 font-bold text-white text-center rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl w-1/4">
                        Uitloggen
                    </a>
                </div>
                <form onSubmit={handleSubmit} className={'flex justify-center'}>
                    <div className={'justify-center'}>
                        <div>
                            <div className={'mb-5'}>
                                <label htmlFor='emails' className={'mt-4 text-lg'}>Nodig studenten uit</label>
                            </div>
                            <div className={'mt-2'}>
                                <textarea name={'emails'} id={'emails'} onChange={handleInputChange}
                                className={`${darkMode ? 'text-black': 'text-black'}`}
                                />
                            </div>
                        </div>
                        <div className={'mt-4 mb-10 pb-10'}>
                            <button type={"submit"} className={`text-white bg-customRed py-3 px-32 rounded`}>
                                Verstuur
                            </button>
                        </div>
                    </div>
                </form>
            </div>
    )
}

export default AdminPanel