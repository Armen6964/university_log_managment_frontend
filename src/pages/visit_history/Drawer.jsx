import { useEffect } from "react";

import Request from "../../Requests";

import { Drawer, Form, Button, notification, Input } from "antd";
import { createFieldsValue } from "../../Utils";

export default function ({ visible, onClose, selectedRow }) {
    const fields = {
        student_id: {
            type: "INTEGER",
            rules: [{ required: true, message: "Student_id is required!" }],
        },
        subject_id: {
            type: "INTEGER",
            rules: [{ required: true, message: "Subject_id is required!" }],
        },
        absent_count: {
            type: "INTEGER",
            rules: [{ required: true, message: "Absent_count is required!" }],
        },
    };

    const [form] = Form.useForm();

    const onFinish = (values) => {
        let method = "post";

        if (selectedRow) {
            method = "put";
            values.id = selectedRow.id;
        }

        Request.visit_history[method](values)
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

                <Form.Item label="Subject_id" name="subject_id" rules={fields.subject_id.rules}>
                    <Input type="number" allowClear placeholder="Subject_id" />
                </Form.Item>

                <Form.Item
                    label="Absent_count"
                    name="absent_count"
                    rules={fields.absent_count.rules}
                >
                    <Input type="number" allowClear placeholder="Absent_count" />
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
