import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.jsx";
import Vingerspelmenu from "./Vingerspelmenu.jsx";
import Home from "./Home.jsx"; // Optioneel, een aparte Home component

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
            }
        ]
    }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
