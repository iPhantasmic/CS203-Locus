import {useState, useEffect} from "react";
import {Menu, Image, Divider, Dropdown} from "antd";
import {
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined, DownOutlined,
} from "@ant-design/icons";
import {Header} from "antd/lib/layout/layout";
import {useRouter} from "next/router";
import Link from "next/link"

export default function NavbarLoggedIn(props) {
    const router = useRouter();
    useEffect(() => {
        console.log(props.username);
    }, []);
    const menu = (
        <Menu className="divide-y">
            <div>
                <Menu.Item className="font-semibold">
                    <div className="m-1 mr-10" onClick={() => router.push('/profile')}>
                        My Profile
                    </div>
                </Menu.Item>
                <Menu.Item className="font-semibold">
                    <div className="m-1 mr-10" onClick={() => router.push('#')}>
                        Account
                    </div>
                </Menu.Item>
                <Menu.Item className="font-semibold">
                    <div className="m-1 mr-10" onClick={() => router.push('/organiserevent/')}>
                        Organized Events
                    </div>
                </Menu.Item>
                <Menu.Item className="font-semibold">
                    <div className="m-1 mr-10" onClick={() => router.push('#')}>
                        Get help
                    </div>
                </Menu.Item>
            </div>
            <div>
                <Menu.Item>
                    <div className="m-1 mr-10" onClick={() => router.push('#')}>
                        English (SG)
                    </div>
                </Menu.Item>
                <Menu.Item>
                    <div onClick={() => router.push('/')} className=" m-1 mr-10 text-red-500 font-bold">
                        Logout
                    </div>
                </Menu.Item>
            </div>
        </Menu>
    );
    return (
        <div className="h-20 w-full px-7 bg-black flex flex-row items-center justify-between">
            {/* <Image src="./locus_new_logo_white.png" height={80} width={110} /> */}
            <img src="/logo_white.png" width={150} height="auto"/>
            <div className="flex-row flex h-full items-center" style={{color: '#FFFFFF'}}>
                <div className="flex-col flex h-full justify-center px-8">
                    <a
                        className={`leading-loose hover:text-white hover:text-underline text-base pb-2 ${
                            props.page === "Home" ? "border-b-0 md:border-b-2 border-white font-semibold text-white" : "text-gray-200"
                        }`} href="/homeloggedin"
                    >
                        Home
                    </a>
                </div>
                <div className="flex-col flex h-full justify-center px-8">
                    <a
                        className={`leading-loose hover:text-white hover:text-underline text-base pb-2 ${
                            props.page === "Browse" ? "border-b-0 md:border-b-2 border-white font-semibold text-white" : "text-gray-200"
                        }`} href="/browseEvents"
                    >
                        Browse
                    </a>
                </div>
                <div className="flex-col flex h-full justify-center px-8">
                    <a
                        className={`leading-loose hover:text-white hover:text-underline text-base pb-2 ${
                            props.page === "Tickets" ? "border-b-0 md:border-b-2 border-white font-semibold text-white" : "text-gray-200"
                        }`} href="/eventticket"
                    >
                        Tickets
                    </a>
                </div>
                <div className="flex-col flex h-full justify-center px-8">
                    <a
                        className={`leading-loose hover:text-white hover:text-underline text-base pb-2 ${
                            props.page === "Organise" ? "border-b-0 md:border-b-2 border-white font-semibold text-white" : "text-gray-200"
                        }`} href="/organiseEvent1"
                    >
                        Organise
                    </a>
                </div>
                <div className="flex-col flex h-full justify-center px-8">
                    <a
                        className={`leading-loose hover:text-white hover:text-underline text-base pb-2 ${
                            props.page === "Resources" ? "border-b-0 md:border-b-2 border-white font-semibold text-white" : "text-gray-200"
                        }`} href="#"
                    >
                        Resources
                    </a>
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
                    <img style={{display: "-webkit-inline-box"}} src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9511dbb5-9be4-4651-be20-99508a7fbd79/de778ut-505703d5-1e7b-4fec-b7e3-6ee8bdcef929.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzk1MTFkYmI1LTliZTQtNDY1MS1iZTIwLTk5NTA4YTdmYmQ3OVwvZGU3Nzh1dC01MDU3MDNkNS0xZTdiLTRmZWMtYjdlMy02ZWU4YmRjZWY5MjkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.gZ2X09i1Edpth71xTOMMqrh7sJOIwXu_HAh7_1JtDa8" className="rounded-full h-8 w-8 flex items-center justify-center mr-2" alt=" " />
                    <Dropdown overlay={menu} size="large">
                        <a
                            className="ant-dropdown-link text-gray-200 w-96 hover:text-white"
                            onClick={(e) => e.preventDefault()}
                        >{props.user} <DownOutlined/>
                        </a>
                    </Dropdown>
                </div>

            </div>


        </div>
    );
}
