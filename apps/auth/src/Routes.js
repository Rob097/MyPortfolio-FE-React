import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import Login from "./pages/Login";
import { ErrorPage, PageNotFound } from "context/ErrorPages";

const Router = createBrowserRouter([
        {
                path: "/",
                element: <HomePage />,
                errorElement: <ErrorPage />
        },
        {
                path: "/login",
                element: <Login />,
                errorElement: <ErrorPage />

        },
        {
                path: "*",
                element: <PageNotFound />
        }
]);

export default Router;