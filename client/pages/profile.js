import React, {useCallback, useEffect, useMemo, useState} from "react";
import Cookies from "js-cookie";
import NavbarLoggedIn from "../components/NavbarLoggedIn";
import {CheckCircleTwoTone, LoadingOutlined} from '@ant-design/icons';
import {useDropzone} from "react-dropzone";
import axios from "axios";
import {notification} from 'antd';
import Spinner from "../components/Spinner"
import {Modal} from "antd";
import {useRouter} from "next/router";

const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
    padding: 20
};

const thumb = {
    position: "relative",
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box"
};

const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden"
};

const img = {
    display: "block",
    width: "auto",
    height: "100%"
};

const thumbButton = {
    // position: "absolute",
    right: 10,
    bottom: 10,
    background: "rgba(0,0,0,.8)",
    color: "#fff",
    border: 0,
    borderRadius: ".325em",
    cursor: "pointer"
};

const baseStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    backgroundSize: 'contain',
    color: '#bdbdbd',
    transition: 'border .3s ease-in-out',
    height: '100%',
    width: '100%',
    justifyContent: 'center'
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

export default function Profile() {
    const [isUpload, setIsUpload] = useState(false);
    const [username, setUsername] = useState("")
    const [userID, setUserID] = useState("");
    const [userDetails, setUserDetails] = useState();
    const [participant, setParticipant] = useState();
    const [loggedIn, setLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true);
    const [isVaccinated, setIsVaccinated] = useState(false);
    const [files, setFiles] = useState([]);
    // const [preview, setPreview] = React.useState("");
    const router = useRouter();


    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    }, []);

    const acceptedFile = files.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));


    // Set file acceptance type
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        onDrop,
        maxFiles: 1,
        accept: 'image/jpeg, image/png , .oa'
    });

    // Style sheet assignment based on class
    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    // const thumbs = files.map(file => (
    //     <div style={thumb} key={file.name}>
    //         <div style={thumbInner}>
    //             <img
    //                 src={file.preview}
    //                 style={img}
    //             />
    //         </div>
    //     </div>
    // ));

    useEffect(() => {
        async function fetchUserDetails() {
            console.log(userID)
            await axios.get("http://localhost:8080/participant/" + userID, {withCredentials: true})
                .then(function (response) {
                    console.log(response.data)
                    setUserDetails(response.data)
                    console.log(userDetails)
                }).catch(function (error) {
                    console.log(error.response.data.message)
                })
        }

        axios.post("http://localhost:8080/validate", {}, {withCredentials: true})
            .then(function (response) {
                setLoggedIn(true);
                console.log(response)
                fetchUserDetails()
            }).catch(function (error) {
            setLoggedIn(false);
            router.push("/login");
            console.log(error)
        })

        document.title = 'Locus | My Profile';
        if (Cookies.get("username") !== undefined) {
            setUsername(Cookies.get("username"));
        }
        if (Cookies.get("id") !== undefined) {
            setUserID(Cookies.get("id"));
        }


        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach((file) => URL.revokeObjectURL(file.preview));
        setLoading(false)
    }, [files, userID]);

    const uploadSuccessNotification = type => {
        notification[type]({
            message: 'Success',
            description:
                'Thank you! Your vaccination certification has been successfully uploaded.',
        });
    };
    const uploadFailureNotification = type => {
        notification[type]({
            message: 'Oops! An error occurred.',
            description:
                'Please check that you have uploaded the correct file. Contact the administrator is problem persists.',
        });
    };


    const fileUploadHandler = (e) => {
        e.preventDefault();

        var axios = require('axios');
        var imageFile = files[0];
        var formData = new FormData()
        formData.append("file", imageFile);

        var config = {
            method: 'post',
            url: 'http://localhost:8080/gcs/upload/vacc',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true,
            data: formData
        };

        axios(config)
            .then(function (response) {
                uploadSuccessNotification('success');
            })
            .catch(function (error) {
                uploadFailureNotification('error');
            });
    }

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            {loading || !loggedIn ? <Spinner/> :
                <>
                    <div className="w-screen h-screen items-center flex-col flex">
                        <NavbarLoggedIn page="Organise" user={username}/>
                        {/*<ImageUploader />*/}
                        <Modal title="Proof of Vaccination" visible={isModalVisible} onOk={(e) => {
                            fileUploadHandler(e)
                        }} onCancel={handleCancel} okText="Submit">
                            <div>
                                <div className="box-border h-80 w-full p-1 items-center">
                                    <div {...getRootProps({style})} className="box-border h-80 w-full p-4 items-center">
                                        <input {...getInputProps()} />
                                        {files.length == 0 ? <div className="items-center flex-col flex w-full">
                                            <svg className="w-8 h-8" fill="currentColor"
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 viewBox="0 0 20 20">
                                                <path
                                                    d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"/>
                                            </svg>
                                            <div className="text-center">
                                                Drag and drop your images here.<br/>(Maximum file size: 1MB)
                                            </div>
                                        </div> : <aside>
                                            <h4>Accepted files</h4>
                                            <ul>{acceptedFile}</ul>
                                        </aside>}
                                    </div>
                                </div>
                                <label className="inline-flex items-baseline">
                                    <input type="checkbox" className="form-checkbox" style={{paddingTop: 3}}/>
                                    <span className="text-gray-400 text-xs pl-1 pr-1 pt-3">By clicking submit, I hereby certify
                                    that the
                                    above proof I am about to submit is deemed to be true and correct to the best of my
                                    knowledge
                                    and has not been manipulated or altered. I agree that Locus is not held responsible
                                    or liable
                                    for any impersonation act by me.</span>
                                </label>
                                {/*<button onClick={(e)=>{ props.state(); fileUploadHandler(e)}} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">Submit</button>*/}
                            </div>
                        </Modal>
                        <div className="flex-row flex mt-20">
                            <div className="w-64">
                                <div className="flex-col flex items-center p-5 border justify-self-center">
                                    <img
                                        src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9511dbb5-9be4-4651-be20-99508a7fbd79/de778ut-505703d5-1e7b-4fec-b7e3-6ee8bdcef929.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzk1MTFkYmI1LTliZTQtNDY1MS1iZTIwLTk5NTA4YTdmYmQ3OVwvZGU3Nzh1dC01MDU3MDNkNS0xZTdiLTRmZWMtYjdlMy02ZWU4YmRjZWY5MjkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.gZ2X09i1Edpth71xTOMMqrh7sJOIwXu_HAh7_1JtDa8"
                                        className="rounded-full h-24 w-24 flex items-center justify-center mb-7"
                                        alt=" "/>
                                    <span className="font-bold text-lg mb-2">&#160;&#160;Verification Statuses</span>
                                    <span className="mb-2">{userDetails ? userDetails.vaxStatus ?
                                        <CheckCircleTwoTone twoToneColor="#32BEA6"/> :
                                        <CloseCircleTwoTone twoToneColor="#32BEA6"/> : <LoadingOutlined/>}&#160;&#160;Vaccination Statuses</span>
                                    <span className="mb-2"><LoadingOutlined/>&#160;&#160;Identity Verification</span>
                                    <span
                                        className="mb-2"><LoadingOutlined/>&#160;&#160;Organization Verification</span>
                                </div>
                                <div className="flex-col flex items-center p-5 border justify-self-center">
                                    <div className="w-full border text-center rounded-full py-2" onClick={showModal}>
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


                            <div className="ml-8">
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
                </>
            }
        </>
    );
}
