import HostHomePage from "./pages/HostHomePage";
import { Route } from "react-router-dom";
import React, { Suspense } from "react";

const Login = React.lazy(() => import('auth/Login'));

const HostRoutes = [
    <Route path="/" element={<Suspense fallback="loading..."><HostHomePage /></Suspense>}></Route>,
    <Route path="/auth/login" element={<Suspense fallback="loading..."><Login /></Suspense>} />
];

export default HostRoutes;