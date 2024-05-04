import { createContext, useContext, useReducer } from "react";

export const LOCAL_STORAGE_KEY = "DashboardContext";

export const REPLACE = "replace";
export const REPLACE_USER = "replaceUser";
export const AUTH_TOKEN = "authToken";
export const LOGOUT = "logout";

const FUNCTIONS = {
    getMainDiary: function () {
        return this.user?.diaries?.find(d => d.isMain);
    }
}
const DEFAULT_STATE = { 
    user: null, 
    authToken: null
};

function reducer(state, action) {
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
        case LOGOUT:
            newState = DEFAULT_STATE;
            break;

        default:
            throw new Error('No action type found');
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));

    /* TODO: Keep this commented for a wile to see if it is necessary (Today is 03/05/2024)
    newState = { ...newState, ...FUNCTIONS}; */

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
    const localValues = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || DEFAULT_STATE;
    const completeValues = { ...localValues, ...FUNCTIONS};

    return completeValues;
}