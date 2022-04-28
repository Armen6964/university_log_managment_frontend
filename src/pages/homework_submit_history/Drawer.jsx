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
        homework_id: {
            type: "INTEGER",
            rules: [{ required: true, message: "Homework_id is required!" }],
        },
        submit_id: {
            type: "INTEGER",
            rules: [{ required: true, message: "Submit_id is required!" }],
        },
        university_id: {
            type: "INTEGER",
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

        Request.homework_submit_history[method](values)
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

                <Form.Item label="Homework_id" name="homework_id" rules={fields.homework_id.rules}>
                    <Input type="number" allowClear placeholder="Homework_id" />
                </Form.Item>

                <Form.Item label="Submit_id" name="submit_id" rules={fields.submit_id.rules}>
                    <Input type="number" allowClear placeholder="Submit_id" />
                </Form.Item>

                <Form.Item
                    label="University_id"
                    name="university_id"
                    rules={fields.university_id.rules}
                >
                    <Input type="number" allowClear placeholder="University_id" />
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
