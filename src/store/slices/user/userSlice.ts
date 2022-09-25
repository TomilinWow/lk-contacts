import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import { fetchUsers } from './actionCreators';
import {IUser} from "../../../models/IUser";

export type UserState = {
    user: IUser;
    isLoading: boolean;
    error: string | null | undefined;
};

const initialState: UserState = {
    user: JSON.parse(localStorage.getItem('user') || '{}'),
    isLoading: false,
    error: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUsers.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.isLoading = false;
            if (action.payload) {
                state.user = action.payload;
                localStorage.setItem('user', JSON.stringify(action.payload, ['id', 'username']));
                state.error = '';
            }
        },
        [fetchUsers.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchUsers.rejected.type]: (state,  action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },

    }
});

export default userSlice.reducer;
