import Slide from 'react-reveal/Fade';
import {useRouter} from "next/router";


export default function TicketEventCard(props) {
    const router = useRouter();
    return (
        <Slide bottom>
            <div className="col-start-2 px-3 pb-2 col-span-4">
                <div onClick={props.loggedin ? () => (router.push("/organiserevent/" + props.id)) : () => (router.push("/login"))}
                     className="overflow-hidden shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out w-full bg-white shadow-sm p-3 mx-1 my-3 cursor-pointer">
                    <div className="overflow-x-hidden relative">
                        <img className="h-40 w-full object-cover"
                             src={"https://picsum.photos/seed/" + props.title + "/2000/600"}/>
                    </div>
                    <div className="mt-4 pl-3 mb-2 flex justify-between ">
                        <div className="mr-4">
                            <p className="text-lg font-semibold text-gray-900 mb-0">{props.title}</p>
                            <p className="font-medium mt-0 " style={{color: "#32BEA6"}}>{props.dateTime}</p>
                            <p className="mt-0 text-gray-500 text-xs">{props.location}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Slide>
    )
}