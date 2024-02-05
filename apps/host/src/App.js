
import "./index.scss";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Suspense } from "react";
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from "react-i18next";
import { AuthStoreProvider } from "shared/stores/AuthStore";
import { SoftUIControllerProvider } from "shared/stores/DashboardStore";
import { StoreProvider } from "shared/stores/Store";
import createCustomTheme from "shared/theme";
import i18n from "../public/i18n/i18n";
import tailwindConfig from '../tailwind.config';
import CustomRouterProvider from "./Routes";

export const App = () => {
  const theme = createCustomTheme(tailwindConfig);

  console.debug("i18n for host initialized: %O", i18n);
  console.debug("theme for host initialized: %O", theme);

  return (
    // Suspense for microfrontends loading
    <Suspense fallback={<div>Loading...</div>}>

      {/* Theme providers */}
      <SoftUIControllerProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          {/* Internationalization provider */}
          <I18nextProvider i18n={i18n}>

            {/* Store providers */}
            <StoreProvider>
              <AuthStoreProvider>

                {/* Routes */}
                <CustomRouterProvider />

              </AuthStoreProvider>
            </StoreProvider>

          </I18nextProvider>

        </ThemeProvider>
      </SoftUIControllerProvider>

    </Suspense>
  );
};

const root = createRoot(document.getElementById("app"));
root.render(<App />);