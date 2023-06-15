import { ThemeProvider } from "@mui/material";
import theme from "common-lib/assets/theme";
import "common-lib/styles.scss";
import { AuthStoreProvider } from "context/AuthStore";
import { SoftUIControllerProvider } from "context/DashboardStore";
import { StoreProvider } from "context/Store";
import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import CustomRouterProvider from "./Routes";
import "./index.scss";

const App = () => (
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
);
const root = createRoot(document.getElementById("app"));
root.render(<App />);