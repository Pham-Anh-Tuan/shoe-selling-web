import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { Menu } from "./Navbar";
import { FaCaretDown } from "react-icons/fa6";
import Logo from "../../assets/logo.png";

interface ResponsiveMenuProps {
    showMenu: boolean;
}

const ResponsiveMenu: React.FC<ResponsiveMenuProps> = ({ showMenu }) => {
    console.log("showMenu", showMenu);
    return (
        <div
            className={`${showMenu ? "left-0" : "-left-[100%] block"
                } fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white dark:bg-gray-900 dark:text-white px-8 pb-6 pt-16 text-black transition-all duration-200 rounded-r-xl shadow-md`}
        >
            <div className="card">
                {/* <div className="flex items-center justify-start gap-3">
                    <FaUserCircle size={50} />
                    <div>
                        <h1>Hello User</h1>
                        <h1 className="text-sm text-slate-500">Premium user</h1>
                    </div>
                </div> */}

                <div>
                    <a href="#" className="font-bold 
                                    text-xl sm:text-xl flex gap-2 items-center">
                        <img src={Logo} alt="Logo"
                            className="w-12" />
                        KuShoe
                    </a>
                </div>
                <nav className="mt-12">
                    <ul className="space-y-4 text-xl">
                        <div>
                            <a href="#"
                                className="inline-block
                                            hover:text-primary font-medium"
                            >
                                TRANG CHỦ
                            </a>
                        </div>

                        {/* Simple Dropdown and Links*/}
                        {Menu.map((data) => (
                            <li className="group relative cursor-pointer">
                                <a href="#"
                                    className="flex items-center
                                    gap-[2px] py-2 font-medium">
                                    {data.name}
                                    <span>
                                        <FaCaretDown
                                            className="transition-all
                                            duration-200
                                            group-hover:rotate-180"/>
                                    </span>
                                </a>
                                <div className="absolute z-[9999] hidden
                                    group-hover:block w-[200px] rounded-md
                                    bg-white p-2 text-black shadow-md">
                                    <ul>
                                        {data.cate.map((cateData) => (
                                            <li key={cateData.id}>
                                                <a href={cateData.link}
                                                    className="inline-block w-full rounded-md p-2
                                                    hover:bg-primary/20">
                                                    {cateData.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <div className="relative group sm:block">
                <input type="text" placeholder="Tìm kiếm"
                    className="w-[200px] sm:w-[200px] 
                                     transition-all
                                        duration-300 rounded-full
                                        border
                                       border-gray-300 px-2 py-1
                                        focus:outline-none 
                                        focus:border-1
                                        focus:border-primary
                                        dark:border-gray-500
                                        dark:bg-gray-800"
                />
                <IoMdSearch
                    className="text-gray-500 group-hover:text-primary 
                                        absolute top-1/2 -translate-y-1/2 right-3" />
            </div>
        </div>

    );
};

export default ResponsiveMenu;