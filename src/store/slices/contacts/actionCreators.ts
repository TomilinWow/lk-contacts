import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {IUser} from "../../../models/IUser";




export const fetchContacts = createAsyncThunk(
    'user/fetchContacts',
    async (id: number, thunkAPI) => {
        try {
            const response = await axios.get<IUser[]>(`http://localhost:3001/contacts?userId=${id}`)
            const contacts = response.data;
            console.log(contacts)
            return contacts;

        } catch (e) {
            return thunkAPI.rejectWithValue("Введен неверный логин или пароль!")
        }
    });


export const delContact = createAsyncThunk(
    'user/delContact',
    async (idContact: number, thunkAPI) => {
        try {
            await axios.delete(`http://localhost:3001/contacts/${idContact}`)
            return idContact
        } catch (e) {
            return thunkAPI.rejectWithValue("Ошибка при удалении контакта!")
        }
    });

interface IEditData {
    id: number,
    name: string,
    phone: string
}

export const editContact = createAsyncThunk(
    'user/editContact',
    async (data: IEditData, thunkAPI) => {
        try {
            await axios.put(`http://localhost:3001/contacts/${data.id}`, {
                ...data
            })
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue("Ошибка при изменении контакте!")
        }
    });


interface IAddData {
    userId: number,
    name: string,
    phone: string
}
export const addContact = createAsyncThunk(
    'user/addContact',
    async (data: IAddData, thunkAPI) => {
        try {
            const response = await axios.post(`http://localhost:3001/contacts`, {
                ...data
            })
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue("Ошибка при добавлении контакта!")
        }
    });

