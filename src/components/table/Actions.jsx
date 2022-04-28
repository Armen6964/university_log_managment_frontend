import { Space, Button, Popconfirm } from "antd";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export default function TableActions({ onEdit, onDelete, record }) {
    return (
        <Space>
            <Button onClick={() => onEdit(record)} type="primary" icon={<EditOutlined />}></Button>

            <Popconfirm title="Sure to delete?" onConfirm={() => onDelete(record)}>
                <Button type="danger" icon={<DeleteOutlined />}></Button>
            </Popconfirm>
        </Space>
    );
}
