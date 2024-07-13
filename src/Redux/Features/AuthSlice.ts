"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface AuthState{
    value: {
        token: string,
        isAuth: boolean
    }
}

const initialState : AuthState = {
    value: {
        token: "",
        isAuth: false
    }
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action)=>{
            state.value = {
                isAuth: true,
                token: action.payload
            }
        },
        logout: (state)=>{
            state.value = {
                token: "",
                isAuth: false
            }
        }
    }
});


export const {login, logout} = authSlice.actions;

export default authSlice.reducer;

