import { createContext, useContext, useReducer } from "react";

export const LOCAL_STORAGE_KEY = "DashboardContext";

export const REPLACE = "replace";
export const REPLACE_USER = "replaceUser";
export const AUTH_TOKEN = "authToken";

const DEFAULT_STATE = { user: null, authToken: null };

function reducer(state, action) {
  console.log("reducer called", action);
    let newState = {};
    switch (action.type) {
        case REPLACE:
            newState = action.payload;
            break;
        case REPLACE_USER:
            newState = { ...state, user: action.payload.user }
            break;
        case AUTH_TOKEN:
            newState = { ...state, authToken: action.payload.authToken }
            break;

        default:
            throw new Error('No action type found');
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
    return newState;
}

export const DashboardContext = createContext();

export const DashboardStoreProvider = ({ children }) => {
    const value = useReducer(reducer, getLocalValues());

    return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};

export const useDashboardStore = () => {
    return useContext(DashboardContext);
};

function getLocalValues() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || DEFAULT_STATE;
}