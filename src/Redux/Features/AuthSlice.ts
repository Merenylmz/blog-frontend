"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface AuthState{
    value: {
        token: string,
        isAuth: boolean,
        profilePhoto: string|null,

    }
}

const initialState : AuthState = {
    value: {
        token: "",
        isAuth: false,
        profilePhoto: "",
        
    }
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action)=>{
            state.value = {
                isAuth: true,
                token: action.payload.token,
                profilePhoto: action.payload.profilePhoto
            }
        },
        logout: (state)=>{
            state.value = {
                token: "",
                isAuth: false,
                profilePhoto: ""
            }
        }
    }
});


export const {login, logout} = authSlice.actions;

export default authSlice.reducer;

