import {useEffect} from "react";
import {useRouter} from "next/router";
import {Affix} from "antd";

export default function Navbar(props) {
    useEffect(() => {
        console.log(props.username);
    }, []);
    const router = useRouter();
    return (
        <div className="sticky top-0 z-40 h-20 bg-white w-full px-7 flex flex-row items-center justify-between">
            <img alt=" " src="/logo.png" width={150} height="auto"/>
            <div className="flex-row flex h-full items-center text-base">
                <div className="flex-col flex h-full justify-center px-8">
                    <a
                        className={`leading-loose hover:text-green-500 hover:text-underline text-base pb-2 ${
                            props.page === "Home" ? "border-b-0 md:border-b-2 border-green-500 font-semibold text-green-500" : "text-gray-800"
                        }`} href="/"
                    >
                        Home
                    </a>
                </div>
                <div className="flex-col flex h-full justify-center px-8">
                    <a className={`leading-loose hover:text-green-500 hover:text-underline text-base pb-2 ${
                        props.page === "Events" ? "border-b-0 md:border-b-2 border-green-500 font-semibold text-green-500" : "text-gray-800"
                    }`} href="#">Events</a>
                </div>
                <div className="flex-col flex h-full justify-center px-8">
                    <a className={`leading-loose hover:text-green-500 hover:text-underline text-base pb-2 ${
                        props.page === "Organise" ? "border-b-0 md:border-b-2 border-green-500 font-semibold text-green-500" : "text-gray-800"
                    }`} href="#">Organise</a>
                </div>
                <div className="flex-col flex h-full justify-center px-8">
                    <a className={`leading-loose hover:text-green-500 hover:text-underline text-base pb-2 ${
                        props.page === "Developer" ? "border-b-0 md:border-b-2 border-green-500 font-semibold text-green-500" : "text-gray-800"
                    }`} href="https://omerwyo.gitbook.io/locusapi/" target="_blank">Developer</a>
                </div>
                <div className="flex-col flex h-full justify-center px-8">
                    <a className={`leading-loose hover:text-green-500 hover:text-underline text-base pb-2 ${
                        props.page === "Help" ? "border-b-0 md:border-b-2 border-green-500 font-semibold text-green-500" : "text-gray-800"
                    }`} href="#">Help</a>
                </div>
            </div>
            <div>
                {/*{props.user == "" ? (*/}
                <div
                    className="cursor-pointer mr-4 hover:text-green-500 stroke-current text-grey-600"
                    style={{display: "flex"}}
                    onClick={() => {
                        router.push("/login");
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800 hover:text-green-500"
                         fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                    <a className="text-gray-800 hover:text-green-500">&#160;&#160;Sign in</a>
                </div>
                {/*) : (*/}
                {/*    <div>*/}
                {/*        <span className="text-white">{props.user}</span>*/}
                {/*    </div>*/}
                {/*)}*/}
            </div>
        </div>
    );
}
