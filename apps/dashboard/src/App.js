import { ThemeProvider } from "@mui/material";
import theme from "@rob097/common-lib/assets/theme";
import "@rob097/common-lib/styles.scss";
import { AuthStoreProvider } from "context/AuthStore";
import { SoftUIControllerProvider } from "context/DashboardStore";
import { StoreProvider } from "context/Store";
import React from 'react';
import { createRoot } from 'react-dom/client';
import i18n from "../assets/i18n/i18n";
import CustomRouterProvider from "./Routes";
import "./index.scss";

const App = () => {
  console.debug("i18n for dashboard initialized: %O", i18n);
  return (
    // Theme providers
    <SoftUIControllerProvider>
      <ThemeProvider theme={theme}>

        {/* Store providers */}
        <StoreProvider>
          <AuthStoreProvider>

            {/* Routes */}
            <CustomRouterProvider />

          </AuthStoreProvider>
        </StoreProvider>

      </ThemeProvider>
    </SoftUIControllerProvider>
  )
};
const root = createRoot(document.getElementById("app"));
root.render(<App />);