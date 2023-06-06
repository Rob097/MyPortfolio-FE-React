import "@common-lib/styles.scss";
import { createRoot } from 'react-dom/client';
import {
  RouterProvider
} from "react-router-dom";
import Router from "./Routes";
import "./styles/index.scss";


const App = () => {
  return (
    <RouterProvider router={Router} />
  )
};
const root = createRoot(document.getElementById("app"));
root.render(<App />);