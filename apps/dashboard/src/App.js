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
  <Suspense fallback={<div>Loading...</div>}>
    <StoreProvider>
      <AuthStoreProvider>
        <SoftUIControllerProvider>
          <ThemeProvider theme={theme}>
            <CustomRouterProvider />
          </ThemeProvider>
        </SoftUIControllerProvider>
      </AuthStoreProvider>
    </StoreProvider>
  </Suspense>
);
const root = createRoot(document.getElementById("app"));
root.render(<App />);