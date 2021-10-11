import { useEffect, useState } from "react";
import EventTicket from "../components/EventTicket";
import NavbarLoggedIn from "../components/NavbarLoggedIn";
import axios from "axios";
import Cookies from "js-cookie";

export default function Home() {
    const [tickets,setTickets] = useState([])
    const axios = require("axios");
    axios.defaults.baseURL = 'http://localhost:8080'
    useEffect(() => {
        console.log(Cookies.get("token"));
        var id = Cookies.get("id")
        async function fetchMyAPI() {
            axios.get("/ticket/listParticipantTickets/" + id).then(function (response) {
                console.log(response.data);
                setTickets(response.data);
                console.log(tickets);
            });
        }
        fetchMyAPI();
    }, []);
    return (
        <div className = "items-center w-screen items-center flex flex-col">
            <NavbarLoggedIn />
            <div className = "self-start ml-10 mt-10">
                <span className = "font-bold text-3xl">
                    Your upcoming events
                </span>
            </div>
            <div className = "w-3/5 flex flex-col p-10">
            {tickets.map((element) => {
                        var dateString = new Date(element.startDateTime[0],element.startDateTime[1]-1,element.startDateTime[2],element.startDateTime[3],element.startDateTime[4],0,0).toString()
                        var AMPM = dateString.slice(16,18) >= 12 ? "pm" : "am"
                        console.log(dateString.slice(0,21) + AMPM)
                        return (
                            <EventTicket
                                eventAddress={element.eventAddress}
                                eventName={element.eventName}
                                id={element.id}
                                organiserName = {element.organiserName}
                                participantName = {element.participantName}
                                startDateTime = {dateString.slice(0,21) + AMPM}
                            />
                        );
                    })}
            </div>
            
        </div>
    );
}
