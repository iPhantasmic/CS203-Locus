import { Divider } from "antd";
export default function LandingPageNews(props) {
    return (
        <div className = "mb-5" >
            <div className="flex-row flex">
                <div className="flex-col flex w-1/12" >
                    <span style={{ fontSize: 18 }}>{props.day}</span>
                    <span>{props.time}</span>
                </div>
                <Divider
                    type="vertical"
                    style={{ height: 100 }}
                    orientation="center"
                />
                <div className="flex-col flex w-full">
                    <span className="mb-3 font-bold" style={{ fontSize: 18 }}>
                        {props.header}
                    </span>
                    <span>
                        {props.content}
                    </span>
                </div>
            </div>
        </div>
    );
}
