import AdNavbar from "../AdNavbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
        <AdNavbar />
        <Outlet /> {/* Dùng để render nội dung của từng Route */}
    </div>
  )
}

export default AdminLayout;