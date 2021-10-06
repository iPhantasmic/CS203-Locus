import { useState, useEffect } from "react";
import { Menu, Image, Divider } from "antd";
import {
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { Header } from "antd/lib/layout/layout";
import { useRouter } from "next/router";

export default function Navbar(props) {
    useEffect(() => {
        console.log(props.username);
    }, []);
    const router = useRouter();
    return (
        <div className="h-16 w-full px-7 bg-black flex flex-row items-center justify-between">
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
                        href="/login"
                    >
                        Home
                    </a>
                </div>
                <div
                    className={`hover:underline flex-col flex h-full justify-center px-8 ${
                        props.page == "Events" ? "bg-gray-800 " : ""
                    }`}
                >
                    <a className="text-white">Events</a>
                </div>
                <div
                    className={`hover:underline flex-col flex h-full justify-center px-8 ${
                        props.page == "Tickets" ? "bg-gray-800 " : ""
                    }`}
                >
                    <a className="text-white">Tickets</a>
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
                    <div
                        className="cursor-pointer"
                        onClick={() => {
                            router.push("/login");
                        }}
                    >
                        <span className="text-white">Sign in</span>
                    </div>
                ) : (
                    <div>
                        <span className="text-white">{props.user}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
