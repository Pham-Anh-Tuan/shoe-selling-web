import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { RegisterData } from "./authTypes";
import { authApi } from "../../api-client/api";
import { alertError } from "../Shared/AlertError";
import { alertSuccess } from "../Shared/AlertSuccess";

interface RegisterProps {
    registerPopup: boolean;
    setRegisterPopup: (isOpen: boolean) => void
    handleSignInPopup: () => void
}

const Register: React.FC<RegisterProps> = ({ registerPopup, setRegisterPopup, handleSignInPopup }) => {

    const [form, setForm] = useState<RegisterData>({
        email: '',
        fullName: '',
        password: '',
    });

    const [confirmPass, setConfirmPass] = useState<string>("");

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Kiểm tra mật khẩu khớp
        if (form.password !== confirmPass) {
            alertError("Mật khẩu và nhập lại mật khẩu không khớp.");
            return;
        }

        try {
            const response = await authApi.register(form);
            setRegisterPopup(false);
            alertSuccess("Đăng ký thành công!");
            // Lưu token nếu cần
            // localStorage.setItem('token', response.data.token);
        } catch (error: any) {
            // Nếu API trả lỗi email đã tồn tại
            if (error?.response?.data === "Email already exists") {
                alertError("Email đã tồn tại. Vui lòng chọn email khác.");
            } else {
                alertError("Đăng ký thất bại. Vui lòng thử lại.");
            }
            console.error("Đăng ký thất bại:", error);
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <>
            {registerPopup && (
                <section className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <div className="flex items-center justify-between">
                                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                                        ĐĂNG KÝ
                                    </h1>
                                    <IoCloseOutline
                                        className="text-2xl cursor-pointer hover:text-primary"
                                        onClick={() => setRegisterPopup(false)}
                                    />
                                </div>
                                <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                        <input onChange={handleChange}
                                            type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-gray-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="" required />
                                    </div>
                                    <div>
                                        <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Họ và tên</label>
                                        <input onChange={handleChange}
                                            type="name" name="fullName" id="fullName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-gray-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="" required />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                                        <input onKeyDown={(e) => {
                                            if (e.key === " ") e.preventDefault();
                                        }}
                                            onChange={handleChange}
                                            type="password" name="password" id="password" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-gray-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
                                    </div>
                                    <div>
                                        <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nhập lại mật khẩu</label>
                                        <input onKeyDown={(e) => {
                                            if (e.key === " ") e.preventDefault();
                                        }}
                                            onChange={(e) => setConfirmPass(e.target.value)}
                                            type="confirm-password" name="confirm-password" id="confirm-password" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-gray-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
                                    </div>
                                    <button type="submit" className="w-full text-white bg-primary hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Đăng ký</button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Bạn đã có tài khoản? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={() => { setRegisterPopup(false); handleSignInPopup() }}>Đăng nhập</a>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default Register;