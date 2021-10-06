import { useState, useEffect } from "react";
import { Menu, Image, Divider } from "antd";
import {
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { Header } from "antd/lib/layout/layout";
import { useRouter } from "next/router";

export default function NavbarLoggedIn(props) {
    const router = useRouter();
    useEffect(() => {
        console.log(props.username);
    }, []);
    return (
        // <Menu
        //     selectedKeys={["mail"]}
        //     mode="horizontal"
        //     className="items-center w-full flex flex-row"
        // >
        //     <Menu.Item>
        //         <Image src = "./logo.png" />
        //     </Menu.Item>

        //     <Menu.Item key="mail" icon={<MailOutlined />}>
        //         Navigation One
        //     </Menu.Item>
        //     <Menu.Item key="app" icon={<AppstoreOutlined />}>
        //         Navigation Two
        //     </Menu.Item>
        //     <SubMenu
        //         key="SubMenu"
        //         icon={<SettingOutlined />}
        //         title="Navigation Three - Submenu"
        //     >
        //         <Menu.ItemGroup title="Item 1">
        //             <Menu.Item key="setting:1">Option 1</Menu.Item>
        //             <Menu.Item key="setting:2">Option 2</Menu.Item>
        //         </Menu.ItemGroup>
        //         <Menu.ItemGroup title="Item 2">
        //             <Menu.Item key="setting:3">Option 3</Menu.Item>
        //             <Menu.Item key="setting:4">Option 4</Menu.Item>
        //         </Menu.ItemGroup>
        //     </SubMenu>
        //     <Menu.Item key="alipay">
        //         <a
        //             href="https://ant.design"
        //             target="_blank"
        //             rel="noopener noreferrer"
        //         >
        //             Navigation Four - Link
        //         </a>
        //     </Menu.Item>
        // </Menu>
        <div className="h-16 w-full px-7 bg-black flex flex-row items-center justify-between">
            {/* <Image src="./locus_new_logo_white.png" height={80} width={110} /> */}
            <img src="/logo_white.png" width={130} />
            <div className="flex-row flex h-full items-center">
                <div
                    className={`hover:underline flex-col flex h-full justify-center px-8 ${
                        props.page == "Home" ? "bg-gray-800 " : ""
                    }`}
                >
                    <a
                        className="text-white"
                        style={{ textDecoration: "none" }}
                        href="/homeloggedin"
                    >
                        Home
                    </a>
                </div>
                <div
                    className={`hover:underline flex-col flex h-full justify-center px-8 ${
                        props.page == "Browse" ? "bg-gray-800 " : ""
                    }`}
                    onClick={() => router.push("browseEvents")}
                >
                    <a className="text-white">Browse</a>
                </div>
                <div
                    className={`hover:underline flex-col flex h-full justify-center px-8 ${
                        props.page == "Tickets" ? "bg-gray-800 " : ""
                    }`}
                >
                    <a className="text-white">Tickets</a>
                </div>
                <div
                    onClick={() => router.push("organiseEvent1")}
                    className={`hover:underline flex-col flex h-full justify-center px-8 ${
                        props.page == "Organise" ? "bg-gray-800 " : ""
                    }`}
                >
                    <a className="text-white">Organise</a>
                </div>
                <div
                    className={`hover:underline flex-col flex h-full justify-center px-8 ${
                        props.page == "Resources" ? "bg-gray-800 " : ""
                    }`}
                >
                    <a className="text-white">Resources</a>
                </div>
            </div>
            <div>
                {props.user == "" ? (
                    <span className="text-white">Sign in</span>
                ) : (
                    <span className="text-white">{props.user}</span>
                )}
            </div>
        </div>
    );
}
