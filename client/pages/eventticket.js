import { useEffect, useState } from "react";
import EventTicket from "../components/eventticket";
import NavbarLoggedIn from "../components/NavbarLoggedIn";
import axios from "axios";

export default function Home() {
    const [tickets,setTickets] = useState([])
    const axios = require("axios");
    axios.defaults.baseURL = 'http://localhost:8080'
    useEffect = (()=>{
        const id = Cookies.get("id")
        async function fetchMyAPI() {
            axios.get("/event/list").then(function (response) {
                console.log(response.data)
                setTickets(response.data)
                console.log(data)
                
              })
          }
    })
    return (
        <div className = "items-center w-screen items-center flex flex-col">
            <NavbarLoggedIn />
            <div className = "self-start ml-10 mt-10">
                <span className = "font-bold text-3xl">
                    Your upcoming events
                </span>
            </div>
            <div className = "w-3/5 flex flex-col p-10">
            <EventTicket />
            <EventTicket />
            <EventTicket />
            <EventTicket />
            </div>
            
        </div>
    );
}
