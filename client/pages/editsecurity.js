import React, { useEffect, useState } from "react";
import NavbarLoggedIn from "../components/NavbarLoggedIn";
import useSelection from "antd/lib/table/hooks/useSelection";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Divider } from "antd";

function EditProfile(props) {
    const axios = require("axios");
    const router = useRouter();
    const [name,setName] = useState("")
    const [username,setUsername] = useState("")
    const [newUsername, setNewUsername] = useState("");
    const [userEntity, setUserEntity] = useState("");
    const [email,setEmail] = useState("")
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage,setErrorMessage]  = useState("")


    useEffect(async () => {
        axios
            .post(
                "http://localhost:8080/validate",
                {},
                { withCredentials: true }
            )
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                router.push("/login");
                console.log(error);
            });

        document.title = "Locus | Homepage";
        if (Cookies.get("username") !== undefined) {
            setUsername(Cookies.get("username"));
        }
        axios
            .get("http://localhost:8080/user/" + Cookies.get("UUID"), {
                withCredentials: true,
            })
            .then(function (response) {
                console.log(response);
                setUserEntity(response.data);
                setName(response.data.name)
                setNewUsername(response.data.username)
                setEmail(response.data.email)
            });
    }, []);

    const updatePassword = () => {
        if (newPassword != confirmPassword){
            setErrorMessage("Passwords not matching!")
        }
        axios
            .post(
                "http://localhost:8080/password/" + userEntity.username,
                {
                    password:newPassword,
                    confirmPassword: confirmPassword
                },
                { withCredentials: true }
            )
            .then(() => {
                console.log("Success");
            })
            .catch((error) => console.log(error.response.data.message));
    };
    const updateUserDetails = () => {
        axios
            .post(
                "http://localhost:8080/user/" + userEntity.username,
                {
                    username: newUsername,
                    name: name,
                    email: email
                },
                { withCredentials: true }
            )
            .then(() => {
                console.log("Success");
            })
            .catch((error) => console.log(error.response.data.message));
    };

    return (
        <div>
            <NavbarLoggedIn user={username} />
            <div className="px-32 py-5 flex-col flex">
                <p className="text-2xl font-semibold">Login and Security</p>
                <p>Update your account's security information</p>
                <div className="w-full">
                    <div className="flex-row justify-between mt-10 ">
                        <div className="flex-col flex">
                            <span className="font-semibold text-lg text-gray-700">Password</span>
                            <span className = "text-red-500">{errorMessage}</span> 
                            <span className="mb-3">Current Password</span>
                            <input
                                className="border p-2 rounded w-1/2"
                                onChange={(e) => {
                                    setCurrentPassword(e.target.value);
                                }}
                            ></input>
                            <span className="text-green-100 mt-2">
                                Forgot password
                            </span>
                            <span className="mb-3 mt-5">New Password</span>
                            <input
                                className="border p-2 rounded w-1/2"
                                onChange={(e) => {
                                    setNewPassword(e.target.value);
                                }}
                            ></input>
                            <span className="mb-3 mt-4">Confirm Password</span>
                            <input
                                className="border p-2 rounded w-1/2"
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                }}
                            ></input>
                            <div
                                onClick={() => updatePassword()}
                                className="w-40 rounded p-2 border bg-green-100 justify-center flex cursor-pointer mt-3"
                            >
                                <span className="text-white">
                                    Update Password
                                </span>
                            </div>
                            <Divider />
                        </div>
                    </div>
                    <div className="flex-row justify-between">
                        <div className="flex-col flex">
                            <span className="font-semibold text-lg text-gray-700">Email Address</span>
                            <input
                                className="outline-none"
                                placeholder={userEntity.email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            ></input>
                            <Divider />
                        </div>
                    </div>
                    <div className="flex-row justify-between">
                        <div className="flex-col flex">
                            <span className="font-semibold text-lg text-gray-700">
                                Username
                            </span>
                            <input
                                className="outline-none"
                                placeholder={userEntity.username}
                                onChange={(e) => {
                                    setNewUsername(e.target.value);
                                }}
                            ></input>
                            <Divider />
                        </div>
                    </div>
                    <div className="flex-row justify-between">
                        <div className="flex-col flex">
                            <span className="font-bold text-lg">
                                Name
                            </span>
                            <input
                                className="outline-none"
                                placeholder={userEntity.name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            ></input>
                            <Divider />
                        </div>
                    </div>
                </div>
                <div
                    onClick={() => updateUserDetails()}
                    className="w-40 rounded-full p-4 border bg-green-100 justify-center flex cursor-pointer"
                >
                    <span className="text-white">Confirm Changes</span>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;
