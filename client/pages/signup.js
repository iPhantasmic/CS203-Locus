import Image from "next/image";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";

import Cookies from "js-cookie";
import FacebookLogin from "react-facebook-login";
import axios from "axios";
import {useRouter} from "next/router";

export default function Signup() {
    const axios = require("axios");
    const router = useRouter();
    axios.defaults.baseURL = "http://localhost:8080";
    const [usernameResponse, setUsername] = useState("");
    const [nameResponse, setNameResponse] = useState("");
    const [email, setEmail] = useState("");
    const [passwordResponse, setPassword] = useState("");
    const [confirmPasswordResponse, setConfirmPasswordResponse] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const registerUser = () => {
        if (
            nameResponse == "" ||
            email == "" ||
            passwordResponse == "" ||
            confirmPasswordResponse == "" ||
            usernameResponse == ""
        ) {
            setErrorMessage("All fields have to be filled!");
        } else if (passwordResponse != confirmPasswordResponse) {
            setErrorMessage("Passwords are not matching!");
        } else {
            axios
                .post("/register", {
                    username: usernameResponse,
                    password: passwordResponse,
                    email: email,
                    name: nameResponse,
                    confirmPassword: confirmPasswordResponse,
                })
                .then(function (response1) {
                    setErrorMessage("Successfully Created!");
                    axios
                        .post("/authenticate", {
                            username: usernameResponse,
                            password: passwordResponse,
                        })
                        .then(function (response1) {
                            setErrorMessage("Successfully login");
                            Cookies.set("token", response1.data.token);
                            Cookies.set("username", response1.data.name);
                            Cookies.set("id",response1.data.id)
                            router.push("/homeloggedin");
                        })
                        .catch(function (error) {
                            setErrorMessage("Invalid username/password");
                            console.log(error);
                        });
                })
                .catch(function (error) {
                    setErrorMessage("Invalid Email Address");
                    console.log(error);
                });
        }
    };
    return (
        <div className="h-screen w-screen flex-col flex items-center justify-center">
            <div
                style={{
                    backgroundImage: "url(/signup.jpeg)",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    width: "100vw",
                    height: "100vh",
                    opacity: 0.2,
                    position: "absolute",
                    zIndex: -1,
                }}
            ></div>
            <div className="absolute top-0 left-2">
                <Image src="/logo.png" height={100} width={150} />
            </div>
            <div className="flex-col flex border p-5 bg-white rounded-xl shadow-xl">
                <span style={{ fontSize: 35 }} className="mb-1 font-bold">
                    Sign Up
                </span>
                <span className="mb-4" style={{ fontSize: 14 }}>
                    Start joining and hosting events with Locus
                </span>
                {errorMessage != "" ? (
                    <span
                        className="mb-4 w-full text-center text-red-500"
                        style={{ fontSize: 14 }}
                    >
                        {errorMessage}
                    </span>
                ) : (
                    <div />
                )}
                <input
                    placeholder="Name"
                    className="rounded border mb-4 h-14 px-3 w-96 rounded"
                    style={{ fontSize: 13 }}
                    onChange={(e) => setNameResponse(e.target.value)}
                />
                <input
                    placeholder="Username"
                    className="rounded border mb-4 h-14 px-3 w-96 rounded"
                    style={{ fontSize: 13 }}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    placeholder={"Email Address"}
                    className="rounded border mb-4 h-14 px-3"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder={"Password"}
                    className="rounded border mb-4 h-14 px-3"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder={"Confirm Password"}
                    className="rounded border mb-4 h-14 px-3"
                    onChange={(e) => setConfirmPasswordResponse(e.target.value)}
                />
                <div className="flex-col flex items-center mb-6">
                    <span style={{ fontSize: 11, color: "#707070" }}>
                        By clicking Sign Up, you agree to the Locus User
                        Agreement, Privacy Policy
                    </span>
                    <span style={{ fontSize: 11, color: "#707070" }}>
                        and Cookie Policy
                    </span>
                </div>

                <div
                    className="w-full items-center flex flex-col justify-center h-14 rounded-full"
                    style={{ backgroundColor: "#32BEA6", color: "white" }}
                    onClick={() => registerUser()}
                >
                    <span style={{ fontSize: 20 }}>Sign Up</span>
                </div>
                {/* <FacebookLogin 
                    appId="3139977946220316"
                    textButton="Login"
                    onSuccess={responseFacebook}
                    onFailure ={()=>console.log("Failed")}
                /> */}
            </div>
            <span className="mt-5">
                New to Locus? <a style={{ color: "#32BEA6" }}>Join Now</a>
            </span>
        </div>
    );
}
