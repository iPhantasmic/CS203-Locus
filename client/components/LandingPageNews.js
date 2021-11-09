import { Divider } from "antd";
import {useRouter} from "next/router";


export default function LandingPageNews(props) {
    const router = useRouter()
    return (
        <a href={props.articleLink} target="_blank">
            <div className="mb-5">
                <div className="flex-row flex">
                    <div className="flex-col flex w-1/12">
                        <span
                            className={`opacity-75 ${props.color === "white" ? "text-white" : "text-black"}`}>{props.day}</span>
                        <span
                            className={`opacity-75 ${props.color === "white" ? "text-white" : "text-black"}`}>{props.time}</span>
                    </div>
                    <div
                        className={`border-l-2 flex-col flex w-full pb-2 pl-1.5 ${props.color === 'white' ? "border-white" : "border-gray-400"}`}>
                    <span
                        className={`ml-4 mb-1 font-semibold text-lg ${props.color === 'white' ? "text-white" : "text-black"}`}>
                        {props.header}
                    </span>
                        <span className={`ml-4 ${props.color === "white" ? "text-white" : "text-black"}`} style={{
                            wordBreak: "break-word",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical"
                        }}>
                        {props.content}
                    </span>
                    </div>
                </div>
            </div>
        </a>
    );
}
