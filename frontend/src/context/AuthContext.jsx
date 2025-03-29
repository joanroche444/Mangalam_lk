import { createContext, useReducer, useState } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type){
        case 'LOGIN':
            return { user: }
    }
}

export const AuthContextProvider =  ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })
}