import { Navigate, Route, Routes } from 'react-router-dom';
import {useAppSelector} from "./hooks/useAppSelector";
import {FC} from "react";
import Contacts from "./components/Contacts/Contacts";
import Login from "./components/Login/Login";
import {MyRoutes} from "./tools/constants";


export const AppRoutes: FC = () => {
    const isAuth = useAppSelector(state => state.auth.isAuth);

    return (
        <>
            <Routes>
                <Route
                    path={MyRoutes.Home}
                    element={ isAuth ? <Navigate to={MyRoutes.Contacts} /> : <Navigate to={MyRoutes.Login}/>}
                />
                <Route
                    path={MyRoutes.Login}
                    element={ isAuth ? <Navigate to={MyRoutes.Contacts} /> : <Login />}
                />
                <Route
                    path={MyRoutes.Contacts}
                    element={ isAuth ? <Contacts /> : <Navigate to={MyRoutes.Login} />}
                />
            </Routes>
        </>
    );
};
