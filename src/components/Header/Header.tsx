import styles from './Header.module.scss'
import {useAppSelector} from "../../hooks/useAppSelector";
import {Button} from "antd";
import {LogoutOutlined} from "@ant-design/icons";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {logout} from "../../store/slices/auth/authSlice";
import {useNavigate} from "react-router-dom";
import {MyRoutes} from "../../tools/constants";


export const Header = () => {

    const {user} = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const history = useNavigate();

    const handleLogout = () => {
        dispatch(logout())
        history(MyRoutes.Home);
    }

    return (
        <header className={styles.header}>
            <span>{user?.username}</span>
            <Button
                type='primary'
                icon={<LogoutOutlined/>}
                size='middle'
                onClick={() => handleLogout()}
            >
                Выйти
            </Button>
        </header>
    )
}
