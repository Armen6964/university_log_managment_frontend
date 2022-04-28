import { useState, useEffect } from "react";

import { Table, notification } from "antd";

import {
    TableAddButton,
    TableSettingsButton,
    TableActions,
    TableResetButton,
    InputSearchFilterDropdown,
    RangePickerFilterDropdown,
    TableDate,
} from "../../components";

import Request from "../../Requests";

import Drawer from "./Drawer";

import { generateQuery } from "../../Utils";

import useColumns from "../../hooks/useColumns";
import useHistorySettings from "../../hooks/useHistorySettings";

export default function HomeworkPage() {
    const fieldsType = {
        id: "INTEGER",
        teacher_id: "INTEGER",
        subject_id: "INTEGER",
        deadline: "DATE",
    };

    const defaultTableState = {
        filteredInfo: {},
        sortedInfo: {},
        page: 1,
        limit: 10,
    };

    const [visibleDrawer, setVisibleDrawer] = useState(false);

    const [data, setData] = useState([]);

    const [selected, setSelected] = useState(null);

    const [loading, setLoading] = useState(false);

    const [tableState, setTableState] = useHistorySettings(defaultTableState);

    const [total, setTotal] = useState(0);

    const [columns, setColumns] = useState([
        {
            title: "#",
            fixed: "left",
            key: "row__index",
            render: (text, record, index) => (tableState.page - 1) * tableState.limit + index + 1,
        },
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
            render: (text, record, index) => text,
            sorter: true,
            filterDropdown: InputSearchFilterDropdown,
        },
        {
            title: "Teacher id",
            dataIndex: "teacher_id",
            key: "teacher_id",
            render: (text, record, index) => text,
            sorter: true,
            filterDropdown: InputSearchFilterDropdown,
        },
        {
            title: "Subject id",
            dataIndex: "subject_id",
            key: "subject_id",
            render: (text, record, index) => text,
            sorter: true,
            filterDropdown: InputSearchFilterDropdown,
        },
        {
            title: "Deadline",
            dataIndex: "deadline",
            key: "deadline",
            render: (text, record, index) => <TableDate date={text} />,
            sorter: true,
            filterDropdown: RangePickerFilterDropdown,
        },
        {
            title: "Action",
            key: "row__actions",
            fixed: "right",
            width: 100,
            render: (text, record, index) => (
                <TableActions onEdit={showDrawer} onDelete={deleteData} record={record} />
            ),
        },
    ]);

    const [onChangeColumns] = useColumns(columns, setColumns, "homework");

    const getData = () => {
        let query = generateQuery(tableState, fieldsType);

        setLoading(true);

        Request.homework
            .get(query)
            .then(({ data }) => {
                if (!data.rows.length && tableState.page > 1) {
                    return setTableState({ ...tableState, page: tableState.page - 1 });
                }

                setLoading(false);
                setData(data.rows);
                setTotal(data.total);
            })
            .catch(({ message }) => {
                setLoading(false);
                notification.error({ message });
            });
    };

    const deleteData = ({ id }) => {
        Request.homework
            .delete({ id })
            .then(() => {
                setTableState((prev) => {
                    return { ...prev };
                });
            })
            .catch(({ message }) => {
                notification.error({ message });
            });
    };

    const showDrawer = (selected = null) => {
        setSelected(selected);
        setVisibleDrawer(true);
    };

    const hideDrawer = (changed) => {
        setVisibleDrawer(false);
        if (changed) {
            setTableState((prev) => {
                return { ...prev };
            });
        }
    };

    const tableOnChange = (pagination, filters, sorter) => {
        let { order, field } = sorter;

        setTableState({
            filteredInfo: filters,
            sortedInfo: { order, field },
            page: pagination.current,
            limit: pagination.pageSize,
        });
    };

    const resetTable = () => {
        setTableState(defaultTableState);
    };

    useEffect(() => {
        let _columns = [...columns];
        let { filteredInfo, sortedInfo } = tableState;

        _columns.map((column) => {
            column.filteredValue = filteredInfo[column.key] || null;
            column.sortOrder = sortedInfo.field === column.key && sortedInfo.order;
        });

        setColumns(_columns);

        getData();
    }, [tableState]);

    useEffect(() => {
        if (!visibleDrawer) {
            setSelected(null);
        }
    }, [visibleDrawer]);

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginBottom: 20 }}>
                <TableResetButton onClick={resetTable} />
                <TableSettingsButton columns={columns} onChangeColumns={onChangeColumns} />
                <TableAddButton onClick={() => showDrawer()} />
            </div>

            <Table
                loading={loading}
                rowKey="id"
                columns={columns.filter((column) => column.visible)}
                dataSource={data}
                scroll={{ x: "max-content", y: null }}
                onChange={tableOnChange}
                size="small"
                pagination={{
                    position: ["bottomCenter"],
                    current: tableState.page,
                    total: total,
                    pageSize: tableState.limit,
                    showSizeChanger: true,
                }}
            />

            <Drawer visible={visibleDrawer} onClose={hideDrawer} selectedRow={selected} />
        </div>
    );
}
