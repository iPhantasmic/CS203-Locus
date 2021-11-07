import {useEffect, useState} from "react";
import EventTicket from "../components/EventTicket";
import NavbarLoggedIn from "../components/NavbarLoggedIn";
import Cookies from "js-cookie";
import Spinner from "../components/Spinner"
import axios from "axios";
import {useRouter} from "next/router";
import Fade from "react-reveal/Fade";
import {Divider, Empty, Input} from "antd";
import OrganiserEventCard from "../components/OrganiserEventCard";
import TicketEventCard from "../components/TicketEventCard";
import Footer from "../components/Footer";
import {IdcardTwoTone, SearchOutlined} from "@ant-design/icons";

export default function Home() {
    const router = useRouter();
    const [tickets, setTickets] = useState([])
    const [username, setUsername] = useState("");
    const [loggedIn, setLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true);
    const axios = require("axios");
    useEffect(() => {
        function fetchMyAPI() {
            axios.get("http://localhost:8080/ticket/listParticipantTickets/" + id, config).then(function (response) {
                console.log(response.data);
                setTickets(response.data);
                console.log(tickets);
            });
        }

        axios.post("http://localhost:8080/validate", {}, {withCredentials: true})
            .then(function (response) {
                setLoggedIn(true);
                console.log(response)
                fetchMyAPI();
            }).catch(function (error) {
            setLoggedIn(false);
            router.push("/login");
            console.log(error)
        })

        document.title = 'Locus | My Upcoming Events';
        var id = Cookies.get("id") !== undefined ? Cookies.get("id") : null;

        const config = ({
            withCredentials: true,
        })
        if (Cookies.get("username") !== undefined) {
            setUsername(Cookies.get("username"));
        }

        setLoading(false)
    }, []);
    return (
        <>
            {loading || !loggedIn ? <Spinner/> :
                <>
                    <div className="items-center w-screen items-center flex flex-col">
                        <NavbarLoggedIn page="Tickets" user={username}/>
                        <Fade left>
                            <div className="mt-14 mb-4">
                                <p className="font-bold text-3xl text-gray-700 text-center">My Tickets</p>
                                <p className="text-sm text-gray-700">View and search for your event tickets.</p>
                            </div>

                        </Fade>
                        <Divider />
                        <div className="w-3/5 flex flex-col p-10">
                            {tickets &&
                            tickets.length === 0 ? <Empty className="mx-28 my-20"/> :
                                tickets.map((element) => {
                                    var dateString = new Date(element.startDateTime[0], element.startDateTime[1] - 1, element.startDateTime[2], element.startDateTime[3], element.startDateTime[4], 0, 0).toString()
                                    var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                                    return (
                                        <TicketEventCard
                                            loggedin={true}
                                            key={element.id}
                                            id={element.id}
                                            location={element.eventAddress}
                                            title={element.eventName}
                                            dateTime={dateString.slice(0, 21) + AMPM}
                                        />)
                                })}

                            {/*    {tickets.map((element) => {*/}
                            {/*        var dateString = new Date(element.startDateTime[0], element.startDateTime[1] - 1, element.startDateTime[2], element.startDateTime[3], element.startDateTime[4], 0, 0).toString()*/}
                            {/*        var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"*/}
                            {/*        console.log(dateString.slice(0, 21) + AMPM)*/}
                            {/*        return (*/}
                            {/*            <EventTicket*/}
                            {/*                key={element.id}*/}
                            {/*                eventAddress={element.eventAddress}*/}
                            {/*                eventName={element.eventName}*/}
                            {/*                id={element.id}*/}
                            {/*                organiserName={element.organiserName}*/}
                            {/*                participantName={element.participantName}*/}
                            {/*                startDateTime={dateString.slice(0, 21) + AMPM}*/}
                            {/*            />*/}
                            {/*        );*/}
                            {/*    })}*/}
                        </div>

                    </div>
                    <Footer/>
                </>
            }
        </>
    );
}
