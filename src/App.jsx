import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.jsx";
import Vingerspelmenu from "./Vingerspelmenu.jsx";
import Profile from "./Profile.jsx";
import { useState } from 'react'
import Home from "./Home.jsx";
import Lesstof from "./Lesstof.jsx";
import Vingerspelnieuweletter from "./components/vingerspelnieuweletter.jsx";
import Vingerspelherhaling from "./components/vingerspelherhaling.jsx";
import Vingerspelcontrole from "./components/vingerspelcontrole.jsx";
import Les1 from "./lessen/Les1.jsx";
import Pauzemenu from "./components/pauzemenu.jsx";

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
                path: "/profile",
                element: <Profile />
            },
            {
                path: '/lesstof',
                element: <Lesstof/>
            },
            {
                path: "/lesstof/week1",
                element: <Les1/>
            },
            {
                path: "/pauze",
                element: <Pauzemenu />
            }
        ]
    }
]);


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

export default App;
