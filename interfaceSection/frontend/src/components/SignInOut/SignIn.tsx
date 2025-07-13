import { useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { LoginData } from "./authTypes";
import { authApi } from "../../api-client/api";
import { alertError } from "../Shared/AlertError";
import { useNavigate } from "react-router-dom";

interface SignInProps {
    signInPopup: boolean;
    setSignInPopup: (isOpen: boolean) => void
    handleRegisterPopup: () => void
    handleForgotPWPopup: () => void
}

const SignIn: React.FC<SignInProps> = ({ signInPopup, setSignInPopup, handleRegisterPopup, handleForgotPWPopup }) => {
    const [form, setForm] = useState<LoginData>({ email: '', password: '' });
    const navigate = useNavigate();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await authApi.login(form);

            // const { token, email, fullName, imageName } = response;

            // Lưu token vào localStorage
            localStorage.setItem('token', response.data?.token);
            localStorage.setItem('imageName', response.data?.imageName);
            localStorage.setItem('email', response.data?.email);
            localStorage.setItem('role', response.data?.role);

            if (String(response.data?.role) === "1" || String(response.data?.role) === "3") {
                window.location.href = "/admin";
            } else {
                window.location.reload();
            }
        } catch (error: any) {
            const message = error.response.data;
            if (message === "Email not found") {
                alertError("Email không tồn tại.");
            } else if (message === "Invalid password") {
                alertError("Mật khẩu không đúng.");
            } else if (message === "Account blocked") {
                alertError("Tài khoản này đã bị khóa.");
            } else {
                alertError("Đăng nhập thất bại.");
            }

        }
    };

    const emailRef = useRef<HTMLInputElement>(null);

    const handleEmailInvalid = (e: React.FormEvent<HTMLInputElement>) => {
        const input = e.currentTarget;
        if (input.validity.valueMissing) {
            input.setCustomValidity("Vui lòng điền vào trường này.");
        } else if (input.validity.typeMismatch && input.type === "email") {
            input.setCustomValidity("Vui lòng nhập đúng định dạng email.");
        } else {
            input.setCustomValidity(""); // reset nếu hợp lệ
        }
    };

    const handlePasswordInvalid = (e: React.FormEvent<HTMLInputElement>) => {
        const input = e.currentTarget;
        if (input.validity.valueMissing) {
            input.setCustomValidity("Vui lòng điền vào trường này.");
        }
    };

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        e.currentTarget.setCustomValidity(""); // reset khi người dùng đang gõ
    };

    const handleGoogleLogin = () => {
        // window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=338328171761-h09irettn4jglq5jj6g2dujp14b5fgi2.apps.googleusercontent.com&redirect_uri=http://localhost:8080/login/oauth2/code/google&response_type=code&scope=email profile`;
        window.location.href = `http://localhost:8080/oauth2/authorization/google`;
    };

    const handleFacebookLogin = () => {
        window.location.href = `http://localhost:8080/oauth2/authorization/facebook`;
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
                                <form className="space-y-4 md:space-y-4" onSubmit={handleLogin}>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                        <input ref={emailRef}
                                            onInvalid={handleEmailInvalid}
                                            onInput={handleInput}
                                            onChange={handleChange}
                                            type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:border-gray-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="" required />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                                        <input onInvalid={handlePasswordInvalid}
                                            onInput={handleInput}
                                            onChange={handleChange}
                                            type="password" name="password" id="password" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:border-gray-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
                                    </div>
                                    <div className="flex items-center justify-end">
                                        <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={() => { setSignInPopup(false); handleForgotPWPopup() }}>Quên mật khẩu?</a>
                                    </div>
                                    <button type="submit" className="w-full text-white bg-primary hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Đăng nhập</button>

                                    <div className="flex items-center justify-center my-2">
                                        <hr className="flex-grow border-gray-300" />
                                        <span className="mx-4 text-gray-500 text-xs">HOẶC</span>
                                        <hr className="flex-grow border-gray-300" />
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={handleGoogleLogin}
                                            type="button" className="w-full flex items-center justify-center gap-2 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M21.35 11.1H12v2.8h5.35c-.6 2.35-2.5 3.85-5.35 3.85a6.06 6.06 0 0 1 0-12.12c1.55 0 2.95.6 4 1.55l2.1-2.1C16.95 3.65 14.65 2.7 12 2.7 6.9 2.7 2.7 6.9 2.7 12S6.9 21.3 12 21.3c5.15 0 9.15-3.75 9.15-9 0-.6-.05-1.1-.15-1.65Z" />
                                            </svg>
                                            Google
                                        </button>
                                        <button
                                            onClick={handleFacebookLogin}
                                            type="button" className="w-full flex items-center justify-center gap-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99h-2.54v-2.89h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.62.77-1.62 1.56v1.87h2.76l-.44 2.89h-2.32v6.99C18.34 21.12 22 16.99 22 12" />
                                            </svg>
                                            Facebook
                                        </button>
                                    </div>

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