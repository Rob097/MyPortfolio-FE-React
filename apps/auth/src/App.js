import "common-lib/styles.scss";
import { AuthStoreProvider } from "context/AuthStore";
import { createRoot } from 'react-dom/client';
import {
  RouterProvider
} from "react-router-dom";
import Router from "./Routes";
import "./styles/index.scss";
import i18n from "../assets/i18n/i18n";

const App = () => {
  console.debug("i18n for auth initialized: %O", i18n);
  return (
    <AuthStoreProvider>
      <RouterProvider router={Router} />
    </AuthStoreProvider>
  )
};
const root = createRoot(document.getElementById("app"));
root.render(<App />);