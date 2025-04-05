import DatePicker from "./util/DatePicker";
import Img1 from "../../../assets/male-sneaker/sneaker.png";
import Img2 from "../../../assets/male-sneaker/sneaker2.png";

const OrderRead = () => {
    return (
        <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Xem chi tiết đơn hàng</h3>
                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="readOrderModal">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <form action="#">
                    <div className="grid gap-4 mb-6 grid-cols-2">
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Họ và tên</label>
                            <input disabled type="text" name="name" id="name" value={"Nguyễn Văn Anh"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" />
                        </div>

                        <div>
                            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày đặt</label>
                            <input disabled type="text" name="date" id="orderDate" value={"20/12/2023"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" />
                        </div>

                        <div>
                            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày giao</label>
                            <input disabled type="text" name="date" id="deliveryDate" value={"23/12/2023"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" />
                        </div>

                        <div>
                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tổng tiền</label>
                            <input disabled type="text" value={"2,200,000₫"} name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" />
                        </div>

                        <div>
                            <label htmlFor="tel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số điện thoại</label>
                            <input disabled type="tel" name="tel" id="tel" value={"0773506505"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" />
                        </div>

                        <div>
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trạng thái</label>
                            <select
                                id="category" value={"1"} disabled className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500">
                                <option value="1" className="bg-yellow-100">Đang giao</option>
                                <option value="2" className="bg-green-100">Đã giao</option>
                                <option value="3" className="bg-red-100">Đã hủy</option>
                                <option value="3" className="bg-blue-100">Chưa giao</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ</label>
                        <input disabled type="text" name="address" id="address" value={"C706, QL1A, Tổ 11, Khu phố 5, Phường Linh Trung, Thành Phố Thủ Đức, TP. Hồ Chí Minh"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" />
                    </div>

                    <div className="grid gap-4 mb-6 grid-cols-2 mt-6">
                        <div>
                            <label htmlFor="payment" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phương thức thanh toán</label>
                            <label htmlFor="bordered-radio-1" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 flex gap-3 items-center">
                                <svg className="w-[25px] h-[25px] fill-green-600" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M112 112c0 35.3-28.7 64-64 64V336c35.3 0 64 28.7 64 64H464c0-35.3 28.7-64 64-64V176c-35.3 0-64-28.7-64-64H112zM0 128C0 92.7 28.7 64 64 64H512c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM176 256a112 112 0 1 1 224 0 112 112 0 1 1 -224 0zm80-48c0 8.8 7.2 16 16 16v64h-8c-8.8 0-16 7.2-16 16s7.2 16 16 16h24 24c8.8 0 16-7.2 16-16s-7.2-16-16-16h-8V208c0-8.8-7.2-16-16-16H272c-8.8 0-16 7.2-16 16z"></path>
                                </svg>
                                Thanh toán khi nhận hàng</label>
                        </div>

                        <div>
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thanh toán</label>
                            <select
                                id="category" value={"1"} disabled className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500">
                                <option value="1" className="bg-green-100">Đã thanh toán</option>
                                <option value="2" className="bg-red-100">Chưa thanh toán</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="mb-[10px] block text-base font-medium text-dark dark:text-white">
                            Danh sách sản phẩm
                        </label>
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
                    </div>
                </form>
            </div>
        </div>
    )
}

export default OrderRead