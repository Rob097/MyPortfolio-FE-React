import ErrorHandler from "context/ErrorHandler";
import { useStore } from "context/Store";
import RemoteDashboard from "dashboard/Dashboard";
import RemoteHeader from "header/Header";
import React from "react";
import { ErrorBoundary } from 'react-error-boundary';
import { Link } from "react-router-dom";


const HostHomePage = () => {

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
            <Link to="/auth/login">Go To Login</Link>
        </div>
    );
};
export default HostHomePage;