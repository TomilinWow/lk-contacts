import {createAsyncThunk} from '@reduxjs/toolkit';
import {IUser} from "../../../models/IUser";
import axios from "axios";
import {IData} from "../../../models/IData";
import {BASE_USER_URL} from "../../../tools/constants";


export const fetchUsers = createAsyncThunk(
    'user/fetchAll',
    async ({username, password}: IData, thunkAPI) => {
        try {
            const response = await axios.get<IUser[]>(BASE_USER_URL)
            const users = response.data;
            const user = users.find((user) => username === user.username && password === user.password);
            if (!user) {
                return thunkAPI.rejectWithValue('Данный пользователь не существует');
            }
            return user;

        } catch (e) {
            return thunkAPI.rejectWithValue("Введен неверный логин или пароль!")
        }
    });
