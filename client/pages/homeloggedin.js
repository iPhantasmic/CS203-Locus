import Image from "next/image";
import Navbar from "../components/Navbar";
import cartoon from "../public/homeImage.png";
import { useState, useEffect } from "react";
import { Divider } from "antd";
import LandingPageNews from "../components/LandingPageNews";
import EventCard from "../components/LandingPageEvent";
import Cookies from 'js-cookie'
import NavbarLoggedIn from "../components/NavbarLoggedIn";



export default function Home() {
    
    const [data, setData] = useState([]);
    const [username, setUsername] = useState("");
    const axios = require("axios");
    axios.defaults.baseURL = 'http://localhost:8080'
    useEffect(() => {
        console.log(Cookies.get('token'))
        console.log(Cookies.get('username'))
        // username = Cookies.get('username') == undefined? "" : Cookies.get('username')
        if (Cookies.get('username')!= undefined){
            setUsername(Cookies.get('username'))
        }
        console.log(username)
        async function fetchMyAPI() {
            axios.get("/event/list").then(function (response) {
                console.log(response.data)
                setData(response.data)
                console.log(data)
                
              })
          }
          fetchMyAPI()
      
    });
    
    return (
        <div>
            <NavbarLoggedIn page = "Home" user = {username}/>

            <div className="px-16 flex-col flex">
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
                    <span style={{ fontSize: 30, fontWeight: "bold" }}>
                        Recently Viewed Events
                    </span>
                </div>
                {/* TODO: Refactor this events part */}
                <div className = "flex-row flex flex-wrap justify-between">
                    {/* <EventCard />
                    <EventCard/> */}
                    {data.map((element) =>{
                        var dateString = new Date(element.startDateTime).toString()
                        var AMPM = dateString.slice(16,18) >= 12 ? "pm" : "am"
                        console.log(dateString.slice(0,21) + AMPM)
                       return (
                           <EventCard
                               location={element.address}
                               title={element.name}
                               dateTime={dateString.slice(0,21) + AMPM}
                           />
                       );
                    })}
                </div>
            </div>
        </div>
    );
}
