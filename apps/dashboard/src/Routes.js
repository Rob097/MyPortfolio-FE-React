import { useAuthStore } from "context/AuthStore";
import { ErrorPage, PageNotFound } from "context/ErrorPages";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignIn from "./auth/sign-in";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";

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
                }
            ]
        },
        {
            path: "login",
            element: <SignIn />,
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