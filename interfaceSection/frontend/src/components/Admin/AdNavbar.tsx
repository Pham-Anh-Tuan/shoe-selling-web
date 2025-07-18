import Logo from "../../assets/logo.png";
import { AiFillDashboard, AiFillProduct } from "react-icons/ai";
import { FaSignOutAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { HiMenu, HiMenuAlt2 } from "react-icons/hi";
import { IoDocumentText } from "react-icons/io5";
import { PiSlideshowFill } from "react-icons/pi";
import DarkMode from "../Navbar/DarkMode";

const AdNavbar = () => {
  const [showMenu, setShowMenu] = useState(window.innerWidth <= 900);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const [imageName, setImageName] = useState<string>("userLogo192192adeal.png");

  const updateImageName = () => {
    const userLogo = localStorage.getItem('imageName');
    if (userLogo !== null) {
      setImageName(userLogo);
    }
  };

  useEffect(() => {
    updateImageName();

    const handleResize = () => {
      if (window.innerWidth > 900) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };

    // Lắng nghe sự kiện resize
    window.addEventListener("resize", handleResize);

    // Gọi 1 lần khi component mount để set đúng ban đầu
    handleResize();

    // Clear event khi component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    // Xóa token khỏi localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('imageName');
    localStorage.removeItem('email');
    localStorage.removeItem('role');

    window.location.href = '/';
  };

  return (
    <div className="flex h-screen">
      <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 z-40 fixed w-full">
        {/* upper bar */}
        <div className="bg-primary/40 py-2">
          <div className="flex justify-between items-center px-4">
            <div className="flex items-center gap-4">
              {showMenu ? (
                <HiMenuAlt2
                  onClick={toggleMenu}
                  className="cursor-pointer transition-all"
                  size={30}
                />
              ) : (
                <HiMenu
                  onClick={toggleMenu}
                  className="cursor-pointer transition-all"
                  size={30}
                />
              )}

              <a href="/" className="font-bold 
                    text-xl sm:text-xl flex gap-2 items-center">
                <img src={Logo} alt="Logo"
                  className="w-12" />
                KuShoe
              </a>

            </div>

            {/* search bar*/}
            <div className="flex justify-between items-center gap-4">
              {/* <div className="relative group hidden sm:block">
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
              </div> */}

              {/* Darkmode Switch */}
              <div>
                <DarkMode />
              </div>
              <div className="group relative cursor-pointer size-9">
                <a href="/profile"
                  className="flex items-center">
                  <img alt="" src={import.meta.env.VITE_API_URL_AVATAR_IMG + imageName} className="size-9 rounded-full object-cover object-center bg-gray-200" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {!showMenu && (
        <div className="sticky top-0 block w-64 h-screen">
          <div className="w-64 h-screen">
            <div className="h-screen px-3 py-4 overflow-y-auto bg-[#ffdda9] dark:bg-gray-800">
              <ul className="space-y-2 font-medium">
                <li>
                  <div className="flex items-center gap-4 p-2">
                  </div>
                </li>
                <li>
                  <a href="/admin" className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-black hover:bg-gray-100 dark:hover:bg-gray-700 group mt-10 ${location.pathname === '/admin' ? 'bg-white' : 'dark:text-white'}`}>
                    <AiFillDashboard className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    <span className="ms-3">Tổng quan</span>
                  </a>
                </li>
                <li>
                  <a href="/admin/productList" className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-black hover:bg-gray-100 dark:hover:bg-gray-700 group ${location.pathname === '/admin/productList' ? 'bg-white' : 'dark:text-white'}`}>
                    <AiFillProduct className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    <span className="flex-1 ms-3 whitespace-nowrap">Sản phẩm</span>
                  </a>
                </li>
                <li>
                  <a href="/admin/orderList" className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-black hover:bg-gray-100 dark:hover:bg-gray-700 group ${location.pathname === '/admin/orderList' ? 'bg-white' : 'dark:text-white'}`}>
                    <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                      <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">Đơn hàng</span>
                  </a>
                </li>
                {localStorage.getItem("role") === "1" && (
                  <li>
                    <a href="/admin/accountList" className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-black hover:bg-gray-100 dark:hover:bg-gray-700 group ${location.pathname === '/admin/accountList' ? 'bg-white' : 'dark:text-white'}`}>
                      <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                      </svg>
                      <span className="flex-1 ms-3 whitespace-nowrap">Tài khoản</span>
                    </a>
                  </li>
                )}

                <li>
                  <a href="/admin/blogList" className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-black hover:bg-gray-100 dark:hover:bg-gray-700 group ${location.pathname === '/admin/blogList' ? 'bg-white' : 'dark:text-white'}`}>
                    <IoDocumentText className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    <span className="flex-1 ms-3 whitespace-nowrap">Bài viết</span>
                  </a>
                </li>

                <li>
                  <a href="/admin/bannerList" className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-black hover:bg-gray-100 dark:hover:bg-gray-700 group ${location.pathname === '/admin/bannerList' ? 'bg-white' : 'dark:text-white'}`}>
                    <PiSlideshowFill className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    <span className="flex-1 ms-3 whitespace-nowrap">Banner</span>
                  </a>
                </li>

                <li>
                  <button
                    onClick={() => handleLogout()}
                    className="w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-black hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <FaSignOutAlt className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    <span className="ms-3 whitespace-nowrap dark:text-white">Đăng xuất</span>
                  </button>
                </li>

              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdNavbar;