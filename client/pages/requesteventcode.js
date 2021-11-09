import {useEffect, useState} from "react";
import LandingPageNews from "../components/LandingPageNews";
import EventCard from "../components/LandingPageEvent";
import Cookies from 'js-cookie'
import NavbarLoggedIn from "../components/NavbarLoggedIn";
import Fade from "react-reveal/Fade";
import {Alert, Carousel, Input, Pagination, Tabs} from "antd";
import Spinner from "../components/Spinner"
import {useRouter} from "next/router";
import Marquee from 'react-fast-marquee';
import Footer from "../components/Footer";

const contentStyle = {
    height: '450px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
const PrivateEvent = () => {

    const router = useRouter();
    const {TabPane} = Tabs;
    const [data, setData] = useState([]);
    const [username, setUsername] = useState("");
    const axios = require("axios");
    const [news, setNews] = useState([])
    const [inviteCode, setInviteCode] = useState("")
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false)
    const [state, setState] = useState({
        minValue: 0,
        maxValue: 18
    });


    useEffect(async () => {
        axios.post("http://localhost:8080/validate", {}, {withCredentials: true})
            .then(function (response) {
                setLoggedIn(true);
                // console.log(response)
            }).catch(function (error) {
            setLoggedIn(false);
            router.push("/login");
            console.log(error)
        })

        document.title = 'Locus | Homepage';
        if (Cookies.get('username') !== undefined) {
            setUsername(Cookies.get('username'))
        }

        const config = ({
            withCredentials: true,
        })

        async function fetchMyAPI() {
            await axios.get("http://localhost:8080/event/list", config).then(function (response) {
                setData(response.data)
                console.log(response.data)
            }).catch(function (error) {
                console.log(error)
            })

        }

        async function fetchNewsAPI() {
            await axios.get("https://locus-dev.herokuapp.com/v1/daily").then(function (response) {
                // console.log(response.data)
                setNews(response.data)
            }).catch(function (error) {
                console.log(error);
            })
        }

        await fetchNewsAPI()
        await fetchMyAPI();

        setLoading(false)
    }, []);
    const handleChange = value => {
        setState({
            minValue: (value - 1) * 18,
            maxValue: value * 18
        });
    };


    return (
        <>
            {loading || !loggedIn ? <Spinner/> :
                <>
                    <div>
                        <NavbarLoggedIn page="Home" user={username}/>
                        <div className="w-screen" style={{
                            height: 'calc(100vh - 5rem)',
                            backgroundImage: 'url(' + 'https://storage.googleapis.com/locus-poc/pexels-photo-1025469.png' + ')'
                        }}>
                            {/*<span style={{height: 'calc(100vh - 5rem)'}}*/}
                            {/*    id="blackOverlay"*/}
                            {/*    className="w-screen h-screen absolute opacity-50 bg-black z-1"*/}
                            {/*/>*/}
                            <div style={{height: 'calc(100vh - 5rem)'}}
                                 className="z-10 flex items-center justify-center space-x-5">
                                <div className="rounded-lg shadow-xl bg-white">
                                    <div className="p-8">
                                        <header className="font-semibold text-xl">Enter Invite Code</header>
                                        <p className="text-gray-500">
                                            Invite code required to view and join private events.
                                        </p>
                                        <footer className="text-center mt-5">
                                            <Input size="large" placeholder="Input invite code" bordered={false} onChange={(e) => {
                                                setInviteCode(e.target.value)
                                            }}/>
                                            <button onClick={() => router.push('/event/invite/' + inviteCode)}
                                                className="py-2 px-4 mt-5 ml-0 bg-green-500 rounded-lg text-white font-semibold hover:bg-green-600"
                                            >
                                                View private event
                                            </button>
                                        </footer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default PrivateEvent