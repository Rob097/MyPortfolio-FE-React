import { ErrorPage, PageNotFound } from "shared/pages/ErrorPages";
import { useAuthStore } from "shared/stores/AuthStore";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const Router = () => {
        return createBrowserRouter([
                {
                        path: "/",
                        element: <Navigate to="/auth/sign-in" />,
                },
                {
                        path: "/auth",
                        element: <Navigate to="/auth/sign-in" />,
                },
                {
                        path: "/auth/sign-in",
                        element: <SignIn />,
                        errorElement: <ErrorPage />

                },
                {
                        path: "/auth/sign-up",
                        element: <SignUp />,
                        errorElement: <ErrorPage />

                },
                {
                        path: "*",
                        element: <PageNotFound />
                }
        ])
};


const CustomRouterProvider = () => {
        const [store, dispatch] = useAuthStore();

        return <RouterProvider router={Router(store)} />
}


export default CustomRouterProvider;