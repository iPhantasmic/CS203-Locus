import Image from "next/image";

export default function EventCard(props) {
    return (
        <div
            className="flex-row flex p-5 items-center rounded-xl mb-5 shadow"
            style={{ height: 180,width:'48%' }}
        >
            <div className=" flex-col flex h-full ml-5 w-1/2 justify-between p-1">
                <span className="font-bold" style={{ fontSize: 20 }}>
                    {/* 3D Augmented Chalk Exhibit */}
                    {props.title}
                </span>
                <span style={{ color: "#32BEA6", fontSize: 13 }}>
                    {/* Fri, 17th Sep 2021, 1:00 PM */}
                    {props.dateTime}
                </span>
                <span>
                    {/* Gardens by the Bay • Singapore */}
                    {props.location}
                </span>
                {/* <span className = "font-bold">Secret Sunrise Singapore Pte. Ltd</span> */}
                <span className = "font-bold">{props.tag}</span>
            </div>
            <div>
                <Image
                    src="/event1.jpeg"
                    height={150}
                    width={270}
                    className="rounded-xl"
                ></Image>
            </div>
        </div>
    );
}
