
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Suspense } from "react";
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from "react-i18next";
import Loading from "shared/components/Loading";
import { AuthStoreProvider } from "shared/stores/AuthStore";
import { DashboardStoreProvider } from "shared/stores/DashboardStore";
import createCustomTheme from "shared/theme";
import i18n from "../public/i18n/i18n";
import tailwindConfig from '../tailwind.config';
import CustomRouterProvider from "./Routes";
import "./index.scss";

export const App = () => {
  const theme = createCustomTheme(tailwindConfig);

  console.debug("i18n for host initialized: %O", i18n);
  console.debug("theme for host initialized: %O", theme);

  return (
    // Suspense for microfrontends loading
    <Suspense fallback={<div><Loading /></div>}>

      {/* Theme providers */}
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {/* Internationalization provider */}
        <I18nextProvider i18n={i18n}>

          {/* Store providers */}
          <AuthStoreProvider>
            <DashboardStoreProvider>

              {/* Routes */}
              <CustomRouterProvider />

            </DashboardStoreProvider>
          </AuthStoreProvider>
        </I18nextProvider>

      </ThemeProvider>

    </Suspense>
  );
};

const root = createRoot(document.getElementById("app"));
root.render(<App />);