import React, { useEffect, useState } from 'react';
import { profileApi } from '../../api-client/api';
const Profile = () => {
    interface Profile {
        email: string;
        fullName: string;
        phoneNumber: string;
        shippingAddress: string;
        gender: number;
        imageName: string;
        imageFile: File | null; // Đây là file ảnh
    }

    const [profile, setProfile] = useState<Profile>({
        email: "",
        fullName: "",
        phoneNumber: "",
        shippingAddress: "",
        gender: 0,
        imageName: "",
        imageFile: null,
    });

    const setFullName = (fullName: string) => {
        setProfile(prev => ({ ...prev, fullName }));
    };

    const setPhoneNumber = (phoneNumber: string) => {
        setProfile(prev => ({ ...prev, phoneNumber }));
    };

    const setShippingAddress = (shippingAddress: string) => {
        setProfile(prev => ({ ...prev, shippingAddress }));
    };

    const setGender = (gender: number) => {
        setProfile(prev => ({ ...prev, gender }));
    };

    const setImageName = (imageName: string) => {
        setProfile(prev => ({ ...prev, imageName }));
    };

    const setImageFile = (file: File | null) => {
        setProfile(prev => ({
            ...prev,
            imageFile: file,
        }));
    };

    const getProfileData = async () => {
        const userEmail = localStorage.getItem('email');
        if (userEmail !== null) {
            const { data } = await profileApi.getByEmail(userEmail);
            setProfile(data);
        }

        setImageUpdated(!imageUpdated);
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImageName(reader.result as string);
            reader.readAsDataURL(file);
            setImageFile(file);
        }
    };

    const [imageUpdated, setImageUpdated] = useState<boolean>(false);

    useEffect(() => {
        getProfileData();
        
    }, []);

    useEffect(() => {
        localStorage.setItem('imageName', profile.imageName);
        window.dispatchEvent(new Event('logUpdated'));
    }, [imageUpdated]);

    const formData = new FormData();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        formData.append("email", profile.email);
        formData.append("fullName", profile.fullName);
        formData.append("phoneNumber", profile.phoneNumber);
        formData.append("shippingAddress", profile.shippingAddress);
        formData.append("gender", profile.gender.toString());

        if (profile.imageFile) {
            formData.append("imageName", profile.imageFile.name);
            formData.append("imageFile", profile.imageFile);
        }

        try {
            const response = await profileApi.updateProfile(formData);
            console.log("Product saved:", response.data);
        } catch (error) {
            console.error("Error saving product:", error);
        }

        window.location.reload();
    }

    return (
        <div className='flex-1 border px-9 py-4'>
            <div className='border-b'>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">HỒ SƠ CỦA TÔI</h2>
                <h4 className="mb-4">Quản lý thông tin hồ sơ để bảo mật tài khoản</h4>
            </div>
            <div className='flex flex-col-reverse lg:flex-row gap-10 mt-8 '>
                {/* Profile Form */}
                <form className='w-full lg:w-3/4 lg:pr-10 lg:border-r' onSubmit={handleSubmit}>
                    <div className="mb-6 flex items-center gap-4">
                        <label htmlFor="email" className="text-base font-medium text-gray-900 dark:text-white w-32">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-gray-300 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            defaultValue={profile?.email}
                            disabled
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
                            value={profile.fullName}
                            onChange={(e) => setFullName(e.target.value)}
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
                            value={profile.phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
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
                            value={profile.shippingAddress}
                            onChange={(e) => setShippingAddress(e.target.value)}
                            className="bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-gray-300 w-full h-[40px] px-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            required
                        />
                    </div>

                    <div className="mb-6 flex items-center gap-4">
                        <label className="text-base font-medium text-gray-900 dark:text-white w-32">Giới Tính</label>
                        <div className="flex gap-4 w-full dark:text-red-500">
                            <label><input type="radio" name="gender" value={1} checked={profile.gender === 1} onChange={() => setGender(1)} required /> Nam</label>
                            <label><input type="radio" name="gender" value={2} checked={profile.gender === 2} onChange={() => setGender(2)} required /> Nữ</label>
                            <label><input type="radio" name="gender" value={3} checked={profile.gender === 3} onChange={() => setGender(3)} required /> Khác</label>
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
                            <img
                                // src={
                                //     typeof profile.imageName === 'string'
                                //         ? profile.imageName.startsWith('data:image') || profile.imageName.startsWith('blob:')
                                //             ? profile.imageName // ảnh mới upload
                                //             : import.meta.env.VITE_API_URL_AVATAR_IMG + profile.imageName // ảnh từ server
                                //         : '/path/to/default-image.jpg'
                                // }

                                src={
                                    typeof profile.imageName === 'string'
                                      ? profile.imageName.startsWith('data:image') ||
                                        profile.imageName.startsWith('blob:') ||
                                        profile.imageName.startsWith('https')
                                        ? profile.imageName
                                        : import.meta.env.VITE_API_URL_AVATAR_IMG + profile.imageName
                                      : '/path/to/default-image.jpg'
                                  }
                                alt="Profile" className="w-max h-max object-cover" />
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