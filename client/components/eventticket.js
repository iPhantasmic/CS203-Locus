import { Divider } from "antd";

export default function EventTicket(props) {
    return (
        <div className="flex-col flex">
            <div className="outer">
                <div className="inner btmDashed">
                    <div className="content">
                        <div className="w-full bg-black">
                            <img src="/logo_white.png" width={130} />
                        </div>
                        <div className="flex-col flex items-center px-16 py-8">
                            <span>3D Augmented Chalk Exhibit</span>
                            <span>17th September 2021, 1:00PM</span>
                            <Divider type="horizontal" />
                            <div className="flex-row flex justify-between w-full">
                                <div className="flex-col flex">
                                    <span>Ticket #</span>
                                    <span>Hello</span>
                                </div>
                                <div className="flex-col flex">
                                    <span>Participant Name</span>
                                    <span>Hello</span>
                                </div>
                                <div className="flex-col flex">
                                    <span>Quantity</span>
                                    <span>Hello</span>
                                </div>
                                <div className="flex-col flex">
                                    <span>Event POC</span>
                                    <span>Hello</span>
                                </div>
                            </div>
                            <div className="flex-col flex mt-5 items-center">
                                <span>Event Venue</span>
                                <span
                                    style={{ width: 466 }}
                                    className="text-center"
                                >
                                    SMU School of Computing and Information
                                    Systems GSR 2-3, 80 Stamford Rd Singapore
                                    178902
                                </span>
                            </div>
                        </div>
                    </div>
                    <i class="bottom right"></i>
                    <i class="bottom left"></i>
                </div>
            </div>
            <div className="outer topDashed mb-5">
                <div className="inner">
                    <i className="top left"></i>
                    <i className="top right"></i>
                    <div className="content">
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
                    </div>
                </div>
            </div>
        </div>
    );
}
