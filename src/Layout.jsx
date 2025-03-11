import {Link, Outlet} from "react-router-dom";

function Layout() {
    return (
        <div>
            <nav>
                {/*<Link to="/">Home</Link>*/}
                {/*<Link to="/vingerspel">Vingerspel</Link>*/}
            </nav>
            <Outlet/>
        </div>
    );
}

export default Layout;