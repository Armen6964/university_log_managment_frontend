import { Input } from "antd";

export default function InputSearchFilterDropdown({ setSelectedKeys, selectedKeys, confirm }) {
    return (
        <Input
            allowClear
            placeholder="Type text here"
            value={selectedKeys}
            onChange={(e) => {
                setSelectedKeys(e.target.value);
                confirm({ closeDropdown: false });
            }}
            onPressEnter={() => {
                confirm();
            }}
            onBlur={() => {
                confirm();
            }}
        />
    );
}
