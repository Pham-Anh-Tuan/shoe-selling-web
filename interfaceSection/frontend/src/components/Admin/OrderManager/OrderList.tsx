import { useEffect, useState } from 'react';
import OrderRead from './OrderRead';
import OrderUpdation from './OrderUpdation';
import { orderApi } from '../../../api-client/api';
import formatCurrencyVND from '../../../hooks/FormatCurrency';
import formatDateString from '../../../hooks/FormatDate';
import getFirst11Characters from '../../../hooks/FormatString';
import Pagination from '../../../hooks/Pagination';

const OrderList = () => {
    interface Order {
        id: string;
        fullName: string;
        customerEmail: string;
        phoneNumber: string;
        orderDate: string;
        deliveryDate: string;
        totalPrice: number;
        shippingStatus: number;
        paymentStatus: number;
    }

    const [ordersData, setOrdersData] = useState<Order[]>([]);

    const [page, setPage] = useState(0); // Trang hiện tại (bắt đầu từ 0)
    const [totalPages, setTotalPages] = useState(1); // Tổng số trang
    const [totalOrders, setTotalOrders] = useState(0);

    const [keyword, setKeyword] = useState("");

    const loadOrders = async (pageParam: number) => {
        try {
            const { data } = await orderApi.getManagerOrders(pageParam, 5);
            setOrdersData(data.content);
            setTotalPages(data.totalPages);
            setTotalOrders(data.totalElements);
            setPage(data.number); // hoặc pageParam
        } catch (error) {
            console.error("Lỗi gọi API:", error);
        }
    };

    const loadSearchResults = async (pageParam: number, e?: React.FormEvent) => {
        if (e) e.preventDefault();
        try {
            const { data } = await orderApi.searchManagerOrders(keyword.trim(), pageParam, 5);
            setOrdersData(data.content);
            setTotalPages(data.totalPages);
            setTotalOrders(data.totalElements);
            setPage(data.number);
        } catch (err) {
            console.error("Lỗi khi tìm sản phẩm:", err);
        }
    };

    useEffect(() => {
        setOrdersData([]);
        setPage(0); // reset page
        loadOrders(0); // bắt đầu từ trang 0
    }, []);

    useEffect(() => {
        if (keyword.trim() === "") {
            loadOrders(0);
        }
    }, [keyword]);

    const [readId, setReadId] = useState<string>("");
    const [showRead, setShowRead] = useState(false);
    const toggleRead = () => {
        setShowRead(!showRead);
    };

    const [updateId, setUpdateId] = useState<string>("");
    const [showUpdate, setShowUpdate] = useState(false);
    const toggleUpdate = () => {
        setShowUpdate(!showUpdate);
    };

    const [cancelId, setCancelId] = useState<string>("");

    const cancelOrder = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await orderApi.deleteById(cancelId);
            document.getElementById("deleteAlertId")?.classList.add("hidden");
            window
        } catch (error) {
            console.error("Xóa sản phẩm không thành công!", error);
        }
        window.location.reload();
    };

    return (
        <div className='w-full p-4 bg-gray-100 dark:bg-gray-900 overflow-x-hidden mt-[60px]'>
            <section className="antialiased z-10">
                <div className="mx-auto w-full">
                    
                    <div className=" bg-white dark:bg-gray-800 relative shadow-md rounded-md">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="flex-1 flex flex-col">
                                <h3 className="text-lg font-bold">
                                    Danh sách đơn hàng
                                </h3>
                                <span className="dark:text-white text-sm">Tổng số: {totalOrders}</span>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="w-full md:w-1/2">
                                <form className="flex items-center" onSubmit={(e) => loadSearchResults(0, e)}>
                                    <label htmlFor="simple-search" className="sr-only">Search</label>
                                    <div className="relative w-full">
                                        <button
                                            type="submit"
                                            className="cursor-pointer absolute inset-y-0 left-0 flex items-center pl-3">
                                            <svg aria-hidden="true" className="hover:text-orange-500 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                        <input
                                            value={keyword}
                                            onChange={(e) => setKeyword(e.target.value)}
                                            type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Tìm kiếm theo mã đơn hàng" required />
                                    </div>
                                </form>
                            </div>
                            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">

                                <div className="flex items-center space-x-3 w-full md:w-auto">

                                </div>
                            </div>
                        </div>
                        <div className="w-full overflow-x-scroll">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-4 py-4 text-center">Mã đơn hàng</th>
                                        <th scope="col" className="px-4 py-3 text-center">Email</th>
                                        <th scope="col" className="px-4 py-3 text-center">Họ và tên</th>
                                        <th scope="col" className="px-4 py-3 text-center">Số điện thoại</th>
                                        <th scope="col" className="px-4 py-3 text-center">Ngày đặt</th>
                                        <th scope="col" className="px-4 py-3 text-center">Ngày giao</th>
                                        <th scope="col" className="px-4 py-3 text-center">Tổng tiền</th>
                                        <th scope="col" className="px-4 py-3 text-center">Trạng thái</th>
                                        <th scope="col" className="px-4 py-3 text-center">Thanh toán</th>
                                        <th scope="col" className="px-4 py-3">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ordersData.map((data, index) => (
                                        <tr key={data.id}
                                            className="border-b dark:border-gray-700">
                                            <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <p className='w-24'>{getFirst11Characters(data.id)}</p>
                                            </th>
                                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <p className='w-48'> {data.customerEmail}</p>
                                            </td>
                                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <p className='w-24'> {data.fullName}</p>
                                            </td>
                                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <p className='w-24'> {data.phoneNumber}</p>
                                            </td>
                                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{formatDateString(data.orderDate)}</td>
                                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{formatDateString(data.deliveryDate)}</td>
                                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{formatCurrencyVND(data.totalPrice)}</td>
                                            <td>
                                                {data?.shippingStatus === 0
                                                    ? <dd className="w-24 me-2 inline-flex items-center rounded bg-blue-100 px-2.5 py-2 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                                        <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z" />
                                                        </svg>
                                                        Chưa giao
                                                    </dd>
                                                    : data?.shippingStatus === 1
                                                        ?
                                                        <dd className="w-24 me-2 inline-flex items-center rounded bg-yellow-100 px-2.5 py-2 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                                                            <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                                                            </svg>
                                                            Đang giao
                                                        </dd>
                                                        : data?.shippingStatus === 2
                                                            ? <dd className="w-24 me-2 inline-flex items-center rounded bg-green-100 px-2.5 py-2 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                                                                <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                                                </svg>
                                                                Đã giao
                                                            </dd>
                                                            : data?.shippingStatus === 3
                                                                ? <dd className="w-24 me-2 inline-flex items-center rounded bg-red-100 px-2.5 py-2 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                                                                    <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                                                    </svg>
                                                                    Đã hủy
                                                                </dd> : "Không xác định"
                                                }
                                            </td>
                                            <td>
                                                {data?.paymentStatus === 0
                                                    ? <dd className="w-32 me-2 inline-flex items-center rounded bg-red-100 px-2.5 py-2 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                                                        <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                                        </svg>
                                                        Chưa thanh toán
                                                    </dd>
                                                    : data?.paymentStatus === 1 ?
                                                        <dd className="w-32 me-2 inline-flex items-center rounded bg-green-100 px-2.5 py-2 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                                                            <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                                            </svg>
                                                            Đã thanh toán
                                                        </dd>
                                                        : "Không xác định"}
                                            </td>
                                            <td className="px-4 py-3 flex items-center justify-start">
                                                <div className="flex items-center space-x-4">
                                                    {data?.shippingStatus !== 3 && (
                                                        <button onClick={() => {
                                                            setUpdateId(data.id);
                                                            toggleUpdate();
                                                        }}
                                                            type="button" className="w-28 py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-primary hover:bg-orange-400 rounded-lg dark:bg-orange-600 dark:hover:bg-orange-700">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 -ml-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                                                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                                            </svg>
                                                            Cập nhật
                                                        </button>
                                                    )}
                                                    <button onClick={() => {
                                                        setReadId(data.id);
                                                        toggleRead();
                                                    }}
                                                        type="button" className="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2 -ml-0.5">
                                                            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" />
                                                        </svg>
                                                        Xem
                                                    </button>
                                                    {data?.shippingStatus !== 2 && data?.shippingStatus !== 3 && (
                                                        <button onClick={() => {
                                                            setCancelId(data.id);
                                                            const dropdown = document.getElementById("deleteAlertId");
                                                            dropdown?.classList.toggle("hidden");
                                                        }}
                                                            type="button" className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 -ml-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                            </svg>
                                                            Hủy
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={(page) => {
                                keyword.trim() ? loadSearchResults(page) : loadOrders(page);
                            }}
                        />
                    </div>
                </div>
            </section >
            {showUpdate && (
                <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full bg-black bg-opacity-50">
                    <OrderUpdation updateId={updateId} toggleUpdate={toggleUpdate} />
                </div>
            )}
            {showRead && (
                <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full bg-black bg-opacity-50">
                    <OrderRead readId={readId} toggleRead={toggleRead} />
                </div>
            )}

            <div id="deleteAlertId" tabIndex={-1} aria-hidden="true"
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
                                cancelOrder;
                            }}
                                type="button" className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700">Có</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default OrderList;