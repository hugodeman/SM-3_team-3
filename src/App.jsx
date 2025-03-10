import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./Layout.jsx";
import Vingerspelmenu from "./Vingerspelmenu.jsx";
import Home from "./Home.jsx";
import Lesstof from "./Lesstof.jsx";
import Navbar from "./components/navbar-mobile.jsx";

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/vingerspel",
                element: <Vingerspelmenu/>
            },
            {
                path: '/lesstof',
                element: <Lesstof/>
            }
        ]
    }
]);


function App() {
    return (
        <>
            <Navbar/>
            <RouterProvider router={router}/>;
        </>
    )
}

export default App;
