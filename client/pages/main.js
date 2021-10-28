import Footer from "../components/Footer";
import Image from "next/image";
import Navbar from "../components/Navbar";
import cartoon from "../public/homeImage.png";
import {useEffect, useState} from "react";
import LandingPageNews from "../components/LandingPageNews";
import EventCard from "../components/LandingPageEvent";
import Fade from 'react-reveal/Fade';
import Slide from 'react-reveal/Fade';
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import {Pagination, Tabs} from 'antd';

export default function Home() {
    const {TabPane} = Tabs;
    const router = useRouter();
    const {
        query: {eventType, isPublic, participant},
    } = router;
    const [state, setState] = useState({
        minValue: 0,
        maxValue: 9
    });
    const [username, setUsername] = useState("");
    const [data, setData] = useState([]);
    const axios = require("axios");
    useEffect(() => {
        document.title = 'Locus | We take care of your events'
        if (Cookies.get('username') !== undefined) {
            setUsername(Cookies.get('username'))
        }

        function fetchMyAPI() {
            axios.get("https://locus-g3gtexqeba-uc.a.run.app/event/list").then(function (response) {
                setData(response.data);
                // console.log(data);
            });
        }

        fetchMyAPI();
    }, []);

    const handleChange = value => {
        setState({
            minValue: (value - 1) * 9,
            maxValue: value * 9
        });
    };

    return (
        <>
            <Navbar page="Home" user={username}/>
            <div className="px-16 flex-col flex">
                <Fade>
                    <div className="flex-row flex items-center justify-center">
                        <Image alt=" " src={cartoon} width={622} height={622} className="m-0"/>
                        <div className="flex-col flex ml-24">
                            <span className="font-bold" style={{fontSize: 61}}>We Take Care</span>
                            <span className="font-bold leading-3" style={{fontSize: 61, color: "#32BEA6"}}>Of Your Events</span>
                            <div className="mt-10 ml-1" style={{fontSize: 16, display: "flex"}}><span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                 fill="#32BEA6" stroke="#32BEA6"><path fill-rule="evenodd"
                                                                       d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                       clip-rule="evenodd"/></svg></span>
                                &#160;&#160;Track COVID-19 vaccination status.
                            </div>
                            <span className="mt-1 ml-1" style={{fontSize: 16, display: "flex"}}><span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                 fill="#32BEA6" stroke="#32BEA6"><path fill-rule="evenodd"
                                                                       d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                       clip-rule="evenodd"/></svg></span>
                                &#160;&#160;Keep up to date with changing COVID-19 guidelines.
                            </span>
                            <div className="mt-1 ml-1" style={{fontSize: 16, display: "flex"}}><span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                 fill="#32BEA6" stroke="#32BEA6"><path fill-rule="evenodd"
                                                                       d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                       clip-rule="evenodd"/></svg></span>
                                &#160;&#160;Co-ordinate all your stakeholders on our platform.
                            </div>
                            <div className="w-full flex-row flex justify-around mt-10">
                                <button
                                    className="motion-safe:hover:scale-110 cursor-pointer font-semibold border w-40 h-10 flex items-center justify-center rounded-md"
                                    style={{
                                        backgroundColor: "#32BEA6",
                                        color: "white",
                                    }}
                                    onClick={() => router.push('/signup')}
                                >
                                    Sign up now
                                </button>
                                <div
                                    className="motion-safe:hover:scale-110 font-semibold border w-40 flex items-center justify-center h-10 rounded-md "
                                    style={{
                                        backgroundColor: "#757575",
                                        color: "white",
                                    }}
                                >
                                    Browse events
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
                <div className="bg-black w-screen -mx-16 py-14 px-16">
                    <div className="w-full justify-between flex-row flex mb-5 cursor-pointer">
                        <Fade left>
                        <span className="font-semibold text-2xl text-white">
                            COVID-19 Guidelines Updates
                        </span></Fade>
                        <Fade left>
                            <div className="text-white" style={{display: "flex"}}>
                                <a className="text-white" href="#">View All&#160;&#160;</a>
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
                            color="white"
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
                            color="white"
                            header="August 2021 Revised Safe Management Measures for Marriage Solemnizations and Wedding"
                            day="11 Aug"
                            time="2021"
                            content="Under Phase Two (Heightened Alert), from 22 July through 18 August 2021, tighter measures will apply to religious activities to reduce risks of community transmission. Following a mid-point review of Phase Two (Heightened Alert), we have updated the current safe management measures (SMMs) to prepare our transition towards COVID resilience."
                        /></Fade>
                    <Fade left>
                        <LandingPageNews
                            color="white"
                            day="08 Jun"
                            time="2021"
                            header="July 2021 Revised Safe Management Measures for Religious Activities"
                            content="From 19 August 2021, as Singapore prepares to move towards the Transition Stage A of living with an endemic COVID-19, measures governing the maximum group size for social gatherings, as well as for large scale events such as solemnisations and wedding receptions, will be relaxed, allowing social activities to continue in the new normal."
                        /></Fade>
                </div>
                <div className="mt-14 mb-8">
                    <span className="font-semibold text-2xl">
                        Upcoming Public Events
                    </span>
                </div>
                {/* TODO: Refactor this events part */}
                <Tabs defaultActiveKey="1">
                    <TabPane tab="All" key="1">
                        <div className="flex pb-10 hide-scroll-bar">
                            <div>
                                {data &&
                                data.length > 0 &&
                                data.slice(state.minValue, state.maxValue).map((element) => {
                                    var dateString = new Date(element.startDateTime).toString()
                                    var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                                    // console.log(dateString.slice(0, 21) + AMPM)
                                    return (
                                        <EventCard
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
                                        defaultPageSize={9} //default size of page
                                        onChange={handleChange}
                                        total={data.length} //total number of card data available
                                    />
                                </div>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="For you" key="2">
                        {data.map((element) => {
                            var dateString = new Date(element.startDateTime).toString()
                            var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                            // console.log(dateString.slice(0, 21) + AMPM)
                            return (
                                <EventCard
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
                        {data.map((element) => {
                            var dateString = new Date(element.startDateTime).toString()
                            var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                            // console.log(dateString.slice(0, 21) + AMPM)
                            return (
                                <EventCard
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
                        {data.map((element) => {
                            var dateString = new Date(element.startDateTime).toString()
                            var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                            // console.log(dateString.slice(0, 21) + AMPM)
                            return (
                                <EventCard
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
                        {data.map((element) => {
                            var dateString = new Date(element.startDateTime).toString()
                            var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                            // console.log(dateString.slice(0, 21) + AMPM)
                            return (
                                <EventCard
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
                        {data.map((element) => {
                            var dateString = new Date(element.startDateTime).toString()
                            var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                            // console.log(dateString.slice(0, 21) + AMPM)
                            return (
                                <EventCard
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
                        {data.map((element) => {
                            var dateString = new Date(element.startDateTime).toString()
                            var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                            // console.log(dateString.slice(0, 21) + AMPM)
                            return (
                                <EventCard
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
                        {data.map((element) => {
                            var dateString = new Date(element.startDateTime).toString()
                            var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                            // console.log(dateString.slice(0, 21) + AMPM)
                            return (
                                <EventCard
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
                        {data.map((element) => {
                            var dateString = new Date(element.startDateTime).toString()
                            var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                            // console.log(dateString.slice(0, 21) + AMPM)
                            return (
                                <EventCard
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
                <div className="bg-black w-screen -mx-16 px-16 flex">
                    <div className="grid grid-rows-3 grid-flow-col gap-0">
                        <div className="row-span-3"><Slide><img src="/appmock.png" alt=" " width={622}
                                                                height={622}
                                                                className="m-0"/></Slide></div>
                        <div className="col-span-2">
                        </div>
                        <Slide>
                            <div className="col-span-2 align-bottom">
                            <span className="font-bold text-3xl text-white">
                                Events at your fingertips
                            </span>
                                <br/>
                                <span className="text-lg text-white overflow-hidden">
                                Manage your events and booking on-the-go with<br/> our Locus mobile application.
                            </span>
                            </div>
                            <div className="col-span-2">
                                <img src="/appstore.png" alt=" " width={400}
                                     className="m-0"/>
                            </div>
                        </Slide>
                    </div>

                    {/*<div className="w-full justify-between flex-row flex mb-5 cursor-pointer">*/}
                    {/*    <Fade left>*/}

                    {/*    </Fade>*/}
                    {/*    /!*<Fade left>*!/*/}
                    {/*    /!*</Fade>*!/*/}
                    {/*</div>*/}
                    {/*<Fade left>*/}
                    {/*</Fade>*/}
                </div>
            </div>
            <Footer/>
        </>

    );
}

