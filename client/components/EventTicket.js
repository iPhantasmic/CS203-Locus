import { Divider } from "antd";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import React from "react";
import QRCode from "qrcode.react";

export default function EventTicket(props) {
    var React = require('react');
    var QRCode = require('qrcode.react');

    return (
        <div className="flex-col flex">
            <div className="outer">
                <div className="inner btmDashed shadow-md" style={{borderBottom: "0.7px dashed #d1d1d1",}}>
                    {/* Top part */}
                    <div className="content bg-white rounded-t-lg">
                        <div className="w-full bg-green-400 rounded-t-lg">
                            <img src="/black_logo.png" width={130} height="auto" className="ml-5"/>
                        </div>
                        <div className="flex-col flex items-center px-16 py-8">
                            <span className = "font-semibold text-3xl pb-1">{props.eventName}</span>
                            <span>{props.startDateTime !== undefined && new Date(props.startDateTime[0], props.startDateTime[1] - 1, props.startDateTime[2], props.startDateTime[3], props.startDateTime[4], 0, 0).toString()}</span>
                            <div className="flex-row flex justify-between w-full mt-6">
                                <div className="flex-col flex">
                                    <span className="font-semibold text-lg">Ticket #</span>
                                    <span className="text-base">{props.id}</span>
                                </div>
                                <div className="flex-col flex">
                                    <span className="font-semibold text-lg">Participant Name</span>
                                    <span className="text-base">{props.participantName}</span>
                                </div>
                                <div className="flex-col flex">
                                    <span className="font-semibold text-lg">Quantity</span>
                                    <span className="text-base">1</span>
                                </div>
                                <div className="flex-col flex">
                                    <span className="font-semibold text-lg">Event POC</span>
                                    <span className="text-base">{props.organiserName}</span>
                                </div>
                            </div>
                            <div className="flex-col flex mt-5 items-center">
                                <span className="font-semibold mt-2 text-lg">Event Venue</span>
                                <span
                                    style={{ width: 466 }}
                                    className="text-center text-base"
                                >
                                    {props.eventAddress}
                                </span>
                            </div>
                        </div>
                    </div>
                    <i className="bottom right"/>
                    <i className="bottom left"/>
                </div>
            </div>
            <div className="outer topDashed mb-5  rounded-b-lg">
                <div className="inner">
                    <i className="top left"/>
                    <i className="top right"/>
                    {/* Bottom part */}
                    <div className="content bg-white ">
                        <div className="flex-col flex items-center p-8" >
                            <div className="flex-row flex justify-center text-center" >
                                <QRCode value={btoa(props.participantName + props.id + props.isVaccinated)} size={100} fgColor={props.isVaccinated ? "#0c724a" : "#a4091c"}/>
                                {/*<img src="/qr-code.png"  />*/}
                            </div>
                            <div className="flex-row flex mt-5" >
                                <div className = "flex-col flex justify-center text-center">
                                    <span className="font-semibold text-lg">Reference No.:</span>
                                    <span>{btoa(props.participantName + props.id + props.isVaccinated)}</span>
                                </div>
                            </div>

                            {/*<span className="mt-3">Check in for this event</span>*/}
                            {/*<span>*/}
                            {/*    Scan this QR code at the event to check in.*/}
                            {/*</span>*/}
                        </div>
                        <div className="w-full h-5" >

                        </div>
                    </div>
                </div>
            </div>

            <p className="text-xs text-gray-400 mt-2 mb-8">Please use these contact details for last-minute changes, questions, emergencies, and other issues. You have confirmed that you agree to the Locus Terms and condition.</p>
            <button className="mb-20 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-full">
                Download ticket
            </button>
        </div>
    );
}
