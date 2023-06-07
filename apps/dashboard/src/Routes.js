import { useAuthStore } from "context/AuthStore";
import { ErrorPage, PageNotFound } from "context/ErrorPages";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./Dashboard";
import Welcome from "./pages/Welcome";

const Router = () => {
    return createBrowserRouter([
        {
            path: "/",
            element: <Dashboard />,
            children: [
                {
                    path: "",
                    element: <Welcome />
                }
            ],
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