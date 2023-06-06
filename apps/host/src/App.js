
import "@common-lib/styles.scss";
import { StoreProvider } from "context/Store";
import { Suspense } from "react";
import { createRoot } from 'react-dom/client';
import {
  RouterProvider
} from "react-router-dom";
import Router from "./Routes";
import "./index.scss";

export const App = () => {
  return (
    <Suspense fallback={<div>Loadingwwwwwwww...</div>}>
      <StoreProvider>
        <RouterProvider router={Router} />
      </StoreProvider>
    </Suspense>
  );
};

const root = createRoot(document.getElementById("app"));
root.render(<App />);