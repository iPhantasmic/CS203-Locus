import {useEffect, useState} from "react";
import EventTicket from "../components/EventTicket";
import NavbarLoggedIn from "../components/NavbarLoggedIn";
import Cookies from "js-cookie";

export default function Home() {
    const [tickets, setTickets] = useState([])
    const [username, setUsername] = useState("");
    const axios = require("axios");
    useEffect(() => {
        document.title = 'Locus | My Upcoming Events';
        var id = Cookies.get("id") !== undefined ? Cookies.get("id") : null;

        const config = ({
            withCredentials: true,
        })
        if (Cookies.get("username") !== undefined) {
            setUsername(Cookies.get("username"));
        }

        function fetchMyAPI() {
            axios.get("https://locus-g3gtexqeba-uc.a.run.app/ticket/listParticipantTickets/" + id, config).then(function (response) {
                console.log(response.data);
                setTickets(response.data);
                console.log(tickets);
            });
        }

        fetchMyAPI();
    }, []);
    return (
        <div className="items-center w-screen items-center flex flex-col">
            <NavbarLoggedIn page="Tickets" user={username}/>
            <div className="mt-14 mb-4">
                    <span className="font-bold text-2xl">
                        Your upcoming events
                    </span>
            </div>
            <div className="w-3/5 flex flex-col p-10">
                {tickets.map((element) => {
                    var dateString = new Date(element.startDateTime[0], element.startDateTime[1] - 1, element.startDateTime[2], element.startDateTime[3], element.startDateTime[4], 0, 0).toString()
                    var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                    console.log(dateString.slice(0, 21) + AMPM)
                    return (
                        <EventTicket
                            key={element.id}
                            eventAddress={element.eventAddress}
                            eventName={element.eventName}
                            id={element.id}
                            organiserName={element.organiserName}
                            participantName={element.participantName}
                            startDateTime={dateString.slice(0, 21) + AMPM}
                        />
                    );
                })}
            </div>

        </div>
    );
}
