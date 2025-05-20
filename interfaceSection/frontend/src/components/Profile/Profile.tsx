import React, { useState } from 'react';
const Profile = () => {
    const [profileImage, setProfileImage] = useState<string | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setProfileImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };
    return (
        <div className='flex-1 border px-9 py-4'>
            <div className='border-b'>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">HỒ SƠ CỦA TÔI</h2>
                <h4 className="mb-4">Quản lý thông tin hồ sơ để bảo mật tài khoản</h4>
            </div>
            <div className='flex flex-col-reverse lg:flex-row gap-10 mt-8 '>
                {/* Profile Form */}
                <form className='w-full lg:w-3/4 lg:pr-10 lg:border-r'>
                    <div className="mb-6 flex items-center gap-4">
                        <label htmlFor="email" className="text-base font-medium text-gray-900 dark:text-white w-32">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-gray-300 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder=""
                            required
                        />
                    </div>

                    <div className="mb-6 flex items-center gap-4">
                        <label htmlFor="name" className="text-base font-medium text-gray-900 dark:text-white w-32">
                            Họ và tên
                        </label>
                        <input
                            type="name"
                            name="name"
                            id="name"
                            className="bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-gray-300 w-full h-[40px] px-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder=""
                            required
                        />
                    </div>

                    <div className="mb-6 flex items-center gap-4">
                        <label htmlFor="tel" className="text-base font-medium text-gray-900 dark:text-white w-32">
                            Số điện thoại
                        </label>
                        <input
                            type="tel"
                            name="tel"
                            id="tel"
                            placeholder=""
                            className="bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-gray-300 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            required
                        />
                    </div>

                    <div className="mb-6 flex items-center gap-4">
                        <label htmlFor="address" className="text-base font-medium text-gray-900 dark:text-white w-32">
                            Địa chỉ nhận hàng
                        </label>
                        <input
                            type="address"
                            name="address"
                            id="address"
                            placeholder=""
                            className="bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-gray-300 w-full h-[40px] px-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            required
                        />
                    </div>

                    <div className="mb-6 flex items-center gap-4">
                        <label className="text-base font-medium text-gray-900 dark:text-white w-32">Giới Tính</label>
                        <div className="flex gap-4 w-full">
                            <label><input type="radio" name="gender" value="Nam" required /> Nam</label>
                            <label><input type="radio" name="gender" value="Nữ" required /> Nữ</label>
                            <label><input type="radio" name="gender" value="Khác" required /> Khác</label>
                        </div>
                    </div>
                    <div className="mb-6 flex items-center gap-4">
                        <span className="w-32"></span>
                        <div className='w-full'>
                            <button type="submit"
                                className="text-white bg-orange-400 hover:bg-orange-500 font-medium rounded-sm text-sm px-5 py-2.5 text-center dark:bg-orange-400 dark:hover:bg-orange-500">Lưu</button>
                        </div>
                    </div>
                </form>

                <div className="flex flex-col items-center gap-3">
                    <label className="block mb-2 font-semibold">Ảnh Đại Diện</label>
                    <div className="flex items-center gap-4">
                        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                            {profileImage ? <img src={profileImage} alt="Profile" className="w-max h-max object-cover" /> : <div className="flex justify-center items-center h-full text-gray-500">MWC</div>}
                        </div>

                    </div>
                    <div className="mt-4">
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="profileImage" />
                        <label htmlFor="profileImage" className="cursor-pointer  py-2 px-4 border border-gray-300">Chọn Ảnh</label>
                    </div>
                    <p className="text-gray-500 text-sm mt-2">Dung lượng file tối đa 1 MB<br />Định dạng: JPEG, .PNG</p>
                </div>
            </div>
        </div>
    )
}

export default Profile;