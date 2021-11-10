import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Alert} from "antd";
import Slide from "react-reveal/Fade";
import EventTicket from "../../components/EventTicket";

export default function ViewTicket() {
    const router = useRouter();

    const axios = require("axios");
    const [ticket, setTicket] = useState([]);
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const {tid} = router.query;

    useEffect(() => {
        if (!router.isReady || tid === undefined) {
            return;
        }

        const config = {
            withCredentials: true,
        };

        async function fetchMyAPI() {
            await axios.get("https://locus-g3gtexqeba-uc.a.run.app/ticket/" + tid, config)
                .then(function (response) {
                    document.title = 'Locus | ' + response.data.eventName;
                    console.log(response.data);
                    setTicket(response.data);
                }).catch(function (error) {
                console.log(error)
            });
        }



        fetchMyAPI();
        setIsLoading(false)
    }, [router.isReady]);

    return (
        <div className="bg-gray-100">
            <Slide bottom>
                <div className="px-56 pt-10">
                    <Alert className="mb-10" message="Please show this upon arrival to for check-in!" type="success"
                           showIcon/>
                    <EventTicket
                        key={ticket.id}
                        eventAddress={ticket.eventAddress}
                        eventName={ticket.eventName}
                        id={ticket.id}
                        organiserName={ticket.organiserName}
                        participantName={ticket.participantName}
                        startDateTime={ticket.startDateTime}
                        isVaccinated={ticket.isVaccinated}
                    />
                </div>
            </Slide>
        </div>
    )
}
