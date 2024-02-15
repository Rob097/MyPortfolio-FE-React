import { createContext, useContext, useReducer } from "react";

export const LOCAL_STORAGE_KEY = "AuthContext";

export const REPLACE = "replace";
export const REPLACE_USER = "replaceUser";
export const LOGIN = "login";
export const LOGOUT = "logout";

const DEFAULT_STATE = { isLoggedIn: false, token: null, user: null };

function reducer(state, action) {
    let newState = {};
    switch (action.type) {
        case REPLACE:
            newState = action.payload;
            break;
        case REPLACE_USER:
            newState = { ...state, user: action.payload.user }
            break;
        case LOGIN:
            newState = { isLoggedIn: true, token: action.payload.token, user: action.payload.user };
            break;
        case LOGOUT:
            newState = { isLoggedIn: false, token: null, user: null };
            break;
        default:
            throw new Error('No action type found');
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
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
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || DEFAULT_STATE;
}