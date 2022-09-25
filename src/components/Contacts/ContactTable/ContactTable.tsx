import {Button, Input, InputRef, Space, Spin, Table} from "antd";
import React, {FC, useRef, useState} from "react";
import {ColumnsType, ColumnType} from "antd/es/table";
import {IContacts} from "../../../models/IContacts";
import {delContact} from "../../../store/slices/contacts/actionCreators";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {FilterConfirmProps} from "antd/es/table/interface";
import {useAppSelector} from "../../../hooks/useAppSelector";
import styles from "../Contacts.module.scss";
import {useMediaQuery} from "react-responsive";

interface DataType {
    id: number,
    name: string;
    phone: string;
}

type DataIndex = keyof DataType;

interface AddFormType {
    setCurrentContact: (contact: IContacts) => void;
    setIsVisibleEditForm: (visible: boolean) => void;
}


export const ContactTable: FC<AddFormType> = ({setCurrentContact, setIsVisibleEditForm}) => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const {contacts, error, isLoading} = useAppSelector(state => state.contacts)
    const dispatch = useAppDispatch()

    const isMobile = useMediaQuery({maxWidth: '720px'})

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void,
                         selectedKeys: string[],
                         confirm: (param?: FilterConfirmProps) => void,
                         dataIndex: DataIndex) => {
        clearFilters();
        confirm();
        setSearchText('');
        setSearchedColumn(dataIndex);
    };


    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    ref={searchInput}
                    placeholder={`Поиск...`}
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
                        Поиск
                    </Button>
                    <Button
                        onClick={() => clearFilters &&
                            handleReset(clearFilters, selectedKeys as string[], confirm, dataIndex)}
                        size="small"
                        style={{width: 90, color: "white"}}
                    >
                        Сбросить
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


    const columns: ColumnsType<DataType> = [
        {
            title: 'Наименование',
            dataIndex: 'name',
            key: 'name',
            width: isMobile ? 60 : 100,
            ellipsis: true,
            ...getColumnSearchProps('name'),

        },
        {
            title: 'Номер телефона',
            dataIndex: 'phone',
            key: 'phone',
            width: isMobile ? 60 : 100,
            ellipsis: true,
            ...getColumnSearchProps('phone'),

        },
        {
            title: '',
            key: 'id',
            width: 80,
            fixed: 'right',
            render: (_, record) => (
                <Space size="small" className={styles.block}>
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


    const deleteContact = (e: React.MouseEvent, record: IContacts) => {
        if (record.id) {
            dispatch(delContact(record.id))
        }
    }

    const changeContact = (e: React.MouseEvent, record: IContacts) => {
        setCurrentContact(record)
        setIsVisibleEditForm(true)
    }


    return (
        <>
            <Table columns={columns}
                // style={isMobile ? {width: 350} : {width: 500}}
                   dataSource={contacts}
                   loading={{indicator: <div><Spin/></div>, spinning: isLoading}}
                   pagination={{ pageSize: 6}}
                   rowKey="id"
            />
            {error && <span className={styles.error}>{error}</span>}
        </>

    )
}
