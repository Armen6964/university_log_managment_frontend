import { Image } from "antd";

export default function TableImage({ src = "" }) {
    return <Image style={{ height: 50 }} src={src} />;
}
