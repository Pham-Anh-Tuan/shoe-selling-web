import Img1 from "../../assets/male-sneaker/sneaker.png";
import Img2 from "../../assets/male-sneaker/sneaker2.png";
import { useState } from "react";
import DeliveryInfUpdation from "./DeliveryInfUpdation";

const OrderDetail = () => {
    return (<div className="container max-md:max-w-xl mx-auto mt-10 mb-12">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Chi tiết đơn hàng:</h1>
        <div className="grid md:grid-cols-3 gap-10 mt-8">
            <div className="md:col-span-2 space-y-4">

                <div className="flex gap-4 bg-white px-4 py-6 rounded-md shadow-[0_2px_12px_-3px_rgba(61,63,68,0.3)]">
                    <div className="flex gap-4">
                        <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0">
                            <img src={Img1} className="w-full h-full object-contain" />
                        </div>

                        <div className="flex flex-col gap-4">
                            <div>
                                <h3 className="text-sm sm:text-base font-semibold text-slate-900">Giày Thể Thao Sneaker MULGATI YC25051P</h3>
                                <p className="text-sm font-semibold text-slate-500 mt-2 flex items-center gap-2">Màu: <span className="inline-block w-5 h-5 rounded-md bg-blue-900 border border-gray-200"></span></p>
                                <p className="text-sm font-semibold text-slate-500 mt-2 flex items-center gap-2">Kích thước: <span className="inline-block w-5 h-5 rounded-md">38</span></p>
                                <p className="text-sm font-semibold text-slate-500 mt-2 flex items-center gap-2">Số lượng: <span className="inline-block w-5 h-5 rounded-md">1</span></p>
                            </div>
                        </div>
                    </div>
                    <div className="ml-auto flex flex-col">
                        <div className="flex items-start gap-4 justify-end">
                            {/* <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 cursor-pointer fill-slate-400 hover:fill-pink-600 inline-block" viewBox="0 0 64 64">
                    <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z" data-original="#000000"></path>
                  </svg> */}

                            {/* <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 cursor-pointer fill-slate-400 hover:fill-red-600 inline-block" viewBox="0 0 24 24">
                                <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" data-original="#000000"></path>
                                <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" data-original="#000000"></path>
                            </svg> */}
                        </div>
                        <h3 className="text-sm sm:text-base font-semibold text-slate-900 mt-auto">2,200,000₫</h3>
                    </div>
                </div>

                <div className="flex gap-4 bg-white px-4 py-6 rounded-md shadow-[0_2px_12px_-3px_rgba(61,63,68,0.3)]">
                    <div className="flex gap-4">
                        <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0">
                            <img src={Img2} className="w-full h-full object-contain" />
                        </div>

                        <div className="flex flex-col gap-4">
                            <div>
                                <h3 className="text-sm sm:text-base font-semibold text-slate-900">Giày Thể Thao Sneaker MULGATI HX483A</h3>
                                <p className="text-sm font-semibold text-slate-500 mt-2 flex items-center gap-2">Màu: <span className="inline-block w-5 h-5 rounded-md bg-white border border-gray-200"></span></p>
                                <p className="text-sm font-semibold text-slate-500 mt-2 flex items-center gap-2">Kích thước: <span className="inline-block w-5 h-5 rounded-md">39</span></p>
                                <p className="text-sm font-semibold text-slate-500 mt-2 flex items-center gap-2">Số lượng: <span className="inline-block w-5 h-5 rounded-md">2</span></p>
                            </div>
                        </div>
                    </div>
                    <div className="ml-auto flex flex-col">
                        <h3 className="text-sm sm:text-base font-semibold text-slate-900 mt-auto">4,320,000₫</h3>
                    </div>
                </div>


            </div>

            <div>
                <div className="bg-white rounded-md px-4 py-6 h-max shadow-[0_2px_12px_-3px_rgba(61,63,68,0.3)]">
                    <ul className="text-slate-900 font-medium space-y-4">
                        <li className="flex flex-wrap gap-4 text-sm">Địa chỉ: C706, QL1A, Tổ 11, Khu phố 5, Phường Linh Trung, Thành Phố Thủ Đức, TP. Hồ Chí Minh</li>
                        <li className="flex flex-wrap gap-4 text-sm">Số điện thoại: 0773506505</li>
                        <li className="flex flex-wrap gap-4 text-sm">Phương thức thanh toán:
                            <label htmlFor="bordered-radio-1" className="w-full text-sm font-medium text-gray-900 dark:text-gray-900 flex gap-3 items-center">
                                <svg className="w-[25px] h-[25px] fill-green-600" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M112 112c0 35.3-28.7 64-64 64V336c35.3 0 64 28.7 64 64H464c0-35.3 28.7-64 64-64V176c-35.3 0-64-28.7-64-64H112zM0 128C0 92.7 28.7 64 64 64H512c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM176 256a112 112 0 1 1 224 0 112 112 0 1 1 -224 0zm80-48c0 8.8 7.2 16 16 16v64h-8c-8.8 0-16 7.2-16 16s7.2 16 16 16h24 24c8.8 0 16-7.2 16-16s-7.2-16-16-16h-8V208c0-8.8-7.2-16-16-16H272c-8.8 0-16 7.2-16 16z"></path>
                                </svg>
                                Thanh toán khi nhận hàng
                            </label>
                        </li>
                    </ul>
                    <div className="flex items-center justify-end mt-5">
                        <button type="button" data-modal-target="updateDeliveryInf" data-modal-toggle="updateDeliveryInf" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-1 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-xs">Chỉnh sửa</button>
                    </div>
                    <div id="updateDeliveryInf" tabIndex={-1} aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <DeliveryInfUpdation />
                    </div>
                </div>

                <div className="mt-4 bg-white rounded-md px-4 py-6 h-max shadow-[0_2px_12px_-3px_rgba(61,63,68,0.3)]">
                    <ul className="text-slate-900 font-medium space-y-4">
                        <li className="flex flex-wrap gap-4 text-sm">Tổng tiền hàng <span className="ml-auto font-semibold">6,520,000₫</span></li>
                        <li className="flex flex-wrap gap-4 text-sm">Phí vận chuyển <span className="ml-auto font-semibold">0₫</span></li>
                        <li className="flex flex-wrap gap-4 text-sm">Thuế <span className="ml-auto font-semibold">0₫</span></li>
                        <hr className="border-slate-300" />
                        <li className="flex flex-wrap gap-4 text-sm font-semibold">Tổng tiền <span className="ml-auto">6,520,000₫</span></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>);
}
export default OrderDetail;