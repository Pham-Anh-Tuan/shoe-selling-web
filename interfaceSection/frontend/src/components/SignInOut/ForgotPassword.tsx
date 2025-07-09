import { IoCloseOutline } from "react-icons/io5";
import { authApi } from "../../api-client/api";
import { alertError } from "../Shared/AlertError";
import { ToastContainer } from "react-toastify";
import { useState } from "react";

interface ForgotPWProps {
    forgotPWPopup: boolean;
    setForgotPWPopup: (isOpen: boolean) => void
}

const ForgotPassword: React.FC<ForgotPWProps> = ({ forgotPWPopup, setForgotPWPopup }) => {
    const [email, setEmail] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData();
        try {
            formData.append("email", email);
            await authApi.forgotPassword(formData);
            window.location.reload();
        } catch (error: any) {
            alertError(error?.response?.data);
        }
    }
    return (
        <>
            {forgotPWPopup && (
                <section className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <div className="flex items-center justify-between">
                                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                                        KHÔI PHỤC MẬT KHẨU
                                    </h1>
                                    <IoCloseOutline
                                        className="text-2xl cursor-pointer hover:text-primary"
                                        onClick={() => setForgotPWPopup(false)}
                                    />
                                </div>
                                <p className="font-light text-gray-500 dark:text-gray-400">Nhập email của bạn và chúng tôi sẽ gửi mật khẩu mới của bạn qua email!</p>
                                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                        <input onChange={(e) => setEmail(e.target.value)}
                                        type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-gray-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="" required />
                                    </div>
                                    <button type="submit" className="w-full text-white bg-primary hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Gửi</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                </section>
            )}
        </>
    );
};

export default ForgotPassword;