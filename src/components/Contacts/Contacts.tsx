import {PlusCircleOutlined} from '@ant-design/icons';
import {Button, Row} from 'antd';
import React, {useEffect, useState} from 'react';
import styles from './Contacts.module.scss'
import {Header} from "../Header/Header";
import {fetchContacts} from "../../store/slices/contacts/actionCreators";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {IContacts} from "../../models/IContacts";
import {EditForm} from "./EditForm/EditForm";
import {AddForm} from "./AddForm/AddForm";
import {ContactTable} from "./ContactTable/ContactTable";



const Contacts: React.FC = () => {

    const dispatch = useAppDispatch()

    const [currentContact, setCurrentContact] = useState<IContacts | null>(null);
    const [isVisibleEditForm, setIsVisibleEditForm] = useState(false)
    const [isVisibleAddForm, setIsVisibleAddForm] = useState(false)

    const cancelEditForm = () => setIsVisibleEditForm(false);
    const cancelAddForm = () => setIsVisibleAddForm(false);


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        if (user) {
            dispatch(fetchContacts(user.id))
        }

    }, [])


    const addContact = () => {
        setIsVisibleAddForm(true)
    }

    return <div>
        <Header/>
        <Row justify={"center"} align={"middle"} className={styles.app}>
            <div className={styles.contacts}>
                <div>
                    <h2>Список контактов</h2>
                    <Button
                        type='primary'
                        icon={<PlusCircleOutlined style={{fontSize: 15}}/>}
                        size='middle'
                        onClick={addContact}
                    >
                        Добавить
                    </Button>
                </div>
               <ContactTable
                   setCurrentContact={setCurrentContact}
                   setIsVisibleEditForm={setIsVisibleEditForm}
               />
            </div>
            {isVisibleEditForm && (
                <EditForm
                    isVisible={isVisibleEditForm}
                    cancelEditForm={cancelEditForm}
                    contact={currentContact}
                />
            )}
            {isVisibleAddForm && (
                <AddForm
                    isVisible={isVisibleAddForm}
                    cancelAddForm={cancelAddForm}
                />
            )}
        </Row>
    </div>

};

export default Contacts;
