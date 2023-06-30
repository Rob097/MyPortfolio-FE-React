import { createContext, useContext, useReducer } from "react";

const DEFAULT_STATE = { activeStep: 0, skipped: new Set() };

function reducer(state, action) {
    let newState = {};
    switch (action.type) {
        case "next":
            newState = handleNext(state);
            break;
        case "back":
            newState = handleBack(state);
            break;
        case "skip":
            newState = handleSkip(state);
            break;
        case "reset":
            newState = DEFAULT_STATE;
            break;
        default:
            throw new Error('No action type found');
    }

    return newState;
}

export const StepperContext = createContext();

export const useStepperStore = () => {
    return useContext(StepperContext);
};

export const StepperStoreProvider = ({ children }) => {
    const value = useReducer(reducer, DEFAULT_STATE);

    return <StepperContext.Provider value={value}>{children}</StepperContext.Provider>;
};


/**********************/
/* DISPATCH FUNCTIONS */
/**********************/

function handleNext(state) {
    let newSkipped = state.skipped;
    if (isStepSkipped(state.skipped, state.activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(state.activeStep);
    }

    return { ...state, activeStep: state.activeStep + 1, skipped: newSkipped };
};

function handleBack(state) {
    return { ...state, activeStep: state.activeStep - 1 };
}

function handleSkip(state) {
    const newSkipped = new Set(state.skipped.values());
    newSkipped.add(state.activeStep);

    return { ...state, activeStep: state.activeStep + 1, skipped: newSkipped };
}


/*******************/
/* UTILS FUNCTIONS */
/*******************/

function isStepSkipped(skipped, step) {
    return skipped.has(step);
};