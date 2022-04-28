import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Layout, Menu } from "antd";

import "./_Sidebar.scss";

export default function Sidebar({ collapsed }) {
    const navigate = useNavigate();

    const location = useLocation();

    const [current, setCurrent] = useState("");

    const onClickItem = (e) => {
        setCurrent(e.key);
        navigate(e.key);
    };

    useEffect(() => {
        setCurrent(location.pathname);
    }, []);

    return (
        <Layout.Sider
            id="sidebar"
            collapsible={null}
            collapsed={collapsed}
            collapsedWidth={80}
            width={250}
        >
            <div className="sidebar-logo-section">
                <div className="sidebar-logo"></div>
            </div>

            <div className="sidebar-menu">
                <Menu mode="inline" selectedKeys={current} onClick={onClickItem}>
                    <Menu.Item key="/dashboard/student">Student</Menu.Item>
                    <Menu.Item key="/dashboard/teacher">Teacher</Menu.Item>
                    <Menu.Item key="/dashboard/homework">Homework</Menu.Item>
                    <Menu.Item key="/dashboard/source_download_history">
                        Source download history
                    </Menu.Item>
                    <Menu.Item key="/dashboard/visit_history">Visit history</Menu.Item>
                    <Menu.Item key="/dashboard/subject">Subject</Menu.Item>
                    <Menu.Item key="/dashboard/homework_submit_history">
                        Homework submit history
                    </Menu.Item>
                    <Menu.Item key="/dashboard/login_history">Login history</Menu.Item>
                    <Menu.Item key="/dashboard/university">University</Menu.Item>
                </Menu>
            </div>
        </Layout.Sider>
    );
}
