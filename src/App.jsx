import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute.jsx";
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
import Opdracht_2 from "./opdrachten/Opdracht-2.jsx";
import ZinnenMaken from "./opdrachten/ZinnenMaken.jsx";
import Progress from "./Progress.jsx";
import AdminRouteProtection from "./components/AdminRouteProtection.jsx";
import AdminPanel from "./AdminPanel.jsx";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <MainPage />
            },
            {
                path: "/admin",
                element: (
                    <AdminRouteProtection>
                        <AdminPanel/>
                    </AdminRouteProtection>
                )
            },
            {
                path: "/vingerspel",
                element: (
                    <ProtectedRoute>
                        <Vingerspelmenu />
                    </ProtectedRoute>
                )
            },
            {
                path: "/vingerspel/nieuweletter/:id",
                element: (
                    <ProtectedRoute>
                        <Vingerspelnieuweletter />
                    </ProtectedRoute>
                )
            },
            {
                path: "/vingerspel/herhaling/:id",
                element: (
                    <ProtectedRoute>
                        <Vingerspelherhaling />
                    </ProtectedRoute>
                )
            },
            {
                path: "/vingerspel/controle/:id",
                element: (
                    <ProtectedRoute>
                        <Vingerspelcontrole />
                    </ProtectedRoute>
                )
            },
            {
                path: "/profile",
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                )
            },
            {
                path: "/progress",
                element: (
                    <ProtectedRoute>
                        <Progress />
                    </ProtectedRoute>
                )
            },
            {
                path: "/lesstof",
                element: (
                    <ProtectedRoute>
                        <Lesstof />
                    </ProtectedRoute>
                )
            },
            {
                path: "/les/:lessonId",
                element: (
                    <ProtectedRoute>
                        <Les />
                    </ProtectedRoute>
                )
            },
            {
                path: "/opdracht1/:lessonId",
                element: (
                    <ProtectedRoute>
                        <OpdrachtGebaren />
                    </ProtectedRoute>
                )
            },
            {
                path: "/opdracht2/:lessonId",
                element: (
                    <ProtectedRoute>
                        <Opdracht_2 />
                    </ProtectedRoute>
                )
            },
            {
                path: "/opdracht3/:lessonId",
                element: (
                    <ProtectedRoute>
                        <ZinnenMaken />
                    </ProtectedRoute>
                )
            },
            {
                path: "woordenoverzicht/:lessonId",
                element: (
                    <ProtectedRoute>
                        <Woordenoverzicht />
                    </ProtectedRoute>
                )
            },
            {
                path: "/pauze",
                element: (
                    <ProtectedRoute>
                        <Pauzemenu />
                    </ProtectedRoute>
                )
            }
        ]
    }
]);

function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
