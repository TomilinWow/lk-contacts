import {IContacts} from "../../../models/IContacts";

import {Form, Modal, Input, Button,} from 'antd';
import React, {FC} from 'react';


import styles from "../Contacts.module.scss";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {editContact} from "../../../store/slices/contacts/actionCreators";

export interface IFormValues {
    name: string;
    phone: string;
}

interface EditFormType {
    isVisible: boolean;
    cancelEditForm: () => void;
    contact: IContacts | null;
}

export const EditForm: FC<EditFormType> = ({isVisible, cancelEditForm, contact}) => {

    const {error, isLoading} = useAppSelector(state => state.contacts)
    const dispatch = useAppDispatch();

    const onFinish = async ({name, phone}: IFormValues) => {
        if (!contact) {
            return
        }
        await dispatch(editContact({
                ...contact,
                name: name,
                phone: phone
            }
        )).then(() => {
            cancelEditForm()
        }).catch((e) => {
            console.log(e)
        })

    };

    return (
        <Modal
            title='Изменить контакт'
            open={isVisible}
            onCancel={cancelEditForm}
            centered
            footer={null}
        >
            <Form
                initialValues={{
                    name: contact?.name,
                    phone: contact?.phone,
                }}
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
                    <Input placeholder='Номер телефона'/>
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
