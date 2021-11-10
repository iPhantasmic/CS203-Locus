// import {useEffect, useState} from "react";
// import LandingPageNews from "../components/LandingPageNews";
// import EventCard from "../components/LandingPageEvent";
// import Cookies from 'js-cookie'
// import NavbarLoggedIn from "../components/NavbarLoggedIn";
// import Fade from "react-reveal/Fade";
// import {Alert, Carousel, Pagination, Tabs} from "antd";
// import Spinner from "../components/Spinner"
// import {useRouter} from "next/router";
// import Marquee from 'react-fast-marquee';
// import Footer from "../components/Footer";
//
// const contentStyle = {
//     height: '450px',
//     color: '#fff',
//     lineHeight: '160px',
//     textAlign: 'center',
//     background: '#364d79',
// };
// const AllPressRelease = () => {
//
//     const router = useRouter();
//     const {TabPane} = Tabs;
//     const [data, setData] = useState([]);
//     const [username, setUsername] = useState("");
//     const axios = require("axios");
//     const [news, setNews] = useState([])
//     const [loading, setLoading] = useState(true);
//     const [loggedIn, setLoggedIn] = useState(false)
//     const [state, setState] = useState({
//         minValue: 0,
//         maxValue: 18
//     });
//
//
//     useEffect(async () => {
//         axios.post("https://locus-g3gtexqeba-uc.a.run.app/validate", {}, {withCredentials: true})
//             .then(function (response) {
//                 setLoggedIn(true);
//                 console.log(response)
//             }).catch(function (error) {
//             setLoggedIn(false);
//             router.push("/login");
//             console.log(error)
//         })
//
//         document.title = 'Locus | Homepage';
//         if (Cookies.get('username') !== undefined) {
//             setUsername(Cookies.get('username'))
//         }
//
//         const config = ({
//             withCredentials: true,
//         })
//
//         async function fetchNewsAPI() {
//             await axios.get("https://locus-dev.herokuapp.com/v1/govpress").then(function (response) {
//                 console.log(response.data)
//                 setNews(response.data)
//             })
//         }
//
//         await fetchNewsAPI()
//
//         setLoading(false)
//     }, []);
//     const handleChange = value => {
//         setState({
//             minValue: (value - 1) * 18,
//             maxValue: value * 18
//         });
//     };
//
//
//     return (
//         <>
//             {loading || !loggedIn ? <Spinner/> :
//                 <>
//                     <div>
//                         <NavbarLoggedIn page="Resources" user={username}/>
//                         <Fade left>
//                         <div className="mt-14 mb-4 ml-16">
//                             <p className="font-bold text-3xl text-gray-700 ">Government Newsroom</p>
//                             <p className="text-sm text-gray-700 ">Get latest update from Government Press Release.</p>
//                         </div>
//                         </Fade>
//                         <div className="px-16 flex-col flex">
//                             <div className="-mx-16 py-14 px-16">
//                                 {news && news.map((element) => {
//                                     return (
//                                         <Fade left>
//                                             <LandingPageNews
//                                                 key={element.id}
//                                                 articleLink={"https://" + element.articleUrl}
//                                                 color="black"
//                                                 day={element.datePublished}
//                                                 header={element.articleDescription}
//                                                 content={element.articleSummarized}
//                                             /></Fade>)
//                                 })
//                                 }
//                             </div>
//                         </div>
//                     </div>
//                     <Footer/>
//                 </>
//             }
//         </>
//     );
// }
//
// export default AllPressRelease