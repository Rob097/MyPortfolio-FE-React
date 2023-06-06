
import "@common-lib/styles.scss";
import { StoreProvider } from "context/Store";
import { Suspense } from "react";
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { HostRoutes, authRoutes } from "./Routes";
import "./index.scss";

export const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StoreProvider>
        <BrowserRouter>
          <Routes>
            <Route path="">
              {HostRoutes}
            </Route>
            <Route path="/auth">
              {authRoutes}
            </Route>
          </Routes>
        </BrowserRouter>
      </StoreProvider>
    </Suspense>
  );
};

const root = createRoot(document.getElementById("app"));
root.render(<App />);