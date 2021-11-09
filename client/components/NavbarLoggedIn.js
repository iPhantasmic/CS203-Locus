import {useEffect, useState} from "react";
import {Dropdown, Menu} from "antd";
import {DownOutlined,} from "@ant-design/icons";
import {useRouter} from "next/router";
import Cookies from "js-cookie";

export default function NavbarLoggedIn(props) {
    const router = useRouter();
    const [userID, setUserId] = useState("");
    useEffect(() => {
        setUserId(Cookies.get('id'));
        console.log(props.username);
    }, []);

    const resourceMenu = (
        <Menu className="divide-y">
            <div>
                <Menu.Item className="font-semibold">
                    <div className="m-1" onClick={() => router.push('/allnews')}>
                        COVID-19 Updates
                    </div>
                </Menu.Item>
                <Menu.Item className="font-semibold">
                    <div className="m-1" onClick={() => router.push('https://www.gov.sg//article/covid-19-resources')}>
                        Resources
                    </div>
                </Menu.Item>
            </div>
        </Menu>
    )

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
        <div className="sticky top-0 z-40 h-20 w-full px-7 bg-white flex flex-row items-center justify-between">
            {/* <Image src="./locus_new_logo_white.png" height={80} width={110} /> */}
            <img src="/black_logo.png" width={150} height="auto"/>
            <div className="flex-row flex h-full items-center" style={{color: '#FFFFFF'}}>
                <div className="flex-col flex h-full justify-center px-8">
                    <a
                        className={`leading-loose hover:text-green-700 hover:text-underline text-base pb-2 ${
                            props.page === "Home" ? "border-b-0 md:border-b-2 border-black font-semibold text-black" : "text-black"
                        }`} href="/homeloggedin"
                    >
                        Home
                    </a>
                </div>
                <div className="flex-col flex h-full justify-center px-8">
                    <a
                        className={`leading-loose hover:text-green-700 hover:text-underline text-base pb-2 ${
                            props.page === "Browse" ? "border-b-0 md:border-b-2 border-black font-semibold text-black" : "text-black"
                        }`} href="/browseEvents"
                    >
                        Browse
                    </a>
                </div>
                <div className="flex-col flex h-full justify-center px-8">
                    <a
                        className={`leading-loose hover:text-green-700 hover:text-underline text-base pb-2 ${
                            props.page === "Tickets" ? "border-b-0 md:border-b-2 border-black font-semibold text-black" : "text-black"
                        }`} href="/eventticket"
                    >
                        Tickets
                    </a>
                </div>
                <div className="flex-col flex h-full justify-center px-8">
                    <a
                        className={`leading-loose hover:text-green-700 hover:text-underline text-base pb-2 ${
                            props.page === "Organise" ? "border-b-0 md:border-b-2 border-black font-semibold text-black" : "text-black"
                        }`} href="/organiserevent"
                    >
                        Organise
                    </a>
                </div>
                <div className="flex-col flex h-full justify-center px-8">
                    <Dropdown overlay={resourceMenu} size="large">
                        <a
                            className={`leading-loose hover:text-green-700 hover:text-underline text-base pb-2 ${
                                props.page === "Resources" ? "border-b-0 md:border-b-2 border-black font-semibold text-black" : "text-black"}`}
                            onClick={(e) => e.preventDefault()}
                        >Resources&#160;&#160;<DownOutlined/>
                        </a>
                    </Dropdown>
                    {/*<a*/}
                    {/*    className={`leading-loose hover:text-green-700 hover:text-underline text-base pb-2 ${*/}
                    {/*        props.page === "Resources" ? "border-b-0 md:border-b-2 border-black font-semibold text-black" : "text-black"*/}
                    {/*    }`} href="#"*/}
                    {/*>*/}
                    {/*    Resources*/}
                    {/*</a>*/}
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
                    <img style={{display: "-webkit-inline-box"}} src={"https://i.pravatar.cc/150?u=" + userID + "2"}
                         className="rounded-full h-8 w-8 flex items-center justify-center mr-2" alt=" "/>
                    <Dropdown overlay={menu} size="large">
                        <a
                            className="ant-dropdown-link text-black w-96 hover:text-black"
                            onClick={(e) => e.preventDefault()}
                        >{props.user} <DownOutlined/>
                        </a>
                    </Dropdown>
                </div>

            </div>


        </div>
    );
}
