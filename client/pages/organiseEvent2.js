import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import NavbarLoggedIn from "../components/NavbarLoggedIn";
import { Checkbox } from "antd";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Router, useRouter } from "next/router";
import Link from "next/link";

export default function Home() {
    const router = useRouter();
    const {
        query: { eventType, isPublic, participant },
    } = router;
    // const [isPublic, setIsPublic] = useState(true);
    // const [eventType, setEventType] = useState("Religious Event");
    const [username, setUsername] = useState("");
    // const [participant, setParticipant] = useState();
    const axios = require("axios");
    axios.defaults.baseURL = "http://localhost:8080";
    useEffect(() => {
        console.log(Cookies.get("token"));
        console.log(Cookies.get("username"));
        // username = Cookies.get('username') == undefined? "" : Cookies.get('username')
        if (Cookies.get("username") != undefined) {
            setUsername(Cookies.get("username"));
        }
    });
    const organizeEvent = () =>{
        
    }

    return (
        <div className="w-screen items-center flex-col flex">
            <NavbarLoggedIn page="Organise" user={username} />
            <div className="flex-col flex w-full items-center mt-10">
                <span style={{ fontSize: 30 }}>
                    Great! Let's move on to Event Details.
                </span>
                <span style={{ fontSize: 20 }}>
                    Please tell me more about when and where your event will
                    take place.
                </span>
            </div>
            <div className="flex-row flex justify-between w-full p-8">
                <div className=" flex-col flex px-5 border w-96 h-32 justify-center shadow-md mb-5">
                    <span className="mb-5">Event Name</span>
                    <input
                        onChange={(value) => setParticipant(value.target.value)}
                    ></input>
                </div>
                <div className=" flex-col flex px-5 border w-96 h-32 justify-center shadow-md mb-5">
                    <span className="mb-5">Start Time and Date</span>
                    <input
                        onChange={(value) => setParticipant(value.target.value)}
                    ></input>
                </div>
                <div className=" flex-col flex px-5 border w-96 h-32 justify-center shadow-md mb-5">
                    <span className="mb-5">End Time and Date</span>
                    <input
                        onChange={(value) => setParticipant(value.target.value)}
                    ></input>
                </div>
            </div>
            <div className="p-8 w-full">
                <div className="mt-2 w-full h-96 border shadow-md p-8">
                    <span className="mt-5">Event Details</span>
                    <input
                        onChange={(value) => setParticipant(value.target.value)}
                    ></input>
                </div>
            </div>

            <div
                className="w-1/5 border text-center h-10 justify-center flex-col flex rounded cursor-pointer"
                style={{
                    backgroundColor: "#32BEA6",
                    color: "white",
                }}
                onClick = {()=> organizeEvent()}
            >
                <span>Continue</span>
            </div>
        </div>
    );
}
