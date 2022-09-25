import { createSlice } from '@reduxjs/toolkit';

export type AuthState = {
    isAuth: boolean;
};

const initialState: AuthState = {
    isAuth: localStorage.getItem('isAuth') === 'true',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
            state.isAuth = true;
            localStorage.setItem('isAuth', 'true');
        },
        logout: (state) => {
            state.isAuth = false;
            localStorage.setItem('isAuth', 'false');
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
