import "common-lib/styles.scss";
import { AuthStoreProvider } from "context/AuthStore";
import { StoreProvider } from "context/Store";
import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import CustomRouterProvider from "./Routes";
import "./index.css";

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
      <StoreProvider>
        <AuthStoreProvider>
          <CustomRouterProvider />
        </AuthStoreProvider>
      </StoreProvider>
    </Suspense>
);
const root = createRoot(document.getElementById("app"));
root.render(<App />);