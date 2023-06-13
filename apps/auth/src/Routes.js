import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import SignIn from "./pages/SignIn";
import { ErrorPage, PageNotFound } from "common-lib/pages/ErrorPages";

const Router = createBrowserRouter([
        {
                path: "/",
                element: <HomePage />,
                errorElement: <ErrorPage />
        },
        {
                path: "/login",
                element: <SignIn />,
                errorElement: <ErrorPage />

        },
        {
                path: "*",
                element: <PageNotFound />
        }
]);

export default Router;