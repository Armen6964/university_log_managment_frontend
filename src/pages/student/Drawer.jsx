import { useEffect } from "react";

import Request from "../../Requests";

import { Drawer, Form, Button, notification, Input, DatePicker } from "antd";
import { createFieldsValue } from "../../Utils";

export default function ({ visible, onClose, selectedRow }) {
    const fields = {
        full_name: {
            type: "STRING",
            rules: [{ required: true, message: "Full_name is required!" }],
        },
        birthday: { type: "DATE", rules: [{ required: true, message: "Birthday is required!" }] },
        profession: {
            type: "STRING",
            rules: [{ required: true, message: "Profession is required!" }],
        },
        entery_date: {
            type: "DATE",
            rules: [{ required: true, message: "Entery_date is required!" }],
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

        Request.student[method](values)
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
                <Form.Item label="Full_name" name="full_name" rules={fields.full_name.rules}>
                    <Input allowClear placeholder="Full_name" />
                </Form.Item>

                <Form.Item label="Birthday" name="birthday" rules={fields.birthday.rules}>
                    <DatePicker allowClear placeholder="Birthday" />
                </Form.Item>

                <Form.Item label="Profession" name="profession" rules={fields.profession.rules}>
                    <Input allowClear placeholder="Profession" />
                </Form.Item>

                <Form.Item label="Entery_date" name="entery_date" rules={fields.entery_date.rules}>
                    <DatePicker allowClear placeholder="Entery_date" />
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
