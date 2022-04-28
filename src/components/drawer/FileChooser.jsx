import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { getBase64 } from "../../Utils";

export default function FileChooser({ count = 1, value = [], onChange = () => {} }) {
    const [preview, setPreview] = useState({
        visible: false,
        image: "",
        title: "",
    });

    const showPreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreview({
            visible: true,
            image: file.url || file.preview,
            title: file.name || file.url.split("/").pop(),
        });
    };

    const hidePreview = () => {
        setPreview({ visible: false, image: "", title: "" });
    };

    const handleChange = ({ fileList }) => {
        onChange(fileList);
    };

    let fileList = Array.isArray(value) ? value : value ? [{ url: value }] : [];

    return (
        <>
            <Upload
                customRequest={({ onSuccess }) => onSuccess()}
                listType="picture-card"
                fileList={fileList}
                onPreview={showPreview}
                onChange={handleChange}
                accept={["image/png"]}
            >
                {fileList.length < count && (
                    <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                )}
            </Upload>

            <Modal
                visible={preview.visible}
                title={preview.title}
                footer={null}
                onCancel={hidePreview}
            >
                <img style={{ width: "100%" }} src={preview.image} />
            </Modal>
        </>
    );
}
