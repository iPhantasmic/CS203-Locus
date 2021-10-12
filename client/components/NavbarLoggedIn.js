import { useState, useEffect } from "react";
import {Menu, Image, Divider, Dropdown} from "antd";
import {
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined, DownOutlined,
} from "@ant-design/icons";
import { Header } from "antd/lib/layout/layout";
import { useRouter } from "next/router";

export default function NavbarLoggedIn(props) {
    const router = useRouter();
    useEffect(() => {
        console.log(props.username);
    }, []);
    const menu = (
        <Menu>
            <Menu.Item>
                <div onClick={()=>router.push('/profile')}>
                    Profile
                </div>
            </Menu.Item>
            <Menu.Item >
                <div onClick={()=>router.push('/main')} >
                    Logout
                </div>
            </Menu.Item>
        </Menu>
    );
    return (
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
                    onClick={() => router.push("eventticket")}
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
            <div className="flex-row flex ">
                {/*<div onClick={()=>router.push('/profile')} className="cursor-pointer mr-5">*/}
                {/*    {props.user == "" ? (*/}
                {/*        <span className="text-white">Sign in</span>*/}
                {/*    ) : (*/}
                {/*        <span className="text-white"></span>*/}
                {/*    )}*/}
                {/*</div>*/}

                <div>
                    <Dropdown overlay={menu}>
                        <a
                            className="ant-dropdown-link  text-white"
                            onClick={(e) => e.preventDefault()}
                        >
                            {props.user} <DownOutlined />
                        </a>
                    </Dropdown>
                </div>

            </div>


        </div>
    );
}
