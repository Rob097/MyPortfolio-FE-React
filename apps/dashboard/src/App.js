import "./index.scss";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { AuthStoreProvider } from "shared/stores/AuthStore";
import { SoftUIControllerProvider } from "shared/stores/DashboardStore";
import { StoreProvider } from "shared/stores/Store";
import createCustomTheme from "shared/theme";
import i18n from "../public/i18n/i18n";
import tailwindConfig from '../tailwind.config';
import CustomRouterProvider from "./Routes";
import { CustomSnackProvider, SnackbarUtilsConfigurator } from "@/components/alerts/snack";

const App = () => {
  const theme = createCustomTheme(tailwindConfig);

  console.debug("i18n for dashboard initialized: %O", i18n);
  console.debug("theme for dashboard initialized: %O", theme);
  console.debug("tailwindConfig for dashboard initialized: %O", tailwindConfig);

  return (
    // Theme providers
    <SoftUIControllerProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <CustomSnackProvider>

          {/* Store providers */}
          <StoreProvider>
            <AuthStoreProvider>

              <SnackbarUtilsConfigurator />

              {/* Routes */}
              <CustomRouterProvider />

            </AuthStoreProvider>
          </StoreProvider>

        </CustomSnackProvider>

      </ThemeProvider>
    </SoftUIControllerProvider>
  )
};
const root = createRoot(document.getElementById("app"));
root.render(<App />);