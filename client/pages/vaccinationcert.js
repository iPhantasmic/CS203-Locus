import React, {useEffect, useState} from "react";
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
import Navbar from "../components/Navbar";

const contentStyle = {
    height: '450px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
const AllNews = () => {
    const router = useRouter();

    useEffect(async () => {
        const config = ({
            withCredentials: true,
        })
    }, []);


    return (
        <>
            <div>
                <Navbar page="Help"/>
                <Fade left>
                    <div className="mt-14 mb-4 ml-16">
                        <p className="font-bold text-3xl text-gray-700 ">Proof of Vaccination</p>
                        <p className="text-sm text-gray-700 ">Documents to be uploaded</p>
                    </div>
                </Fade>
                <div className="px-16 flex-col flex">
                    You may choose to submit any one of the following document as proof of vaccination.
                    <div className="mt-4">
                        <ol className="pl-4 list-decimal">
                            <li className="font-bold">Photo or Screenshot of Vaccination Certificate (PNG, JPG,
                                JPEG)(2-3 working days required)<br/><span className="font-normal">**Ensure that your Full Name, NRIC and other important information are not obstructed.</span><img
                                    src="https://lh3.googleusercontent.com/proxy/hUM_LwV9a8DkbWCZvHwHNs3UJN1zNf25JPHux9iGzAusJwYoffKuvbKrj9bzNotcpOQuLg80s1x_-lVAHeQBdcwnqfceNrT2zV3qNBrz-8_czuz7RX0OaTjT"/>
                            </li>
                            <li><span className="font-bold">OpenAttestation file (Recommended - Instant verification)</span><br/>
                                <ol className="pl-4 list-decimal">
                                    <li>Go to <a href="https://www.notarise.gov.sg/" className="underline text-blue-500">https://www.notarise.gov.sg/</a><br /><img src="/OA1.jpg" width={700} height="auto" className="ml-5 mt-5"/></li>
                                    <li className="mt-8">Sign in to Notarise using your SingPass account<br /><img src="/OA2.jpg" width={700} height="auto" className="ml-5 mt-5"/></li>
                                    <li className="mt-8">Enter your email address<br /><img src="/OA3.jpg" width={700} height="auto" className="ml-5 mt-5"/></li>
                                    <li className="mt-8">Enter verification code sent to your email address<br /><img src="/OA4.jpg" width={700} height="auto" className="ml-5 mt-5"/></li>
                                    <li className="mt-8">Select the vaccination profile you wish to utilise. (If you have more than one profile, choose the vaccine that is recognised by the Local Government)<br /><img src="/OA5.jpg" width={700} height="auto" className="ml-5 mt-5"/></li>
                                    <li className="mt-8">Complete and submit your OA file request.<br /><img src="/OA6.jpg" width={700} height="auto" className="ml-5 mt-5"/></li>
                                    <li className="mt-8">Log in to your email account to retrieve the .oa file<br /><img src="/OA7.jpg" width={700} height="auto" className="ml-5 mt-5"/></li>
                                    <li className="mt-8">Congratulations! You can now submit your OpenAttestation file for instant verification.<br /><img src="/OA8.jpg" width={700} height="auto" className="ml-5 mt-5"/></li>
                                </ol>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default AllNews