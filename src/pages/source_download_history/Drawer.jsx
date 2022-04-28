import { useEffect } from "react";

import Request from "../../Requests";

import { Drawer, Form, Button, notification, Input } from "antd";
import { createFieldsValue } from "../../Utils";

export default function ({ visible, onClose, selectedRow }) {
    const fields = {
        file_name: {
            type: "STRING",
            rules: [{ required: true, message: "File_name is required!" }],
        },
        subject_id: {
            type: "INTEGER",
            rules: [{ required: true, message: "Subject_id is required!" }],
        },
        download_count: {
            type: "INTEGER",
            rules: [{ required: true, message: "Download_count is required!" }],
        },
        year: { type: "INTEGER", rules: [{ required: true, message: "Year is required!" }] },
    };

    const [form] = Form.useForm();

    const onFinish = (values) => {
        let method = "post";

        if (selectedRow) {
            method = "put";
            values.id = selectedRow.id;
        }

        Request.source_download_history[method](values)
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
                <Form.Item label="File_name" name="file_name" rules={fields.file_name.rules}>
                    <Input allowClear placeholder="File_name" />
                </Form.Item>

                <Form.Item label="Subject_id" name="subject_id" rules={fields.subject_id.rules}>
                    <Input type="number" allowClear placeholder="Subject_id" />
                </Form.Item>

                <Form.Item
                    label="Download_count"
                    name="download_count"
                    rules={fields.download_count.rules}
                >
                    <Input type="number" allowClear placeholder="Download_count" />
                </Form.Item>

                <Form.Item label="Year" name="year" rules={fields.year.rules}>
                    <Input type="number" allowClear placeholder="Year" />
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
