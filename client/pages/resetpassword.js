import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
    const axios = require("axios");
    const [username, setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword ] = useState("")
    const [errorMessage,setErrorMessage] = useState("")
    const router = useRouter();
    const {
        query: { token },
    } = router;

    async function confirmChanges() {
        if (password != confirmPassword){
            setErrorMessage("Passwords are not matching")
            return
        }
        axios.post("http://localhost:8080/resetpassword?token=" + token,{
            password:password,
            confirmPassword:confirmPassword
        })
            .then(function (response1) {
                console.log(response1)
            }).catch((error) => {
            console.log(error.response.data.message)
        })
    }


    useEffect(() => {
        document.title = "Locus | Forgot Password";
        if (token != undefined) {
            axios
                .post("http://localhost:8080/validate?token=" + token, {})
                .then((response) => {
                    console.log(response.data);
                    setUsername(response.data);
                })
                .catch((error) => {
                    console.log(error.response.data.message);
                });
        }
    }, [token]);

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
                <Image alt=" " src="/logo.png" height={100} width={150} />
            </div>
            <div className="flex-col flex border p-5 bg-white rounded-xl shadow-xl">
                <span style={{ fontSize: 30 }} className="mb-1 font-bold">
                    Let's create your new password
                </span>
                <span className = "text-red-400">
                    {errorMessage}
                </span>
                <div>
                    <span className="mb-4" style={{ fontSize: 14 }}>
                        Create the new password for {" "}
                    </span>
                    <span className ="text-blue-400">
                     {username}
                    </span>
                </div>

                <input
                    placeholder="New Password"
                    className="rounded border mb-6 h-14 px-3 w-full rounded mt-3"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    style={{ fontSize: 13 }}
                />
                <input
                    placeholder="Confirm Password"
                    className="rounded border mb-6 h-14 px-3 w-full rounded"
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                    }}
                    style={{ fontSize: 13 }}
                />

                <div
                    className="w-full items-center flex flex-col justify-center h-14 rounded-full cursor-pointer"
                    style={{ backgroundColor: "#3295BE", color: "white" }}
                    onClick={() => confirmChanges()}
                >
                    <span style={{ fontSize: 15 }}>Confirm Changes</span>
                </div>

                <span className="self-center mt-6" style={{ fontSize: 17 }}>
                    Back
                </span>
            </div>
            <span className="mt-5">
                New to Locus? <a style={{ color: "#32BEA6" }}>Join Now</a>
            </span>
        </div>
    );
}
