import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth/authSlice';
import userReducer from './slices/user/userSlice';
import contactReducer from './slices/contacts/contactSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        contacts: contactReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
