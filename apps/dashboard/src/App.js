import { CustomSnackProvider, SnackbarUtilsConfigurator } from "@/components/alerts";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { AuthStoreProvider } from "shared/stores/AuthStore";
import { DashboardStoreProvider } from "shared/stores/DashboardStore";
import createCustomTheme from "shared/theme";
import i18n from "../public/i18n/i18n";
import tailwindConfig from '../tailwind.config';
import CustomRouterProvider from "./Routes";
import "./index.scss";

const App = () => {
  const theme = createCustomTheme(tailwindConfig);

  console.debug("i18n for dashboard initialized: %O", i18n);
  console.debug("theme for dashboard initialized: %O", theme);
  console.debug("tailwindConfig for dashboard initialized: %O", tailwindConfig);

  return (
    // Theme providers
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <CustomSnackProvider>

        {/* Store providers */}
        <AuthStoreProvider>
          <DashboardStoreProvider>

            <SnackbarUtilsConfigurator />

            {/* Routes */}
            <CustomRouterProvider />

          </DashboardStoreProvider>
        </AuthStoreProvider>

      </CustomSnackProvider>

    </ThemeProvider>
  )
};
const root = createRoot(document.getElementById("app"));
root.render(<App />);