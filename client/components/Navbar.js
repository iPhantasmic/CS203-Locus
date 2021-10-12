import { useState, useEffect } from "react";
import { Menu, Divider } from "antd";
import {
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { Header } from "antd/lib/layout/layout";
import { useRouter } from "next/router";
import Link from "next/link"

export default function Navbar(props) {
    useEffect(() => {
        console.log(props.username);
    }, []);
    const router = useRouter();
    return (
        <div className="h-16 w-full px-7 bg-black flex flex-row items-center justify-between">
            <img alt=" " src="/logo_white.png" width={130} height={86}  />
            <div className="flex-row flex h-full items-center" style={{color: '#FFFFFF'}}>
                <div
                    className={`hover:underline flex-col flex h-full justify-center px-8 ${
                        props.page == "Home" ? "bg-gray-800 " : ""
                    }`}
                >
                    <Link
                        className="text-white"
                        style={{ textDecoration: "none" }}
                        href="/login"
                    >
                        Home
                    </Link>
                </div>
                <div
                    className={`hover:underline flex-col flex h-full justify-center px-8 ${
                        props.page == "Events" ? "bg-gray-800 " : ""
                    }`}
                >
                    <Link href="#" className="text-white">Events</Link>
                </div>
                <div
                    className={`hover:underline flex-col flex h-full justify-center px-8 ${
                        props.page == "Tickets" ? "bg-gray-800 " : ""
                    }`}
                >
                    <Link href="#" className="text-white">Tickets</Link>
                </div>
                <div
                    className={`hover:underline flex-col flex h-full justify-center px-8 ${
                        props.page == "Resources" ? "bg-gray-800 " : ""
                    }`}
                >
                    <Link href="#" className="text-white">Resources</Link>
                </div>
            </div>
            <div>
                {/*{props.user == "" ? (*/}
                    <div
                        className="cursor-pointer"
                        onClick={() => {
                            router.push("/login");
                        }}
                    >
                        <span className="text-white">Sign in</span>
                    </div>
                {/*) : (*/}
                {/*    <div>*/}
                {/*        <span className="text-white">{props.user}</span>*/}
                {/*    </div>*/}
                {/*)}*/}
            </div>
        </div>
    );
}
