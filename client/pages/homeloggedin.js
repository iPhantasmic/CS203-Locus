import {useEffect, useState} from "react";
import LandingPageNews from "../components/LandingPageNews";
import EventCard from "../components/LandingPageEvent";
import Cookies from 'js-cookie'
import NavbarLoggedIn from "../components/NavbarLoggedIn";
import Fade from "react-reveal/Fade";
import {Pagination, Tabs} from "antd";


export default function Home() {
    const {TabPane} = Tabs;
    const [data, setData] = useState([]);
    const [username, setUsername] = useState("");
    const axios = require("axios");
    const [news,setNews] = useState([])
    const [state, setState] = useState({
        minValue: 0,
        maxValue: 18
    });
    useEffect(() => {
        document.title = 'Locus | Homepage';
        if (Cookies.get('username') !== undefined) {
            setUsername(Cookies.get('username'))
        }

        const config = ({
            withCredentials: true,
        })

        async function fetchMyAPI() {
            await axios.get("http://localhost:8080/event/list", config).then(function (response) {
                setData(response.data)
            }).catch(function (error){
                console.log(error.response.data.message)
            })

        }
        async function fetchNewsAPI(){
            await axios.get("https://locus-dev.herokuapp.com/v1/daily").then(function (response){
                console.log(response.data)
                setNews(response.data)
            })
        }
        fetchNewsAPI()

        fetchMyAPI();
        axios.post("http://localhost:8080/validate", {} ,{withCredentials: true})

    }, []);
    const handleChange = value => {
        setState({
            minValue: (value - 1) * 18,
            maxValue: value * 18
        });
    };
    return (
        <div>
            <NavbarLoggedIn page="Home" user={username}/>
            <div className="px-16 flex-col flex">
                <div className="w-screen -mx-16 py-14 px-16">
                    <div className="w-full justify-between flex-row flex mb-5 cursor-pointer ">
                        <Fade left>
                        <span className="font-semibold text-2xl">
                            COVID-19 Guidelines Updates
                        </span></Fade>
                        <Fade left>
                            <div style={{display: "flex"}}>
                                <a href="#">View All&#160;&#160;</a>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                                </svg>
                            </div>
                        </Fade>
                    </div>
                    {news && news.map((element) =>{
                        return(
                            <Fade left>
                                <LandingPageNews
                                    key = {element.title}
                                    articleLink = {element.article_link}
                                    color="black"
                                    day= {element.date_published.slice(0,11)}
                                    time={element.date_published.slice(12,16)}
                                    header={element.title}
                                    content={element.body_text}
                                /></Fade>)
                    })
                    }
                </div>
                <div className="mt-14 mb-8">
                    <span className="font-semibold text-2xl">
                        Recently Viewed
                    </span>
                </div>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="All" key="1">
                        <div className="flex pb-10 hide-scroll-bar">
                            <div>
                                {data &&
                                data.length > 0 &&
                                data.slice(state.minValue, state.maxValue).map((element) => {
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
                                <div className="flex justify-center pt-5">
                                    <Pagination
                                        defaultCurrent={1}
                                        defaultPageSize={18} //default size of page
                                        onChange={handleChange}
                                        total={data.length} //total number of card data available
                                    />
                                </div>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="For you" key="2">
                        {data.slice(state.minValue, state.maxValue).map((element) => {
                            var dateString = new Date(element.startDateTime).toString()
                            var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                            // console.log(dateString.slice(0, 21) + AMPM)
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
                    </TabPane>
                    <TabPane tab="Today" key="3">
                        {data.slice(state.minValue, state.maxValue).map((element) => {
                            var dateString = new Date(element.startDateTime).toString()
                            var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                            // console.log(dateString.slice(0, 21) + AMPM)
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
                    </TabPane>
                    <TabPane tab="This Weekend" key="4">
                        {data.slice(state.minValue, state.maxValue).map((element) => {
                            var dateString = new Date(element.startDateTime).toString()
                            var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                            // console.log(dateString.slice(0, 21) + AMPM)
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
                    </TabPane>
                    <TabPane tab="This month" key="5">
                        {data.slice(state.minValue, state.maxValue).map((element) => {
                            var dateString = new Date(element.startDateTime).toString()
                            var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                            // console.log(dateString.slice(0, 21) + AMPM)
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
                    </TabPane>
                    <TabPane tab="Charity" key="6">
                        {data.slice(state.minValue, state.maxValue).map((element) => {
                            var dateString = new Date(element.startDateTime).toString()
                            var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                            // console.log(dateString.slice(0, 21) + AMPM)
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
                    </TabPane>
                    <TabPane tab="Music" key="7">
                        {data.slice(state.minValue, state.maxValue).map((element) => {
                            var dateString = new Date(element.startDateTime).toString()
                            var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                            // console.log(dateString.slice(0, 21) + AMPM)
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
                    </TabPane>
                    <TabPane tab="Hobby" key="8">
                        {data.slice(state.minValue, state.maxValue).map((element) => {
                            var dateString = new Date(element.startDateTime).toString()
                            var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                            // console.log(dateString.slice(0, 21) + AMPM)
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
                    </TabPane>
                    <TabPane tab="Food and Drink" key="9">
                        {data.slice(state.minValue, state.maxValue).map((element) => {
                            var dateString = new Date(element.startDateTime).toString()
                            var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                            // console.log(dateString.slice(0, 21) + AMPM)
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
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
}
