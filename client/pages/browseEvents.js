import {useEffect, useState} from "react";
import EventCard from "../components/LandingPageEvent";
import Cookies from "js-cookie";
import NavbarLoggedIn from "../components/NavbarLoggedIn";

export default function Home() {
    const [data, setData] = useState([]);
    const [username, setUsername] = useState("");
    const axios = require("axios");
    useEffect(() => {
        // console.log(Cookies.get("token"));
        // console.log(Cookies.get("username"));
        // username = Cookies.get('username') == undefined? "" : Cookies.get('username')
        if (Cookies.get("username") !== undefined) {
            setUsername(Cookies.get("username"));
        }
        console.log(username);

        function fetchMyAPI() {
            axios.get("https://locus-g3gtexqeba-uc.a.run.app/event/list").then(function (response) {
                console.log(response.data);
                setData(response.data);
                console.log(data);
            });
        }

        fetchMyAPI();
    }, [username, axios, data]);

    return (
        <div>
            <NavbarLoggedIn page="Browse" user={username}/>

            <div className="px-16 flex-col flex">
                <div className="mt-14 mb-8">
                    <span className="font-bold text-2xl">
                        Popular Events
                    </span>
                </div>
                {/* TODO: Refactor this events part */}
                <div className="flex-row flex flex-wrap justify-between ">
                    {/* <EventCard />
                    <EventCard/> */}
                    {data.map((element) => {
                        var dateString = new Date(element.startDateTime).toString()
                        var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                        console.log(dateString.slice(0, 21) + AMPM)
                        return (
                            <EventCard
                                key={element.name}
                                location={element.address}
                                title={element.name}
                                dateTime={dateString.slice(0, 21) + AMPM}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
