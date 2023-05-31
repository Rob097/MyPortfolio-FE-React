
import React, { Suspense } from "react";
import {createRoot} from 'react-dom/client';
import ErrorBoundary from "./ErrorBoundary";
import { useStore, StoreProvider } from "store/store";
import RemoteHeader from "header/Header";
import RemoteDashboard from "dashboard/Dashboard";
import "./index.css";
import "@common-lib/styles.scss"

const App = () => {
  const [store, dispatch] = useStore();

  return (
    <div>
      <h1 className="text-3xl font-bold underline"><b>Host App</b></h1>
      <p>The app will not gonna work without store</p>
      <ErrorBoundary>
        <RemoteHeader count={store.count} />
      </ErrorBoundary>
      <ErrorBoundary>
        <RemoteDashboard dispatch={dispatch} />
      </ErrorBoundary>
      <footer>
        <p>Host Footer</p>
        <button
          onClick={() => {
            dispatch({
              type: "decrement",
            });
          }}
        >
          Decrement
        </button>
      </footer>
    </div>
  );
};

const root = createRoot(document.getElementById("app"));
root.render(
  <Suspense fallback={<div>Loading...</div>}>
    <StoreProvider>
      <App />
    </StoreProvider>
  </Suspense>
);