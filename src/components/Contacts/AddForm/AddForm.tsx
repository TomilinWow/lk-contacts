import {Form, Modal, Input, Button,} from 'antd';
import React, {FC} from 'react';


import styles from "../Contacts.module.scss";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {useAppDispatch} from "../../../hooks/useAppDispatch";

import {IFormValues} from "../EditForm/EditForm";
import {addContact} from "../../../store/slices/contacts/actionCreators";


interface AddFormType {
    isVisible: boolean;
    cancelAddForm: () => void;
}

export const AddForm: FC<AddFormType> = ({isVisible, cancelAddForm}) => {

    const {error, isLoading} = useAppSelector(state => state.contacts)
    const {user} = useAppSelector(state => state.user)
    const dispatch = useAppDispatch();

    const onFinish = async ({name, phone}: IFormValues) => {
        console.log(user)
        await dispatch(addContact({
            userId: user.id,
            name: name,
            phone: phone
        })).then(() => {
            cancelAddForm()
        }).catch((e) => {
            console.log(e)
        })

    };

    return (
        <Modal
            title='Добавить контакт'
            open={isVisible}
            onCancel={cancelAddForm}
            centered
            footer={null}
        >
            <Form
                onFinish={onFinish}
            >
                <Form.Item
                    name='name'
                    rules={[
                        {required: true, message: 'Пожалуйста, введите имя контакта'},
                    ]}
                >
                    <Input placeholder='Название контакта'/>
                </Form.Item>

                <Form.Item
                    name='phone'
                    rules={[
                        {required: true, message: 'Пожалуйста, введите номер телефона'},
                    ]}
                >
                    <Input placeholder='Номер'/>
                </Form.Item>

                <Form.Item>
                    <Button
                        loading={isLoading}
                        type='primary'
                        htmlType='submit'
                        style={{width: '100%'}}
                    >
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
            {error && <span className={styles.error}>{error}</span>}
        </Modal>
    );
};
