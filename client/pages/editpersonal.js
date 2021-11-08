import React, { useEffect, useState } from "react";
import NavbarLoggedIn from "../components/NavbarLoggedIn";
import useSelection from "antd/lib/table/hooks/useSelection";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Divider } from "antd";

function EditProfile(props) {
    const axios = require("axios");
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [userEntity, setUserEntity] = useState("");

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
            });
    }, []);

    const updateUserDetails = () => {
        const updatedUserDTO = {
            name: username,
            username: userEntity.username,
            email: userEntity.email,
        };
        console.log(updatedUserDTO);
        axios
            .post(
                "http://localhost:8080/user/" + userEntity.username,
                {
                    name: username,
                    username: userEntity.username,
                    email: userEntity.email,
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
                <span className="text-2xl font-bold">Personal Information</span>
                <div className="w-full">
                    <div className="flex-row justify-between mt-10 ">
                        <div className="flex-col flex">
                            <span className="font-bold text-lg">
                                Legal Name
                            </span>
                            <input
                                className="outline-none"
                                placeholder={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                            ></input>
                            <Divider />
                        </div>
                    </div>
                    <div className="flex-row justify-between">
                        <div className="flex-col flex">
                            <span className="font-bold text-lg">Gender</span>
                            <input
                                className="outline-none"
                                placeholder="Male"
                            ></input>
                            <Divider />
                        </div>
                    </div>
                    <div className="flex-row justify-between">
                        <div className="flex-col flex">
                            <span className="font-bold text-lg">
                                Date Of Birth
                            </span>
                            <input
                                className="outline-none"
                                placeholder="October 30, 2021"
                            ></input>
                            <Divider />
                        </div>
                    </div>
                    <div className="flex-row justify-between">
                        <div className="flex-col flex">
                            <span className="font-bold text-lg">
                                Phone Number
                            </span>
                            <input
                                className="outline-none"
                                placeholder="+65 0000 1111"
                            ></input>
                            <Divider />
                        </div>
                    </div>
                </div>
                <div onClick={() => updateUserDetails()} className="w-40 rounded-full p-4 border bg-green-100 justify-center flex cursor-pointer">
                    <span className = "text-white">Confirm Changes</span>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;
