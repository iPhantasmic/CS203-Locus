import {useEffect, useState} from "react";
import LandingPageNews from "../components/LandingPageNews";
import EventCard from "../components/LandingPageEvent";
import Cookies from 'js-cookie'
import NavbarLoggedIn from "../components/NavbarLoggedIn";
import Fade from "react-reveal/Fade";
import {Pagination, Tabs} from "antd";
import axios from "axios";
import Spinner from "../components/Spinner";
import {useRouter} from "next/router";


export default function Home() {
    const router = useRouter();
    const {TabPane} = Tabs;
    const [token, setToken] = useState("")
    const [data, setData] = useState([]);
    const [username, setUsername] = useState("");
    const axios = require("axios");
    const [state, setState] = useState({
        minValue: 0,
        maxValue: 18
    });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        var jwtToken;
        if (Cookies.get('token') != undefined) {
            // setToken(Cookies.get('token'))
            // console.log(token)
            jwtToken = Cookies.get('token')
        }

        async function validateToken() {
            await axios.post("https://locus-g3gtexqeba-uc.a.run.app/validate?token=" + jwtToken, {}).then(function (response) {
                setLoading(false)
            }).catch(function (response){
                    router.push('/login')
            }
            )
        }

        validateToken()

        document.title = 'Locus | Homepage';
        if (Cookies.get('username') !== undefined) {
            setUsername(Cookies.get('username'))
        }


        const config = {
            headers: {Authorization: `Bearer ${jwtToken}`}
        };

        async function fetchMyAPI() {
            await axios.get("https://locus-g3gtexqeba-uc.a.run.app/event/list", config).then(function (response) {
                console.log(response.data)
                setData(response.data)
                console.log(data)
            })

        }

        fetchMyAPI();

    }, []);
    const handleChange = value => {
        setState({
            minValue: (value - 1) * 18,
            maxValue: value * 18
        });
    };
    return (
        <> {loading ? <Spinner/> :
            <div>
                <NavbarLoggedIn page="Home" user={username}/>
                <div className="px-16 flex-col flex">
                    <div className="w-screen -mx-16 py-14 px-16">
                        <div className="w-full justify-between flex-row flex mb-5 cursor-pointer">
                            <Fade left>
                        <span className="font-semibold text-2xl">
                            COVID-19 Guidelines Updates
                        </span></Fade>
                            <Fade left>
                                <div style={{display: "flex"}}>
                                    <a href="#">View All&#160;&#160;</a>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                                    </svg>
                                </div>
                            </Fade>
                        </div>
                        <Fade left>
                            <LandingPageNews
                                color="black"
                                header="September 2021 Revised Safe Management Measures for MICE"
                                content="As Singapore transits towards COVID resilience, he Multi-Ministry Taskforce (MTF) announced on
                                6 August 2021 that it would ease Safe Management
                                Measures in two steps. The first step took
                                effect from 10 September 2021 and the second
                                step is effective from 19 October 2021."
                                day="Today"
                                time="3:00 PM"
                            /></Fade>
                        <Fade left>
                            <LandingPageNews
                                color="black"
                                header="August 2021 Revised Safe Management Measures for Marriage Solemnizations and Wedding"
                                day="11 Aug"
                                time="2021"
                                content="Under Phase Two (Heightened Alert), from 22 July through 18 August 2021, tighter measures will apply to religious activities to reduce risks of community transmission. Following a mid-point review of Phase Two (Heightened Alert), we have updated the current safe management measures (SMMs) to prepare our transition towards COVID resilience."
                            /></Fade>
                        <Fade left>
                            <LandingPageNews
                                color="black"
                                day="08 Jun"
                                time="2021"
                                header="July 2021 Revised Safe Management Measures for Religious Activities"
                                content="From 19 August 2021, as Singapore prepares to move towards the Transition Stage A of living with an endemic COVID-19, measures governing the maximum group size for social gatherings, as well as for large scale events such as solemnisations and wedding receptions, will be relaxed, allowing social activities to continue in the new normal."
                            /></Fade>
                    </div>
                    <div className="mt-14 mb-8">
                    <span className="font-semibold text-2xl">
                        Recently Viewed
                    </span>
                    </div>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="All" key="1">
                            <div className="flex pb-10 hide-scroll-bar">
                                <div>
                                    {data &&
                                    data.length > 0 &&
                                    data.slice(state.minValue, state.maxValue).map((element) => {
                                        var dateString = new Date(element.startDateTime).toString()
                                        var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                                        return (
                                            <EventCard
                                                loggedin={true}
                                                key={element.id}
                                                id={element.id}
                                                location={element.address}
                                                title={element.name}
                                                dateTime={dateString.slice(0, 21) + AMPM}
                                            />
                                        );
                                    })}
                                    <div className="flex justify-center pt-5">
                                        <Pagination
                                            defaultCurrent={1}
                                            defaultPageSize={18} //default size of page
                                            onChange={handleChange}
                                            total={data.length} //total number of card data available
                                        />
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab="For you" key="2">
                            {data.slice(state.minValue, state.maxValue).map((element) => {
                                var dateString = new Date(element.startDateTime).toString()
                                var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                                // console.log(dateString.slice(0, 21) + AMPM)
                                return (
                                    <EventCard
                                        loggedin={true}
                                        key={element.id}
                                        id={element.id}
                                        location={element.address}
                                        title={element.name}
                                        dateTime={dateString.slice(0, 21) + AMPM}
                                    />
                                );
                            })}
                        </TabPane>
                        <TabPane tab="Today" key="3">
                            {data.slice(state.minValue, state.maxValue).map((element) => {
                                var dateString = new Date(element.startDateTime).toString()
                                var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                                // console.log(dateString.slice(0, 21) + AMPM)
                                return (
                                    <EventCard
                                        loggedin={true}
                                        key={element.id}
                                        id={element.id}
                                        location={element.address}
                                        title={element.name}
                                        dateTime={dateString.slice(0, 21) + AMPM}
                                    />
                                );
                            })}
                        </TabPane>
                        <TabPane tab="This Weekend" key="4">
                            {data.slice(state.minValue, state.maxValue).map((element) => {
                                var dateString = new Date(element.startDateTime).toString()
                                var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                                // console.log(dateString.slice(0, 21) + AMPM)
                                return (
                                    <EventCard
                                        loggedin={true}
                                        key={element.id}
                                        id={element.id}
                                        location={element.address}
                                        title={element.name}
                                        dateTime={dateString.slice(0, 21) + AMPM}
                                    />
                                );
                            })}
                        </TabPane>
                        <TabPane tab="This month" key="5">
                            {data.slice(state.minValue, state.maxValue).map((element) => {
                                var dateString = new Date(element.startDateTime).toString()
                                var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                                // console.log(dateString.slice(0, 21) + AMPM)
                                return (
                                    <EventCard
                                        loggedin={true}
                                        key={element.id}
                                        id={element.id}
                                        location={element.address}
                                        title={element.name}
                                        dateTime={dateString.slice(0, 21) + AMPM}
                                    />
                                );
                            })}
                        </TabPane>
                        <TabPane tab="Charity" key="6">
                            {data.slice(state.minValue, state.maxValue).map((element) => {
                                var dateString = new Date(element.startDateTime).toString()
                                var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                                // console.log(dateString.slice(0, 21) + AMPM)
                                return (
                                    <EventCard
                                        loggedin={true}
                                        key={element.id}
                                        id={element.id}
                                        location={element.address}
                                        title={element.name}
                                        dateTime={dateString.slice(0, 21) + AMPM}
                                    />
                                );
                            })}
                        </TabPane>
                        <TabPane tab="Music" key="7">
                            {data.slice(state.minValue, state.maxValue).map((element) => {
                                var dateString = new Date(element.startDateTime).toString()
                                var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                                // console.log(dateString.slice(0, 21) + AMPM)
                                return (
                                    <EventCard
                                        loggedin={true}
                                        key={element.id}
                                        id={element.id}
                                        location={element.address}
                                        title={element.name}
                                        dateTime={dateString.slice(0, 21) + AMPM}
                                    />
                                );
                            })}
                        </TabPane>
                        <TabPane tab="Hobby" key="8">
                            {data.slice(state.minValue, state.maxValue).map((element) => {
                                var dateString = new Date(element.startDateTime).toString()
                                var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                                // console.log(dateString.slice(0, 21) + AMPM)
                                return (
                                    <EventCard
                                        loggedin={true}
                                        key={element.id}
                                        id={element.id}
                                        location={element.address}
                                        title={element.name}
                                        dateTime={dateString.slice(0, 21) + AMPM}
                                    />
                                );
                            })}
                        </TabPane>
                        <TabPane tab="Food and Drink" key="9">
                            {data.slice(state.minValue, state.maxValue).map((element) => {
                                var dateString = new Date(element.startDateTime).toString()
                                var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                                // console.log(dateString.slice(0, 21) + AMPM)
                                return (
                                    <EventCard
                                        loggedin={true}
                                        key={element.id}
                                        id={element.id}
                                        location={element.address}
                                        title={element.name}
                                        dateTime={dateString.slice(0, 21) + AMPM}
                                    />
                                );
                            })}
                        </TabPane>
                    </Tabs>
                </div>
            </div>}
        </>
    );
}

