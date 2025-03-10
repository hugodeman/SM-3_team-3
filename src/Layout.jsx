import {Link, Outlet} from "react-router";

function Layout(){
    return (
        <>
            <main className="container mx-auto px-6 py-6">
                <Outlet/>
            </main>
        </>
    )
}

export default Layout;