import "common-lib/styles.scss";
import { AuthStoreProvider } from "context/AuthStore";
import { createRoot } from 'react-dom/client';
import {
  RouterProvider
} from "react-router-dom";
import Router from "./Routes";
import "./styles/index.scss";
import i18n from "../assets/i18n/i18n";
import { SoftUIControllerProvider } from "context/DashboardStore";
import theme from "common-lib/assets/theme";
import { ThemeProvider } from "@mui/material";

const App = () => {
  console.debug("i18n for auth initialized: %O", i18n);
  return (
    <AuthStoreProvider>
      <SoftUIControllerProvider>
        <ThemeProvider theme={theme}>
          <RouterProvider router={Router} />
        </ThemeProvider>
      </SoftUIControllerProvider>
    </AuthStoreProvider>
  )
};
const root = createRoot(document.getElementById("app"));
root.render(<App />);