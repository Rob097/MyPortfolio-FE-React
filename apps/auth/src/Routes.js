import { ErrorPage, PageNotFound } from "common-lib/pages/ErrorPages";
import { useAuthStore } from "context/AuthStore";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import SignIn from "./pages/SignIn";

const Router = (authStore) => {
        return createBrowserRouter([
                {
                        path: "/",
                        element: <Navigate to="/login" />,
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
        ])
};


const CustomRouterProvider = () => {
        const [store, dispatch] = useAuthStore();

        return <RouterProvider router={Router(store)} />
}


export default CustomRouterProvider;