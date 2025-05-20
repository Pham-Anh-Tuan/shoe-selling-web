const PassChange = () => {
    return (
        <div className='flex-1 border px-9 py-4'>
            <div className='border-b'>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">ĐỔI MẬT KHẨU</h2>
                <h4 className="mb-4">Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</h4>
            </div>
            <div className='flex flex-col-reverse lg:flex-row gap-10 mt-8 '>
                {/* Profile Form */}
                <form className='w-full lg:w-3/4 lg:pr-10'>
                    <div className="mb-6 flex items-center gap-4">
                        <label htmlFor="current-password" className="text-base font-medium text-gray-900 dark:text-white w-32">
                            Mật khẩu hiện tại
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="current-password"
                            className="bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-gray-300 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder=""
                            required
                        />
                    </div>

                    <div className="mb-6 flex items-center gap-4">
                        <label htmlFor="new-password" className="text-base font-medium text-gray-900 dark:text-white w-32">
                            Mật khẩu mới
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="new-password"
                            className="bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-gray-300 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder=""
                            required
                        />
                    </div>

                    <div className="mb-6 flex items-center gap-4">
                        <label htmlFor="confirm-password" className="text-base font-medium text-gray-900 dark:text-white w-32">
                            Xác nhận mật khẩu
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="confirm-password"
                            className="bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-gray-300 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder=""
                            required
                        />
                    </div>

                    <div className="mb-6 flex items-center gap-4">
                        <span className="w-32"></span>
                        <div className='w-full'>
                            <button type="submit"
                                className="text-white bg-orange-400 hover:bg-orange-500 font-medium rounded-sm text-sm px-5 py-2.5 text-center dark:bg-orange-400 dark:hover:bg-orange-500">Xác nhận</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PassChange