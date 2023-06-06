import { Route } from "react-router-dom";
import HomePage from "./pages/Home";
import Login from "./pages/Login";

export const PrivateAuthRoutes = [
        <Route key="auth-home" path="" element={<HomePage></HomePage>} private={true} />,
        <Route key="auth-login" path="login" element={<Login />} />
];

export const AuthRoutes = PrivateAuthRoutes.filter(route => !route.props.private);