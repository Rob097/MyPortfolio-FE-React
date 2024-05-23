import { Navigate, Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "shared/pages/ErrorPages";
import { useAuthStore } from "shared/stores/AuthStore";
import StandardLayout from "./layout/standard";
import PageNotFound from "./pages/404";
import ServerErrorPage from "./pages/500";
import EditEducation from "./pages/Educations/edit";
import EducationsList from "./pages/Educations/list";
import EditExperience from "./pages/Experiences/edit";
import ExperiencesList from "./pages/Experiences/list";
import Home from "./pages/Home";
import EditProject from "./pages/Projects/edit";
import ProjectsList from "./pages/Projects/list";
import UserProfile from "./pages/UserProfile";

export const Routes = [
    {
        path: "",
        element: <StandardLayout />,
        errorElement: <Navigate to="/dashboard/500" replace />,
        children: [
            {
                path: "",
                element: <Navigate to="home" replace />
            },
            {
                path: "404",
                element: <PageNotFound />
            },
            {
                path: "500",
                element: <ServerErrorPage />,
                errorElement: <Navigate to="/error" replace />
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
                    },
                    {
                        path: ":slug",
                        element: <EditProject />
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
                    },
                    {
                        path: ":slug",
                        element: <EditExperience />
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
                    },
                    {
                        path: ":slug",
                        element: <EditEducation />
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
            path: "/error",
            element: <ErrorPage />
        },
        {
            path: "*",
            element: <Navigate to="/dashboard/404" replace />
        }
    ])
};

const CustomRouterProvider = () => {
    const [store, dispatch] = useAuthStore();

    return <RouterProvider router={Router(store)} />
}


export default CustomRouterProvider;