import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import NavbarLoggedIn from "../../components/NavbarLoggedIn";
import { Tag } from "antd";
import Slide from "react-reveal/Fade";
import Footer from "../../components/Footer";
import Spinner from "../../components/Spinner";
import { useRouter } from "next/router";
import MapStyles from "../../components/MapStyles";
import {GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs} from 'react-google-maps';

function isUrl(s) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(s);
}

function Map() {
    const [selectedEventData, setSelectedEventData] = useState(null)
    const [eventData, setEventData] = useState([]);
    const router = useRouter();
    const { pid } = router.query;
    const axios = require('axios')


    useEffect(() => {
        const config = ({
            withCredentials: true,
        })

        async function fetchMyAPI() {
            await axios.get("https://locus-g3gtexqeba-uc.a.run.app/event/" + pid, config).then(function (response) {
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
                        onClick={() => setSelectedEventData(eventData)} />)}


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

export default function ViewEvent() {
    const router = useRouter();

    const axios = require("axios");
    const [eventData, setEventData] = useState([]);
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [hasParticipated, setHasParticipated] = useState(false);
    const { pid } = router.query;
    
        const name = "default";
        useEffect(() => {
            if (!router.isReady) {
                return;
            }
            setUsername(Cookies.get("username"));
            const config = {
                withCredentials: true,
            };
            
            axios
                .get("https://locus-g3gtexqeba-uc.a.run.app/event/" + pid, config)
                .then(function (response) {
                    console.log(response.data);
                    setEventData(response.data);
                    document.title = eventData.name
                        ? "Locus | " + eventData.name
                        : "Locus | Event Site";
                    setIsLoading(false);
                })
                .catch(function (error) {
                    console.log(error);
                });
            async function hasUserParticipated() {
                axios
                    .get(
                        "https://locus-g3gtexqeba-uc.a.run.app/ticket/hasParticipatedEvent/" +
                            Cookies.get("id") +
                            "/" +
                            pid,
                        config
                    )
                    .then(function (response) {
                        console.log(Cookies.get("id"))
                        console.log(pid)
                        console.log(response.data);
                        setHasParticipated(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
            hasUserParticipated();
        }, [router.isReady]);
        const joinEvent = () => {
            setIsLoading(true);
            const config = {
                withCredentials: true,
            };
            axios
                .post(
                    "https://locus-g3gtexqeba-uc.a.run.app/ticket/new?participantId=" +
                        Cookies.get("id") +
                        "&eventId=" +
                        pid,
                    {},
                    config
                )
                .then(function (response) {
                    const result = response.data;
                    var startDateString = new Date(
                        result.startDateTime[0],
                        result.startDateTime[1] - 1,
                        result.startDateTime[2],
                        result.startDateTime[3],
                        result.startDateTime[4],
                        0,
                        0
                    ).toString();
                    var endDateString = new Date(
                        result.endDateTime[0],
                        result.endDateTime[1] - 1,
                        result.endDateTime[2],
                        result.endDateTime[3],
                        result.endDateTime[4],
                        0,
                        0
                    ).toString();
                    result.startDateTime = startDateString;
                    result.endDateTime = endDateString;
                    setEventData(result);
                    document.title = eventData.name
                        ? "Locus | " + eventData.name
                        : "Locus | Event Site";
                    setHasParticipated(true)
                    window.location.reload()
                    setIsLoading(false);
                })
                .catch(function (error) {
                    console.log(error.response.data.message);
                    window.location.reload()
                    setIsLoading(false);
                });

    };

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <NavbarLoggedIn page="Browse" user={username} />
                    <section className="relative block h-500-px">
                        <div
                            className="absolute top-0 w-full h-96 bg-center bg-cover"
                            style={{backgroundImage: 'url(' + isUrl(eventData.imageGcsUrl) ? eventData.imageGcsUrl : "https://picsum.photos/seed/" + eventData.id + "/2000/600" + ')'}}

                        >
                            <span
                                id="blackOverlay"
                                className="w-full h-full absolute opacity-50 bg-black"
                            />
                        </div>
                        <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px">
                            <svg
                                className="absolute bottom-0 overflow-hidden"
                                xmlns="http://www.w3.org/2000/svg"
                                preserveAspectRatio="none"
                                version="1.1"
                                viewBox="0 0 2560 100"
                                x="0"
                                y="0"
                            >
                                <polygon
                                    className="text-blueGray-200 fill-current"
                                    points="2560 0 2560 100 0 100"
                                />
                            </svg>
                        </div>
                    </section>
                    <Slide bottom>
                        <section className="relative pt-96 bg-blueGray-200">
                            <div className="container mx-auto px-4">
                                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                                    <div className="px-6">
                                        <div className="border-b">
                                            <h3 className="pt-7 pl-7 mb-5 text-3xl font-bold leading-normal text-blueGray-700">
                                                {eventData.name}
                                            </h3>
                                        </div>
                                        <div className="mt-7">
                                            <div className="inline-block px-3 w-1/3">
                                                <div className="overflow-hidden rounded-lg shadow-2xl bg-white w-full bg-white shadow-sm rounded p-3 mx-2">
                                                    <div className="overflow-x-hidden rounded relative">
                                                        <p className="p-2 text-xl font-semibold leading-normal mb-1 text-blueGray-700">
                                                            Event Details
                                                        </p>
                                                    </div>
                                                    <div className="mt-0 pl-3 mb-2 flex justify-between ">
                                                        <div className="mr-4">
                                                            <div
                                                                className="mt-0"
                                                                style={{
                                                                    display:
                                                                        "flex",
                                                                }}
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-6 w-6"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="gray"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                                    />
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                                    />
                                                                </svg>
                                                                <p className="mt-0 ml-2 text-gray-500">
                                                                    {
                                                                        eventData.address
                                                                    }
                                                                </p>
                                                            </div>

                                                            <div
                                                                className="mt-2"
                                                                style={{
                                                                    display:
                                                                        "flex",
                                                                }}
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-6 w-6"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="gray"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                                    />
                                                                </svg>
                                                                <p className="mt-0 ml-2 text-gray-500">
                                                                    {eventData.startDateTime &&
                                                                        eventData.startDateTime.substring(
                                                                            0,
                                                                            10
                                                                        )}
                                                                </p>
                                                            </div>

                                                            <div
                                                                className="mt-2"
                                                                style={{
                                                                    display:
                                                                        "flex",
                                                                }}
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-6 w-6"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="gray"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                    />
                                                                </svg>
                                                                <p className="mt-0 ml-2 text-gray-500">
                                                                    {eventData.startDateTime &&
                                                                        eventData.startDateTime.substring(
                                                                            11,
                                                                            eventData
                                                                                .startDateTime
                                                                                .length
                                                                        ) +
                                                                            "PM"}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {hasParticipated ? (
                                                        <div className="mt-5 w-full h-10 px-6 text-white font-semibold transition-colors duration-150 rounded-lg bg-gray-500 flex-col flex items-center justify-center">
                                                            Event joined
                                                        </div>
                                                    ) : (
                                                        <button
                                                            onClick={() =>
                                                                joinEvent()
                                                            }
                                                            className="mt-5 w-full h-10 px-6 text-white font-semibold transition-colors duration-150 rounded-lg focus:shadow-outline bg-green-500 hover:bg-green-700"
                                                        >
                                                            Join event
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                            <br />
                                            <div className="ml-7 mt-10 inline-block px-3 w-2/3">
                                                <h2 className="text-xl font-semibold leading-normal text-blueGray-700">
                                                    About this event
                                                </h2>
                                                <p>{eventData.description}</p>
                                            </div>
                                            <div className="ml-7 mt-10 inline-block px-3 w-2/3">
                                                <h2 className="text-xl font-semibold leading-normal text-blueGray-700">
                                                    What's Included?
                                                </h2>
                                                <ul className="ml-7 list-disc">
                                                    <li>
                                                        Non-invasive methods to
                                                        reduce Arthritis
                                                        discomforted
                                                    </li>
                                                    <li>
                                                        Climb stairs take walks
                                                        and go dancing without
                                                        pain
                                                    </li>
                                                    <li>
                                                        Avoid surgery, cortisone
                                                        and drugs. Take charge
                                                        of your knee health
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="ml-7 mt-10 inline-block px-3 w-2/3">
                                                <h2 className="text-xl font-semibold leading-normal text-blueGray-700">
                                                    Instructions for
                                                    Participants
                                                </h2>
                                                <ul className="ml-7 list-disc">
                                                    <li>
                                                        Congregants are to be
                                                        seated in their
                                                        allocated sections.
                                                        Changing of seats is not
                                                        permitted.
                                                    </li>
                                                    <li>
                                                        There is a mandatory
                                                        check-in process for all
                                                        congregants upon entry.
                                                        Check-in includes
                                                        signing in via the
                                                        TraceTogether mobile app
                                                        or token, as well as
                                                        verifying your
                                                        vaccination status via
                                                        TraceTogether mobile
                                                        app. Children below the
                                                        age of 7 are exempted
                                                        from TraceTogether.
                                                    </li>
                                                    <li>
                                                        Your safety is our
                                                        priority. Take note of
                                                        these safety measures we
                                                        have put in place:
                                                        https://rlc.sg/svcsafety1
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="ml-7 mt-10">
                                                <h2 className="text-xl font-semibold leading-normal text-blueGray-700">
                                                    Event Location
                                                </h2>
                                                <p className="text-gray-500 pb-5">Where the event will be held at: </p>
                                                <div className="w-2/3">
                                                    <WrappedMap
                                                        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDXznoFJsNayI0eS9L9v7iDjrddhdHY8HM`}
                                                        loadingElement={<div style={{height: 'calc(100vh - 5rem)'}}/>}
                                                        containerElement={<div style={{height: 'calc(100vh - 5rem)'}}/>}
                                                        mapElement={<div style={{height: 'calc(100vh - 5rem)'}}/>}/>
                                                </div>
                                            </div>
                                            <div className="ml-7 mt-10 inline-block px-3 w-2/3">
                                                <h2 className="text-xl font-semibold leading-normal text-blueGray-700">
                                                    Suitable for
                                                </h2>
                                                <p>
                                                    All-Ages (including
                                                    children)
                                                </p>
                                            </div>
                                            <div className="ml-7 mt-10 inline-block px-3 w-2/3">
                                                <h2 className="text-xl font-semibold leading-normal text-blueGray-700">
                                                    Contact Informaton
                                                </h2>
                                                <ul className="ml-7 list-disc">
                                                    <li>
                                                        For Event Enquiries: Jye
                                                        Yi (+65 00000000)
                                                    </li>
                                                    <li>
                                                        For Venue Enquiries:
                                                        Jian Wei (+65 00000000)
                                                    </li>
                                                    <li>
                                                        For Logistic Enquiries:
                                                        Justin (+65 00000000)
                                                    </li>
                                                    <br />
                                                    <li>
                                                        For all other matters,
                                                        please email to:
                                                        thedogedisco@gmail.com
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-2"></div>
                                    <div className="mt-10 py-5 border-blueGray-200 text-center">
                                        <div className="ml-7">
                                            {eventData.tag &&
                                                eventData.tag
                                                    .split(",")
                                                    .map((element) => {
                                                        return (
                                                            <Tag className="ml-1">
                                                                {"#" + element}
                                                            </Tag>
                                                        );
                                                    })}
                                        </div>
                                    </div>
                                    <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                        <h3 className="p-7 text-3xl font-bold leading-normal text-blueGray-700">
                                            About Organiser
                                        </h3>
                                        <img
                                            style={{
                                                display: "-webkit-inline-box",
                                            }}
                                            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9511dbb5-9be4-4651-be20-99508a7fbd79/de778ut-505703d5-1e7b-4fec-b7e3-6ee8bdcef929.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzk1MTFkYmI1LTliZTQtNDY1MS1iZTIwLTk5NTA4YTdmYmQ3OVwvZGU3Nzh1dC01MDU3MDNkNS0xZTdiLTRmZWMtYjdlMy02ZWU4YmRjZWY5MjkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.gZ2X09i1Edpth71xTOMMqrh7sJOIwXu_HAh7_1JtDa8"
                                            className="rounded-full h-24 w-24 flex items-center justify-center mb-5"
                                            alt=" "
                                        />
                                        <div className="flex flex-wrap justify-center">
                                            <div className="w-full lg:w-9/12 px-4">
                                                <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                                    Organizer of Knee Pain
                                                    Corrective Exercise Workshop
                                                    - For Women Only
                                                    <br />
                                                    Renee Moten has been a
                                                    Certified Personal Trainer
                                                    for over 19 years. She has
                                                    instructed over 20,000
                                                    one-on-one workout sessions
                                                    with her client's. Combining
                                                    study and experiences she
                                                    has created a recipe to
                                                    reduce knee and hip pain in
                                                    a non-invasive method.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-8">
                                <div className="container mx-auto px-4">
                                    <div className="flex flex-wrap items-center md:justify-between justify-center"></div>
                                </div>
                            </footer>
                        </section>
                    </Slide>
                    <Footer />
                    {/*<img className="relative h-1/5 object-cover"*/}
                    {/*     src={"https://picsum.photos/seed/" + eventData.name + "/2000/600"}/>*/}
                    {/*<Row>*/}
                    {/*    <Col flex="200px"></Col>*/}
                    {/*    <Col flex="auto">*/}
                    {/*        <PageHeader*/}
                    {/*            className="site-page-header"*/}
                    {/*            title="System Administrative Tools"*/}
                    {/*            style={{paddingTop: 20, paddingBottom: 0, paddingLeft: 0}}*/}
                    {/*        />*/}
                    {/*    </Col>*/}
                    {/*    <Col flex="200px"></Col>*/}
                    {/*</Row>*/}
                </>
            )}
        </>
    );
}
