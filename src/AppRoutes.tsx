import { Navigate, Route, Routes } from 'react-router-dom';
import {useAppSelector} from "./hooks/useAppSelector";
import {FC} from "react";
import Contacts from "./components/Contacts/Contacts";
import Login from "./components/Login/Login";


export const AppRoutes: FC = () => {
    const isAuth = useAppSelector(state => state.auth.isAuth);

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={ isAuth ? <Navigate to='/contacts' /> : <Navigate to='/login'/>}
                />
                <Route
                    path='/login'
                    element={ isAuth ? <Navigate to='/contacts' /> : <Login />}
                />
                <Route
                    path='/contacts'
                    element={ isAuth ? <Contacts /> : <Navigate to='/login' />}
                />
            </Routes>
        </>
    );
};
