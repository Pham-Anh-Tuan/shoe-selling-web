import { Outlet } from "react-router-dom";
import { ProfileMenu } from "../components/Profile/ProfileMenu";

const ProfileLayout = () => {
    return (
        <div className="py-10 dark:bg-gray-950">
            <div className="container max-md:max-w-xl mx-auto">
                <div className="flex flex-col md:flex-row gap-8 ">
                    <ProfileMenu />
                    <Outlet /> {/* Dùng để render nội dung của từng Route */}
                </div>
            </div>
        </div>
    )
}

export default ProfileLayout;