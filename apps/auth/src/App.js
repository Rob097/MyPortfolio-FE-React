import "common-lib/styles.scss";
import { AuthStoreProvider } from "context/AuthStore";
import { createRoot } from 'react-dom/client';
import {
  RouterProvider
} from "react-router-dom";
import Router from "./Routes";
import "./styles/index.scss";


const App = () => {
  return (
    <AuthStoreProvider>
      <RouterProvider router={Router} />
    </AuthStoreProvider>
  )
};
const root = createRoot(document.getElementById("app"));
root.render(<App />);