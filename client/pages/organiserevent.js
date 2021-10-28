import NavbarLoggedIn from "../components/NavbarLoggedIn";
import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import EventCard from "../components/LandingPageEvent";
import {Pagination, Tabs} from 'antd';

export default function Home() {
    const {TabPane} = Tabs;
    const [userId, setUserId] = useState("");
    const [events,setEvents] = useState([])
    const axios = require("axios");

    useEffect(()=>{
        if (Cookies.get('id') !== undefined) {
            setUserId(Cookies.get('id'))
        }

        // async function fetchOrganizerEvents() {
        //     await axios.get("https://locus-g3gtexqeba-uc.a.run.app/event/listOrganiserEvents/" + userId).then(function (response) {
        //         setEvents(response.data);
        //         // console.log(data);
        //     });
        // }
        // fetchOrganizerEvents()
    })
return (
    <>
        <div className="w-full items-center flex flex-col">
            <NavbarLoggedIn page="Home" user="Organiser"/>
            <span className="font-semibold text-2xl mt-10">Events Organised by Me</span>
            <div className = "flex-col flex mt-10 items-center">
                <Tabs defaultActiveKey="1" centered = {true}>
                    <TabPane tab="All Events" key="1">
                        <div className="flex pb-10 hide-scroll-bar">
                            <div>
                                <EventCard/>
                                <div className="flex justify-center pt-5">
                                    <Pagination />
                                </div>
                            </div>
                        </div>

                    </TabPane>
                    <TabPane tab="Future Events" key="2">
                        <div className="flex pb-10 hide-scroll-bar">
                            <div>
                                <EventCard/>
                                <div className="flex justify-center pt-5">
                                    <Pagination/>
                                </div>
                            </div>
                        </div>

                    </TabPane>
                    <TabPane tab="Past Events" key="3">
                        <div className="flex pb-10 hide-scroll-bar">
                            <div>
                                <EventCard/>
                                <div className="flex justify-center pt-5">
                                    <Pagination/>
                                </div>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
                <div className="p-4 border rounded-full px-16" style={{backgroundColor:"#32BEA6"}}> <span className="text-white">Create Event</span></div>
            </div>
        </div>




    </>
)}