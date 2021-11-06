import NavbarLoggedIn from "../components/NavbarLoggedIn";
import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import EventCard from "../components/LandingPageEvent";
import {Pagination, Tabs} from 'antd';
import OrganiserEventCard from "../components/OrganiserEventCard";
import {useRouter} from "next/router";
import Spinner from "../components/Spinner"

export default function Home() {
    const router = useRouter();
    const {TabPane} = Tabs;
    const [userId, setUserId] = useState("");
    const [events, setEvents] = useState([])
    const [loggedIn, setLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true);
    const axios = require("axios");
    const [state, setState] = useState({
        minValue: 0,
        maxValue: 9
    });
    const handleChange = value => {
        setState({
            minValue: (value - 1) * 9,
            maxValue: value * 9
        });
    };

    useEffect(() => {
        async function fetchOrganizerEvents() {
            await axios.get("http://localhost:8080/event/listOrganiserEvents/" + userId, {withCredentials: true}).then(function (response) {
                console.log(response.data)
                setEvents(response.data);
                // console.log(data);
            }).catch((error) => {
                console.log(error.response.data.message)
            });
        }

        axios.post("http://localhost:8080/validate", {}, {withCredentials: true})
            .then(function (response) {
                setLoggedIn(true);
                console.log(response)
                fetchOrganizerEvents()
            }).catch(function (error) {
            setLoggedIn(false);
            router.push("/login");
            console.log(error)
        })

        if (Cookies.get('id') !== undefined) {
            // console.log(Cookies.get('id'))
            setUserId(Cookies.get('id'))
        }
    }, [userId])
    return (
        <>
            {loading || !loggedIn ? <Spinner/> :
                <>
                    <div className="w-full items-center flex flex-col">
                        <NavbarLoggedIn page="Organise" user="Organiser"/>
                        <span className="font-semibold text-2xl mt-10">Events Organised by Me</span>
                        <div className="flex-col flex mt-10 items-center">
                            <Tabs defaultActiveKey="1" centered={true}>
                                <TabPane tab="All Events" key="1">
                                    <div className="flex pb-10 hide-scroll-bar">
                                        <div className="flex pb-10 hide-scroll-bar">
                                            <div>
                                                {events &&
                                                events.length > 0 &&
                                                events.slice(state.minValue, state.maxValue).map((element) => {
                                                    var dateString = new Date(element.startDateTime).toString()
                                                    var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                                                    return (
                                                        <OrganiserEventCard
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
                                                        defaultPageSize={9} //default size of page
                                                        onChange={handleChange}
                                                        total={events.length} //total number of card data available
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </TabPane>
                                <TabPane tab="Future Events" key="2">
                                    <div className="flex pb-10 hide-scroll-bar">
                                        <div>
                                            {events &&
                                            events.length > 0 &&
                                            events.slice(state.minValue, state.maxValue).map((element) => {
                                                var dateString = new Date(element.startDateTime).toString()
                                                if (dateString < new Date()) {
                                                    return false;
                                                }
                                                var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                                                return (
                                                    <OrganiserEventCard
                                                        loggedin={true}
                                                        key={element.id}
                                                        id={element.id}
                                                        location={element.address}
                                                        title={element.name}
                                                        dateTime={dateString.slice(0, 21) + AMPM}
                                                    />
                                                );
                                            })}
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
                                            {events &&
                                            events.length > 0 &&
                                            events.slice(state.minValue, state.maxValue).map((element) => {
                                                var dateString = new Date(element.startDateTime).toString()
                                                if (dateString > new Date()) {
                                                    return element;
                                                }
                                                var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                                                return (
                                                    <OrganiserEventCard
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
                                                <Pagination/>
                                            </div>
                                        </div>
                                    </div>
                                </TabPane>
                            </Tabs>
                            <button className="p-4 border rounded-full px-16" style={{backgroundColor: "#32BEA6"}}
                                    onClick={() => {
                                        router.push("/organiseEvent1");
                                    }}><span className="text-white">Create Event</span></button>
                        </div>
                    </div>
                </>
            }
        </>
    )
}