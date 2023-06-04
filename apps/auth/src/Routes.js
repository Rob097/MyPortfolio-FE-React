import Login from "./pages/Login";
import HomePage from "./pages/Home";
import { Route } from "react-router-dom";

const AuthRoutes = [
        <Route path="/" element={<HomePage></HomePage>}></Route>,
        <Route path="login" element={<Login />} />
];

export default AuthRoutes;