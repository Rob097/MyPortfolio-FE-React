import "@common-lib/styles.scss";
import { createRoot } from 'react-dom/client';
import AuthRoutes from "./Routes";
import "./styles/index.scss";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {AuthRoutes}
      </Routes>
    </BrowserRouter>
  )
};
const root = createRoot(document.getElementById("app"));
root.render(<App />);