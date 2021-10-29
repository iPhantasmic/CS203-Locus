import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios'
import { useDropzone } from 'react-dropzone';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import Cookies from 'js-cookie';

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



// End of basic CSS start of component javascript
export default function ImageUploader(props) {
	const [files, setFiles] = useState([]);
	const [preview, setPreview] = React.useState("");

	const onDrop = useCallback(acceptedFiles => {
		setFiles(acceptedFiles.map(file => Object.assign(file, {
			preview: URL.createObjectURL(file)
		})));
	}, []);

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
		accept: 'image/jpeg, image/png, .oa',
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

	const thumbs = files.map(file => (
		<div style={thumb} key={file.name}>
			<div style={thumbInner}>
				<img
					src={file.preview}
					style={img}
				/>
			</div>
		</div>
	));

	useEffect(
		() => () => {
			// Make sure to revoke the data uris to avoid memory leaks
			files.forEach((file) => URL.revokeObjectURL(file.preview));
		},
		[files]
	);

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
				console.log(response.data);
			    toastr.success(response.data, 'Success')
			})
			.catch(function (error) {
			    toastr.options.preventDuplicates = true;
				toastr.error(error.response.data, 'Invalid Image')
			});
	}


	return (
		// <section className="container">
		<div>
			<div className="box-border h-80 w-80 p-4 items-center">
				<div {...getRootProps({ style })} className="box-border h-80 w-80 p-4 items-center">
					<input {...getInputProps()} />

					{files.length == 0 ?<div className="items-center flex-col flex w-full"> <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
						<path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
					</svg><div>
						Drag and drop your images here.
					</div>
							</div>:<aside style={thumbsContainer} >{thumbs}</aside>}
				</div>
			</div>
			<button onClick={(e)=>{ props.state(); fileUploadHandler(e)}} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">Submit</button>
		</div>
		// </section>

	)
}


