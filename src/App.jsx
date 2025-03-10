import {createBrowserRouter, RouterProvider} from 'react-router';
import Layout from "./Layout.jsx";
import Lesstof from "./Lesstof.jsx";

function App() {
    const router = createBrowserRouter([{
        element: <Layout />,
        children: [
            {
                path: '/lesstof',
                element: <Lesstof/>
            }
        ]
    }]);

    return(
        <>
            <RouterProvider router={router}/>
        </>
    );
}

export default App
