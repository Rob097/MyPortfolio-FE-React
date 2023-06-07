import { createContext, useContext, useReducer } from "react";

const DEFAULT_STATE = { isLoggedIn: false, token: null, user: null };

function reducer(state, action) {
    let newState = {};
    switch (action.type) {
        case "replace":
            newState = action.payload;
            break;
        case "login":
            newState = { isLoggedIn: true, token: action.payload.token, user: action.payload.user };
            break;
        case "logout":
            newState = { isLoggedIn: false, token: null, user: null };
            break;
        default:
            throw new Error('No action type found');
    }

    localStorage.setItem("AuthContext", JSON.stringify(newState));
    return newState;
}

export const AuthContext = createContext();

export const AuthStoreProvider = ({ children }) => {
    const value = useReducer(reducer, getLocalValues());

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthStore = () => {
    return useContext(AuthContext);
};

function getLocalValues() {
    return JSON.parse(localStorage.getItem("AuthContext")) || DEFAULT_STATE;
}