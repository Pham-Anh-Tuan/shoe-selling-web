import Logo from "../../assets/logo.png";
import { IoMdSearch } from "react-icons/io";
import { FaCaretDown, FaCartShopping, FaUser } from "react-icons/fa6";
import DarkMode from "./DarkMode";
import { useState } from "react";
import ResponsiveMenu from "./ResponsiveMenu";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import { Link } from "react-router-dom";

export const Menu = [
    {
        id: 2,
        name: "GIÀY NAM",
        link: "/#services",
        cate: [{
            id: 1,
            name: "GIÀY THỂ THAO NAM",
            link: "/#",
        }, {
            id: 2,
            name: "SANDAL NAM",
            link: "/#",
        }]
    },
    {
        id: 3,
        name: "GIÀY NỮ",
        link: "/#",
        cate: [{
            id: 1,
            name: "GIÀY CAO GÓT",
            link: "/#",
        }, {
            id: 2,
            name: "GIÀY THỂ THAO NỮ",
            link: "/#",
        }]
    },
    {
        id: 4,
        name: "PHỤ KIỆN",
        link: "/#",
        cate: [{
            id: 1,
            name: "VỚ",
            link: "/#",
        }, {
            id: 2,
            name: "DÂY GIÀY",
            link: "/#",
        }]
    },
];

interface NavbarProps {
    handleSignInPopup: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ handleSignInPopup }) => {

    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
            {/* upper bar */}
            <div className="bg-primary/40 py-2">
                <div className="container flex justify-between items-center">
                    <div>
                        <Link to="">
                            <a href="#" className="font-bold 
                    text-xl sm:text-xl flex gap-2 items-center">
                                <img src={Logo} alt="Logo"
                                    className="w-12" />
                                KuShoe
                            </a>
                        </Link>
                    </div>

                    {/* search bar*/}
                    <div className="flex justify-between items-center gap-4">
                        <div className="relative group hidden sm:block">
                            {/* <input type="text" placeholder="Tìm kiếm"
                                className="w-[200px] sm:w-[200px] 
                        group-hover:w-[300px] transition-all
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
                        absolute top-1/2 -translate-y-1/2 right-3" /> */}
                            <form className="flex items-center max-w-sm mx-auto">
                                <label htmlFor="simple-search" className="sr-only">Search</label>
                                <div className="relative w-full">
                                    <input type="text" id="simple-search" className="w-[160px] md:w-[200px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block h-8" placeholder="Tên sản phẩm..." required />
                                </div>
                                <button type="submit" className="bg-gradient-to-r from-primary to-secondary rounded-md px-2 py-0 ms-2 text-sm font-medium text-white h-8">
                                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                    <span className="sr-only">Search</span>
                                </button>
                            </form>
                        </div>

                        {/* cart */}
                        <Link to="/Cart">
                            <button
                                className="bg-gradient-to-r from-primary to-secondary
                    transition-all duration-200 text-white py-1 px-4 rounded-full
                    flex items-center gap-3 group"
                            >
                                <span
                                    className="group-hover:block hidden transition-all duration-200">
                                    Giỏ hàng
                                </span>
                                <FaCartShopping
                                    className="text-xl text-white drop-shadow-sm cursor-pointer" />
                            </button>
                        </Link>
                        {/* Darkmode Switch */}
                        <div>
                            <DarkMode />
                        </div>

                        <div className="group relative cursor-pointer">
                            <button onClick={() => handleSignInPopup()}
                                className="bg-gradient-to-r from-primary to-secondary
                     text-white py-1 px-2 rounded-full
                    flex items-center gap-2 group">
                                <FaUser className="text-xl text-white drop-shadow-sm cursor-pointer" />
                                <span>
                                    <FaCaretDown
                                        className="transition-all
                                duration-200
                                group-hover:rotate-180"/>
                                </span>
                            </button>

                            <div className="absolute z-[9999] hidden
                        group-hover:block w-[200px] rounded-md
                        bg-white p-2 text-black shadow-md right-0">
                                <ul>
                                    <Link to="/Orders">
                                        <li>
                                            <a href="#"
                                                className="inline-block w-full rounded-md p-2
                                        hover:bg-primary/20">
                                                Đơn hàng của tôi
                                            </a>
                                        </li>
                                    </Link>
                                    <form action="#" method="POST">
                                        <li>
                                            <a href="#"
                                                className="inline-block w-full rounded-md p-2
                                        hover:bg-primary/20">
                                                Đăng xuất
                                            </a>
                                        </li>
                                    </form>

                                </ul>
                            </div>
                        </div>


                        {/* Mobile view  */}
                        {showMenu ? (
                            <HiMenuAlt1
                                onClick={toggleMenu}
                                className=" cursor-pointer transition-all sm:hidden"
                                size={30}
                            />
                        ) : (
                            <HiMenuAlt3
                                onClick={toggleMenu}
                                className="cursor-pointer transition-all sm:hidden"
                                size={30}
                            />
                        )}

                        {/* responsive menu */}
                        <ResponsiveMenu showMenu={showMenu} toggleMenu={toggleMenu} />
                    </div>

                </div>
            </div>


            {/* lower bar */}
            <div className="flex justify-center">
                <ul className="sm:flex hidden items-center gap-4">
                    <Link to="">
                        <div>
                            <a href="#"
                                className="inline-block px-4
                                hover:text-primary font-medium"
                            >
                                TRANG CHỦ
                            </a>
                        </div>
                    </ Link>

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
            </div>
        </div>
    )
}