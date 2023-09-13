import React, { createContext, useContext, useReducer } from 'react';
import cloneDeep from 'lodash/cloneDeep';

const Store = createContext();

export function useGlobalState() {
	return useContext(Store);
}

const initialState = {
};

function reducer(state, action) {
    let newState = cloneDeep(state);
	
    switch (action.type) {
        default:
            throw new Error('No action type found');
    }

    return newState;
}

export const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <Store.Provider value={[state, dispatch]}>{children}</Store.Provider>;
};