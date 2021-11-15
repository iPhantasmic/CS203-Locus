import { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import Cookies from "js-cookie";
import FacebookLogin from "react-facebook-login";
import { useRouter } from "next/router";
import Spinner from "../components/Spinner";
import Fade from "react-reveal/Fade";
import Slide from "react-reveal/Fade";
import { Divider } from "antd";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";

library.add(faGoogle, faFacebookF);

const btnGoogle = {
    margin: 5,
    width: "100%",
    height: 45,
    borderRadius: 4,
    background: "#db3236",
    color: "white",
    border: "0px transparent",
    textAlign: "center",
    fontSize: "100%",
    fontWeight: "300",
};

export default function Login() {
    const router = useRouter();
    const axios = require("axios");
    const [usernameResponse, setUsername] = useState("");
    const [passwordResponse, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const responseGoogle = (response) => {
        console.log(response.tokenObj);
        console.log(response.tokenObj.access_token);
        fetchMyAPI(response.tokenObj.access_token, "Google");
    };
    const responseFacebook = (response) => {
        console.log(response.tokenObj.access_token);
        fetchMyAPI(response.tokenObj.access_token, "Facebook");
    };

    async function submitLoginCredentials() {
        setLoading(true);
        axios
            .post(
                "https://locus-g3gtexqeba-uc.a.run.app/authenticate",
                {
                    username: usernameResponse,
                    password: passwordResponse,
                },
                { withCredentials: true }
            )
            .then(function (response1) {
                console.log(response1);
                console.log(response1.data.id);
                Cookies.set("id", response1.data.id);
                // Cookies.set("token", response1.data.token);
                Cookies.set("username", response1.data.name);
                Cookies.set("UUID", response1.data.username);
                router.push("/homeloggedin");
            })
            .catch(function (error) {
                setLoading(false);
                setErrorMessage("Invalid username/password");
                console.log(error);
            });
    }

    async function fetchMyAPI(response, type) {
        setLoading(true);
        if (type === "Google") {
            await axios
                .post(
                    "https://locus-g3gtexqeba-uc.a.run.app/google/signin?token=" + response,
                    {},
                    { withCredentials: true }
                )
                .then(function (response1) {
                    console.log(response1);
                    console.log(response1.data.id);
                    Cookies.set("id", response1.data.id);
                    // Cookies.set("token", response1.data.token);
                    Cookies.set("username", response1.data.name);
                    Cookies.set("UUID", response1.data.username);
                    router.push("/homeloggedin");
                })
                .catch(function (error) {
                    setLoading(false);
                    console.log(error);
                });
        } else {
            axios
                .post(
                    "https://locus-g3gtexqeba-uc.a.run.app/facebook/signin?token=" + response,
                    {},
                    { withCredentials: true }
                )
                .then(function (response1) {
                    console.log("hello" + response1);
                    // Cookies.set('token',response1.data.token)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    useEffect(() => {
        document.title = "Locus | Sign in";
        const script = document.createElement("script");
        script.src =
            "https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v12.0";
        script.async = true;
        script.crossOrigin = "anonymous";
        script.nonce = "YPNbbjSx";

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <>
            {" "}
            {loading ? (
                <Spinner />
            ) : (
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
                    />
                    <Fade bottom>
                        <div onClick={() => router.push('/login')} className="cursor-pointer absolute top-0 left-2">
                            <img
                                alt=" "
                                src="/logo.png"
                                height={100}
                                width={150}
                                className="ml-3"
                            />
                        </div>
                        <div className="flex-col flex border p-5 bg-white rounded-xl shadow-xl">
                            <span
                                style={{ fontSize: 35 }}
                                className="mb-1 font-bold"
                            >
                                Sign in
                            </span>
                            <span className="mb-4" style={{ fontSize: 14 }}>
                                Start joining and hosting events with Locus
                            </span>
                            {errorMessage !== "" ? (
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
                                placeholder="Username"
                                className="rounded border mb-4 h-12 px-3 w-96 rounded"
                                style={{ fontSize: 13 }}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="rounded border mb-2 h-12 px-3"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                            <button
                                onClick={() => {
                                    router.push("/forgotpw");
                                }}
                                className="self-start mb-4 rounded"
                                style={{ color: "#32BEA6" }}
                            >
                                Forgot password?
                            </button>
                            <button
                                className="w-full items-center py-2 px-4 rounded-full"
                                style={{
                                    backgroundColor: "#32BEA6",
                                    color: "white",
                                }}
                                onClick={() => submitLoginCredentials()}
                            >
                                <span className="text-base font-semibold">Sign In</span>
                            </button>
                            <Divider plain style={{ alignItems: "start" }}>
                                OR
                            </Divider>
                            <div className="text-center mt-0 font-semibold">
                                <GoogleLogin
                                    clientId="510265715964-60hka08qs988tarj2bcgk8o7olkbuhnf.apps.googleusercontent.com"
                                    className="text-center content-center btnGoogle font-semibold"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    icon={false}
                                    style={{ placeContent: "center" }}
                                >
                                    <FontAwesomeIcon
                                        icon={["fab", "google"]}
                                        style={{ marginRight: "10px" }}
                                    />
                                    <span>Continue with Google</span>
                                </GoogleLogin>
                                <FacebookLogin
                                    appId="1063235274482659"
                                    textButton="Continue with Facebook"
                                    onSuccess={responseFacebook}
                                    onFailure={() => console.log("Failed")}
                                    cssClass="text-center content-center btnFacebook font-semibold"
                                    icon={
                                        <FontAwesomeIcon
                                            icon={["fab", "facebook-f"]}
                                            style={{ marginRight: "10px" }}
                                        />
                                    }
                                />
                            </div>
                        </div>
                        <Slide>
                            <div className="mt-5">
                                <span>New to Locus?</span>
                                <a
                                    style={{ color: "#2b9e8b" }}
                                    className="font-bold"
                                    href="/signup"
                                >
                                    Join Now
                                </a>
                            </div>
                        </Slide>
                    </Fade>
                </div>
            )}
        </>
    );
}
