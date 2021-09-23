import { useState, useEffect } from "react";
import { Menu, Image } from "antd";
import {
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { Header } from "antd/lib/layout/layout";
import logo from '../public/logo.png'

const { SubMenu } = Menu;

export default function Navbar() {
    return (
            <Menu
                selectedKeys={["mail"]}
                mode="horizontal"
                className="items-center w-full flex flex-row"
            >
                {/* <Avatar /> */}
                <Menu.Item key="mail" icon={<MailOutlined />}>
                    Navigation One
                </Menu.Item>
                <Menu.Item key="app" icon={<AppstoreOutlined />}>
                    Navigation Two
                </Menu.Item>
                <SubMenu
                    key="SubMenu"
                    icon={<SettingOutlined />}
                    title="Navigation Three - Submenu"
                >
                    <Menu.ItemGroup title="Item 1">
                        <Menu.Item key="setting:1">Option 1</Menu.Item>
                        <Menu.Item key="setting:2">Option 2</Menu.Item>
                    </Menu.ItemGroup>
                    <Menu.ItemGroup title="Item 2">
                        <Menu.Item key="setting:3">Option 3</Menu.Item>
                        <Menu.Item key="setting:4">Option 4</Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>
                <Menu.Item key="alipay">
                    <a
                        href="https://ant.design"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Navigation Four - Link
                    </a>
                </Menu.Item>
            </Menu>
    );
}
