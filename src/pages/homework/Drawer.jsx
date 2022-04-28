import { useEffect } from "react";

import Request from "../../Requests";

import { Drawer, Form, Button, notification, Input, DatePicker } from "antd";
import { createFieldsValue } from "../../Utils";

export default function ({ visible, onClose, selectedRow }) {
    const fields = {
        teacher_id: {
            type: "INTEGER",
            rules: [{ required: true, message: "Teacher_id is required!" }],
        },
        subject_id: {
            type: "INTEGER",
            rules: [{ required: true, message: "Subject_id is required!" }],
        },
        deadline: { type: "DATE", rules: [{ required: true, message: "Deadline is required!" }] },
    };

    const [form] = Form.useForm();

    const onFinish = (values) => {
        let method = "post";

        if (selectedRow) {
            method = "put";
            values.id = selectedRow.id;
        }

        Request.homework[method](values)
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
                <Form.Item label="Teacher_id" name="teacher_id" rules={fields.teacher_id.rules}>
                    <Input type="number" allowClear placeholder="Teacher_id" />
                </Form.Item>

                <Form.Item label="Subject_id" name="subject_id" rules={fields.subject_id.rules}>
                    <Input type="number" allowClear placeholder="Subject_id" />
                </Form.Item>

                <Form.Item label="Deadline" name="deadline" rules={fields.deadline.rules}>
                    <DatePicker allowClear placeholder="Deadline" />
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
