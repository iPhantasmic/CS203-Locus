import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import NavbarLoggedIn from "../components/NavbarLoggedIn";
import {useRouter} from "next/router";
import ImageUploader from "../components/ImageUploader";
import {LoadingOutlined} from '@ant-design/icons';

export default function Profile() {
    const [isUpload, setIsUpload] = useState(false);
    const [eventType, setEventType] = useState("Relgious Event");
    const [username, setUsername] = useState("");
    const [participant, setParticipant] = useState();
    useEffect(() => {
        document.title = 'Locus | My Profile';
        if (Cookies.get("username") !== undefined) {
            setUsername(Cookies.get("username"));
        }
    },[])
    return (
        <div className="w-screen h-screen items-center flex-col flex">
            <NavbarLoggedIn page="Organise" user={username} />
            {/*<ImageUploader />*/}
            {isUpload && <div className="absolute flex-col flex w-full h-full bg-gray-400 opacity-75 items-center justify-center" >
                <ImageUploader state = {()=>setIsUpload(!isUpload)}/>
             </div>}
            <div className="flex-row flex mt-20">
                <div className="w-64">
                    <div className= "flex-col flex items-center p-5 border justify-self-center">
                        <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9511dbb5-9be4-4651-be20-99508a7fbd79/de778ut-505703d5-1e7b-4fec-b7e3-6ee8bdcef929.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzk1MTFkYmI1LTliZTQtNDY1MS1iZTIwLTk5NTA4YTdmYmQ3OVwvZGU3Nzh1dC01MDU3MDNkNS0xZTdiLTRmZWMtYjdlMy02ZWU4YmRjZWY5MjkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.gZ2X09i1Edpth71xTOMMqrh7sJOIwXu_HAh7_1JtDa8" className="rounded-full h-24 w-24 flex items-center justify-center mb-7" alt=" " />
                        <span className="font-bold text-lg mb-2">&#160;&#160;Verification Statuses</span>
                        <span className="mb-2"><LoadingOutlined />&#160;&#160;Vaccination Statuses</span>
                        <span className="mb-2"><LoadingOutlined />&#160;&#160;Identity Verification</span>
                        <span className="mb-2"><LoadingOutlined />&#160;&#160;Organization Verification</span>
                    </div>
                    <div className= "flex-col flex items-center p-5 border justify-self-center">
                        <div className="w-full border text-center rounded-full py-2" onClick= {()=>setIsUpload(true)}>
                            <span>
                                Verify Verification Statuses
                            </span>
                        </div>
                        <div className="w-full border text-center rounded-full py-2 bg-gray-400 mt-2">
                            <span className="text-white">
                                Verify Identity
                            </span>
                        </div>
                        <div className="w-full border text-center rounded-full py-2 bg-gray-400 mt-2">
                            <span className="text-white">
                                Verify Mobile Number
                            </span>
                        </div>
                        <div className="w-full border text-center rounded-full py-2 bg-gray-400 mt-2">
                            <span className="text-white">
                                Verify Organization
                            </span>
                        </div>

                    </div>
                </div>


                <div className= "ml-8">
                    <div className="text-xl font-bold">Account Management Tools</div>
                    <div className="text-xs">Manage your account with the tools below</div>
                    <div className="flex-row flex mt-5">
                        <div className="flex-col flex h-30 border w-72 p-5 shadow-xl rounded-xl">
                            <span className="font-bold text-md">Personal information</span>
                            <span>Provide personal details and how we can reach you</span>
                        </div>
                        <div className="flex-col flex h-30 border w-72 ml-5 p-5 shadow-xl rounded-xl">
                            <span className="font-bold text-md">Login and security</span>
                            <span>Update your password and secure your account</span>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}
