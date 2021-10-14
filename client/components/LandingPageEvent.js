import Slide from 'react-reveal/Fade';

export default function EventCard(props) {
    return (
        <Slide bottom>
            <div className="inline-block px-3 w-1/3">
                <div
                    className="overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out w-full bg-white shadow-sm rounded p-3 mx-1 my-3 cursor-pointer">
                    <div className="overflow-x-hidden rounded relative">
                        <img className="h-40 w-full object-cover"
                             src={"https://picsum.photos/seed/" + props.title + "/500/600"}/>
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
        // <div
        //     className="flex-row flex p-5 items-center rounded-xl mb-5 shadow"
        //     style={{ height: 180,width:'48%' }}
        // >
        //     <div className=" flex-col flex h-full ml-5 justify-between p-1" style = {{width:'40%'}}>
        //         <span className="font-bold" style={{ fontSize: 20 }}>
        //             {/* 3D Augmented Chalk Exhibit */}
        //             {props.title}
        //         </span>
        //         <span style={{ color: "#32BEA6", fontSize: 13 }}>
        //             {/* Fri, 17th Sep 2021, 1:00 PM */}
        //             {props.dateTime}
        //         </span>
        //         <span>
        //             {/* Gardens by the Bay • Singapore */}
        //             {props.location}
        //         </span>
        //         {/* <span className = "font-bold">Secret Sunrise Singapore Pte. Ltd</span> */}
        //         <span className = "font-bold">{props.tag}</span>
        //     </div>
        //     <div>
        //         <img
        //             src="https://picsum.photos/250/150"
        //             height={150}
        //             width={270}
        //             className="rounded-xl"
        //         />
        //     </div>
        // </div>
    );
}
