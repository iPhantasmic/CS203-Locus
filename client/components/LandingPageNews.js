import { Divider } from "antd";
export default function LandingPageNews(props) {
    return (
        <div className = "mb-5" >
            <div className="flex-row flex">
                <div className="flex-col flex w-1/12" >
                    <span style={{ fontSize: 18 , color:'white',opacity:0.5}}>{props.day}</span>
                    <span style = {{color:'white',opacity:0.5}}>{props.time}</span>
                </div>
                <Divider
                    type="vertical"
                    style={{ height: 100 ,'background-color':'white'}}
                    orientation="center"
                />
                <div className="flex-col flex w-full">
                    <span className="ml-4 mb-3 font-bold" style={{ fontSize: 18,color:'white' }}>
                        {props.header}
                    </span>
                    <span className="ml-4" style = {{color:'white'}}>
                        {props.content}
                    </span>
                </div>
            </div>
        </div>
    );
}
