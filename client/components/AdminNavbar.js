import { useState, useEffect } from "react";
import { Header } from "antd/lib/layout/layout";
import logo from '../public/logo.png'



export default function AdminNavbar(props) {
    return (
        <div className="shadow-md bg-black h-20 w-full px-7 flex flex-row items-center justify-between">
            <img src="/locus_new_logo_white.png" width={150} height="auto" />
            <div className="flex-row flex h-full items-center">
            </div>
            <div>
                {props.user === ""? <span className="text-white">Sign in</span>: <span className="text-white">{props.user}</span>}
            </div>
        </div>
    );
}
