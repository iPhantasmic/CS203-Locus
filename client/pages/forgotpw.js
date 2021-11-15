import Image from "next/image";
import {useEffect, useState} from "react";
import Spinner from "../components/Spinner";
import {notification} from "antd";
import {useRouter} from "next/router";
import Fade from "react-reveal/Fade";

export default function Login() {
    const router = useRouter();
    const axios = require('axios')
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const emailSuccessNotification = (type) => {
        notification[type]({
            message: "Success",
            description:
                "Reset email has been sent to email address.",
        });
    };

    const emailFailureNotification = (type) => {
        notification[type]({
            message: "Error",
            description:
                "An error has occurred. Please try again.",
        });
    };

    async function resetEmail() {
        setIsLoading(true)
        axios.post("https://locus-g3gtexqeba-uc.a.run.app/reset?email=" + email)
            .then(function (response1) {
                console.log(response1)
                setIsLoading(false)
                emailSuccessNotification('success')
                router.push('/login')
            }).catch((error) => {
            console.log(error.response.data.message)
            setIsLoading(false)
            emailFailureNotification('error')
            router.push('/login')
        })
    }

    useEffect(() => {
        document.title = 'Locus | Forgot Password';
    }, []);

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
                    Forgot Password?
                </span>
                            <span className="mb-4">
                    Reset password in two quick steps
                </span>
                            <input
                                placeholder="Input email address"
                                className="rounded border mb-4 h-12 px-3 w-96 rounded"
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                            />


                            <div
                                className="w-full items-center flex flex-col py-2 px-4 justify-center text-white rounded-full cursor-pointer bg-green-500 hover:bg-green-400"
                                onClick={() => resetEmail()}
                            >
                                <span className="text-base font-semibold">Reset Password</span>
                            </div>

                            <a className="self-center mt-4" onClick={() => router.push('/login')}>
                                Back
                            </a>
                        </div>
                    </Fade>
                    <span className="mt-5">
                New to Locus? <a style={{color: "#32BEA6"}}>Join Now</a>
            </span>
                </div>
            )}</>
    );
}
