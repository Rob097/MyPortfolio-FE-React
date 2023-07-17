
import { ThemeProvider } from "@mui/material";
import theme from "@rob097/common-lib/assets/theme";
import "@rob097/common-lib/styles.scss";
import { AuthStoreProvider } from "context/AuthStore";
import { SoftUIControllerProvider } from "context/DashboardStore";
import { StoreProvider } from "context/Store";
import { Suspense } from "react";
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from "react-i18next";
import i18n from "../assets/i18n/i18n";
import CustomRouterProvider from "./Routes";
import "./styles/index.scss";

export const App = () => {
  console.debug("i18n for host initialized: %O", i18n);
  return (
    // Suspense for microfrontends loading
    <Suspense fallback={<div>Loading...</div>}>

      {/* Theme providers */}
      <SoftUIControllerProvider>
        <ThemeProvider theme={theme}>

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