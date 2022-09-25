import {SearchOutlined, PlusCircleOutlined} from '@ant-design/icons';
import type {InputRef} from 'antd';
import {Button, Input, Row, Space, Spin, Table} from 'antd';
import type {ColumnsType, ColumnType} from 'antd/es/table';
import type {FilterConfirmProps} from 'antd/es/table/interface';
import React, {useEffect, useRef, useState} from 'react';
import Highlighter from 'react-highlight-words';
import {useAppSelector} from "../../hooks/useAppSelector";
import styles from './Contacts.module.scss'
import {Header} from "../Header/Header";
import {delContact, fetchContacts} from "../../store/slices/contacts/actionCreators";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useMediaQuery} from "react-responsive";
import {IContacts} from "../../models/IContacts";
import {EditForm} from "./EditForm/EditForm";
import {AddForm} from "./AddForm/AddForm";


interface DataType {
    id: number,
    name: string;
    phone: string;
}

type DataIndex = keyof DataType;

const Contacts: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const {contacts, error, isLoading} = useAppSelector(state => state.contacts)
    const {user} = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const searchInput = useRef<InputRef>(null);


    const [currentContact, setCurrentContact] = useState<IContacts | null>(null);
    const [isVisibleEditForm, setIsVisibleEditForm] = useState(false)
    const [isVisibleAddForm, setIsVisibleAddForm] = useState(false)

    const cancelEditForm = () => setIsVisibleEditForm(false);
    const cancelAddForm = () => setIsVisibleAddForm(false);

    const isMobile = useMediaQuery({ maxWidth: '720px' })

    useEffect(() => {
        if (user) {
            dispatch(fetchContacts(user.id))
        }

    }, [])

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{marginBottom: 8, display: 'block'}}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{width: 90}}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{width: 90, color: "white"}}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: text =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const deleteContact = (e: React.MouseEvent, record: IContacts) => {
        if (record.id) {
            dispatch(delContact(record.id))
        }
    }

    const changeContact = (e: React.MouseEvent, record: IContacts) => {
        setCurrentContact(record)
        setIsVisibleEditForm(true)
    }


    const columns: ColumnsType<DataType> = [
        {
            title: 'Наименование',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Номер',
            dataIndex: 'phone',
            key: 'phone',
            width: '20%',
            ...getColumnSearchProps('phone'),
        },
        {
            title: '',
            key: 'id',
            width: '10%',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={(e) => changeContact(e, record)}>
                        Изменить
                    </a>
                    <a onClick={(e) => deleteContact(e, record)}>
                        Удалить
                    </a>
                </Space>
            ),
        },
    ];

    const addContact = () => {
        setIsVisibleAddForm(true)
    }

    return <div>
        <Header/>
        <Row justify={"center"} align={"middle"} className={styles.app}>
            <div className={styles.contacts}>
                <div>
                    <h2>
                        Список контактов
                    </h2>
                    <Button
                        type='primary'
                        icon={<PlusCircleOutlined style={{fontSize: 15}}/>}
                        size='middle'
                        onClick={addContact}

                    >
                        Добавить
                    </Button>
                </div>
                <Table columns={columns}
                       // style={isMobile ? {width: 350} : {width: 500}}
                       dataSource={contacts}
                       loading={{ indicator: <div><Spin /></div>, spinning: isLoading}}
                       rowKey="id"/>
                {error && <span className={styles.error}>{error}</span>}
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
