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
const AllNews = () => {

    const router = useRouter();
    const [username, setUsername] = useState("");
    const axios = require("axios");
    const [covidNews, setCovidNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false)


    useEffect(async () => {
        axios.post("https://locus-g3gtexqeba-uc.a.run.app/validate", {}, {withCredentials: true})
            .then(function (response) {
                setLoggedIn(true);
                console.log(response)
            }).catch(function (error) {
            setLoggedIn(false);
            router.push("/login");
            console.log(error)
        })

        document.title = 'Locus | COVID-19 Updates';
        if (Cookies.get('username') !== undefined) {
            setUsername(Cookies.get('username'))
        }

        const config = ({
            withCredentials: true,
        })

        async function fetchNewsAPI() {
            await axios.get("https://locus-dev.herokuapp.com/v1/daily").then(function (response) {
                console.log(response.data.json_list)
                setCovidNews(response.data.json_list)
            })
        }

        await fetchNewsAPI()

        setLoading(false)
    }, []);


    return (
        <>
            {loading || !loggedIn ? <Spinner/> :
                <>
                    <div>
                        <NavbarLoggedIn page="Resources" user={username}/>
                        <Fade left>
                        <div className="mt-14 mb-4 ml-16">
                            <p className="font-bold text-3xl text-gray-700 ">COVID-19 Situation Updates</p>
                            <p className="text-sm text-gray-700 ">All updates on the COVID situation provided by Singapore Ministry of Health.</p>
                        </div>
                        </Fade>
                        <div className="px-16 flex-col flex">
                            <div className="-mx-16 py-14 px-16">
                                {covidNews && covidNews.map((element) => {
                                    return (
                                        <Fade left>
                                            <LandingPageNews
                                                key={element.title}
                                                articleLink={element.articleId}
                                                color="black"
                                                day={element.datePublished.slice(0, 11)}
                                                time={element.datePublished.slice(13, 18)}
                                                header={element.title}
                                                content={element.bodyText}
                                            /></Fade>)
                                })
                                }
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </>
            }
        </>
    );
}

export default AllNews