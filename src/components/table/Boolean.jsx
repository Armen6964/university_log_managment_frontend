import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";

export default function TableBoolean({ value = false }) {
    return value ? (
        <CheckCircleFilled style={{ color: "green", fontSize: 20 }} />
    ) : (
        <CloseCircleFilled style={{ color: "red", fontSize: 20 }} />
    );
}
