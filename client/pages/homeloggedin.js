import {useEffect, useState} from "react";
import LandingPageNews from "../components/LandingPageNews";
import EventCard from "../components/LandingPageEvent";
import Cookies from 'js-cookie'
import NavbarLoggedIn from "../components/NavbarLoggedIn";
import Fade from "react-reveal/Fade";
import {Alert, Carousel, Pagination, Tabs} from "antd";
import Spinner from "../components/Spinner"
import {useRouter} from "next/router";
import Marquee from 'react-fast-marquee';
import Footer from "../components/Footer";

const contentStyle = {
    height: '450px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
const Home = () => {

    const router = useRouter();
    const {TabPane} = Tabs;
    const [data, setData] = useState([]);
    const [username, setUsername] = useState("");
    const axios = require("axios");
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false)
    const [state, setState] = useState({
        minValue: 0,
        maxValue: 18
    });


    useEffect(async () => {
        axios.post("http://localhost:8080/validate", {}, {withCredentials: true})
            .then(function (response) {
                setLoggedIn(true);
                // console.log(response)
            }).catch(function (error) {
            setLoggedIn(false);
            router.push("/login");
            console.log(error)
        })

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
                console.log(response.data)
            }).catch(function (error) {
                console.log(error)
            })

        }

        async function fetchNewsAPI() {
            await axios.get("https://locus-dev.herokuapp.com/v1/daily").then(function (response) {
                // console.log(response.data)
                setNews(response.data)
            }).catch(function (error) {
                console.log(error);
            })
        }

        await fetchNewsAPI()
        await fetchMyAPI();

        setLoading(false)
    }, []);
    const handleChange = value => {
        setState({
            minValue: (value - 1) * 18,
            maxValue: value * 18
        });
    };


    return (
        <>
            {loading || !loggedIn ? <Spinner/> :
                <>
                    <div>
                        <NavbarLoggedIn page="Home" user={username}/>
                        <div className="px-16 flex-col flex">
                            <div className="-mx-16 pb-5 pt-5 px-16">
                                <Alert
                                    closable
                                    banner
                                    message={
                                        <Marquee pauseOnHover gradient={false}>
                                            {news !== undefined ? "News content unavailable current" : news[0].title + ": " + news[0].body_text}
                                        </Marquee>
                                    }
                                />
                            </div>
                            <Fade className="-mx-16 px-16 h-full">
                                <Carousel autoplay className="w-full mb-10" dotPosition={"bottom"}>
                                    {data &&
                                    data.length > 0 &&
                                    data.slice(5, 12).map((element) => {
                                        return (
                                            <div>
                                                <div style={{
                                                    backgroundImage: 'linear-gradient(to bottom, transparent 0%, black 100%), url(' + element.imageGcsUrl + ')',
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                    color: "white"
                                                }} className="text-3xl font-normal pt-52 pb-14 pl-10">{element.name}
                                                    <p className="font-normal text-sm">{element.description.split('.')[0] + "."}</p>
                                                    <p className="font-normal text-sm">{element.description.split('.')[1] ? element.description.split('.')[1] + "." : " "}</p>
                                                </div>
                                            </div>
                                        );
                                    })
                                    }
                                </Carousel>
                            </Fade>
                            <Fade className="-mx-16 pb-14 px-16">
                                <div className="grid gap-10 grid-cols-3 justify-items-stretch">
                                    <div onClick={() => router.push('/allnews')}
                                         className="py-24 px-8 bg-black w-full fd-cl group-hover:opacity-90 cursor-pointer"
                                         style={{
                                             backgroundImage: `linear-gradient(to bottom, transparent 0%, black 100%), url(${"https://images.pexels.com/photos/4107049/pexels-photo-4107049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"})`,
                                             backgroundPosition: 'bottom'
                                         }}>
                                        <span className="block text-xl text-white font-semibold tracking-wide">COVID-19 Situation Updates</span>
                                        <span className="block text-white text-sm">All updates on the COVID situation in Singapore.</span>
                                    </div>

                                    <div onClick={() => router.push('#')}
                                         className="py-24 px-8 bg-black w-full fd-cl group-hover:opacity-95 cursor-pointer"
                                         style={{
                                             backgroundImage: `linear-gradient(to bottom, transparent 0%, black 100%), url(${"https://images.pexels.com/photos/4107048/pexels-photo-4107048.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"})`,
                                             backgroundPosition: 'center'
                                         }}>
                                        <span className="block text-xl text-white font-semibold tracking-wide">Government Newsroom</span>
                                        <span className="block text-white text-sm">Get latest update from Government Press Release.</span>
                                    </div>

                                    <div onClick={() => router.push('#')}
                                         className="py-24 px-8 bg-black w-full fd-cl group-hover:opacity-95 cursor-pointer"
                                         style={{backgroundImage: `linear-gradient(to bottom, transparent 0%, black 100%), url(${"https://images.pexels.com/photos/3544415/pexels-photo-3544415.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"})`}}>
                                        <span className="block text-xl text-white font-semibold tracking-wide">COVID Resources</span>
                                        <span
                                            className="block text-white text-sm">Seek assistance for organising event.</span>
                                    </div>
                                </div>
                            </Fade>
                            <div className="mt-14 mb-8">
                    <span className="font-semibold text-2xl">
                        Recently Viewed
                    </span>
                            </div>
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
                                                imageGcsUrl={element.imageGcsUrl}
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
                                                imageGcsUrl={element.imageGcsUrl}
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
                                                imageGcsUrl={element.imageGcsUrl}
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
                                                imageGcsUrl={element.imageGcsUrl}
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
                                                imageGcsUrl={element.imageGcsUrl}
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
                                                imageGcsUrl={element.imageGcsUrl}
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
                                                imageGcsUrl={element.imageGcsUrl}
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
                                                imageGcsUrl={element.imageGcsUrl}
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
                    <Footer/>
                </>
            }
        </>
    );
}

export default Home