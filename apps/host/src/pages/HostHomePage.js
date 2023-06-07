import { useStore } from "context/Store";
import React from "react";
import { Link } from "react-router-dom";


const HostHomePage = () => {

    const [store, dispatch] = useStore();

    return (
        <div>
            <h1 className="text-3xl font-bold underline"><b>Host App</b></h1>
            <p>The app will not gonna work without store</p>
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