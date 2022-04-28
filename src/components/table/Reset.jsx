import { Button } from "antd";

export default function TableResetButton({ onClick = () => {} }) {
    return <Button onClick={onClick}>Reset</Button>;
}
