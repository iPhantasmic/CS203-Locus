import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Spinner from "../components/Spinner";

export default function Login() {
    const axios = require("axios");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [successfullyVerified, setSuccessfullyVerified] = useState("");
    const router = useRouter();
    const {
        query: { token },
    } = router;

    useEffect(() => {
        document.title = "Locus | Confirm Email";
        if (token != undefined) {
            axios
                .post("http://localhost:8080/confirmemail?token=" + token, {})
                .then((response) => {
                    setSuccessfullyVerified(true);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error.response.data.message)
                    setSuccessfullyVerified(false);
                    setLoading(false);
                });
        }
    }, [token]);

    return (
        <>
            {loading ? (
                <Spinner />
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
                    ></div>
                    <div className="absolute top-0 left-2">
                        <Image
                            alt=" "
                            src="/logo.png"
                            height={100}
                            width={150}
                        />
                    </div>
                    <div className="flex-col flex border p-10 bg-white rounded-xl shadow-xl">
                        <span
                            style={{ fontSize: 30 }}
                            className="mb-1 font-bold"
                        >
                            {successfullyVerified?("Your Email has been verified"):("Your token has issues. Please try verifying again")}
                        </span>
                    </div>
                </div>
            )}
        </>
    );
}
