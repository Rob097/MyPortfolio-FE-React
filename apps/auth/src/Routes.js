import { ErrorPage, PageNotFound } from "@rob097/common-lib/pages/ErrorPages";
import { useAuthStore } from "context/AuthStore";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const Router = (authStore) => {
        return createBrowserRouter([
                {
                        path: "/",
                        element: <Navigate to="/sign-in" />,
                },
                {
                        path: "/sign-in",
                        element: <SignIn />,
                        errorElement: <ErrorPage />

                },
                {
                        path: "/sign-up",
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