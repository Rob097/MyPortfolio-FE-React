import { Navigate, Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ErrorPage, PageNotFound } from "shared/pages/ErrorPages";
import { useAuthStore } from "shared/stores/AuthStore";
import StandardLayout from "./layout/standard";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";

const Router = () => {
    return createBrowserRouter([
        /* If it is exactly "/dashboard", redirect to "/dashboard/home": */
        {
            path: "/",
            element: <Navigate to="/dashboard/home" replace/>
        },
        {
            path: "/dashboard",
            element: <Outlet />,
            children: [
                {
                    path: "",
                    element: <StandardLayout />,
                    errorElement: <ErrorPage />,
                    children: [
                        {
                            path: "",
                            element: <Navigate to="home" replace/>
                        },
                        {
                            path: "home",
                            element: <Home />,
                        },
                        {
                            path: "profile",
                            element: <UserProfile />
                        }
                    ]
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