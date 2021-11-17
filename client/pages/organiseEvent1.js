import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import NavbarLoggedIn from "../components/NavbarLoggedIn";
import {Checkbox, Dropdown, Input, Menu} from "antd";
import {DownOutlined, UserOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";
import Link from "next/link";
import Spinner from "../components/Spinner"
import axios from "axios";

export default function Home() {
    const router = useRouter();
    const [isPublic, setIsPublic] = useState(true);
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false)
    const [eventType, setEventType] = useState("Attractions");
    const [username, setUsername] = useState("");
    const [participant, setParticipant] = useState();

    const nextStep = (e) => {
        if (isNaN(participant)){
            alert("Expected number of participants should be numeric");
            return;
        }

        router.push({
            pathname: '/organiseEvent2', query: {
                eventType: eventType,
                isPublic: isPublic,
                participant: participant,
            }
        })
    }

    useEffect(() => {
        document.title = 'Locus | Organise Event';
        if (Cookies.get("username") != undefined) {
            setUsername(Cookies.get("username"));
        }

        axios.post("https://locus-g3gtexqeba-uc.a.run.app/validate", {}, {withCredentials: true})
            .then(function (response) {
                setLoggedIn(true);
                setLoading(false);
                console.log(response)
            }).catch(function (error) {
            setLoggedIn(false);
            router.push("/login");
            console.log(error)
        })
    }, []);
    const menu = (
        <Menu>
            <Menu.Item>
                <div onClick={() => setEventType("Attractions")}>Attractions</div>
            </Menu.Item>
            <Menu.Item>
                <div onClick={() => setEventType("Country and recreation clubs")}>
                    Country and recreation clubs
                </div>
            </Menu.Item>
            <Menu.Item>
                <div onClick={() => setEventType("Funeral events")}>
                    Funeral events
                </div>
            </Menu.Item>
            <Menu.Item>
                <div onClick={() => setEventType("Marriage solemnisations and wedding receptions")}>
                    Marriage solemnisations and wedding receptions
                </div>
            </Menu.Item>
            <Menu.Item>
                <div onClick={() => setEventType("MICE events")}>MICE events</div>
            </Menu.Item>
            <Menu.Item>
                <div onClick={() => setEventType("Hotels")}>Hotels</div>
            </Menu.Item>
            <Menu.Item>
                <div
                    onClick={() => setEventType("Sports sector enterprises, sports education, and premises with sports facilities")}>Sports
                    sector enterprises, sports education, and premises with sports facilities
                </div>
            </Menu.Item>
            <Menu.Item>
                <div onClick={() => setEventType("Religious organisations")}>Religious organisations</div>
            </Menu.Item>
            <Menu.Item>
                <div onClick={() => setEventType("Others")}>Others</div>
            </Menu.Item>
        </Menu>
    );
    return (
        <>
            {loading || !loggedIn ? <Spinner/> :
                <>
                    <div className="w-screen items-center flex-col flex">
                        <NavbarLoggedIn page="Organise" user={username}/>
                        <div className="px-16 flex-col flex w-full items-center mt-10 grid grid-cols-8 gap-4 pb-4">
                            <div className="col-start-3 col-end-4">
                                <img src="/lucas.png" alt=" " width={90} height="auto" className="ml-10"/>
                            </div>
                            <div className="col-start-4 col-end-7">
                                <p className="font-semibold text-xl mt-3">Hello there! I am Lucas and I am here to guide
                                    you.</p>
                                <p className="text-lg">Please provide more information about your event below.</p>
                            </div>

                        </div>
                        <div className="space-x-4 flex-row flex justify-between pt-8 pb-8 pl-20 pr-20 w-full">
                            <div className="flex-col flex px-5 border w-96 h-32 justify-center shadow-md">
                                <span className="mb-5">Choose an event type</span>
                                <Dropdown overlay={menu}>
                                    <p
                                        className="ant-dropdown-link font-bold text-lg"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        {eventType} <DownOutlined/>
                                    </p>
                                </Dropdown>
                            </div>
                            <div className="flex-col flex px-5 border w-96 h-32 justify-center shadow-md">
                                <span className="mb-5">This event will be</span>
                                <div className="flex-row flex">
                                    <Checkbox
                                        checked={isPublic}
                                        onChange={() => setIsPublic(true)}
                                    >
                                        <span className="font-bold text-lg">Public</span>
                                    </Checkbox>
                                    <Checkbox
                                        checked={!isPublic}
                                        onChange={() => setIsPublic(false)}
                                    >
                                        <span className="font-bold text-lg">Private</span>
                                    </Checkbox>
                                </div>
                            </div>
                            <div className="flex-col flex px-5 border w-96 h-32 justify-center shadow-md">
                                <span className="mb-5">Number of participants</span>
                                <Input prefix={<UserOutlined className="pr-5"/>} className="font-bold text-lg"
                                       placeholder="Expected no. of participants"
                                       bordered={false}
                                       size="large"
                                       onChange={(value) => setParticipant(value.target.value)}
                                />
                            </div>
                        </div>
                        <div
                            className="w-1/5 border text-center h-10 justify-center flex-col flex rounded cursor-pointer"
                            style={{
                                backgroundColor: "#32BEA6",
                                color: "white",
                            }}
                        >
                            <a onClick={nextStep}
                            >
                                <span>Continue</span>
                            </a>
                        </div>
                    </div>
                </>
            }
        </>
    );
}
