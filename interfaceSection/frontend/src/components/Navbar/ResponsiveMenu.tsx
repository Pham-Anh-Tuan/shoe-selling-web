import React, { useState } from "react";
import { Menu } from "./Navbar";
import { FaCaretDown } from "react-icons/fa6";
import Logo from "../../assets/logo.png";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface ResponsiveMenuProps {
    showMenu: boolean;
    toggleMenu: () => void;
}

const ResponsiveMenu: React.FC<ResponsiveMenuProps> = ({ showMenu, toggleMenu }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/products?keyword=${encodeURIComponent(searchTerm.trim())}`);
        }
    };
    return (
        <div
            className={`${showMenu ? "left-0" : "-left-[100%]"
                } fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-start bg-white dark:bg-gray-900 dark:text-white px-8 pb-6 pt-6 text-black transition-all duration-200 rounded-r-xl shadow-md`}
        >
            <div className="card">
                {/* <div className="flex items-center justify-start gap-3">
                    <FaUserCircle size={50} />
                    <div>
                        <h1>Hello User</h1>
                        <h1 className="text-sm text-slate-500">Premium user</h1>
                    </div>
                </div> */}
                <div className="mb-3 flex items-center justify-end">
                    <IoCloseOutline
                        className="text-2xl cursor-pointer hover:text-primary"
                        onClick={() => toggleMenu()}
                    />
                </div>

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
                        {/* Simple Dropdown and Links*/}
                        {/* {Menu.map((data) => (
                            <li key={data.id} className="group relative cursor-pointer">
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
                                    bg-white p-2 text-black shadow-md dark:bg-gray-900 dark:text-white">
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
                        ))} */}

                        {Menu.map((data) => (
                            <li key={data.id} className="group relative cursor-pointer">
                                <a href={data.link}
                                    className="flex items-center
                        gap-[2px] py-2 font-medium hover:text-primary">
                                    {data.name}
                                    {data.cate.length > 0 && (
                                        <span>
                                            <FaCaretDown
                                                className="transition-all
                                duration-200
                                group-hover:rotate-180"/>
                                        </span>
                                    )}
                                </a>
                                {data.cate.length > 0 && (
                                    <div className="absolute z-[9999] hidden
                        group-hover:block w-[200px]
                        bg-white p-2 text-black shadow-md dark:bg-gray-900 dark:text-white">
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
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <div className="relative group sm:block mt-8">
                <form className="flex items-center max-w-sm mx-auto" onSubmit={handleSearch}>
                    <label htmlFor="simple-search2" className="sr-only">Search</label>
                    <div className="relative w-full">
                        <input value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            type="text" id="simple-search2" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary focus:border-primary block w-full p-2" placeholder="Tên sản phẩm..." required />
                    </div>
                    <button type="submit" className="bg-gradient-to-r from-primary to-secondary rounded-md p-2.5 ms-2 text-sm font-medium text-white">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                </form>
            </div>
        </div>

    );
};

export default ResponsiveMenu;