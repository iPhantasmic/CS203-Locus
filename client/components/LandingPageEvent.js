import Image from "next/image";

export default function EventCard() {
    return (
        <div
            className="flex-row flex p-5 items-center w-1/2  mb-5"
            style={{ height: 180 }}
        >
            <div className=" flex-col flex h-full ml-5 w-1/2 justify-between p-1">
                <span className="font-bold" style={{ fontSize: 20 }}>
                    3D Augmented Chalk Exhibit
                </span>
                <span style={{ color: "#32BEA6", fontSize: 13 }}>
                    Fri, 17th Sep 2021, 1:00 PM
                </span>
                <span>Gardens by the Bay • Singapore</span>
                <span className = "font-bold">Secret Sunrise Singapore Pte. Ltd</span>
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
