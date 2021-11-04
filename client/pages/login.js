import {useEffect, useState} from "react";
import {GoogleLogin} from "react-google-login";
import Cookies from "js-cookie";
import FacebookLogin from "react-facebook-login";
import {useRouter} from "next/router";
import Spinner from "../components/Spinner";
import Fade from 'react-reveal/Fade';
import Slide from 'react-reveal/Fade';
import {Divider} from 'antd';

export default function Login() {
    const router = useRouter();
    const axios = require("axios");
    const [usernameResponse, setUsername] = useState("");
    const [passwordResponse, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const responseGoogle = (response) => {
        console.log(response.tokenObj)
        console.log(response.tokenObj.access_token);
        fetchMyAPI(response.tokenObj.access_token, "Google");
    };
    const responseFacebook = (response) => {
        console.log(response.tokenObj.access_token);
        fetchMyAPI(response.tokenObj.access_token, "Facebook");
    };

    async function submitLoginCredentials() {
        setLoading(true)
        axios
            .post("http://localhost:8080/authenticate", {
                username: usernameResponse,
                password: passwordResponse,
            }, {withCredentials: true})
            .then(function (response1) {
                setErrorMessage("Successfully login");
                // Cookies.set("token", response1.data.token);
                Cookies.set("username", response1.data.name);
                Cookies.set("id", response1.data.id)
                router.push("/homeloggedin");
            })
            .catch(function (error) {
                setLoading(false)
                setErrorMessage("Invalid username/password");
                console.log(error.response.data.message);
            });
    }

    async function fetchMyAPI(response, type) {
        setLoading(true)
        if (type === "Google") {
            await axios
                .post("http://localhost:8080/google/signin?token=" + response, {}, {withCredentials: true})
                .then(function (response1) {
                    console.log(response1);
                    console.log(response1.data.id)
                    Cookies.set("id", response1.data.id)
                    // Cookies.set("token", response1.data.token);
                    Cookies.set("username", response1.data.name);
                    Cookies.set("UUID", response1.data.username);
                    router.push("/homeloggedin");
                })
                .catch(function (error) {
                    setLoading(false)
                    console.log(error.response.data.message);
                });
        } else {
            axios.post('http://localhost:8080/facebook/signin?token=' + response, {}, {withCredentials: true})
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
        document.title = 'Locus | Sign in';
    }, []);

    return (
        <> {loading ? <Spinner/> :
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
                    <div className="absolute top-0 left-2">
                        <img alt=" " src="/logo.png" height={100} width={150} className="ml-3"/>
                    </div>
                    <div className="flex-col flex border p-5 bg-white rounded-xl shadow-xl">
                <span style={{fontSize: 35}} className="mb-1 font-bold">
                    Sign in
                </span>
                        <span className="mb-4" style={{fontSize: 14}}>
                    Start joining and hosting events with Locus
                </span>
                        {errorMessage !== "" ? (
                            <span
                                className="mb-4 w-full text-center text-red-500"
                                style={{fontSize: 14}}
                            >
                        {errorMessage}
                    </span>
                        ) : (
                            <div/>
                        )}

                        <input
                            placeholder="Username/Email Address"
                            className="rounded border mb-4 h-12 px-3 w-96 rounded"
                            style={{fontSize: 13}}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder={"Password"}
                            className="rounded border mb-4 h-12 px-3"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        <button
                            onClick={() => {
                                router.push('/forgotpw')
                            }}
                            className="self-start mb-8 rounded"
                            style={{color: "#32BEA6"}}
                        >
                            Forgot password?
                        </button>
                        <button
                            className="w-full items-center py-2 px-4 rounded-full"
                            style={{backgroundColor: "#32BEA6", color: "white"}}
                            onClick={() => submitLoginCredentials()}
                        >
                            <span style={{fontSize: 16}}>Sign In</span>
                        </button>
                        <Divider plain style={{alignItems: "start"}}>OR</Divider>
                        <div className="text-center mt-2">
                            <GoogleLogin
                                theme="dark"
                                clientId="510265715964-60hka08qs988tarj2bcgk8o7olkbuhnf.apps.googleusercontent.com"
                                buttonText="Sign-in with Google"
                                className="text-center w-3/4 content-center"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                            />
                            <FacebookLogin
                                appId="1063235274482659"
                                textButton="Login"
                                onSuccess={responseFacebook}
                                onFailure={() => console.log("Failed")}
                            />
                        </div>

                    </div>
                    <Slide>
                        <div className="mt-5">
                    <span>
                        New to Locus?</span><a style={{color: "#2b9e8b"}} className="font-bold" href="/signup">Join
                            Now</a>
                        </div>
                    </Slide>
                </Fade>
            </div>}
        </>
    );
}
