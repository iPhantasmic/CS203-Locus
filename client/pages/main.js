import Image from "next/image";
import Navbar from "../components/Navbar";
import cartoon from "../public/homeImage.png";
import { useState, useEffect } from "react";
import { Divider } from "antd";
import LandingPageNews from "../components/LandingPageNews";
import EventCard from "../components/LandingPageEvent";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter();
    const {
        query: { eventType, isPublic, participant },
    } = router;
    const [data, setData] = useState([]);
    var username = "";
    const axios = require("axios");
    axios.defaults.baseURL = "http://localhost:8080";
    useEffect(() => {
        console.log(Cookies.get("token"));
        username =
            Cookies.get("username") == undefined ? "" : Cookies.get("username");
        async function fetchMyAPI() {
            axios.get("/event/list").then(function (response) {
                console.log(response.data);
                setData(response.data);
                console.log(data);
            });
        }
        fetchMyAPI();
    }, []);

    return (
        <div>
            <Navbar page="Home" user={username} />
            <div className="px-16 flex-col flex">
                <div className="flex-row flex items-center justify-center">
                    <Image src={cartoon} width={800} height={800} />
                    <div className="flex-col flex ml-24">
                        <span style={{ fontSize: 61 }}>We Take Care</span>
                        <span style={{ fontSize: 61, color: "#32BEA6" }}>
                            Of Your Events
                        </span>
                        <span style={{ fontSize: 18 }} className="mt-10">
                            Track COVID-19 vaccination status
                        </span>
                        <span style={{ fontSize: 18 }}>
                            Keep up to date with changing COVID-19 guidelines
                        </span>
                        <span style={{ fontSize: 18 }}>
                            Co-ordinate all your stakeholders on our platform
                        </span>
                        <div className="w-full flex-row flex justify-between mt-10">
                            <div
                                className="border w-40 h-10 flex items-center justify-center rounded-md"
                                style={{
                                    backgroundColor: "#32BEA6",
                                    color: "white",
                                }}
                            >
                                Organize Event
                            </div>
                            <div
                                className="border w-40 flex items-center justify-center h-10 rounded-md "
                                style={{
                                    backgroundColor: "#757575",
                                    color: "white",
                                }}
                            >
                                Join Event
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-black w-screen -mx-16 p-16">
                    <div className="w-full justify-between flex-row flex mb-5">
                        <span
                            style={{
                                fontSize: 27,
                                fontWeight: "bold",
                                color: "white",
                            }}
                        >
                            COVID-19 Guidelines Updates
                        </span>
                        <div style={{ fontSize: 21, color: "white" }}>
                            View All
                        </div>
                    </div>
                    <LandingPageNews
                        header="September 2021 Revised Safe Management Measures for MICE"
                        content="As Singapore transits towards COVID resilience, he Multi-Ministry Taskforce (MTF) announced on
                                6 August 2021 that it would ease Safe Management
                                Measures in two steps. The first step took
                                effect from 10 September 2021 and the second
                                step is effective from 19 October 2021."
                        day="Today"
                        time="3:00 PM"
                    />
                    <LandingPageNews
                        header="August 2021 Revised Safe Management Measures for Marriage Solemnizations and Wedding"
                        day="11 Aug"
                        time="2021"
                        content="Under Phase Two (Heightened Alert), from 22 July through 18 August 2021, tighter measures will apply to religious activities to reduce risks of community transmission. Following a mid-point review of Phase Two (Heightened Alert), we have updated the current safe management measures (SMMs) to prepare our transition towards COVID resilience."
                    />
                    <LandingPageNews
                        day="08 Jun"
                        time="2021"
                        header="July 2021 Revised Safe Management Measures for Religious Activities"
                        content="From 19 August 2021, as Singapore prepares to move towards the Transition Stage A of living with an endemic COVID-19, measures governing the maximum group size for social gatherings, as well as for large scale events such as solemnisations and wedding receptions, will be relaxed, allowing social activities to continue in the new normal."
                    />
                </div>
                <div className="mb-5 mt-5">
                    <span style={{ fontSize: 30, fontWeight: "b" }}>
                        Upcoming Public Events
                    </span>
                </div>
                {/* TODO: Refactor this events part */}
                <div className="flex-row flex flex-wrap">
                    {/* <EventCard />
                    <EventCard/> */}
                    {data.map((element) => {
                        return (
                            <EventCard
                                location={element.address}
                                title={element.name}
                                dateTime={element.startDateTime}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
