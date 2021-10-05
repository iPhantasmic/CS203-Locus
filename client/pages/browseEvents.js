import Image from "next/image";
import Navbar from "../components/Navbar";
import cartoon from "../public/homeImage.png";
import { useState, useEffect } from "react";
import { Divider } from "antd";
import LandingPageNews from "../components/LandingPageNews";
import EventCard from "../components/LandingPageEvent";
import Cookies from 'js-cookie'
import NavbarLoggedIn from "../components/NavbarLoggedIn";



export default function Home() {
    
    const [data, setData] = useState([]);
    const [username, setUsername] = useState("");
    const axios = require("axios");
    axios.defaults.baseURL = 'http://localhost:8080'
    useEffect(() => {
        console.log(Cookies.get('token'))
        console.log(Cookies.get('username'))
        // username = Cookies.get('username') == undefined? "" : Cookies.get('username')
        if (Cookies.get('username')!= undefined){
            setUsername(Cookies.get('username'))
        }
        console.log(username)
        async function fetchMyAPI() {
            axios.get("/event/list").then(function (response) {
                console.log(response.data)
                setData(response.data)
                console.log(data)
                
              })
          }
          fetchMyAPI()
      
    });
    
    return (
        <div>
            <NavbarLoggedIn page = "Home" user = {username}/>

            <div className="px-16 flex-col flex">

                <div className="mb-5 mt-5">
                    <span style={{ fontSize: 30, fontWeight: "bold" }}>
                       Popular events
                    </span>
                </div>
                {/* TODO: Refactor this events part */}
                <div className = "flex-row flex flex-wrap justify-between ">
                    {/* <EventCard />
                    <EventCard/> */}
                    {data.map((element) =>{
                       return(
                            <EventCard location = {element.address} title = {element.name} dateTime = {element.startDateTime} />
                       ) 
                    })}
                </div>
            </div>
        </div>
    );
}
