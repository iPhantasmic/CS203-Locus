import Image from "next/image";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Spinner from "../components/Spinner";
import {notification} from "antd";
import Fade from "react-reveal/Fade";

export default function Login() {
    const axios = require("axios");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const {
        query: {token},
    } = router;

    const passwordResetSuccessNotification = (type) => {
        notification[type]({
            message: "Success",
            description:
                "Password reset successful",
        });
    };

    const passwordResetFailureNotification = (type) => {
        notification[type]({
            message: "Error",
            description:
                "An error has occurred while trying to reset your password.",
        });
    };

    async function confirmChanges() {
        if (password !== confirmPassword || password === undefined || confirmPassword === undefined) {
            setErrorMessage("Passwords are not matching")
            return
        }
        setIsLoading(true);
        axios.post("https://locus-g3gtexqeba-uc.a.run.app/resetpassword?token=" + token, {
            password: password,
            confirmPassword: confirmPassword
        })
            .then(function (response1) {
                setIsLoading(false)
                console.log(response1)
                passwordResetSuccessNotification('success')
            }).catch((error) => {
            setIsLoading(false)
            console.log(error.response.data.message)
            passwordResetFailureNotification('error')
        })
    }


    useEffect(() => {
        document.title = "Locus | Forgot Password";
        if (token !== undefined) {
            axios
                .post("https://locus-g3gtexqeba-uc.a.run.app/validate?token=" + token, {})
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
        <>
            {isLoading ? (
                <Spinner/>
            ) : (

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
                    />
                    <div onClick={() => router.push('/login')} className="cursor-pointer absolute top-0 left-2">
                        <Image alt=" " src="/logo.png" height={100} width={150}/>
                    </div>
                    <Fade bottom>
                        <div className="flex-col flex border p-5 bg-white rounded-xl shadow-xl">
                <span style={{fontSize: 35}} className="mb-1 font-bold">
                    Password Reset
                </span>
                            <span className="text-red-400 font-semibold">
                    {errorMessage}
                </span>
                            <div className="mb-4">
                    <span style={{fontSize: 14}}>
                        Create the new password for {" "}
                    </span>
                                <span className="text-blue-400">
                     {username}
                    </span>
                            </div>

                            <input
                                placeholder="Input new password"
                                type = "password"
                                className="rounded border mb-2 h-12 px-3 w-96 rounded"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                            <input
                                placeholder="Confirm new password"
                                type = "password"
                                className="rounded border mb-4 h-12 px-3 w-96 rounded"
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                }}
                            />

                            <div
                                className="w-full items-center flex flex-col py-2 px-4 justify-center text-white rounded-full cursor-pointer bg-green-500 hover:bg-green-400"
                                onClick={() => confirmChanges()}
                            >
                                <span className="text-base font-semibold">Confirm Changes</span>
                            </div>
                        </div>
                    </Fade>
                    <span className="mt-5">
                New to Locus? <a style={{color: "#32BEA6"}}>Join Now</a>
            </span>
                </div>

            )}
        </>
    );
}
