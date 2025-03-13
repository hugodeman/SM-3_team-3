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
import Les from "./lessen/Les.jsx";
import Pauzemenu from "./components/pauzemenu.jsx";
import MainPage from "./MainPage.jsx";
import Opdracht from "./opdrachten/Opdracht.jsx";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <MainPage />
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
                path: "/les/:lessonId",
                element: <Les/>
            },
            {
                path: '/opdracht/:lessonId',
                element: <Opdracht/>
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
