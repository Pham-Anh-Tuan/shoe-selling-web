import Logo from "../../assets/logo.png";
import { IoMdSearch } from "react-icons/io";
import { FaCaretDown, FaCartShopping } from "react-icons/fa6";
import DarkMode from "./DarkMode";

const Menu = [
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

export const Navbar = () => {
    return (
        <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
            {/* upper bar */}
            <div className="bg-primary/40 py-2">
                <div className="container flex justify-between items-center">
                    <div>
                        <a href="#" className="font-bold 
                    text-xl sm:text-xl flex gap-2 items-center">
                            <img src={Logo} alt="Logo"
                                className="w-12" />
                            KuShoe
                        </a>
                    </div>

                    {/* search bar*/}
                    <div className="flex justify-between items-center gap-4">
                        <div className="relative group hidden sm:block">
                            <input type="text" placeholder="Tìm kiếm"
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
                        absolute top-1/2 -translate-y-1/2 right-3" />
                        </div>

                        {/* cart */}
                        <button
                            onClick={() =>
                                alert("asdsad")
                            }
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

                        {/* Darkmode Switch */}
                        <div>
                            <DarkMode />
                        </div>
                    </div>

                </div>
            </div>


            {/* lower bar */}
            <div className="flex justify-center">
                <ul className="sm:flex hidden items-center gap-4">
                    <div>
                        <a href="#"
                            className="inline-block px-4
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

            </div>
        </div>
    )
}