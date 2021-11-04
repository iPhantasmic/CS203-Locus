import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import NavbarLoggedIn from "../../components/NavbarLoggedIn";
import { useRouter } from "next/router";
import Spinner from "../../components/Spinner";
import { Tabs, Table, Tag,Space } from "antd";
import {CheckCircleTwoTone,EyeTwoTone,SmileTwoTone,IdcardTwoTone } from '@ant-design/icons';

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
    const { eid } = router.query;
    const { TabPane } = Tabs;
    const removeParticipant = (id) =>{
        axios.delete("http://localhost:8080/ticket/"+id, config
          ,{}).then(()=>console.log("Success")).catch(function(error){
              console.log(error.response.data.message)
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
                <a onClick = {()=>removeParticipant(record.id)} className = "text-red-700">Remove Participant</a>
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
                .get("http://localhost:8080/event/" + eid, config)
                .then(function (response) {
                    const result = response.data;
                    console.log(result);
                    setEventData(result);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        async function getParticipants() {
            axios
                .get("http://localhost:8080/ticket/list/" + eid, config)
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
                <Spinner />
            ) : (
                <>
                    <NavbarLoggedIn page="Browse" user={username} />
                    <div className="py-10">
                        <div className="px-16">
                            <span className="text-xl font-bold">
                                {eventData.name}
                            </span>
                        </div>
                        <div className="w-full items-center px-16">
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="Overview" key="1">
                                    <div className="flex-row flex w-full justify-between h-full py-5">
                                        <div className="flex-col flex shadow-lg w-1/5 p-2">
                                        <CheckCircleTwoTone  style={{display: 'inline-flex'}}/>
                                            <span className="text-xl mt-2 mt-2">
                                                Event is Live!
                                            </span>
                                            <span>
                                                Your event is up and running.
                                            </span>
                                            <span>
                                                All tickets are currently
                                                hidden.
                                            </span>
                                        </div>

                                        <div className="flex-col flex shadow-lg w-1/5 p-2">
                                            <EyeTwoTone style={{display: 'inline-flex'}}/>
                                            <span className="text-xl mt-2">
                                                Private
                                            </span>
                                            <span>
                                                Event is not listed or
                                                searchable
                                            </span>
                                            <span>
                                                Password is required to join
                                            </span>
                                        </div>
                                        <div className="flex-col flex shadow-lg w-1/5 p-2">
                                            <SmileTwoTone style={{display: 'inline-flex'}}/>
                                            <span className="text-xl mt-2">
                                                Participants
                                            </span>
                                            <span>
                                                Awaiting Vaccination Proof
                                            </span>
                                            <span>
                                                Submission for 6 participants
                                            </span>
                                        </div>
                                        <div className="flex-col flex shadow-lg w-1/5 p-2">
                                            <IdcardTwoTone style={{display: 'inline-flex'}}/>
                                            <span className="text-xl mt-2">
                                                Tickets
                                            </span>
                                            <span>
                                                {50 - participants.length}/50 remaining
                                            </span>
                                            <span>
                                               
                                            </span>
                                        </div>
                                    </div>
                                </TabPane>
                                <TabPane tab="Event Details" key="2">
                                    <div
                                        className="w-full h-32 bg-center bg-cover"
                                        style={{
                                            backgroundImage: `url(${"https://picsum.photos/seed/3/2000/600"})`,
                                        }}
                                    ></div>
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
                                            <iframe
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1994.3985695934173!2d103.84856807601908!3d1.296348381286188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19a38341d719%3A0xfe9bafb35b312b00!2sSingapore%20Management%20University!5e0!3m2!1sen!2ssg!4v1634403833318!5m2!1sen!2ssg"
                                                width="600"
                                                height="450"
                                                allowFullScreen=""
                                                loading="lazy"
                                            />
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
