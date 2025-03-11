import {Link, Outlet} from "react-router-dom";

function Layout() {
    return (
        <div>
            <nav>
                {/*<Link to="/">Home</Link>*/}
                {/*<Link to="/vingerspel">Vingerspel</Link>*/}
            </nav>
            <img className="absolute right-0 top-0 m-4 max-w-16" src="../src/assets/Logo/HR-Logo-200px.png" alt="HR Logo"/>
            <div className="pt-20">
            <Outlet/>
            </div>
        </div>
    );
}

export default Layout;