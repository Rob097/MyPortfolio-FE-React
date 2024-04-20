import Home from "dashboard/Home";
import UserProfile from "dashboard/UserProfile";
import SetUp from "auth/SetUp";
import { lazy } from "react";
import { Navigate, Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ErrorPage, NotAllowed, PageNotFound } from "shared/pages/ErrorPages";
import { useAuthStore } from "shared/stores/AuthStore";
import { ROLES as roles } from "shared/utilities/constants";
const SignIn = lazy(() => import("auth/SignIn"));
const SignUp = lazy(() => import("auth/SignUp"));
const StandardLayout = lazy(() => import("dashboard/StandardLayout"));

const DashboardRoutes = (isLoggedIn) => [
    {
        path: "",
        element: <Navigate to="home" replace/>
    },
    {
        path: "home",
        element: <ProtectedRoute isAllowed={isLoggedIn}><Home /></ProtectedRoute>
    },
    {
        path: "profile",
        element: <ProtectedRoute isAllowed={isLoggedIn}><UserProfile /></ProtectedRoute>
    }
]

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
            element: <ProtectedRoute isAllowed={authStore.isLoggedIn} customRedirect="/auth/sign-in" ><StandardLayout /></ProtectedRoute>,
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