import { Link } from "react-router-dom";

const Orders = () => {
    return (<section className="bg-white antialiased dark:bg-gray-900 flex-1 p-4 rounded-lg border">
        <div className="mx-auto max-w-screen-xl 2xl:px-0">
            <div className="mx-auto">
                <div className="gap-4 sm:flex sm:items-center sm:justify-between">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">DANH SÁCH ĐƠN HÀNG</h2>

                    <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
                        <div>
                            <label htmlFor="order-type" className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white">Select order type</label>
                            <select id="order-type" className="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                                <option selected>Tất cả đơn hàng</option>
                                <option value="transit">Đang giao</option>
                                <option value="confirmed">Đã nhận</option>
                                <option value="cancelled">Đã hủy</option>
                            </select>
                        </div>

                        {/* <span className="inline-block text-gray-500 dark:text-gray-400"> from </span>

                        <div>
                            <label htmlFor="duration" className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white">Select duration</label>
                            <select id="duration" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                                <option selected>this week</option>
                                <option value="this month">this month</option>
                                <option value="last 3 months">the last 3 months</option>
                                <option value="lats 6 months">the last 6 months</option>
                                <option value="this year">this year</option>
                            </select>
                        </div> */}
                    </div>
                </div>

                <div className="mt-6 flow-root sm:mt-8">
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        <div className="flex flex-wrap items-center gap-y-4 py-6">
                            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Mã đơn hàng:</dt>
                                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                    <a href="#" className="hover:underline">#FWB1273643</a>
                                </dd>
                            </dl>

                            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Ngày đặt:</dt>
                                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">20.12.2023</dd>
                            </dl>

                            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Tổng giá:</dt>
                                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">2,200,000₫</dd>
                            </dl>

                            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Trạng thái:</dt>
                                <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                                    <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                                    </svg>
                                    Đang giao
                                </dd>
                            </dl>

                            <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                                <button type="button" className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto">Hủy đơn hàng</button>
                                <a href="OrderDetail" className="w-full inline-flex justify-center rounded-lg  border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto">Xem chi tiết</a>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-y-4 py-6">
                            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Mã đơn hàng:</dt>
                                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                    <a href="#" className="hover:underline">#FWB1254679</a>
                                </dd>
                            </dl>

                            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Ngày đặt:</dt>
                                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">11.12.2023</dd>
                            </dl>

                            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Tổng giá:</dt>
                                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">8,800,000₫</dd>
                            </dl>

                            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                                <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                                    <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                    </svg>
                                    Đã nhận
                                </dd>
                            </dl>

                            <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                                <button type="button" className="w-full rounded-lg border border-blue-700 px-3 py-2 text-center text-sm font-medium text-blue-700 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-600 dark:hover:text-white dark:focus:ring-blue-900 lg:w-auto">Đặt lại đơn</button>
                                <Link to="/OrderDetail">
                                    <a href="#" className="w-full inline-flex justify-center rounded-lg  border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto">Xem chi tiết</a>
                                </Link>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-y-4 py-6">
                            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Mã đơn hàng:</dt>
                                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                    <a href="#" className="hover:underline">#FWB1273643</a>
                                </dd>
                            </dl>

                            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Ngày đặt:</dt>
                                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">18.12.2023</dd>
                            </dl>

                            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Tổng giá:</dt>
                                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">10,800,000₫</dd>
                            </dl>

                            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Trạng thái:</dt>
                                <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                                    <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                                    </svg>
                                    Đang giao
                                </dd>
                            </dl>

                            <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                                <button type="button" className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto">Hủy đơn hàng</button>
                                <Link to="/OrderDetail">
                                    <a href="#" className="w-full inline-flex justify-center rounded-lg  border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto">Xem chi tiết</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <nav className="mt-6 flex items-center justify-center sm:mt-8" aria-label="Page navigation example">
                    <ul className="flex h-8 items-center -space-x-px text-sm">
                        <li>
                            <a href="#" className="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span className="sr-only">Previous</span>
                                <svg className="h-4 w-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7" />
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                        </li>
                        <li>
                            <a href="#" className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                        </li>
                        <li>
                            <a href="#" aria-current="page" className="z-10 flex h-8 items-center justify-center border border-primary-300 bg-primary-50 px-3 leading-tight text-primary-600 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                        </li>
                        <li>
                            <a href="#" className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
                        </li>
                        <li>
                            <a href="#" className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
                        </li>
                        <li>
                            <a href="#" className="flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span className="sr-only">Next</span>
                                <svg className="h-4 w-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7" />
                                </svg>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </section>);
}
export default Orders;