import SetUp from "auth/SetUp";
import { Routes as DashboardInternalRoutes } from "dashboard/Routes";
import { lazy } from "react";
import { Navigate, Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ErrorPage, NotAllowed, PageNotFound } from "shared/pages/ErrorPages";
import { useAuthStore } from "shared/stores/AuthStore";
const SignIn = lazy(() => import("auth/SignIn"));
const SignUp = lazy(() => import("auth/SignUp"));

const AuthRoutes = (isLoggedIn) => [
    {
        path: "",
        element: <Navigate to="sign-in" />,
    },
    {
        path: "setup",
        element: <SetUp />
    },
    {
        path: "sign-in",
        element: <ProtectedRoute isAllowed={!isLoggedIn}><SignIn /></ProtectedRoute>
    },
    {
        path: "sign-up",
        element: <ProtectedRoute isAllowed={!isLoggedIn}><SignUp /></ProtectedRoute>
    }
]

const HostRoutes = (authStore) => [
    {
        path: "",
        element: <Navigate to="/dashboard" replace />
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
            element: <ProtectedRoute isAllowed={authStore.isLoggedIn} customRedirect="/auth/sign-in" ><Outlet /></ProtectedRoute>,
            children: DashboardInternalRoutes,
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
    customRedirect,
    defaultRedirect = '/not-allowed',
    children,
}) => {
    if (!isAllowed) {
        return <Navigate to={customRedirect || defaultRedirect} replace />;
    }

    return children ? children : <Outlet />;
};


const CustomRouterProvider = () => {
    const [store, dispatch] = useAuthStore();

    return <RouterProvider router={Router(store)} />
}


export default CustomRouterProvider;