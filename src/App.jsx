import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.jsx";
import Vingerspelmenu from "./Vingerspelmenu.jsx";
import Home from "./Home.jsx"; // Optioneel, een aparte Home component
import Navbar from "./components/navbar-mobile.jsx";
import Lesstof from "./Lesstof.jsx";
import Les1 from "./lessen/Les1.jsx";

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
                path: '/lesstof',
                element: <Lesstof/>
            },
            {
                path: "les1",
                element: <Les1/>
            }
        ]
    }
]);


function App() {
  return (
    <>
        <Navbar />
        <RouterProvider router={router} />
    </>
  )
}

export default App;
