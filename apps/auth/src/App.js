import "@common-lib/styles.scss";
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  Routes
} from "react-router-dom";
import { AuthRoutes } from "./Routes";
import "./styles/index.scss";


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