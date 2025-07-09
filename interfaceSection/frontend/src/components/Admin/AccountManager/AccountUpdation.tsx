import { useEffect, useState } from "react";
import { accountApi } from "../../../api-client/api";
import { alertError } from "../../Shared/AlertError";
import { ToastContainer } from "react-toastify";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";

interface AccountUpdationProps {
    updateId: string;
    toggleUpdate: () => void;
}

export const AccountUpdation: React.FC<AccountUpdationProps> = ({ updateId, toggleUpdate }) => {
    interface Account {
        email: string;
        fullName: string;
        password: string;
        imageName: string;
        imageFile: File | null; // Đây là file ảnh
        phoneNumber: string;
        shippingAddress: string;
        gender: number;
        role: number;
        status: number;
        emailUpdate: string;
    }

    const [account, setAccount] = useState<Account>({
        email: "",
        fullName: "",
        password: "",
        imageName: "",
        imageFile: null,
        phoneNumber: "",
        shippingAddress: "",
        gender: 0,
        role: 0,
        status: 0,
        emailUpdate: ""
    });

    const loadAccount = async () => {
        try {
            const { data } = await accountApi.getAccountDetail(updateId);
            setAccount(data);
            setPassword("");
        } catch (error) {
            console.error("Lỗi khi gọi API sản phẩm:", error);
        }
    };

    useEffect(() => {
        if (!updateId) return;
        loadAccount();
    }, [updateId]);

    const setId = (id: string) => {
        setAccount((prev) => ({ ...prev, id }));
    };

    const setEmail = (email: string) => {
        setAccount((prev) => ({ ...prev, email }));
    };

    const setFullName = (fullName: string) => {
        setAccount((prev) => ({ ...prev, fullName }));
    };

    const setPassword = (password: string) => {
        // Xóa hết khoảng trắng
        const trimmedPassword = password.replace(/\s/g, "");
        setAccount((prev) => ({ ...prev, password: trimmedPassword }));
    };

    const setImageName = (imageName: string) => {
        setAccount((prev) => ({ ...prev, imageName }));
    };

    const setImageFile = (imageFile: File | null) => {
        setAccount((prev) => ({ ...prev, imageFile }));
    };

    const setPhoneNumber = (phoneNumber: string) => {
        setAccount((prev) => ({ ...prev, phoneNumber }));
    };

    const setShippingAddress = (shippingAddress: string) => {
        setAccount((prev) => ({ ...prev, shippingAddress }));
    };

    const setGender = (gender: number) => {
        setAccount((prev) => ({ ...prev, gender }));
    };

    const setRole = (role: number) => {
        setAccount((prev) => ({ ...prev, role }));
    };

    const setStatus = (status: number) => {
        setAccount((prev) => ({ ...prev, status }));
    };

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmPass, setConfirmPass] = useState<string>("");

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImageName(reader.result as string);
            reader.readAsDataURL(file);
            setImageFile(file);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Kiểm tra mật khẩu khớp
        if (account.password !== "") {
            if (account.password !== confirmPass) {
                alertError("Mật khẩu và nhập lại mật khẩu không khớp.");
                return;
            }
        }

        const formData = new FormData();
        formData.append("email", account.email);
        formData.append("fullName", account.fullName);
        formData.append("password", account.password);
        formData.append("phoneNumber", account.phoneNumber);
        formData.append("shippingAddress", account.shippingAddress);
        formData.append("gender", account.gender.toString());
        formData.append("role", account.role.toString());
        formData.append("status", account.status.toString());

        const userEmail = localStorage.getItem('email');
        if (userEmail !== null) {
            formData.append("emailUpdate", userEmail);
        }

        formData.append("imageName", account.imageName);
        if (account.imageFile) {
            formData.append("imageFile", account.imageFile);
        }

        try {
            await accountApi.updateAccount(formData);
            window.location.reload();
        } catch (error: any) {
            alertError(error?.response?.data);
        }
    }

    return (
        // <div className="mx-auto mt-10 p-4 border rounded-xl shadow-xl bg-white">
        <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative p-4 bg-white rounded-md shadow dark:bg-gray-800 sm:p-5">
                <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Cập nhật tài khoản</h3>
                    <button onClick={toggleUpdate}
                        type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-md text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email <span className="text-red-500 text-xs">*</span></label>
                            <input value={account.email}
                                disabled
                                onChange={(e) => setEmail(e.target.value)}
                                type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 focus:outline-none focus:border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white placeholder-gray-600 placeholder-opacity-40" placeholder="Email" required />
                        </div>

                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Họ và tên <span className="text-red-500 text-xs">*</span></label>
                            <input value={account.fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 focus:outline-none focus:border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white placeholder-gray-600 placeholder-opacity-40" placeholder="Họ và tên" required />
                        </div>

                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                            <div className="relative block w-full">
                                <input
                                    onKeyDown={(e) => {
                                        if (e.key === " ") e.preventDefault();
                                    }}
                                    onChange={(e) => setPassword(e.target.value.replace(/\s/g, ""))}
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    className="bg-gray-50 border border-gray-300 focus:outline-none focus:border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white placeholder-gray-600 placeholder-opacity-40"
                                    placeholder="Mật khẩu"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Nhập lại mật khẩu</label>
                            <div className="relative block w-full">
                                <input
                                    onKeyDown={(e) => {
                                        if (e.key === " ") e.preventDefault();
                                    }}
                                    onChange={(e) => setConfirmPass(e.target.value.replace(/\s/g, ""))}
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirm-password"
                                    id="confirm-password"
                                    className="bg-gray-50 border border-gray-300 focus:outline-none focus:border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white placeholder-gray-600 placeholder-opacity-40"
                                    placeholder="Nhập lại mật khẩu"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center space-y-1">
                        <label htmlFor="title" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Ảnh Đại Diện</label>
                        <div className="mb-1">
                            <label className="">
                                <IoCloudUploadOutline className='text-gray-500 text-2xl cursor-pointer' />
                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e)} />
                            </label>
                        </div>

                        <div className="mt-1 w-fit inline-block relative">
                            <img src={
                                typeof account.imageName === 'string'
                                    ? account.imageName.startsWith('data:image') ||
                                        account.imageName.startsWith('blob:') ||
                                        account.imageName.startsWith('https')
                                        ? account.imageName
                                        : import.meta.env.VITE_API_URL_AVATAR_IMG + account.imageName
                                    : '/path/to/default-image.jpg'
                            }

                                className="w-24 h-24 object-cover shadow border rounded-full" />

                            <MdOutlineCancel className="absolute top-0 right-0 w-5 h-5 bg-white cursor-pointer text-gray-500 rounded-full -translate-y-1/2 translate-x-1/2"
                                onClick={() => {
                                    setImageName("");
                                    setImageFile(null)
                                }} />
                        </div>
                    </div>

                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="tel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số điện thoại <span className="text-red-500 text-xs">*</span></label>
                            <input value={account.phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                type="tel" name="tel" id="tel" className="bg-gray-50 border border-gray-300 focus:outline-none focus:border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white placeholder-gray-600 placeholder-opacity-40" placeholder="Số điện thoại" required />
                        </div>

                        <div>
                            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ</label>
                            <input value={account.shippingAddress}
                                onChange={(e) => setShippingAddress(e.target.value)}
                                type="text" name="address" id="address" className="bg-gray-50 border border-gray-300 focus:outline-none focus:border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white placeholder-gray-600 placeholder-opacity-40" placeholder="Địa chỉ" />
                        </div>
                    </div>

                    <div className="mb-4 flex items-center gap-4">
                        <label className="text-sm font-medium text-gray-900 dark:text-white w-32">Giới Tính <span className="text-red-500 text-xs">*</span> </label>
                        <div className="flex gap-4 w-full dark:text-red-500">
                            <label><input type="radio" name="gender" value={1} checked={account.gender === 1} onChange={() => setGender(1)} required /> Nam</label>
                            <label><input type="radio" name="gender" value={2} checked={account.gender === 2} onChange={() => setGender(2)} required /> Nữ</label>
                            <label><input type="radio" name="gender" value={3} checked={account.gender === 3} onChange={() => setGender(3)} required /> Khác</label>
                        </div>
                    </div>

                    <div className="mb-4 flex items-center gap-4">
                        <label className="text-sm font-medium text-gray-900 dark:text-white w-32">Vai trò <span className="text-red-500 text-xs">*</span> </label>
                        <div className="flex gap-4 w-full dark:text-red-500">
                            <label><input type="radio" name="role" value={1} checked={account.role === 2} onChange={() => setRole(2)} required /> Khách hàng</label>
                            <label><input type="radio" name="role" value={2} checked={account.role === 3} onChange={() => setRole(3)} required /> Nhân viên</label>
                            <label><input type="radio" name="role" value={3} checked={account.role === 1} onChange={() => setRole(1)} required /> Quản trị viên</label>
                        </div>
                    </div>

                    <div className="pb-4 flex items-center gap-4 border-b">
                        <label className="text-sm font-medium text-gray-900 dark:text-white w-32">Trạng thái <span className="text-red-500 text-xs">*</span> </label>
                        <div className="flex gap-4 w-full dark:text-red-500">
                            <label><input type="radio" name="status" value={1} checked={account.status === 1} onChange={() => setStatus(1)} required /> Active</label>
                            <label><input type="radio" name="status" value={0} checked={account.status === 0} onChange={() => setStatus(0)} required /> Inactive</label>
                        </div>
                    </div>

                    <p className="text-left text-gray-400 text-sm">Cập nhật lần cuối: {account.emailUpdate}</p>

                    <div className="flex items-center space-x-4 justify-end">
                        <button type="submit" className=" text-white inline-flex items-center bg-orange-400 hover:bg-orange-500 font-medium rounded-md text-sm px-4 py-2.5 text-center dark:bg-orange-400 dark:hover:bg-orange-500">
                            Cập nhật tài khoản
                        </button>

                        <button
                            onClick={toggleUpdate}
                            type="button" className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600">
                            <svg className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            Hủy
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div >
    );
}
