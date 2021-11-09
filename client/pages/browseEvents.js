import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import NavbarLoggedIn from "../components/NavbarLoggedIn";
import Fade from "react-reveal/Fade";
import {Card, DatePicker, Dropdown, Input, Menu, Tag} from "antd";
import {DownOutlined, SearchOutlined} from '@ant-design/icons';
import Footer from "../components/Footer";
import {GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs} from 'react-google-maps';
import MapEventCard from "../components/MapEventCard";
import axios from "axios";
import Spinner from "../components/Spinner";
import MapStyles from "../components/MapStyles";
import {useRouter} from "next/router";

function Map() {
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [allData, setAllData] = useState([]);

    useEffect(() => {
        const config = ({
            withCredentials: true,
        })

        async function fetchMyAPI() {
            await axios.get("http://localhost:8080/event/list", config).then(function (response) {
                console.log(response.data)
                setAllData(response.data)
            }).catch(function (error) {
                console.log(error)
            })

        }

        fetchMyAPI();
    }, []);

    return (
        <GoogleMap defaultZoom={11} options={{gestureHandling: 'greedy', styles: MapStyles}}
                   defaultCenter={{lat: 1.3676305955518533, lng: 103.80532318219868}}>
            {allData && allData.map((element) => (
                <Marker key={element.id}
                        icon={{
                            url: 'https://storage.googleapis.com/locus-poc/pin.png',
                            anchor: new google.maps.Point(17, 46),
                            scaledSize: new google.maps.Size(37, 37)
                        }}
                        position={{lat: parseFloat(element.lat), lng: parseFloat(element.lng)}}
                        onClick={() => setSelectedEvent(element)}/>
            ))}


            {selectedEvent && (
                <InfoWindow position={{lat: parseFloat(selectedEvent.lat), lng: parseFloat(selectedEvent.lng)}}
                            onCloseClick={() => setSelectedEvent(null)}>
                    <div className="mb-4 px-2 h-full w-auto cursor-pointer hover:shadow-lg"
                         onClick={() => window.open("/event/" + selectedEvent.id, "_blank")}>
                        <div className="relative bg-white rounded border">
                            <picture className="block bg-gray-200 border-b">
                                <img className="block w-full"
                                     src={selectedEvent.imageGcsUrl}
                                     alt="event image"/>
                            </picture>
                            <div className="p-4">
                                <h3 className="text-lg font-bold">
                                    <a className="stretched-link" href="#" title="Card 2">
                                        {selectedEvent.name}
                                    </a>
                                </h3>
                                <time className="block mb-2 text-sm text-gray-600"
                                      dateTime="2019-01-01">{new Date(selectedEvent.startDateTime).toString()}
                                </time>
                                <p className="mb-2">
                                    {selectedEvent.description}
                                </p>
                                {selectedEvent.tag.split(", ").map((element) => (
                                    <Tag>{element}</Tag>
                                ))}
                            </div>
                        </div>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default function Home() {
    const [allData, setAllData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [username, setUsername] = useState("");
    const axios = require("axios");
    const router = useRouter();

    const [eventType, setEventType] = useState("All Event Types");
    useEffect(() => {
        document.title = 'Locus | Browse Events';
        if (Cookies.get("username") !== undefined) {
            setUsername(Cookies.get("username"));
        }

        const config = ({
            withCredentials: true,
        })

        async function fetchMyAPI() {
            await axios.get("http://localhost:8080/event/list", config).then(function (response) {
                console.log(response.data)
                setAllData(response.data)
                setFilteredData(response.data);
            })

        }

        fetchMyAPI();
        setIsLoading(false)
    }, []);

    const handleSearch = (event) => {
        let value = '';
        value = event.target.value.toLowerCase();
        let result = [];
        console.log(value);
        result = allData.filter((data) => {
            return data.name.toLowerCase().includes(value);
        });
        console.log(result)
        setFilteredData(result);
    }

    const menu = (
        <Menu>
            <Menu.Item>
                <div onClick={() => setEventType("All Event Types")}>
                    All Events Types
                </div>
            </Menu.Item>
            <Menu.Item>
                <div onClick={() => setEventType("Attractions")}>
                    Attractions
                </div>
            </Menu.Item>
            <Menu.Item>
                <div onClick={() => setEventType("Country and Recreational Clubs")}>
                    Country and Recreational Clubs
                </div>
            </Menu.Item>
            <Menu.Item>
                <div onClick={() => setEventType("Funeral events")}>
                    Funeral events
                </div>
            </Menu.Item>
            <Menu.Item>
                <div onClick={() => setEventType("Funeral Events")}>Funeral Events</div>
            </Menu.Item>
            <Menu.Item>
                <div onClick={() => setEventType("Marriage solemnisations and wedding receptions")}>Marriage and
                    Solemnisation
                </div>
            </Menu.Item>
            <Menu.Item>
                <div onClick={() => setEventType("MICE events")}>MICE events</div>
            </Menu.Item>
            <Menu.Item>
                <div onClick={() => setEventType("Hotels")}>Hotels</div>
            </Menu.Item>
            <Menu.Item>
                <div onClick={() => setEventType("MICE Events")}>MICE Events</div>
            </Menu.Item>
            <Menu.Item>
                <div
                    onClick={() => setEventType("Sports sector enterprises, sports education, and premises with sports facilities")}>Sports
                </div>
            </Menu.Item>
            <Menu.Item>
                <div onClick={() => setEventType("Religious organisations")}>Religious Events</div>
            </Menu.Item>
            <Menu.Item>
                <div onClick={() => setEventType("Others")}>Others</div>
            </Menu.Item>
        </Menu>
    );

    useEffect(() => {
        document.title = 'Locus | Browse Events';
        if (Cookies.get("username") !== undefined) {
            setUsername(Cookies.get("username"));
        }

        const config = ({
            withCredentials: true,
        })

        async function fetchMyAPI() {
            await axios.get("http://localhost:8080/event/list", config).then(function (response) {
                console.log(response.data)
                setAllData(response.data)
                setFilteredData(response.data);
            })

        }

        fetchMyAPI();

    }, []);

    return (
        <>
            {!filteredData || isLoading ? (
                <Spinner/>
            ) : (
                <div>
                    <NavbarLoggedIn page="Browse" user={username}/>
                    <Fade>
                        <div className="pl-16 flex-col flex grid grid-cols-7 gap-4 pb-4">
                            <div className="col-start-1 col-end-5">
                                <div className="flex-col flex grid grid-cols-7 gap-4 pb-4">
                                    <div className="mt-14 mb-4 col-start-1 col-end-4">
                                        <p className="font-bold text-3xl text-gray-700 ">Browse Events</p>
                                        <p className="text-sm text-gray-700">View or search for all future events.</p>
                                    </div>
                                    <div className="col-end-8 col-span-2 text-right mt-16 mr-5">
                                        <button onClick={()=>{router.push("/requesteventcode")}} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">View Private Event</button>
                                    </div>
                                </div>

                                <Fade className="-mx-16 pb-14 px-16">
                                    <div className="sticky top-20 z-40 bg-white grid grid-cols-8 gap-4 pb-4 pr-4">
                                        <div className="col-start-1 col-end-4">
                                            <Input size={"large"} placeholder="Search events"
                                                   onChange={(event) => handleSearch(event)} bordered={false}
                                                   prefix={<SearchOutlined className="pr-4"/>}/>
                                        </div>

                                        <div className="col-end-7 col-span-3 text-right p-1">
                                            <Dropdown overlay={menu} placement="bottomRight" arrow>
                                                <p
                                                    className="ant-dropdown-link"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    {eventType}&#160;&#160;&#160; <DownOutlined/>
                                                </p>
                                            </Dropdown>
                                        </div>
                                        <div className="col-end-9 col-span-2 text-right">
                                            <DatePicker bordered={false}/>
                                        </div>
                                    </div>
                                </Fade>

                                {/* TODO: Refactor this events part */}
                                <div className="flex-row flex flex-wrap justify-between ">
                                    {filteredData && filteredData.map((element) => {
                                        var dateString = new Date(element.startDateTime).toString()
                                        var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                                        return (
                                            <MapEventCard
                                                loggedin={true}
                                                key={element.id}
                                                id={element.id}
                                                imageGcsUrl={element.imageGcsUrl}
                                                location={element.address}
                                                title={element.name}
                                                dateTime={dateString.slice(0, 21) + AMPM}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="sticky top-20 z-40 col-start-5 col-end-9 h-screen">
                                <WrappedMap
                                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDXznoFJsNayI0eS9L9v7iDjrddhdHY8HM`}
                                    loadingElement={<div style={{height: 'calc(100vh - 5rem)'}}/>}
                                    containerElement={<div style={{height: 'calc(100vh - 5rem)'}}/>}
                                    mapElement={<div style={{height: 'calc(100vh - 5rem)'}}/>}/>
                            </div>
                        </div>
                    </Fade>
                    <Footer/>
                </div>
            )};
        </>)
}
