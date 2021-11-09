import {Dropdown, Menu} from "antd";
import {useRouter} from "next/router";
import {DownOutlined} from "@ant-design/icons";

export default function AdminNavbar(props) {
    const router = useRouter();
    const menu = (
        <Menu className="divide-y">
            <div>
                <Menu.Item>
                    <div className="m-1 mr-10" onClick={() => router.push('#')}>
                        English (SG)
                    </div>
                </Menu.Item>
                <Menu.Item>
                    <div onClick={() => router.push('/')} className=" m-1 mr-10 text-red-500 font-bold">
                        Logout
                    </div>
                </Menu.Item>
            </div>
        </Menu>
    );

    return (
        <div className="bg-white h-20 w-full px-7 flex flex-row items-center justify-between">
            <img src="/red_logo.png" width={150} height="auto"/>
            <div className="flex-row flex h-full items-center">
            </div>
            <div>
                <img style={{display: "-webkit-inline-box"}} src={"https://i.pravatar.cc/150?u=" + props.userID + "2"}
                      className="rounded-full h-8 w-8 flex items-center justify-center mr-2" alt=" "/>
                <Dropdown overlay={menu} size="large">
                    <a
                        className="ant-dropdown-link text-red-600 w-96 hover:text-red-700"
                        onClick={(e) => e.preventDefault()}
                    >{props.user} <DownOutlined/>
                    </a>
                </Dropdown>
            </div>
        </div>
    );
}
