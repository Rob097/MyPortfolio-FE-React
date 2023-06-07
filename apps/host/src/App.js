
import "common-lib/styles.scss";
import { AuthStoreProvider } from "context/AuthStore";
import { StoreProvider } from "context/Store";
import Header from "header/Header";
import { Suspense } from "react";
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from "react-i18next";
import i18n from "../assets/i18n/i18n";
import CustomRouterProvider from "./Routes";
import "./index.scss";

export const App = () => {
  console.debug("i18n for host initialized: %O", i18n);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StoreProvider>
        <AuthStoreProvider>
          <I18nextProvider i18n={i18n}>
            <Header />
            <CustomRouterProvider />
          </I18nextProvider>
        </AuthStoreProvider>
      </StoreProvider>
    </Suspense>
  );
};

const root = createRoot(document.getElementById("app"));
root.render(<App />);