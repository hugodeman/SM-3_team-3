import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.jsx";
import Vingerspelmenu from "./Vingerspelmenu.jsx";
import Home from "./Home.jsx"; // Optioneel, een aparte Home component
import Navbar from "./components/navbar-mobile.jsx";
import Lesstof from "./Lesstof.jsx";
import Vingerspelnieuweletter from "./components/vingerspelnieuweletter.jsx";
import Vingerspelherhaling from "./components/vingerspelherhaling.jsx";
import Vingerspelcontrole from "./components/vingerspelcontrole.jsx";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/vingerspel",
                element: <Vingerspelmenu />
            },
            {
                path: "/vingerspel/oefening",
                element: <Vingerspelnieuweletter />
            },
            {
                path: "/vingerspel/herhaling",
                element: <Vingerspelherhaling />
            },
            {
                path: "/vingerspel/controle",
                element: <Vingerspelcontrole />
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
        <RouterProvider router={router} />;
    </>
  )
}

export default App;
