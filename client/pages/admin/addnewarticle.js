import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AdminNavbar from "../../components/AdminNavbar";
import axios from "axios";
import { Input } from "antd";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { notification } from "antd";
import Footer from "../../components/Footer";

export default function Home() {
    const { TextArea } = Input;
    const router = useRouter();
    const [publishTime, setPublishTime] = useState(new Date());
    // const [isPublic, setIsPublic] = useState(true);
    // const [eventType, setEventType] = useState("Religious Event");
    const [title, setTitle] = useState("");
    const [articleLink, setArticleLink] = useState("");
    const [bodyText, setBodyText] = useState("");
    // const [participant, setParticipant] = useState();
    useEffect(() => {
        document.title = "Locus | Add News CMS";
    }, []);

    const config = {
        withCredentials: true,
    };
    const uploadSuccessNotification = (type) => {
        notification[type]({
            message: "Success",
            description:
                "Your article has been uploaded!",
        });
    };
    const uploadFailureNotification = (type) => {
        notification[type]({
            message: "Oops! An error occurred.",
            description:
                "Your article cannot be uploaded",
        });
    };
    const postArticle = () => {
        axios
            .post(
                "http://localhost:8080/admin/news",
                {
                    title: title,
                    bodyText: bodyText,
                    datePublished: publishTime.toISOString().slice(0, -5),
                    articleLink: articleLink,
                },
                config
            )
            .then(function (response1) {
                console.log(response1);
            })
            .catch(function (error) {
                console.log(error.response.data.message);
            });
    };

    return (
        <>
            <AdminNavbar
                user={Cookies.get("username")}
                userID={Cookies.get("id")}
            />

            <div className="w-screen items-center flex-col flex">
                <div className="px-16 flex-col flex w-full items-center mt-10 grid grid-cols-8 gap-4 pb-4">
                    <div className="col-start-3 col-end-4">
                        <img
                            src="/lucas.png"
                            alt=" "
                            width={90}
                            height="auto"
                            className="ml-10"
                        />
                    </div>

                    <div className="col-start-4 col-end-7">
                        <p className="font-semibold text-xl mt-3">
                            Great! Let's create a new article
                        </p>
                        <p className="text-lg">
                            Tell me more about the article you're posting!
                        </p>
                    </div>
                </div>
                <Breadcrumb
                    style={{ paddingTop: 20 }}
                    className="self-start ml-20"
                >
                    <Breadcrumb.Item href="/admin">
                        <HomeOutlined style={{ display: "inline-flex" }} />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="/admin/cms">
                        <span>CMS</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <span>New Article</span>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="flex-row flex justify-between w-full px-20 mt-8">
                    <div className=" flex-col flex px-5 border w-96 h-32 justify-center shadow-md mb-5">
                        <span className="mb-5 font-semibold text-gray-500">
                            Article Title
                        </span>
                        <Input
                            bordered={false}
                            placeholder="What's your article title"
                            onChange={(value) => setTitle(value.target.value)}
                        />
                    </div>
                    <div className=" flex-col flex px-5 border w-96 h-32 justify-center shadow-md mb-5">
                        <span className="mb-5 font-semibold text-gray-500">
                            Article Link
                        </span>
                        <Input
                            bordered={false}
                            placeholder="Link to your article"
                            onChange={(value) =>
                                setArticleLink(value.target.value)
                            }
                        />
                    </div>
                    <div className=" flex-col flex px-5 border w-96 h-32 justify-center shadow-md mb-5">
                        <span className="mb-5 font-semibold text-gray-500">
                            Date Published
                        </span>
                        <DatePicker
                            bordered={false}
                            selected={publishTime}
                            onChange={(value) => setPublishTime(value)}
                            showTimeSelect
                            dateFormat="Pp"
                        />
                    </div>
                </div>

                <div className="px-20 w-full mb-10">
                    <div className="mt-2 w-full h-96 border shadow-md p-8 flex-col flex">
                        <span className="font-semibold text-gray-500">
                            Body Text
                        </span>
                        <TextArea
                            rows={10}
                            bordered={false}
                            placeholder="What is your article about"
                            className="h-full w-full inline-block align-top"
                            onChange={(value) =>
                                setBodyText(value.target.value)
                            }
                        />
                    </div>
                </div>

                <div
                    className="w-1/5 border text-center h-10 justify-center flex-col flex rounded cursor-pointer"
                    style={{
                        backgroundColor: "#32BEA6",
                        color: "white",
                    }}
                    onClick={() => postArticle()}
                >
                    <span>Post</span>
                </div>
            </div>
            <Footer />
        </>
    );
}
