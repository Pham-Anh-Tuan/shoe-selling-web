import { LuClipboardList } from "react-icons/lu";
import { MdFavoriteBorder } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { LuChartColumnIncreasing } from "react-icons/lu";
export const ProfileMenu = () => {
    const handleLogout = () => {
        // Xóa token khỏi localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('imageName');
        localStorage.removeItem('email');

        window.location.href = '/';
    };
    return (
        <div className="w-[180px]">
            <ul className="space-y-4">
                <li>
                    <div className='flex items-center'>
                        <FaRegUser className='text-blue-500 text-xl' />
                        <span className='ms-2'>Tài Khoản Của Tôi</span>
                    </div>
                </li>

                <ul className="ml-4 space-y-3">
                    {/* ${location.pathname === '/Admin' ? 'bg-white' : 'dark:text-white'} */}
                    <li className={`${location.pathname.toLowerCase() === '/profile' ? 'text-red-600' : ''}`}>
                        <a href="profile"> Hồ Sơ </a>
                    </li>
                    <li className={`${location.pathname.toLowerCase() === '/password' ? 'text-red-600' : ''}`}>
                        <a href="password"> Đổi Mật Khẩu </a>
                    </li>
                </ul>

                <li>
                    <a href="orders" className='flex items-center'>
                        <LuClipboardList className='text-yellow-500 text-xl' />
                        <span className={`ms-2 ${location.pathname.toLowerCase() === '/orders' ? 'text-red-600' : ''}`}>Đơn Hàng</span>
                    </a>
                </li>
                <li>
                    <a href="product-favorite" className='flex items-center'>
                        <MdFavoriteBorder className='text-red-500 text-xl' />
                        <span className={`ms-2 ${location.pathname.toLowerCase() === '/product-favorite' ? 'text-red-600' : ''}`}>Sản Phẩm Yêu Thích</span>
                    </a>
                </li>
                <li>
                    <a href="Admin" className='flex items-center'>
                        <LuChartColumnIncreasing className='text-green-500 text-xl' />
                        <span className="ms-2">Trình Quản Lý</span>
                    </a>
                </li>
                <li>
                    <button onClick={() => handleLogout()} className='flex items-center'>
                        <IoMdLogOut className='text-xl text-red-600' />
                        <span className='ms-2'>Đăng Xuất</span>
                    </button>
                </li>
            </ul>
        </div >
    )
}
