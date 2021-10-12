import { Divider } from "antd";

export default function EventTicket(props) {
    return (
        <div className="flex-col flex ">
            <div className="outer">
                <div className="inner btmDashed">
                    <div className="content  bg-gray-100" >
                        <div className="w-full bg-black "  >
                            <img src="/logo_white.png" width={130} />
                        </div>
                        <div className="flex-col flex items-center px-16 py-8">
                            <span className = "font-bold text-xl">{props.eventName}</span>
                            <span>{props.startDateTime}</span>
                            <Divider type="horizontal" />
                            <div className="flex-row flex justify-between w-full">
                                <div className="flex-col flex">
                                    <span>Ticket #</span>
                                    <span>{props.id}</span>
                                </div>
                                <div className="flex-col flex">
                                    <span>Participant Name</span>
                                    <span>{props.participantName}</span>
                                </div>
                                <div className="flex-col flex">
                                    <span>Quantity</span>
                                    <span>1</span>
                                </div>
                                <div className="flex-col flex">
                                    <span>Event POC</span>
                                    <span>{props.organiserName}</span>
                                </div>
                            </div>
                            <div className="flex-col flex mt-5 items-center">
                                <span>Event Venue</span>
                                <span
                                    style={{ width: 466 }}
                                    className="text-center"
                                >
                                    {/* SMU School of Computing and Information
                                    Systems GSR 2-3, 80 Stamford Rd Singapore
                                    178902 */}
                                    {props.eventAddress}
                                </span>
                            </div>
                        </div>
                    </div>
                    <i className="bottom right"></i>
                    <i className="bottom left"></i>
                </div>
            </div>
            <div className="outer topDashed mb-5">
                <div className="inner">
                    <i className="top left"></i>
                    <i className="top right"></i>
                    <div className="content  bg-gray-100">
                        <div className="flex-col flex items-center p-8" >
                            <div className="flex-row flex" >
                                <img src="/qr-code.png" width={130}></img>
                                <Divider type="vertical"/>
                                <div className = "flex-col flex justify-center">
                                    <span>Reference No.</span>
                                    <span>XAR3610</span>
                                </div>
                            </div>
                            <span>Check in for this event</span>
                            <span>
                                Scan this QR code at the event to check in.
                            </span>


                        </div>
                        <div className="w-full h-5" >

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
