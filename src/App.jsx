import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.jsx";
import Vingerspelmenu from "./Vingerspelmenu.jsx";
import Profile from "./Profile.jsx";
import Lesstof from "./Lesstof.jsx";
import Vingerspelnieuweletter from "./components/vingerspelnieuweletter.jsx";
import Vingerspelherhaling from "./components/vingerspelherhaling.jsx";
import Vingerspelcontrole from "./components/vingerspelcontrole.jsx";
import Les from "./lessen/Les.jsx";
import Pauzemenu from "./components/pauzemenu.jsx";
import MainPage from "./MainPage.jsx";
import Woordenoverzicht from "./Woordenoverzicht.jsx";
import OpdrachtGebaren from "./opdrachten/Opdracht.jsx";

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
                path: "/vingerspel/nieuweletter/:letter",
                element: <Vingerspelnieuweletter />
            },
            {
                path: "/vingerspel/herhaling/:letter",
                element: <Vingerspelherhaling />
            },
            {
                path: "/vingerspel/controle/:letter",
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
                path: '/opdracht2/:lessonId',
                element: <OpdrachtGebaren/>
            },

            // path: "/lesstof/woordenoverzicht/:lessonId"
            {
                path: "/lesstof/week1/woordenoverzicht",
                element: <Woordenoverzicht/>
            },
            {
                path: "/pauze",
                element: <Pauzemenu />
            }
        ]
    }
]);

function App() {
  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

export default App;