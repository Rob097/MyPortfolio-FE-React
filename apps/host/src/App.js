
import "@common-lib/styles.scss";
import Auth from "auth/Auth";
import ErrorHandler from "context/ErrorHandler";
import { StoreProvider, useStore } from "context/Store";
import RemoteDashboard from "dashboard/Dashboard";
import RemoteHeader from "header/Header";
import { Suspense } from "react";
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import "./index.css";

const App = () => {
  const [store, dispatch] = useStore();

  return (
    <div>
      <h1 className="text-3xl font-bold underline"><b>Host App</b></h1>
      <p>The app will not gonna work without store</p>
      <ErrorBoundary FallbackComponent={ErrorHandler}>
        <RemoteHeader count={store.count} />
      </ErrorBoundary>
      <ErrorBoundary FallbackComponent={ErrorHandler}>
        <RemoteDashboard dispatch={dispatch} />
      </ErrorBoundary>
      <ErrorBoundary FallbackComponent={ErrorHandler}>
        <Auth />
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