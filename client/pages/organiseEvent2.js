import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import NavbarLoggedIn from "../components/NavbarLoggedIn";
import {useRouter} from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import {Input} from 'antd';
import Spinner from "../components/Spinner"
import Footer from "../components/Footer";

export default function Home() {
    const {TextArea} = Input;
    const router = useRouter();
    const {
        query: {eventType, isPublic, participant},
    } = router;
    const [startDateTime, setStartDateTime] = useState(new Date());
    const [endDateTime, setEndDateTime] = useState(new Date());
    // const [isPrivate, setIsPrivate] = useState(false);
    // const [eventType, setEventType] = useState(" ");
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("");
    const [eventName, setEventName] = useState("");
    const [imageGcsUrl ,setImageGcsUrl] = useState("")
    const [location, setLocation] = useState("")
    const [tags, setTags] = useState("")
    const [eventDescription, setEventDescription] = useState("");
    // const [participant, setParticipant] = useState();
    useEffect(() => {
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
        document.title = 'Locus | Organise Event';
        if (Cookies.get("username") !== undefined) {
            setUsername(Cookies.get("username"));
        }
    }, []);

    const config = ({
        withCredentials: true,
    })
    let organizeEvent = async function() {
        console.log(tags)

        if (new Date(startDateTime) <= new Date()) {
            alert("Start Date/Time cannot be before now")
            return;
        }

        if (new Date(startDateTime) >= new Date(endDateTime)) {
            alert("Start Date/Time cannot be before End Date/Time")
            return;
        }

        if (tags === undefined){
            alert("Please enter a tag for your event.")
        }

        setLoading(true)

        axios
            .post("https://locus-g3gtexqeba-uc.a.run.app/event/new", {
                organiserId: Cookies.get("id"),
                name: eventName,
                tag: tags,
                type: eventType,
                private: isPublic === 'false',
                description: eventDescription,
                address: location,
                maxParticipants: Number(participant),
                imageGcsUrl: imageGcsUrl,
                startDateTime: startDateTime.toISOString().slice(0, -5),
                endDateTime: endDateTime.toISOString().slice(0, -5),
            }, config)
            .then(function (response1) {
                console.log(response1);
                router.push("/organiserevent")
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            });
    };

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
                                <p className="font-semibold text-xl mt-3">Great! Lets move on to Event Details.</p>
                                <p className="text-lg">Tell me more about when and where your event will
                                    be at.</p>
                            </div>

                        </div>
                        <div className="flex-row flex justify-between w-full px-20 mt-8">
                            <div className=" flex-col flex px-5 border w-96 h-32 justify-center shadow-md mb-5">
                                <span className="mb-5 font-semibold text-gray-500">Event Name</span>
                                <Input bordered={false} placeholder="Name your event"
                                       onChange={(value) => setEventName(value.target.value)}
                                />
                            </div>
                            <div className=" flex-col flex px-5 border w-96 h-32 justify-center shadow-md mb-5">
                                <span className="mb-5 font-semibold text-gray-500">Start Time and Date</span>
                                <DatePicker bordered={false}
                                            selected={startDateTime}
                                            onChange={(value) => setStartDateTime(value)}
                                            showTimeSelect
                                            dateFormat="Pp"
                                />
                            </div>
                            <div className=" flex-col flex px-5 border w-96 h-32 justify-center shadow-md mb-5">
                                <span className="mb-5 font-semibold text-gray-500">End Time and Date</span>
                                <DatePicker bordered={false}
                                            selected={endDateTime}
                                            onChange={(value) => setEndDateTime(value)}
                                            showTimeSelect
                                            dateFormat="Pp"
                                />
                            </div>
                        </div>

                        <div className="flex-row flex justify-between w-full px-20">
                            <div className=" flex-col flex px-5 border w-96 h-32 justify-center shadow-md mb-5">
                                <span className="mb-5 font-semibold text-gray-500">Event Tags (Comma-seperated)</span>
                                <Input bordered={false} placeholder="Tags to identify event"
                                       onChange={(value) => setTags(value.target.value)}
                                />
                            </div>
                            <div className=" flex-col flex px-5 border w-96 h-32 justify-center shadow-md mb-5">
                                <span className="mb-5 font-semibold text-gray-500">Event Location</span>
                                <Input bordered={false} placeholder="Address of event"
                                       onChange={(value) => setLocation(value.target.value)}
                                />
                            </div>
                            <div className=" flex-col flex px-5 border w-96 h-32 justify-center shadow-md mb-5">
                                <span className="mb-5 font-semibold text-gray-500">Event Image Url</span>
                                <Input bordered={false} placeholder="Enter Image Url"
                                       onChange={(value) => setImageGcsUrl(value.target.value)}
                                />
                            </div>
                        </div>

                        <div className="px-20 w-full mb-10">
                            <div className="mt-2 w-full h-96 border shadow-md p-8 flex-col flex">
                                <span className="font-semibold text-gray-500">Event Details</span>
                                <TextArea rows={10} bordered={false}
                                          placeholder="Describe your event to the participants"
                                          className="h-full w-full inline-block align-top"
                                          onChange={(value) =>
                                              setEventDescription(value.target.value)
                                          }
                                />
                            </div>
                        </div>

                        <div
                            className="w-1/5 border text-center h-10 justify-center flex-col flex rounded cursor-pointer"
                            style={{
                                backgroundColor: "#32BEA6",
                                color: "white",
                            }}
                            onClick={() => organizeEvent()}
                        >
                            <span>Continue</span>
                        </div>
                    </div>
                    <Footer/>
                </>
            }
        </>
    );
}
