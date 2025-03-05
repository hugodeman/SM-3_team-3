import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.jsx";
import Vingerspelmenu from "./Vingerspelmenu.jsx";
import Home from "./Home.jsx"; // Optioneel, een aparte Home component
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from "./components/navbar-mobile.jsx";

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
  const [count, setCount] = useState(0)

  return (
    <>
        <Navbar />
        <RouterProvider router={router} />;
    </>
  )
}

export default App;
