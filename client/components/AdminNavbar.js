import { useState, useEffect } from "react";
import { Header } from "antd/lib/layout/layout";
import logo from '../public/logo.png'


export default function AdminNavbar(props) {
    return (
        <div className="h-16 w-full px-7 bg-black flex flex-row items-center justify-between">
            <img src="/locus_new_logo_white.png" height={80} width={110} />
            <div className="flex-row flex h-full items-center">
            </div>
            <div>
                {props.user === ""? <span className="text-white">Sign in</span>: <span className="text-white">{props.user}</span>}
            </div>
        </div>
    );
}
