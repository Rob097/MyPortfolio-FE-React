import { ErrorPage, PageNotFound } from "common-lib/pages/ErrorPages";
import { useAuthStore } from "context/AuthStore";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";

const Router = () => {
    return createBrowserRouter([
        {
            path: "/",
            element: <Dashboard />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: "home",
                    element: <Home />,
                },
                {
                    path: "profile",
                    element: <UserProfile />,
                }
            ]
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