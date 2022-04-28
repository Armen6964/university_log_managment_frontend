import { Space, Button, Popover, Checkbox } from "antd";

import { SettingOutlined } from "@ant-design/icons";

export default function TableSettingsButton({ columns, onChangeColumns }) {
    return (
        <Popover
            placement="leftTop"
            title="Fields"
            content={
                <Space
                    direction="vertical"
                    style={{ maxHeight: 300, overflowY: "auto", width: "100%" }}
                >
                    {columns.map((column, key) => (
                        <Checkbox
                            index={key}
                            key={key}
                            checked={column.visible}
                            onChange={onChangeColumns}
                        >
                            {column.title}
                        </Checkbox>
                    ))}
                </Space>
            }
            trigger="click"
        >
            <Button>
                {" "}
                <SettingOutlined />{" "}
            </Button>
        </Popover>
    );
}
