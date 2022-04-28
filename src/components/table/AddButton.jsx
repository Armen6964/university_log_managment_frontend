import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export default function TableAddButton({ onClick = () => {}, title = "Add" }) {
    return (
        <Button type="primary" icon={<PlusOutlined />} onClick={onClick}>
            {title}
        </Button>
    );
}
