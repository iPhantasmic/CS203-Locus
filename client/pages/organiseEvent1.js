import {useState, useEffect} from "react";
import Cookies from "js-cookie";
import NavbarLoggedIn from "../components/NavbarLoggedIn";
import {Checkbox} from "antd";
import {Menu, Dropdown} from "antd";
import {DownOutlined} from "@ant-design/icons";
import {Router, useRouter} from "next/router";
import Link from "next/link";
import {Input} from 'antd';

export default function Home() {
    const router = useRouter();
    const [isPublic, setIsPublic] = useState(true);
    const [eventType, setEventType] = useState("Religious Event");
    const [username, setUsername] = useState("");
    const [participant, setParticipant] = useState();
    const axios = require("axios");
    axios.defaults.baseURL = "http://localhost:8080";
    useEffect(() => {
        // console.log(Cookies.get("token"));
        // console.log(Cookies.get("username"));
        // username = Cookies.get('username') == undefined? "" : Cookies.get('username')
        if (Cookies.get("username") != undefined) {
            setUsername(Cookies.get("username"));
        }
    });
    const menu = (
        <Menu>
            <Menu.Item>
                <div onClick={() => setEventType("Attractions")}>
                    Arts and Culture
                </div>
            </Menu.Item>
            <Menu.Item>
                <div onClick={() => setEventType("Attractions")}>
                    Attractions
                </div>
            </Menu.Item>
            <Menu.Item>
                <div onClick={() => setEventType("Education and Training")}>
                    Education and Training
                </div>
            </Menu.Item>
            <Menu.Item>
                <div onClick={() => setEventType("Finance")}>Finance</div>
            </Menu.Item>
            <Menu.Item>
                <div onClick={() => setEventType("Marriage")}>Marriage</div>
            </Menu.Item>
            <Menu.Item>
                <div onClick={() => setEventType("Sports")}>Sports</div>
            </Menu.Item>
        </Menu>
    );
    return (
        <div className="w-screen items-center flex-col flex">
            <NavbarLoggedIn page="Organise" user={username}/>
            <div className="flex-col flex w-full items-center mt-10">
                <img src="/lucas.png" alt=" " width={90} height="auto"/>
                <span style={{fontSize: 30}}>
                    Hello there! I am Lucas and I am here to guide you.
                </span>
                <span style={{fontSize: 20}}>
                    Please provide more information about your event below
                </span>
            </div>
            <div className="space-x-4 flex-row flex justify-between pt-8 pb-8 pl-20 pr-20 w-full">
                <div className="flex-col flex px-5 border w-96 h-32 justify-center shadow-md">
                    <span className="mb-5">Choose an event type</span>
                    <Dropdown overlay={menu}>
                        <p
                            className="ant-dropdown-link font-bold text-lg"
                            onClick={(e) => e.preventDefault()}
                        >
                            {eventType} <DownOutlined/>
                        </p>
                    </Dropdown>
                </div>
                <div className="flex-col flex px-5 border w-96 h-32 justify-center shadow-md">
                    <span className="mb-5">This event will be</span>
                    <div className="flex-row flex">
                        <Checkbox
                            checked={isPublic}
                            onChange={() => setIsPublic(true)}
                        >
                            <span className="font-bold text-lg">Public</span>
                        </Checkbox>
                        <Checkbox
                            checked={!isPublic}
                            onChange={() => setIsPublic(false)}
                        >
                            <span className="font-bold text-lg">Private</span>
                        </Checkbox>
                    </div>
                </div>
                <div className="flex-col flex px-5 border w-96 h-32 justify-center shadow-md">
                    <span className="mb-5">Number of participants</span>
                    <Input className="font-bold text-lg" placeholder="Expected no. of participants" bordered={false}
                           onChange={(value) => setParticipant(value.target.value)}
                    ></Input>
                </div>
            </div>
            <div
                className="w-1/5 border text-center h-10 justify-center flex-col flex rounded cursor-pointer"
                style={{
                    backgroundColor: "#32BEA6",
                    color: "white",
                }}
            >
                <Link replace href={{
                    pathname: "/organiseEvent2", query: {
                        eventType: eventType,
                        isPublic: isPublic,
                        participant: participant,
                    },
                }}
                >
                    <span>Continue</span>
                </Link>
            </div>
        </div>
    );
}
