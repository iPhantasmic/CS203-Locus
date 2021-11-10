import NavbarLoggedIn from "../components/NavbarLoggedIn";
import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import EventCard from "../components/LandingPageEvent";
import {Empty, Pagination, Tabs} from 'antd';
import OrganiserEventCard from "../components/OrganiserEventCard";
import {useRouter} from "next/router";
import Spinner from "../components/Spinner"
import Fade from "react-reveal/Fade";
import Footer from "../components/Footer";

export default function Home() {
    const router = useRouter();
    const {TabPane} = Tabs;
    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");

    const [events, setEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [futureEvents, setFutureEvents] = useState([]);

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
        document.title = 'Locus | My Events';
        setUsername(Cookies.get("username"));

        function fetchOrganizerEvents() {
            console.log(userId)
            axios.get("https://locus-g3gtexqeba-uc.a.run.app/event/listOrganiserEvents/" + userId, {withCredentials: true}).then(function (response) {
                console.log(response.data)
                setEvents(response.data);

                const futureEventsTemp = []
                const pastEventsTemp = []

                response.data.forEach(element => new Date(element.startDateTime) >= new Date() ? futureEventsTemp.push(element) : pastEventsTemp.push(element))
                // console.log(new Date())
                //
                // console.log(new Date(events[0].startDateTime) >= new Date())
                // setFutureEvents(events.filter(element => new Date(element.startDateTime) >= new Date()));
                // setPastEvents(events.filter(element => new Date(element.startDateTime) <= new Date()));
                setFutureEvents(futureEventsTemp);
                setPastEvents(pastEventsTemp);
            }).catch(function (error) {
                console.log(error)
            });
        }

        axios.post("https://locus-g3gtexqeba-uc.a.run.app/validate", {}, {withCredentials: true})
            .then(function (response) {
                setLoggedIn(true);
                console.log(response)
                setUserId(Cookies.get('id'))
                fetchOrganizerEvents()
            }).catch(function (error) {
            router.push("/login");
            console.log(error)
        })

        setLoading(false)
    }, [userId])
    return (
        <>
            {loading || !loggedIn ? <Spinner/> :
                <>
                    <div className="w-full items-center flex flex-col">
                        <NavbarLoggedIn page="Organise" user={username}/>
                        <div className="flex-col flex grid grid-cols-5 gap-4 pb-4 px-32">
                            <div className="col-start-1 col-end-4">
                                <div className="mt-14 mb-4 ml-3">
                                    <p className="font-bold text-3xl text-gray-700 text-left">My Events</p>
                                    <p className="text-sm text-gray-700">Events that you are organising.</p>
                                </div>
                            </div>
                            <div className="col-start-5 col-end-6">
                                <button onClick={() => router.push('/organiseEvent1')}
                                    className="bg-green-500 hover:bg-green-700 text-white mt-16 mb-4 py-2 px-4 rounded-full font-semibold">New
                                    Event
                                </button>
                            </div>
                        </div>
                        <div className="flex-col flex mt-10 items-center">
                            <Tabs defaultActiveKey="1" centered={true}>
                                <TabPane tab={"All Events (" + events.length + ")"} key="1">
                                    <div className="flex-col pb-10 hide-scroll-bar">
                                        <div>
                                            {events &&
                                            events.length === 0 ? <Empty className="mx-28 my-20"/> :
                                                events.slice(state.minValue, state.maxValue).map((element) => {
                                                    var dateString = new Date(element.startDateTime).toString()
                                                    var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                                                    return (
                                                        <OrganiserEventCard
                                                            loggedin={true}
                                                            key={element.inviteCode}
                                                            id={element.inviteCode}
                                                            location={element.address}
                                                            title={element.name}
                                                            dateTime={dateString.slice(0, 21) + AMPM}
                                                        />
                                                    );
                                                })}
                                            <div className="flex-col justify-center pt-5 text-center">
                                                <Pagination
                                                    defaultCurrent={1}
                                                    defaultPageSize={9} //default size of page
                                                    onChange={handleChange}
                                                    total={events.length} //total number of card data available
                                                />
                                            </div>
                                        </div>
                                    </div>

                                </TabPane>
                                <TabPane tab={"Future Events (" + futureEvents.length + ")"} key="2">
                                    <div className="flex-col pb-10 hide-scroll-bar">
                                        <div>
                                            {futureEvents &&
                                            futureEvents.length === 0 ? <Empty className="mx-28 my-20"/> :
                                                futureEvents.slice(state.minValue, state.maxValue).map((element) => {
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
                                            <div className="flex-col justify-center pt-5 text-center">
                                                <Pagination/>
                                            </div>
                                        </div>
                                    </div>

                                </TabPane>
                                <TabPane tab={"Past Events (" + pastEvents.length + ")"} key="3">
                                    <div className="flex-col pb-10 hide-scroll-bar">
                                        <div>
                                            {pastEvents &&
                                            pastEvents.length === 0 ? <Empty className="mx-28 my-20"/> :
                                                pastEvents.slice(state.minValue, state.maxValue).map((element) => {
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
                                            <div className="flex-col justify-center pt-5 text-center">
                                                <Pagination/>
                                            </div>
                                        </div>
                                    </div>
                                </TabPane>
                            </Tabs>
                            {/*<button className="p-4 border rounded-full px-16" style={{backgroundColor: "#32BEA6"}}*/}
                            {/*        onClick={() => {*/}
                            {/*            router.push("/organiseEvent1");*/}
                            {/*        }}><span className="text-white">Create Event</span></button>*/}
                        </div>
                    </div>
                    <Footer/>
                </>
            }
        </>
    )
}