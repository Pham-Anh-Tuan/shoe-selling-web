import { useState } from "react";
import { FaTachometerAlt, FaBox, FaShoppingCart, FaUsers } from "react-icons/fa";

interface SidebarProps {
    setActivePage: (page: string) => void;
}

const Sidebar : React.FC<SidebarProps> = ({ setActivePage }) => {
    return (
        <div className="w-64 h-screen bg-gray-800 text-white p-4 space-y-4 fixed">
            <h2 className="text-xl font-bold text-center mb-6">Admin Dashboard</h2>
            <ul className="space-y-2">
                <li className="p-2 hover:bg-gray-700 rounded cursor-pointer" onClick={() => setActivePage("dashboard")}>
                    <FaTachometerAlt className="inline mr-2" /> Dashboard
                </li>
                <li className="p-2 hover:bg-gray-700 rounded cursor-pointer" onClick={() => setActivePage("products")}>
                    <FaBox className="inline mr-2" /> Quản lý sản phẩm
                </li>
                <li className="p-2 hover:bg-gray-700 rounded cursor-pointer" onClick={() => setActivePage("orders")}>
                    <FaShoppingCart className="inline mr-2" /> Quản lý đơn hàng
                </li>
                <li className="p-2 hover:bg-gray-700 rounded cursor-pointer" onClick={() => setActivePage("users")}>
                    <FaUsers className="inline mr-2" /> Quản lý người dùng
                </li>
            </ul>
        </div>
    );
};

// Header Bar
const Header = () => {
    return (
        <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Admin Panel</h2>
            <button className="bg-red-600 px-4 py-2 rounded hover:bg-red-700">Đăng xuất</button>
        </div>
    );
};

// Product Management Page
const ProductManagement = () => {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Quản lý sản phẩm</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                + Thêm sản phẩm
            </button>
            {/* Danh sách sản phẩm (chỉ là mẫu) */}
            <div className="mt-4 bg-white p-4 rounded shadow">
                <p>Danh sách sản phẩm sẽ hiển thị ở đây...</p>
            </div>
        </div>
    );
};

// Order Management Page
const OrderManagement = () => {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Quản lý đơn hàng</h2>
            <div className="mt-4 bg-white p-4 rounded shadow">
                <p>Danh sách đơn hàng sẽ hiển thị ở đây...</p>
            </div>
        </div>
    );
};

// User Management Page
const UserManagement = () => {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Quản lý người dùng</h2>
            <div className="mt-4 bg-white p-4 rounded shadow">
                <p>Danh sách người dùng sẽ hiển thị ở đây...</p>
            </div>
        </div>
    );
};

// Admin Dashboard Layout
const AdminDashboard = () => {
    const [activePage, setActivePage] = useState("dashboard");

    return (
        <div className="flex">
            <Sidebar setActivePage={setActivePage} />
            <div className="ml-64 w-full">
                <Header />
                <div className="p-6 bg-gray-100 min-h-screen">
                    {activePage === "dashboard" && <h2 className="text-2xl font-semibold">Chào mừng đến Admin Dashboard!</h2>}
                    {activePage === "products" && <ProductManagement />}
                    {activePage === "orders" && <OrderManagement />}
                    {activePage === "users" && <UserManagement />}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
