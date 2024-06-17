import { createContext, useContext, useReducer } from "react";

export const LOCAL_STORAGE_KEY = "DashboardContext";

export const REPLACE = "replace";
export const REPLACE_USER = "replaceUser";
export const AUTH_TOKEN = "authToken";
export const LOGOUT = "logout";
export const OPEN_MEDIA_MANAGER = "openMediaManager";
export const CLOSE_MEDIA_MANAGER = "closeMediaManager";
export const ONLY_IMAGES = "onlyImages";
export const ONLY_PDFS = "onlyPDFs";
export const ON_SELECT = "onSelect";
export const REPLACE_MEDIA_MANAGER = "replaceMediaManager";

const FUNCTIONS = {
    getMainDiary: function () {
        return this.user?.diaries?.find(d => d.isMain);
    }
}
const DEFAULT_STATE = {
    user: null,
    authToken: null,
    mediaManager: {
        open: false,
        onlyImages: false,
        onlyPDFs: false,
        onSelect: null,
    },
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

        case OPEN_MEDIA_MANAGER:
            newState = { ...state, mediaManager: { ...state.mediaManager, open: true } }
            break;
        case CLOSE_MEDIA_MANAGER:
            newState = { ...state, mediaManager: { ...state.mediaManager, open: false } }
            break;
        case ONLY_IMAGES:
            newState = { ...state, mediaManager: { ...state.mediaManager, onlyImages: action.payload.onlyImages } }
            break;
        case ONLY_PDFS:
            newState = { ...state, mediaManager: { ...state.mediaManager, onlyPDFs: action.payload.onlyPDFs } }
            break;
        case ON_SELECT:
            newState = { ...state, mediaManager: { ...state.mediaManager, onSelect: action.payload.onSelect } }
            break;
        case REPLACE_MEDIA_MANAGER: {
            newState = { ...state, mediaManager: { ...DEFAULT_STATE.mediaManager, ...action.payload } }
            break;
        }

        default:
            throw new Error('No action type found');
    }

    const stateToStore = {
        user: newState.user,
        authToken: newState.authToken
    };

    const stringifiedState = JSON.stringify(stateToStore);
    localStorage.setItem(LOCAL_STORAGE_KEY, stringifiedState);

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
    console.log("getLocalValues");
    const localValues = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || DEFAULT_STATE;
    const completeValues = { ...DEFAULT_STATE, ...localValues, ...FUNCTIONS };

    return completeValues;
}