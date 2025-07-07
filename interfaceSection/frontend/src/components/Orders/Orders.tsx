import { useEffect, useState } from "react";
import { orderApi } from "../../api-client/api";
import Pagination from "../../hooks/Pagination";
import getFirst11Characters from "../../hooks/FormatString";
import formatDateString from "../../hooks/FormatDate";
import formatCurrencyVND from "../../hooks/FormatCurrency";

const Orders = () => {
    interface Order {
        id: string;
        orderDate: string;
        totalPrice: number;
        shippingStatus: number;
    }
    const [ordersData, setOrdersData] = useState<Order[]>([]);
    const [page, setPage] = useState(0); // Trang hiện tại (bắt đầu từ 0)
    const [totalPages, setTotalPages] = useState(1); // Tổng số trang
    const [totalOrders, setTotalOrders] = useState(0);

    const [selectedStatus, setSelectedStatus] = useState<number[]>([0, 1, 2, 3]);

    const loadOrders = async (statuses: number[], pageParam: number) => {
        try {
            const userEmail = localStorage.getItem('email');
            if (userEmail !== null) {
                const { data } = await orderApi.getUserOrders(statuses, userEmail, pageParam, 5);
                setOrdersData(data.content);
                setTotalPages(data.totalPages);
                setTotalOrders(data.totalElements);
                setPage(data.number); // hoặc pageParam
            }
        } catch (error) {
            console.error("Lỗi gọi API:", error);
        }
    };

    useEffect(() => {
        loadOrders(selectedStatus, page);
    }, [selectedStatus, page]);

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;

        switch (value) {
            case "0":
                setSelectedStatus([0]);
                break;
            case "1":
                setSelectedStatus([1]);
                break;
            case "2":
                setSelectedStatus([2]);
                break;
            case "3":
                setSelectedStatus([3]);
                break;
            default:
                setSelectedStatus([0, 1, 2, 3]); // "Tất cả đơn hàng"
                break;
        }

        setPage(0); // Reset về trang đầu mỗi lần chọn filter
    };

    const [cancelId, setCancelId] = useState<string>("");

    const cancelOrder = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await orderApi.deleteById(cancelId);
        } catch (error) {
            console.error("Xóa sản phẩm không thành công!", error);
        }
        window.location.reload();
    };

    return (<section className="bg-white antialiased dark:bg-gray-900 flex-1 p-4 rounded-lg border">
        <div className="mx-auto max-w-screen-xl 2xl:px-0">
            <div className="mx-auto">
                <div className="gap-4 sm:flex sm:items-center sm:justify-between">
                    <div className="flex-1 flex flex-col">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">DANH SÁCH ĐƠN HÀNG</h2>
                        <span className="dark:text-white text-sm">Tổng số: {totalOrders}</span>
                    </div>
                    <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
                        <div>
                            <label htmlFor="order-type" className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white">Select order type</label>
                            <select id="order-type" onChange={handleStatusChange}
                                className="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                                <option>Tất cả đơn hàng</option>
                                <option value={0}>Chưa giao</option>
                                <option value={1}>Đang giao</option>
                                <option value={2}>Đã giao</option>
                                <option value={3}>Đã hủy</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flow-root sm:mt-8">
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {ordersData.map((data) => (
                            <div key={data.id}
                                className="flex flex-wrap items-center gap-y-4 py-6">
                                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Mã đơn hàng:</dt>
                                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                        <a href="" className="hover:underline">{getFirst11Characters(data.id)}</a>
                                    </dd>
                                </dl>

                                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Ngày đặt:</dt>
                                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{formatDateString(data.orderDate)}</dd>
                                </dl>

                                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Tổng giá:</dt>
                                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{formatCurrencyVND(data.totalPrice)}</dd>
                                </dl>

                                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Trạng thái:</dt>
                                    {data?.shippingStatus === 0
                                        ?
                                        <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                            <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z" />
                                            </svg>
                                            Chưa giao
                                        </dd>
                                        : data?.shippingStatus === 1
                                            ?
                                            <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-yellow-100 px-2.5 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                                                <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                                                </svg>
                                                Đang giao
                                            </dd>
                                            : data?.shippingStatus === 2
                                                ?
                                                <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                                                    <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                                    </svg>
                                                    Đã giao
                                                </dd>
                                                : data?.shippingStatus === 3
                                                    ?
                                                    <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-red-100 px-2.5 py-1 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                                                        <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                                        </svg>
                                                        Đã hủy
                                                    </dd>
                                                    : "Không xác định"
                                    }
                                </dl>

                                <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                                    {data?.shippingStatus !== 2 && data?.shippingStatus !== 3 && (
                                        // <button type="button" className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto">Hủy đơn hàng</button>
                                        <button onClick={() => {
                                            setCancelId(data.id);
                                            const dropdown = document.getElementById("deleteAlertId");
                                            dropdown?.classList.toggle("hidden");
                                        }}
                                            type="button" className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto">
                                            Hủy đơn hàng
                                        </button>
                                    )}
                                    <a href={`/orderDetail/${data.id}`}
                                        // onClick={() => navigate(`/orderDetail/${data.id}`)}
                                        className="w-full inline-flex justify-center rounded-lg  border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto">Xem chi tiết</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={(page) => {
                        loadOrders(selectedStatus, page);
                    }}
                />
            </div>
            <div id="deleteAlertId"
                className="hidden fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <button onClick={() => {
                            document.getElementById("deleteAlertId")?.classList.add("hidden");
                        }}
                            type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <svg className="text-orange-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <p className="mb-4 text-gray-500 dark:text-gray-300">Bạn có chắc chắn muốn hủy đơn hàng này không?</p>
                        <div className="flex justify-center items-center space-x-4">
                            <button onClick={() => {
                                document.getElementById("deleteAlertId")?.classList.add("hidden");
                            }}
                                type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-orange-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Không</button>
                            <button onClick={() => {
                                cancelOrder(new Event("submit") as unknown as React.FormEvent<HTMLFormElement>);
                            }}
                                type="button" className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700">Có</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section >);
}
export default Orders;