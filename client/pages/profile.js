import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import NavbarLoggedIn from "../components/NavbarLoggedIn";
import {Checkbox, Image} from "antd";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Router, useRouter } from "next/router";
import Link from "next/link";
import ImageUploader from "../components/ImageUploader";

export default function Profile() {
    const router = useRouter();
    const [isUpload, setIsUpload] = useState(false);
    const [eventType, setEventType] = useState("Relgious Event");
    const [username, setUsername] = useState("");
    const [participant, setParticipant] = useState();
    const axios = require("axios");
    axios.defaults.baseURL = "http://localhost:8080";
    useEffect(() => {
        console.log(Cookies.get("token"));
        console.log(Cookies.get("username"));
        // username = Cookies.get('username') == undefined? "" : Cookies.get('username')
        if (Cookies.get("username") != undefined) {
            setUsername(Cookies.get("username"));
        }
    },[])
    return (
        <div className="w-screen h-screen items-center flex-col flex">
            <NavbarLoggedIn page="Organise" user={username} />
            {/*<ImageUploader />*/}
            {isUpload && <div className="absolute flex-col flex w-full h-full bg-gray-400 opacity-75 items-center justify-center" >
                <ImageUploader state = {()=>setIsUpload(!isUpload)}/>
             </div>}
            <div className="flex-row flex mt-20">
                <div className="w-64">
                    <div className= "flex-col flex items-center p-5 border justify-self-center">
                        <span className="font-bold text-md mb-5">Verification Statuses</span>
                        <span className="mb-2">Vaccination Statuses</span>
                        <span className="mb-2">Identity Verification</span>
                        <span className="mb-2">Organization Verification</span>
                    </div>
                    <div className= "flex-col flex items-center p-5 border justify-self-center">
                        <div className="w-full border text-center rounded-full py-2" onClick= {()=>setIsUpload(true)}>
                            <span>
                                Verify Verification Statuses
                            </span>
                        </div>
                        <div className="w-full border text-center rounded-full py-2 bg-gray-400 mt-2">
                            <span className="text-white">
                                Verify Identity
                            </span>
                        </div>
                        <div className="w-full border text-center rounded-full py-2 bg-gray-400 mt-2">
                            <span className="text-white">
                                Verify Mobile Number
                            </span>
                        </div>
                        <div className="w-full border text-center rounded-full py-2 bg-gray-400 mt-2">
                            <span className="text-white">
                                Verify Organization
                            </span>
                        </div>

                    </div>
                </div>


                <div className= "ml-8">
                    <div className="text-xl font-bold">Account Management Tools</div>
                    <div className="text-xs">Manage your account with the tools below</div>
                    <div className="flex-row flex mt-5">
                        <div className="flex-col flex h-30 border w-72 p-5 shadow-xl rounded-xl">
                            <span className="font-bold text-md">Personal information</span>
                            <span>Provide personal details and how we can reach you</span>
                        </div>
                        <div className="flex-col flex h-30 border w-72 ml-5 p-5 shadow-xl rounded-xl">
                            <span className="font-bold text-md">Login and security</span>
                            <span>Update your password and secure your account</span>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}
