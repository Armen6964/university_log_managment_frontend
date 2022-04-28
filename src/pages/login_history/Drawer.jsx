import { useEffect } from "react";

import Request from "../../Requests";

import { Drawer, Form, Button, notification, Input, Select, DatePicker } from "antd";
import { createFieldsValue } from "../../Utils";

export default function ({ visible, onClose, selectedRow }) {
    const fields = {
        student_id: {
            type: "INTEGER",
            rules: [{ required: true, message: "Student_id is required!" }],
        },
        device_type: {
            type: "ENUM",
            rules: [{ required: true, message: "Device_type is required!" }],
        },
        university_id: {
            type: "DATE",
            rules: [{ required: true, message: "University_id is required!" }],
        },
    };

    const [form] = Form.useForm();

    const onFinish = (values) => {
        let method = "post";

        if (selectedRow) {
            method = "put";
            values.id = selectedRow.id;
        }

        Request.login_history[method](values)
            .then(() => {
                hideDrawer(true);
            })
            .catch(({ message }) => {
                notification.error({ message });
            });
    };

    const hideDrawer = (changed) => {
        onClose(changed);
        form.resetFields();
    };

    useEffect(() => {
        if (visible) {
            form.setFieldsValue(createFieldsValue(selectedRow, fields));
        }
    }, [visible]);

    return (
        <Drawer
            title={selectedRow ? "Update" : "Add"}
            placement="right"
            onClose={() => hideDrawer(false)}
            visible={visible}
            width={600}
        >
            <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
                <Form.Item label="Student_id" name="student_id" rules={fields.student_id.rules}>
                    <Input type="number" allowClear placeholder="Student_id" />
                </Form.Item>

                <Form.Item label="Device_type" name="device_type" rules={fields.device_type.rules}>
                    <Select allowClear placeholder="Device_type">
                        <Select.Option value="mobile">mobile</Select.Option>
                        <Select.Option value="web">web</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="University_id"
                    name="university_id"
                    rules={fields.university_id.rules}
                >
                    <DatePicker allowClear placeholder="University_id" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {selectedRow ? "Update" : "Add"}
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>
    );
}
