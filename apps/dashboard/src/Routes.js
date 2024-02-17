import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ErrorPage, PageNotFound } from "shared/pages/ErrorPages";
import { useAuthStore } from "shared/stores/AuthStore";
import StandardLayout from "./layout/standard";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";

const Router = () => {
    return createBrowserRouter([
        {
            path: "/",
            element: <StandardLayout />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: "home",
                    element: <Home />,
                },
                {
                    path: "profile",
                    element: <UserProfile />
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