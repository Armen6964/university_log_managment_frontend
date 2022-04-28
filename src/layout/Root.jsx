import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import { Layout } from "antd";

import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";

export default function Root() {
    const [collapsed, setCollapsed] = useState(false);

    const handleCollapsed = () => {
        setCollapsed((collapsed) => !collapsed);
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sidebar collapsed={collapsed} handleCollapsed={handleCollapsed} />

            <Layout style={{ marginLeft: collapsed ? 80 : 250, transition: "0.3s" }}>
                <Header collapsed={collapsed} handleCollapsed={handleCollapsed} />

                <Layout.Content>
                    <Outlet />
                </Layout.Content>
            </Layout>
        </Layout>
    );
}
