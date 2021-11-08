import {useEffect, useState} from "react";
import EventCard from "../components/LandingPageEvent";
import Cookies from "js-cookie";
import NavbarLoggedIn from "../components/NavbarLoggedIn";
import Fade from "react-reveal/Fade";
import {DatePicker, Dropdown, Input, Menu} from "antd";
import {DownOutlined, SearchOutlined} from '@ant-design/icons';
import Footer from "../components/Footer";


export default function Home() {
    const [allData, setAllData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [username, setUsername] = useState("");
    const axios = require("axios");
    const [eventType, setEventType] = useState("All Event Types");

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
                <div onClick={() => setEventType("Enterprises in Finance Sector")}>
                    Enterprises in Finance Sector
                </div>
            </Menu.Item>
            <Menu.Item>
                <div onClick={() => setEventType("Funeral Events")}>Funeral Events</div>
            </Menu.Item>
            <Menu.Item>
                <div onClick={() => setEventType("Food and Beverage")}>Food and Beverage</div>
            </Menu.Item>
            <Menu.Item>
                <div onClick={() => setEventType("Hotels")}>Hotels</div>
            </Menu.Item>
            <Menu.Item>
                <div onClick={() => setEventType("Solemnisation and Reception")}>Solemnisation and Reception</div>
            </Menu.Item>
            <Menu.Item>
                <div onClick={() => setEventType("MICE Events")}>MICE Events</div>
            </Menu.Item>
            <Menu.Item>
                <div onClick={() => setEventType("Nightlife")}>Nightlife</div>
            </Menu.Item>
            <Menu.Item>
                <div onClick={() => setEventType("Property Show Galleries")}>Property Show Galleries</div>
            </Menu.Item>
            <Menu.Item>
                <div onClick={() => setEventType("Public Entertainment")}>Public Entertainment</div>
            </Menu.Item>
            <Menu.Item>
                <div onClick={() => setEventType("Religious Events")}>Religious Events</div>
            </Menu.Item>
            <Menu.Item>
                <div onClick={() => setEventType("Sports")}>Sports</div>
            </Menu.Item>
            <Menu.Item>
                <div onClick={() => setEventType("Tours")}>Tours</div>
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
        <div>
            <NavbarLoggedIn page="Browse" user={username}/>
            <Fade left>
                <div className="mt-14 mb-4 ml-16">
                    <p className="font-bold text-3xl text-gray-700 ">Browse Events</p>
                    <p className="text-sm text-gray-700">View or search for all future events.</p>
                </div>
            </Fade>
            <div className="px-16 flex-col flex">
                <Fade className="-mx-16 pb-14 px-16">
                    <div className="grid grid-cols-6 gap-4 pb-4 pr-4">
                        <div className="col-start-1 col-end-3">
                            <Input size={"large"} placeholder="Search upcoming events" onChange={(event) =>handleSearch(event)} bordered={false} prefix={<SearchOutlined className="pr-4" />}/>
                        </div>

                        <div className="col-end-6 col-span-2 text-right p-1">
                            <Dropdown overlay={menu} placement="bottomRight" arrow>
                                <p
                                    className="ant-dropdown-link"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    {eventType}&#160;&#160;&#160; <DownOutlined/>
                                </p>
                            </Dropdown>
                        </div>
                        <div className="col-end-7 col-span-1 text-right">
                            <DatePicker bordered={false} />
                        </div>

                    </div>
                </Fade>
                {/* TODO: Refactor this events part */}
                <div className="flex-row flex flex-wrap justify-between ">
                    {filteredData && filteredData.map((element) => {
                        var dateString = new Date(element.startDateTime).toString()
                        var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                        return (
                            <EventCard
                                loggedin={true}
                                key={element.id}
                                id={element.id}
                                location={element.address}
                                title={element.name}
                                dateTime={dateString.slice(0, 21) + AMPM}
                            />
                        );
                    })}
                </div>
            </div>
        <Footer />
        </div>
    );
}
