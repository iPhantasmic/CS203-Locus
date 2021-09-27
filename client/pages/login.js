import Image from "next/image";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import background from "../public/login.jpeg";

export default function Login() {
    const axios = require("axios");
    axios.defaults.baseURL = 'http://localhost:8080'
    const [data, setData] = useState([]);
    const responseGoogle = (response) => {
        console.log(response.$b.access_token);
        fetchMyAPI(response);
    };
    async function fetchMyAPI(response) {
        axios.post('/google/signin', {
            response
          })
          .then(function (response1) {
            console.log(response1);
          })
          .catch(function (error) {
            console.log(error);
          });
    }


    return (
        <div className="h-screen w-screen flex-col flex items-center justify-center">
            <div
                style={{
                    backgroundImage: "url(/login.jpeg)",
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
                    Sign in
                </span>
                <span className="mb-4" style={{ fontSize: 14 }}>
                    Start joining and hosting events with Locus
                </span>
                <input
                    placeholder="Username/Email Address"
                    className="rounded border mb-4 h-14 px-3 w-96 rounded"
                    style={{ fontSize: 13 }}
                />
                <input
                    placeholder="Password"
                    className="rounded border mb-4 h-14 px-3"
                />
                <button
                    onClick={() => {
                        console.log("Hello");
                    }}
                    className="self-start mb-8 rounded"
                    style={{ color: "#32BEA6" }}
                >
                    Forgot password?
                </button>
                <div
                    className="w-full items-center flex flex-col justify-center h-14 rounded-full"
                    style={{ backgroundColor: "#32BEA6", color: "white" }}
                >
                    <span style={{ fontSize: 20 }}>Sign In</span>
                    <GoogleLogin
                        clientId="510265715964-60hka08qs988tarj2bcgk8o7olkbuhnf.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                    />
                </div>
            </div>
            <span className="mt-5">
                New to Locus? <a style={{ color: "#32BEA6" }}>Join Now</a>
            </span>
        </div>
    );
}
