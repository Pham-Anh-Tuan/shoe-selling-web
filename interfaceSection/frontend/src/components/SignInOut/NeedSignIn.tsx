import { IoCloseOutline } from "react-icons/io5";

interface NeedSignInProps {
    needSignInPopup: boolean;
    setNeedSignInPopup: (isOpen: boolean) => void
    handleSignInPopup: () => void;
}

const NeedSignIn: React.FC<NeedSignInProps> = ({ needSignInPopup, setNeedSignInPopup, handleSignInPopup }) => {
    return (
        <>
            {needSignInPopup && (
                <section className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <div className="flex items-center justify-between">
                                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                                        YÊU CẦU ĐĂNG NHẬP
                                    </h1>
                                    <IoCloseOutline
                                        className="text-2xl cursor-pointer hover:text-primary"
                                        onClick={() => setNeedSignInPopup(false)}
                                    />
                                </div>
                                <p className="font-light text-gray-500 dark:text-gray-400">Bạn cần đăng nhập để tiến hành đặt hàng và mở khóa chức năng quản lý đơn hàng</p>
                                {/* <form className="space-y-4 md:space-y-6" action="#">
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                                    </div>

                                    <div className="flex items-start"> */}
                                        {/* <div className="flex items-center h-5">
                                <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                            </div> */}
                                    {/* </div> */}
                                    <button className="w-full text-white bg-primary hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={() => { setNeedSignInPopup(false), handleSignInPopup()}}>Đăng nhập</button>
                                {/* </form> */}
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default NeedSignIn;