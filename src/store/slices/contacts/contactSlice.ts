import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IContacts} from "../../../models/IContacts";
import {addContact, delContact, editContact, fetchContacts} from "./actionCreators";


export type ContactsState = {
    contacts: IContacts[],
    isLoading: boolean;
    error: string | null | undefined;
};


const initialState: ContactsState = {
    contacts: [],
    isLoading: false,
    error: ''
}


const contactSlice = createSlice({
        name: 'contacts',
        initialState,
        reducers: {},
        extraReducers: {
            [fetchContacts.fulfilled.type]: (state, action: PayloadAction<IContacts[]>) => {
                state.isLoading = false;
                if (action.payload) {
                    state.contacts = action.payload;
                    state.error = '';
                }
            },
            [fetchContacts.pending.type]: (state) => {
                state.isLoading = true;
            },
            [fetchContacts.rejected.type]: (state, action: PayloadAction<string>) => {
                state.isLoading = false;
                state.error = action.payload;
            },

            [delContact.fulfilled.type]: (state, action: PayloadAction<number>) => {
                state.isLoading = false;
                if (action.payload) {
                    state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
                    state.error = '';
                }
            },
            [delContact.pending.type]: (state) => {
                state.isLoading = true;
            },
            [delContact.rejected.type]: (state, action: PayloadAction<string>) => {
                state.isLoading = false;
                state.error = action.payload;
            },


            [editContact.fulfilled.type]: (state, action: PayloadAction<IContacts>) => {
                state.isLoading = false;
                if (action.payload) {
                    state.contacts = state.contacts.map((contact) => {
                        if (contact.id === action.payload.id) {
                            return action.payload;
                        }
                        return contact;
                    });
                    state.error = '';
                }
            },
            [editContact.pending.type]: (state) => {
                state.isLoading = true;
            },
            [editContact.rejected.type]: (state, action: PayloadAction<string>) => {
                state.isLoading = false;
                state.error = action.payload
            },


            [addContact.fulfilled.type]: (state, action: PayloadAction<IContacts>) => {
                state.isLoading = false;
                if (action.payload) {
                    state.contacts = [...state.contacts, action.payload];
                    state.error = '';
                }
            },
            [addContact.pending.type]: (state) => {
                state.isLoading = true;
            },
            [addContact.rejected.type]: (state, action: PayloadAction<string>) => {
                state.isLoading = false;
                state.error = action.payload;
            },

        }
    },
)

export default contactSlice.reducer;
