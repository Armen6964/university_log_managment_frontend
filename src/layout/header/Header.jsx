import React from "react";
import { Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

import "./_Header.scss";

export default function Header({ collapsed, handleCollapsed }) {
    return (
        <Layout.Header
            className="root-header"
            style={{
                padding: 0,
                left: collapsed ? 80 : 250,
                transition: "0.3s",
                width: `calc(100% - ${collapsed ? 80 : 250}px)`,
            }}
        >
            {collapsed ? (
                <MenuUnfoldOutlined className="trigger" onClick={handleCollapsed} />
            ) : (
                <MenuFoldOutlined className="trigger" onClick={handleCollapsed} />
            )}
        </Layout.Header>
    );
}
