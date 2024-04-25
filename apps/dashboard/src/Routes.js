import { Navigate, Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ErrorPage, PageNotFound } from "shared/pages/ErrorPages";
import { useAuthStore } from "shared/stores/AuthStore";
import StandardLayout from "./layout/standard";
import EducationsList from "./pages/Educations/list";
import ExperiencesList from "./pages/Experiences/list";
import Home from "./pages/Home";
import ProjectsList from "./pages/Projects/list";
import UserProfile from "./pages/UserProfile";

export const Routes = [
    {
        path: "",
        element: <StandardLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <Navigate to="home" replace />
            },
            {
                path: "home",
                element: <Home />,
            },
            {
                path: "profile",
                element: <UserProfile />
            },
            {
                path: "projects",
                element: <Outlet />,
                children: [
                    {
                        path: "",
                        element: <ProjectsList />
                    }
                ]
            },
            {
                path: "experiences",
                element: <Outlet />,
                children: [
                    {
                        path: "",
                        element: <ExperiencesList />
                    }
                ]
            },
            {
                path: "educations",
                element: <Outlet />,
                children: [
                    {
                        path: "",
                        element: <EducationsList />
                    }
                ]
            },
        ]
    }
]

const Router = () => {
    return createBrowserRouter([
        /* If it is exactly "/dashboard", redirect to "/dashboard/home": */
        {
            path: "/",
            element: <Navigate to="/dashboard/home" replace />
        },
        {
            path: "/dashboard",
            element: <Outlet />,
            children: Routes
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