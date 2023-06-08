import { useAuthStore } from "context/AuthStore";
import { ErrorPage, PageNotFound } from "context/ErrorPages";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

const Router = () => {
    return createBrowserRouter([
        {
            path: "/",
            element: <Outlet />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: "dashboard",
                    element: <Dashboard />,
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