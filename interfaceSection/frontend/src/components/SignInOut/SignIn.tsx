import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { LoginData } from "./authTypes";
import { authApi } from "../../api-client/api";
import { alertError } from "../Shared/AlertError";
import { ToastContainer } from "react-toastify";
import { alertSuccess } from "../Shared/AlertSuccess";

interface SignInProps {
    signInPopup: boolean;
    setSignInPopup: (isOpen: boolean) => void
    handleRegisterPopup: () => void
    handleForgotPWPopup: () => void
}

const SignIn: React.FC<SignInProps> = ({ signInPopup, setSignInPopup, handleRegisterPopup, handleForgotPWPopup }) => {
    const [form, setForm] = useState<LoginData>({ email: '', password: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await authApi.login(form);
            // Lưu token vào localStorage nếu cần
            localStorage.setItem('token', response.data);
            setSignInPopup(false);
            alertSuccess("Đăng nhập thành công!");
        } catch (error: any) {
            const message = error.response.data;
            console.log("ádd ", message);
            if (message === "Email not found") {
                alertError("Email không tồn tại.");
            } else if (message === "Invalid password") {
                alertError("Mật khẩu không đúng.");
            } else {
                alertError("Đăng nhập thất bại.");
            }

        }
    };
    return (
        <>
            {signInPopup && (
                <section className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <div className="flex items-center justify-between">
                                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                                        ĐĂNG NHẬP
                                    </h1>
                                    <IoCloseOutline
                                        className="text-2xl cursor-pointer hover:text-primary"
                                        onClick={() => setSignInPopup(false)}
                                    />
                                </div>
                                <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                        <input onChange={handleChange}
                                            type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                                        <input onChange={handleChange}
                                            type="password" name="password" id="password" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                    </div>
                                    <div className="flex items-center justify-end">
                                        <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={() => { setSignInPopup(false); handleForgotPWPopup() }}>Quên mật khẩu?</a>
                                    </div>
                                    <button type="submit" className="w-full text-white bg-primary hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Đăng nhập</button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Bạn chưa có tài khoản? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={() => { setSignInPopup(false); handleRegisterPopup() }}>Đăng ký</a>
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
export default SignIn;