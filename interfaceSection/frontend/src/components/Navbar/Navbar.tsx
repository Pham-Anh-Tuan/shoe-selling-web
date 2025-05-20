import Logo from "../../assets/logo.png";
import { IoMdSearch } from "react-icons/io";
import { FaCaretDown, FaCartShopping, FaUser } from "react-icons/fa6";
import DarkMode from "./DarkMode";
import { useEffect, useState } from "react";
import ResponsiveMenu from "./ResponsiveMenu";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import { Link } from "react-router-dom";
import { alertSuccess } from "../Shared/AlertSuccess";

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

    const [cartLength, setCartLength] = useState(0);

    // Hàm cập nhật số lượng giỏ hàng
    const updateCartLength = () => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            try {
                const cart = JSON.parse(storedCart) || [];
                setCartLength(cart.length);
            } catch (error) {
                setCartLength(0);
            }
        }
    };

    // Lắng nghe sự thay đổi khi component mount
    useEffect(() => {
        updateCartLength();

        // Tạo một sự kiện tuỳ chỉnh khi cart thay đổi
        const handleStorageChange = () => {
            updateCartLength();
        };

        window.addEventListener('cartUpdated', handleStorageChange);

        return () => {
            window.removeEventListener('cartUpdated', handleStorageChange);
        };
    }, []);



    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const updateLogStatus = () => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!token);
    };

    const [imageName, setImageName] = useState<string>("userLogo192192adeal.png");

    const updateImageName = () => {
        const userLogo = localStorage.getItem('imageName');
        if (userLogo !== null) {
            setImageName(userLogo);
        }
    };

    useEffect(() => {
        updateLogStatus();

        updateImageName();

        // Tạo một sự kiện tuỳ chỉnh khi đăng nhập và đăng xuất
        const handleLogChange = () => {
            updateLogStatus();
            updateImageName();
        };

        window.addEventListener('logUpdated', handleLogChange);

        return () => {
            window.removeEventListener('logUpdated', handleLogChange);
        };
    }, []);

    return (
        <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
            {/* upper bar */}
            <div className="bg-primary/40 py-2">
                <div className="container flex justify-between items-center">
                    <div>
                        <Link to="">
                            <div className="font-bold 
                    text-xl sm:text-xl flex gap-2 items-center">
                                <img src={Logo} alt="Logo"
                                    className="w-12" />
                                KuShoe
                            </div>
                        </ Link>
                    </div>

                    {/* search bar*/}
                    <div className="flex justify-between items-center gap-2 sm:gap-4">
                        <div className="relative group hidden sm:block">
                            <form className="flex items-center max-w-sm mx-auto">
                                <label htmlFor="simple-search1" className="sr-only">Search</label>
                                <div className="relative w-full">
                                    <input type="text" id="simple-search1" className="w-[160px] md:w-[200px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block h-8" placeholder="Tên sản phẩm..." required />
                                </div>
                                <button type="submit" className="bg-gradient-to-r from-primary to-secondary rounded-md px-2 py-0 ms-2 text-sm font-medium text-white h-8">
                                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                    <span className="sr-only">Search</span>
                                </button>
                            </form>
                        </div>

                        {/* cart */}
                        <Link to="/Cart">
                            <button
                                className="bg-gradient-to-r from-primary to-secondary
                    transition-all duration-200 text-white py-1 px-3 rounded-full
                    flex items-center gap-3 group"
                            >
                                {/* <span
                                    className="group-hover:block hidden transition-all duration-200">
                                    Giỏ hàng
                                </span> */}
                                <FaCartShopping
                                    className="text-xl text-white drop-shadow-sm cursor-pointer" />
                                <>
                                    {cartLength > 0 && (
                                        <span className="absolute mb-5 ml-6 bg-white text-secondary text-xs px-1 min-h-3 flex items-center justify-center rounded-full shadow">
                                            {cartLength}
                                        </span>
                                    )}
                                </>

                            </button>
                        </Link>
                        {/* Darkmode Switch */}
                        <div>
                            <DarkMode />
                        </div>

                        {isLoggedIn ? (
                            <div className="group relative cursor-pointer">
                                <button onClick={() => handleSignInPopup()}
                                    className="bg-gradient-to-r from-primary to-secondary
                     text-white py-1 px-2 rounded-full
                    flex items-center group">
                                    <FaUser className="text-xl text-white drop-shadow-sm cursor-pointer" />
                                </button>
                            </div>
                        ) : (
                            <div className="group relative cursor-pointer">
                                <a href="/profile"
                                    className="flex items-center">
                                    <img alt="" src={import.meta.env.VITE_API_URL_IMG + imageName} className="size-9 rounded-full" />
                                </a>
                            </div>
                        )}

                        {/* Mobile view  */}
                        {showMenu ? (
                            <HiMenuAlt1
                                onClick={toggleMenu}
                                className="cursor-pointer transition-all sm:hidden"
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

                    <div>
                        <Link to="">
                            <div
                                className="inline-block px-4
                                hover:text-primary font-medium"
                            >
                                TRANG CHỦ
                            </div>
                        </Link>
                    </div>


                    {/* Simple Dropdown and Links*/}
                    {Menu.map((data) => (
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

                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}