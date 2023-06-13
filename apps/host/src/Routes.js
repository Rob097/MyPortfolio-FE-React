import { ROLES as roles } from "common-lib/constants";
import { useAuthStore } from "context/AuthStore";
import { ErrorPage, NotAllowed, PageNotFound } from "common-lib/pages/ErrorPages";
import Dashboard from "dashboard/Dashboard";
import { lazy } from "react";
import { Navigate, Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Example from "./components/example";
import HostHomePage from "./pages/HostHomePage";
import Welcome from "./pages/Welcome";
const SignIn = lazy(() => import("auth/SignIn"));

const DashboardRoutes = (isLoggedIn) => [
    {
        path: "",
        element: <ProtectedRoute isAllowed={isLoggedIn}><Welcome /></ProtectedRoute>
    }
]

const AuthRoutes = (isLoggedIn) => [
    {
        path: "login",
        element: <ProtectedRoute isAllowed={true}><SignIn /></ProtectedRoute>
    }
]

const HostRoutes = (authStore) => [
    {
        path: "",
        element: <HostHomePage />
    },
    {
        path: "welcome",
        element: <ProtectedRoute isAllowed={authStore?.user?.roles.includes(roles.ROLE_BASIC)}><Example /></ProtectedRoute>
    }
];

const Router = (authStore) => {
    return createBrowserRouter([
        {
            path: "/",
            element: <Outlet />,
            children: HostRoutes(authStore),
            errorElement: <ErrorPage />
        },
        {
            path: "/auth",
            element: <Outlet />,
            children: AuthRoutes(authStore.isLoggedIn),
            errorElement: <ErrorPage />
        },
        {
            path: "/dashboard",
            element: <Dashboard />,
            children: DashboardRoutes(authStore.isLoggedIn),
            errorElement: <ErrorPage />
        },
        {
            path: "/not-allowed",
            element: <NotAllowed />
        },
        {
            path: "*",
            element: <PageNotFound />
        }
    ])
};

/***************************************************************/

const ProtectedRoute = ({
    isAllowed,
    redirectPath = '/not-allowed',
    children,
}) => {
    if (!isAllowed) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
};


const CustomRouterProvider = () => {
    const [store, dispatch] = useAuthStore();

    return <RouterProvider router={Router(store)} />
}


export default CustomRouterProvider;