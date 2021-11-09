import Footer from "../components/Footer";
import Image from "next/image";
import Navbar from "../components/Navbar";
import cartoon from "../public/homeImage.png";
import {useEffect, useState} from "react";
import LandingPageNews from "../components/LandingPageNews";
import EventCard from "../components/LandingPageEvent";
import Fade from 'react-reveal/Fade';
import Slide from 'react-reveal/Fade';
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import {Tabs} from 'antd';
import {Pagination} from 'antd';

export default function Home() {
    const {TabPane} = Tabs;
    const router = useRouter();
    const {
        query: {eventType, isPublic, participant},
    } = router;

    const [username, setUsername] = useState("");
    const [data, setData] = useState([]);
    const axios = require("axios");
    const [news,setNews] = useState([])
    const [state, setState] = useState({
        minValue: 0,
        maxValue: 9
    });
    useEffect(() => {
        document.title = 'Locus | We take care of your events'
        if (Cookies.get('username') !== undefined) {
            setUsername(Cookies.get('username'))
        }

        function fetchMyAPI() {
            axios.get("http://localhost:8080/event/list").then(function (response) {
                setData(response.data);
                // console.log(data);
            });
        }
        async function fetchNewsAPI(){
            await axios.get("https://locus-dev.herokuapp.com/v1/daily").then(function (response){
                console.log(response.data.json_list)
                setNews(response.data.json_list)
            })
        }
        fetchNewsAPI()
        fetchMyAPI();
        console.log(news)
    }, []);

    const handleChange = value => {
        setState({
            minValue: (value - 1) * 9,
            maxValue: value * 9
        });
    };

    return (
        <>
            <Navbar page="Home" user={username}/>
            {/*<div className="perspective-text">*/}
            {/*    <div className="perspective-line">*/}
            {/*        <p className="pers-text"></p>*/}
            {/*        <p className="pers-text">Reality</p>*/}
            {/*    </div>*/}
            {/*    <div className="perspective-line">*/}
            {/*        <p className="pers-text">Reality</p>*/}
            {/*        <p className="pers-text">Is Only</p>*/}
            {/*    </div>*/}
            {/*    <div className="perspective-line">*/}
            {/*        <p className="pers-text">Is Only</p>*/}
            {/*        <p className="pers-text">A Matter Of</p>*/}
            {/*    </div>*/}
            {/*    <div className="perspective-line">*/}
            {/*        <p className="pers-text">A Matter Of</p>*/}
            {/*        <p className="pers-text">Perception</p>*/}
            {/*    </div>*/}
            {/*    <div className="perspective-line">*/}
            {/*        <p className="pers-text">Perception</p>*/}
            {/*        <p className="pers-text"></p>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="px-16 flex-col flex">
                <Fade>
                    <div className="flex-row flex items-center justify-center">
                        <Image alt=" " src={cartoon} width={622} height={622} className="m-0"/>
                        <div className="flex-col flex ml-24">
                            <span className="font-bold" style={{fontSize: 61}}>We Take Care</span>
                            <span className="font-bold leading-3" style={{fontSize: 61, color: "#32BEA6"}}>Of Your Events</span>
                            <div className="mt-10 ml-1" style={{fontSize: 16, display: "flex"}}><span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                 fill="#32BEA6" stroke="#32BEA6"><path fillRule="evenodd"
                                                                       d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                       clipRule="evenodd"/></svg></span>
                                &#160;&#160;Track COVID-19 vaccination status.
                            </div>
                            <span className="mt-1 ml-1" style={{fontSize: 16, display: "flex"}}><span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                 fill="#32BEA6" stroke="#32BEA6"><path fillRule="evenodd"
                                                                       d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                       clipRule="evenodd"/></svg></span>
                                &#160;&#160;Keep up to date with changing COVID-19 guidelines.
                            </span>
                            <div className="mt-1 ml-1" style={{fontSize: 16, display: "flex"}}><span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                 fill="#32BEA6" stroke="#32BEA6"><path fillRule="evenodd"
                                                                       d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                       clipRule="evenodd"/></svg></span>
                                &#160;&#160;Co-ordinate all your stakeholders on our platform.
                            </div>
                            <div className="w-full flex-row flex justify-around mt-10">
                                <button
                                    className="motion-safe:hover:scale-110 cursor-pointer font-semibold border w-40 h-10 flex items-center justify-center rounded-md"
                                    style={{
                                        backgroundColor: "#32BEA6",
                                        color: "white",
                                    }}
                                    onClick={() => router.push('/signup')}
                                >
                                    Sign up now
                                </button>
                                <div
                                    className="motion-safe:hover:scale-110 font-semibold border w-40 flex items-center justify-center h-10 rounded-md "
                                    style={{
                                        backgroundColor: "#757575",
                                        color: "white",
                                    }}
                                >
                                    Browse events
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
                <div className="bg-black w-screen -mx-16 py-14 px-16">
                    {/*TODO: Check why first day is nothing*/}
                    { 
                    news.length>0 && news.slice(0,3).map((element) =>{

                        return(
                            <Fade left>
                                <LandingPageNews
                                    key = {element.articleId}
                                    articleLink = {element.articleId}
                                    color="white"
                                    day= {element.datePublished.slice(0,11)}
                                    time={element.datePublished.slice(13,18)}
                                    header={element.title}
                                    content={element.bodyText}
                                /></Fade>)
                    })

                    }
                </div>
                <div className="mt-14 mb-8">
                    <span className="font-semibold text-2xl">
                        Upcoming Public Events
                    </span>
                </div>
                {/* TODO: Refactor this events part */}
                <Tabs defaultActiveKey="1">
                    <TabPane tab="All Events" key="1">
                        <div className="flex pb-10 hide-scroll-bar">
                            <div>
                                {data &&
                                data.length > 0 &&
                                data.slice(state.minValue, state.maxValue).map((element) => {
                                    var dateString = new Date(element.startDateTime).toString()
                                    var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                                    return (
                                        <EventCard
                                            loggedin={false}
                                            key={element.id}
                                            id={element.id}
                                            imageGcsUrl={element.imageGcsUrl}
                                            location={element.address}
                                            title={element.name}
                                            dateTime={dateString.slice(0, 21) + AMPM}
                                        />
                                    );
                                })}
                                <div className="flex justify-center pt-5">
                                    <Pagination
                                        defaultCurrent={1}
                                        defaultPageSize={9} //default size of page
                                        onChange={handleChange}
                                        total={data.length} //total number of card data available
                                    />
                                </div>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="For you" key="2">
                        {data && data.map((element) => {
                            var dateString = new Date(element.startDateTime).toString()
                            var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                            // console.log(dateString.slice(0, 21) + AMPM)
                            return (
                                <EventCard
                                    loggedin={false}
                                    key={element.id}
                                    id={element.id}
                                    imageGcsUrl={element.imageGcsUrl}
                                    location={element.address}
                                    title={element.name}
                                    dateTime={dateString.slice(0, 21) + AMPM}
                                />
                            );
                        })}
                    </TabPane>
                    <TabPane tab="Today" key="3">
                        {data && data.map((element) => {
                            var dateString = new Date(element.startDateTime).toString()
                            var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                            // console.log(dateString.slice(0, 21) + AMPM)
                            return (
                                <EventCard
                                    loggedin={false}
                                    key={element.id}
                                    id={element.id}
                                    imageGcsUrl={element.imageGcsUrl}
                                    location={element.address}
                                    title={element.name}
                                    dateTime={dateString.slice(0, 21) + AMPM}
                                />
                            );
                        })}
                    </TabPane>
                    <TabPane tab="This Weekend" key="4">
                        {data && data.map((element) => {
                            var dateString = new Date(element.startDateTime).toString()
                            var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                            // console.log(dateString.slice(0, 21) + AMPM)
                            return (
                                <EventCard
                                    loggedin={false}
                                    key={element.id}
                                    id={element.id}
                                    imageGcsUrl={element.imageGcsUrl}
                                    location={element.address}
                                    title={element.name}
                                    dateTime={dateString.slice(0, 21) + AMPM}
                                />
                            );
                        })}
                    </TabPane>
                    <TabPane tab="This month" key="5">
                        {data && data.map((element) => {
                            var dateString = new Date(element.startDateTime).toString()
                            var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                            // console.log(dateString.slice(0, 21) + AMPM)
                            return (
                                <EventCard
                                    loggedin={false}
                                    key={element.id}
                                    id={element.id}imageGcsUrl={element.imageGcsUrl}
                                    location={element.address}
                                    title={element.name}
                                    dateTime={dateString.slice(0, 21) + AMPM}
                                />
                            );
                        })}
                    </TabPane>
                    <TabPane tab="Charity" key="6">
                        {data && data.map((element) => {
                            var dateString = new Date(element.startDateTime).toString()
                            var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                            // console.log(dateString.slice(0, 21) + AMPM)
                            return (
                                <EventCard
                                    loggedin={false}
                                    key={element.id}
                                    id={element.id}
                                    imageGcsUrl={element.imageGcsUrl}
                                    location={element.address}
                                    title={element.name}
                                    dateTime={dateString.slice(0, 21) + AMPM}
                                />
                            );
                        })}
                    </TabPane>
                    <TabPane tab="Music" key="7">
                        {data && data.map((element) => {
                            var dateString = new Date(element.startDateTime).toString()
                            var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                            // console.log(dateString.slice(0, 21) + AMPM)
                            return (
                                <EventCard
                                    loggedin={false}
                                    key={element.id}
                                    id={element.id}
                                    imageGcsUrl={element.imageGcsUrl}

                                    location={element.address}
                                    title={element.name}
                                    dateTime={dateString.slice(0, 21) + AMPM}
                                />
                            );
                        })}
                    </TabPane>
                    <TabPane tab="Hobby" key="8">
                        {data && data.map((element) => {
                            var dateString = new Date(element.startDateTime).toString()
                            var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                            // console.log(dateString.slice(0, 21) + AMPM)
                            return (
                                <EventCard
                                    loggedin={false}
                                    key={element.id}
                                    id={element.id}
                                    imageGcsUrl={element.imageGcsUrl}
                                    location={element.address}
                                    title={element.name}
                                    dateTime={dateString.slice(0, 21) + AMPM}
                                />
                            );
                        })}
                    </TabPane>
                    <TabPane tab="Food and Drink" key="9">
                        {data && data.map((element) => {
                            var dateString = new Date(element.startDateTime).toString()
                            var AMPM = dateString.slice(16, 18) >= 12 ? "pm" : "am"
                            // console.log(dateString.slice(0, 21) + AMPM)
                            return (
                                <EventCard
                                    loggedin={false}
                                    key={element.id}
                                    id={element.id}
                                    imageGcsUrl={element.imageGcsUrl}
                                    location={element.address}
                                    title={element.name}
                                    dateTime={dateString.slice(0, 21) + AMPM}
                                />
                            );
                        })}
                    </TabPane>
                </Tabs>
                <div className="bg-black w-screen -mx-16 px-16 flex">
                    <div className="grid grid-rows-3 grid-flow-col gap-0">
                        <div className="row-span-3"><Slide><img src="/appmock.png" alt=" " width={622}
                                                                height={622}
                                                                className="m-0"/></Slide></div>
                        <div className="col-span-2">
                        </div>
                        <Slide>
                            <div className="col-span-2 align-bottom">
                            <span className="font-bold text-3xl text-white">
                                Events at your fingertips
                            </span>
                                <br/>
                                <span className="text-lg text-white overflow-hidden">
                                Manage your events and booking on-the-go with<br/> our Locus mobile application.
                            </span>
                            </div>
                            <div className="col-span-2">
                                <img src="/appstore.png" alt=" " width={400}
                                     className="m-0"/>
                            </div>
                        </Slide>
                    </div>

                    {/*<div className="w-full justify-between flex-row flex mb-5 cursor-pointer">*/}
                    {/*    <Fade left>*/}

                    {/*    </Fade>*/}
                    {/*    /!*<Fade left>*!/*/}
                    {/*    /!*</Fade>*!/*/}
                    {/*</div>*/}
                    {/*<Fade left>*/}
                    {/*</Fade>*/}
                </div>
            </div>
            <Footer/>
        </>

    );
}

