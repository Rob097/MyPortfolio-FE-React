
import { ThemeProvider } from "@mui/material";
import theme from "common-lib/assets/theme";
import "common-lib/styles.scss";
import { AuthStoreProvider } from "context/AuthStore";
import { SoftUIControllerProvider } from "context/DashboardStore";
import { StoreProvider } from "context/Store";
import Header from "header/Header";
import { Suspense, useEffect } from "react";
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from "react-i18next";
import i18n from "../assets/i18n/i18n";
import CustomRouterProvider from "./Routes";
import "./index.scss";

export const App = () => {

  useEffect(() => {
    console.log("theme: %O", theme);
  }, [theme]);

  console.debug("i18n for host initialized: %O", i18n);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StoreProvider>
        <AuthStoreProvider>
          <SoftUIControllerProvider>
            <ThemeProvider theme={theme}>
              <I18nextProvider i18n={i18n}>
                <CustomRouterProvider />
              </I18nextProvider>
            </ThemeProvider>
          </SoftUIControllerProvider>
        </AuthStoreProvider>
      </StoreProvider>
    </Suspense>
  );
};

const root = createRoot(document.getElementById("app"));
root.render(<App />);