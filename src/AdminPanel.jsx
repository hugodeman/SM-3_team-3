import {Link} from "react-router-dom";

function AdminPanel (){
    return (
        <>
            <div>
                <h1>hallo</h1>
                <button>
                    <Link to={`/email`}>Voeg leerlingen toe</Link>
                </button>
            </div>
        </>
    )
}

export default AdminPanel