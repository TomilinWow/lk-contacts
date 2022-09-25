import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Form, Input, Row, Typography} from 'antd';
import React from 'react';
import styles from './Login.module.scss'
import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {fetchUsers} from "../../store/slices/user/actionCreators";
import {IData} from "../../models/IData";
import {login} from "../../store/slices/auth/authSlice";


const Login: React.FC = () => {

    const {isLoading, error} = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const onFinish = async (data: IData) => {
        const isUser = await dispatch(fetchUsers(data)).unwrap();

        if (isUser) {
            dispatch(login());
        }
    };


    return (
        <Row justify={"center"} align={"middle"} className={styles.app}>
            <div className={styles.login}>

                <Typography.Title level={1} style={{margin: 0, color: '#242526'}}>
                    Вход
                </Typography.Title>
                <Form
                    name="normal_login"
                    className={styles.form}
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{required: true, message: 'Пожалуйста, введите имя пользователя!'}]}
                    >
                        <Input prefix={<UserOutlined/>} placeholder="Имя пользователя..."/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{required: true, message: 'Пожалуйста, введите свой пароль!'}]}

                    >
                        <Input
                            prefix={<LockOutlined/>}
                            type="password"
                            placeholder="Пароль..."
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary"
                                htmlType="submit"
                                style={{width: '100%'}}
                                loading={isLoading}>
                            Войти
                        </Button>
                    </Form.Item>
                    {error && <span className={styles.error}>{error}</span>}
                </Form>
            </div>
        </Row>
    );
};

export default Login;
