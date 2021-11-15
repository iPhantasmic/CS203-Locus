import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import NavbarLoggedIn from "../../components/NavbarLoggedIn";
import {useRouter} from "next/router";
import Spinner from "../../components/Spinner";
import {Tabs, Table, Tag, Space} from "antd";
import {
    CheckCircleTwoTone,
    EyeTwoTone,
    SmileTwoTone,
    FrownTwoTone,
    IdcardTwoTone,
    EyeInvisibleTwoTone
} from '@ant-design/icons';
import Fade from "react-reveal/Fade";
import {GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs} from 'react-google-maps';
import axios from "axios";
import MapStyles from "../../components/MapStyles";

function isUrl(s) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(s);
}

function Map() {
    const [selectedEventData, setSelectedEventData] = useState(null)
    const [eventData, setEventData] = useState([]);
    const router = useRouter();
    const {eid} = router.query;
    const axios = require('axios')


    useEffect(() => {
        const config = ({
            withCredentials: true,
        })

        async function fetchMyAPI() {
            await axios.get("https://locus-g3gtexqeba-uc.a.run.app/event/invite/" + eid, config).then(function (response) {
                console.log(response.data)
                setEventData(response.data)
            }).catch(function (error) {
                console.log(error)
            })

        }

        fetchMyAPI();
    }, []);

    return (
        <GoogleMap defaultZoom={11} options={{gestureHandling: 'greedy', styles: MapStyles}}
                   defaultCenter={{lat: 1.3676305955518533, lng: 103.80532318219868}}>
            {eventData && (
                <Marker key={eventData.id}
                        icon={{
                            url: 'https://storage.googleapis.com/locus-poc/pin.png',
                            anchor: new google.maps.Point(17, 46),
                            scaledSize: new google.maps.Size(37, 37)
                        }}
                        position={{lat: parseFloat(eventData.lat), lng: parseFloat(eventData.lng)}}
                        onClick={() => setSelectedEventData(eventData)}/>)}


            {selectedEventData && (
                <InfoWindow position={{lat: parseFloat(eventData.lat), lng: parseFloat(eventData.lng)}}
                            onCloseClick={() => setSelectedEventData(null)}>
                    <p>
                        {selectedEventData.address}
                    </p>
                </InfoWindow>
            )}
        </GoogleMap>
    );
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default function OrganizerEventView() {
    const router = useRouter();

    const axios = require("axios");
    const [eventData, setEventData] = useState(false);
    const [participants, setParticipant] = useState([]);
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const config = {
        withCredentials: true,
    };
    const {eid} = router.query;
    const {TabPane} = Tabs;
    const removeParticipant = (id) => {
        setIsLoading(true)
        axios.delete("https://locus-g3gtexqeba-uc.a.run.app/ticket/" + id, config)
            .then(() => console.log("Success"))
            .catch(function (error) {
                console.log(error)
            })
    }

    const deleteEvent = (id) => {
        // console.log("hello")
        setIsLoading(true)
        axios.delete("https://locus-g3gtexqeba-uc.a.run.app/event/" + id, config)
            .then(function (response) {
                console.log(response.data)
                router.push("/homeloggedin")
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    const columns = [
        {
            title: "Ticket ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Name",
            dataIndex: "participantName",
            key: "name",
        },
        {
            title: "Vaccinated",
            dataIndex: "isVaccinated",
            key: "vax",
            render: (vaccination) => (
                <Tag
                    color={vaccination ? "green" : "volcano"}
                    key={vaccination}
                >
                    {vaccination ? "Vaccinated" : "Unvaccinated"}
                </Tag>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => removeParticipant(record.id)} className="text-red-700">Remove Participant</a>
                </Space>
            ),
        },
    ];
    useEffect(() => {
        if (!router.isReady) {
            return;
        }
        setUsername(Cookies.get("username"));


        async function getEvents() {
            axios
                .get("https://locus-g3gtexqeba-uc.a.run.app/event/invite/" + eid, config)
                .then(function (response) {
                    if (!isUrl(response.data.imageGcsUrl)){
                        response.data.imageGcsUrl = "https://picsum.photos/seed/" + response.data.id + "/2000/600";
                    }
                    const result = response.data;
                    console.log(result);
                    setEventData(result);
                    document.title = 'Locus | ' + response.data.name;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        async function getParticipants() {
            axios
                .get("https://locus-g3gtexqeba-uc.a.run.app/ticket/list/" + eid, config)
                .then(function (response) {
                    const result = response.data;
                    console.log(result);
                    setParticipant(result);

                    setIsLoading(false);
                })
                .catch(function (error) {
                    setIsLoading(false);
                    console.log(error);
                });
        }

        getEvents();
        getParticipants();
    }, [router.isReady]);

    return (
        <>
            {!eventData && isLoading ? (
                <Spinner/>
            ) : (
                <>
                    <NavbarLoggedIn page="Browse" user={username}/>
                    <Fade className="self-baseline">
                        <div className="mt-14 mb-4 ml-16 grid grid-cols-7 gap-4 pb-4">
                            <div className="col-start-1 col-end-5">
                                <p className="font-bold text-3xl text-gray-700">{eventData.name}</p>
                                <p className="text-sm text-gray-700">{new Date(eventData.startDateTime).toString()}</p>
                            </div>
                            <div className="col-start-7 col-end-8">
                                <button onClick={() => deleteEvent(eventData.id)}
                                        className="mt-8 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-full font-semibold">Delete
                                    Event
                                </button>
                            </div>
                        </div>
                    </Fade>
                    <div className="pb-10">
                        <div className="w-full items-center px-16">
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="Overview" key="1">
                                    <div className="flex-row flex w-full justify-between h-full py-5">
                                        <div className="flex-col flex shadow-lg w-1/4 p-6">
                                            {new Date(eventData.startDateTime) <= new Date() ?
                                                <CheckCircleTwoTone style={{display: 'inline-flex', fontSize: "20px"}}
                                                                    twoToneColor="#B71226FF"/> :
                                                <CheckCircleTwoTone style={{display: 'inline-flex', fontSize: "20px"}}
                                                                    twoToneColor="#32BEA6"/>}
                                            <span
                                                className={new Date(eventData.startDateTime) <= new Date() ? "text-xl font-semibold mt-2 text-red-500" : "text-xl font-semibold mt-2 text-green-500"}>
                                                {new Date(eventData.startDateTime) <= new Date() ? "Event is over" : " Event is live!"}
                                            </span>
                                            <p className="font-semibold leading-none pb-1">
                                                {new Date(eventData.startDateTime) <= new Date() ?
                                                    "Your event has already finished." : "Your event is up and running."}
                                            </p>
                                            <p className="mt-0 text-sm leading-none">
                                                {new Date(eventData.startDateTime) <= new Date() ?
                                                    "All tickets are unavailable." : "All tickets are available."}
                                            </p>
                                        </div>

                                        <div className="flex-col flex shadow-lg w-1/4 p-6 ml-5">
                                            {eventData.private ?
                                                <EyeInvisibleTwoTone style={{display: 'inline-flex', fontSize: "20px"}}
                                                                     twoToneColor="#B71226FF"/> :
                                                <EyeTwoTone style={{display: 'inline-flex', fontSize: "20px"}}
                                                            twoToneColor="#32BEA6"/>}
                                            <span
                                                className={eventData.private ? "text-xl font-semibold mt-2 text-red-500" : "text-xl font-semibold mt-2 text-green-500"}>
                                                {eventData.private ? "Private" : "Public"}
                                            </span>
                                            <p className="font-semibold leading-none pb-1">
                                                {eventData.private ?
                                                    "Event is hidden to the public" : "Event is listed publicly"}
                                            </p>
                                            <p className="mt-0 text-sm leading-none">
                                                {eventData.private ?
                                                    "Password is required to join" : "Password is not required to join"}
                                            </p>
                                        </div>
                                        <div className="flex-col flex shadow-lg w-1/4 p-6 ml-5">
                                            {participants.filter(participant => participant.isVaccinated === false).length === 0 ?
                                                <SmileTwoTone style={{display: 'inline-flex', fontSize: "20px"}}
                                                              twoToneColor="#32BEA6"/> :
                                                <FrownTwoTone style={{display: 'inline-flex', fontSize: "20px"}}
                                                              twoToneColor="#B71226FF"/>}
                                            <span
                                                className={participants.filter(participant => participant.isVaccinated === false).length === 0 ? "text-xl font-semibold mt-2 text-green-500" : "text-xl font-semibold mt-2 text-red-500"}>
                                                Participants
                                            </span>
                                            <p className="font-semibold leading-none pb-1">
                                                {participants.filter(participant => participant.isVaccinated === false).length === 0 ?
                                                    "All Participants are ready!" : "Pending Submissions"}
                                            </p>
                                            <p className="mt-0 text-sm leading-none">
                                                {participants.filter(participant => participant.isVaccinated === false).length === 0 ?
                                                    "All vaccination proof received!" : "Awaiting " + participants.filter(participant => participant.isVaccinated === false).length + " more submissions"}
                                            </p>
                                        </div>
                                        <div className="flex-col flex shadow-lg w-1/4 p-6 ml-5">
                                            {(50 - participants.length) > 10 ?
                                                <IdcardTwoTone style={{display: 'inline-flex', fontSize: "20px"}}
                                                               twoToneColor="#32BEA6"/> :
                                                <IdcardTwoTone style={{display: 'inline-flex', fontSize: "20px"}}
                                                               twoToneColor="#B71226FF"/>}

                                            <span
                                                className={(50 - participants.length) > 10 ? "text-xl font-semibold mt-2 text-green-500" : "text-xl font-semibold mt-2 text-red-500"}>
                                                Tickets Left
                                            </span>
                                            <span className="font-semibold leading-none pb-1">
                                                Remaining
                                            </span>
                                            <span className="mt-0 text-sm leading-none">
                                                {50 - participants.length}/50
                                            </span>
                                            <span>
                                               
                                            </span>
                                        </div>
                                    </div>
                                </TabPane>
                                <TabPane tab="Event Details" key="2">
                                    <div
                                        className="w-full h-32 bg-center bg-cover"
                                        style={{backgroundImage: 'url(' + eventData.imageGcsUrl + ')'}}
                                    />
                                    <div className="w-full mt-5 flex-col flex">
                                        <span className="text-xl  font-semibold leading-normal text-blueGray-700">
                                            {eventData.name}
                                        </span>
                                        <span>{eventData.description}</span>
                                        <div className="mt-10 inline-block">
                                            <h2 className="text-xl font-semibold leading-normal text-blueGray-700">
                                                Instructions for Participants
                                            </h2>
                                            <ul className="ml-7 list-disc">
                                                <li>
                                                    Congregants are to be seated
                                                    in their allocated sections.
                                                    Changing of seats is not
                                                    permitted.
                                                </li>
                                                <li>
                                                    There is a mandatory
                                                    check-in process for all
                                                    congregants upon entry.
                                                    Check-in includes signing in
                                                    via the TraceTogether mobile
                                                    app or token, as well as
                                                    verifying your vaccination
                                                    status via TraceTogether
                                                    mobile app. Children below
                                                    the age of 7 are exempted
                                                    from TraceTogether.
                                                </li>
                                                <li>
                                                    Your safety is our priority.
                                                    Take note of these safety
                                                    measures we have put in
                                                    place:
                                                    https://rlc.sg/svcsafety1
                                                </li>
                                            </ul>
                                            <h2 className="text-xl font-semibold leading-normal text-blueGray-700 mt-10">
                                                Event Location
                                            </h2>
                                            <div className="w-3/5">
                                                <WrappedMap
                                                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDXznoFJsNayI0eS9L9v7iDjrddhdHY8HM`}
                                                    loadingElement={<div style={{height: 'calc(100vh - 5rem)'}}/>}
                                                    containerElement={<div style={{height: 'calc(100vh - 5rem)'}}/>}
                                                    mapElement={<div style={{height: 'calc(100vh - 5rem)'}}/>}/>
                                            </div>
                                        </div>
                                        <div
                                            className="cursor-pointer self-center py-5 px-10 border mt-5 rounded-full text-white"
                                            style={{
                                                backgroundColor: "#32BEA6",
                                            }}
                                        >
                                            Save Changes
                                        </div>
                                    </div>
                                </TabPane>
                                <TabPane tab="Manage Participants" key="3">
                                    <Table
                                        dataSource={participants}
                                        columns={columns}
                                    />
                                </TabPane>
                            </Tabs>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
