import { Route } from "react-router-dom";
import HostHomePage from "./pages/HostHomePage";
const { AuthRoutes } = await import('auth/AuthRoutes');

export const authRoutes = AuthRoutes.map((route) => (
    <Route
        key={route.props.key}
        path={route.props.path}
        element={route.props.element}
    />
))

export const HostRoutes = [
    <Route path="/" element={<HostHomePage />}></Route>
];