
import "@common-lib/styles.scss";
import { StoreProvider } from "context/Store";
import { Suspense } from "react";
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  Routes
} from "react-router-dom";
import HostRoutes from "./Routes";
import "./index.scss";

export const App = () => {



  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StoreProvider>
        <BrowserRouter>
          <Routes>
            {HostRoutes}
          </Routes>
        </BrowserRouter>
      </StoreProvider>
    </Suspense>
  );
};

const root = createRoot(document.getElementById("app"));
root.render(<App />);