import Slide from 'react-reveal/Fade';
import {useRouter} from "next/router";


export default function MapEventCard(props) {
    const router = useRouter();
    return (
        <Slide bottom>
            <a className="my-2 w-full lg:max-w-full lg:flex shadow-lg mr-5 cursor-pointer" href={"/event/" + props.id} target="_blank" >
                <div
                    className="h-32 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                    style={{backgroundImage: 'url(' + props.imageGcsUrl + ')'}} title="Mountain">
                </div>
                <div
                    className="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                    <div className="mb-4">
                        <p className="text-lg font-semibold text-gray-900 mb-0">{props.title}</p>
                        <p className="font-medium mt-0 " style={{color: "#32BEA6"}}>{props.dateTime}</p>
                        <p className="mt-0 text-gray-500 text-xs">{props.location}</p>
                    </div>
                </div>
            </a>
        </Slide>
    );
}
