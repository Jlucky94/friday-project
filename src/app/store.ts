import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "../features/auth/authSlice";
import {profileSlice} from "../features/profile/profileSlice";
import {appReducer} from "./appSlice";


export const store = configureStore({
    reducer: {
        app: appReducer,
        auth: authSlice.reducer,
        profile: profileSlice.reducer,

    },
});


export type AppRootStateType = ReturnType<typeof store.getState>
export type ThunkAppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector


// @ts-ignore
window.store = store;