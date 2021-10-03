import { useState } from "react";
import { Menu, Image } from "antd";
import { Header } from "antd/lib/layout/layout";
import logo from '../public/logo.png'
import { makeStyles } from "antd/dist/antd.css";
const { SubMenu } = Menu;

export default function AdminNavbar() {

    return (
        <Menu
            mode="horizontal"
            className="items-center w-full flex flex-row"
            theme="dark"
            style={{backgroundColor: '#000'}}
        >
            <Menu.Item href="/admin">
                <img src="/logo_white.png" width={130} />
            </Menu.Item>
        </Menu>
    );
}