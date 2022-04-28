import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

export default function RangePickerFilterDropdown({ setSelectedKeys, selectedKeys, confirm }) {
    return (
        <RangePicker
            allowClear
            value={selectedKeys}
            onChange={(value) => {
                setSelectedKeys(value);
                confirm({ closeDropdown: false });
            }}
            onPressEnter={() => {
                confirm();
            }}
            format="YYYY-MM-DD"
        />
    );
}
