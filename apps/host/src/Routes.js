import { Outlet, createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import HostHomePage from "./pages/HostHomePage";
import { ErrorPage, PageNotFound } from "context/ErrorPages";
const Login = lazy(() => import("auth/Login"));


const AuthRoutes = [
    {
        path: "login",
        element: <Login />
    }
]

const HostRoutes = [
    {
        path: "",
        element: <HostHomePage />
    }
];

const Router = createBrowserRouter([
    {
      path: "/",
      element: <Outlet />,
      children: HostRoutes,
      errorElement: <ErrorPage />
    },
    {
        path: "/auth",
        element: <Outlet />,
        children: AuthRoutes,
        errorElement: <ErrorPage />
    },
    {
        path: "*",
        element: <PageNotFound />
    }
  ]);

export default Router;