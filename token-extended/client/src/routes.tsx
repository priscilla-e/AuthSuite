import { createBrowserRouter } from "react-router-dom";

import Root from "./pages/root";
import Register from "./pages/register";
import Login from "./pages/login";
import Home from "./pages/home";
import PrivateRoute from "./components/private-route";

const router = createBrowserRouter([
    {
        element: <Root />,
        children: [
            // Unprotected routes
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },
            {
                path: "/",
                element: <PrivateRoute/>,
                children: [
                    // Protected routes
                    { index: true, element: <Home/> }
                ]
            }
        ]
    }
]);

export default router;