import { useEffect, useState } from "react";
import DeliveryInfUpdation from "./DeliveryInfUpdation";
import { useParams } from "react-router-dom";
import { orderApi } from "../../api-client/api";
import formatDateString from "../../hooks/FormatDate";
import formatCurrencyVND from "../../hooks/FormatCurrency";

const OrderDetail = () => {
    interface Order {
        id: string;
        phoneNumber: string;
        shippingAddress: string;
        totalPrice: number;
        deliveryDate: string;
        payMethod: number;
        shippingStatus: number;
        orderItems: OrderItem[];
    }

    interface OrderItem {
        productName: string;
        colorHex: string;
        size: number;
        purchaseQuantity: number;
        price: number;
        path: string;
    }

    const [order, setOrder] = useState<Order>({
        id: "",
        phoneNumber: "",
        shippingAddress: "",
        totalPrice: 0,
        deliveryDate: "",
        payMethod: 0,
        shippingStatus: 0,
        orderItems: [
            {
                productName: "",
                colorHex: "",
                size: 0,
                purchaseQuantity: 0,
                price: 0,
                path: "",
            },
        ],
    });

    const { id } = useParams<{ id: string }>();

    const loadOrderDetail = async () => {
        if (!id) return;
        try {
            const { data } = await orderApi.getUserOrderDetail(id);
            setOrder(data);
        } catch (error) {
            console.error("Lỗi khi gọi API sản phẩm:", error);
        }
    };

    useEffect(() => {
        loadOrderDetail();
    }, [id]);

    const [showUpdate, setShowUpdate] = useState(false);
    const toggleUpdate = () => {
        setShowUpdate(!showUpdate);
    };

    return (<div className="container max-md:max-w-xl mx-auto mt-10 mb-12">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Chi tiết đơn hàng:</h1>
        <div className="grid md:grid-cols-3 gap-10 mt-8">
            <div className="md:col-span-2 space-y-4">
                {order.orderItems.map((item) => (
                    <div className="flex gap-4 bg-white px-4 py-6 rounded-md shadow-[0_2px_12px_-3px_rgba(61,63,68,0.3)]">
                        <div className="flex gap-4">
                            <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0">
                                <img src={import.meta.env.VITE_API_URL_IMG + item.path} className="w-full h-full object-contain" />
                            </div>

                            <div className="flex flex-col gap-4">
                                <div>
                                    <h3 className="text-sm sm:text-base font-semibold text-slate-900">{item.productName}</h3>
                                    <p className="text-sm font-semibold text-slate-500 mt-2 flex items-center gap-2">Màu: <span style={{ backgroundColor: item.colorHex }} className="inline-block w-5 h-5 rounded-md border border-gray-200"></span></p>
                                    <p className="text-sm font-semibold text-slate-500 mt-2 flex items-center gap-2">Kích thước: <span className="inline-block w-5 h-5 rounded-md">{item.size}</span></p>
                                    <p className="text-sm font-semibold text-slate-500 mt-2 flex items-center gap-2">Số lượng: <span className="inline-block w-5 h-5 rounded-md">{item.purchaseQuantity}</span></p>
                                </div>
                            </div>
                        </div>
                        <div className="ml-auto flex flex-col">
                            <h3 className="text-sm sm:text-base font-semibold text-slate-900 mt-auto">{formatCurrencyVND(item.price)}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div>
                <div className="bg-white rounded-md px-4 py-6 h-max shadow-[0_2px_12px_-3px_rgba(61,63,68,0.3)]">
                    <ul className="text-slate-900 font-medium space-y-4">
                        <li className="flex flex-wrap gap-4 text-sm">Địa chỉ: {order.shippingAddress}</li>
                        <li className="flex flex-wrap gap-4 text-sm">Số điện thoại: {order.phoneNumber}</li>
                        <li className="flex flex-wrap gap-4 text-sm">Ngày giao dự kiến: {formatDateString(order.deliveryDate)}</li>
                        <li className="flex flex-wrap gap-4 text-sm">Phương thức thanh toán:
                            {order.payMethod === 1
                                ? <label htmlFor="bordered-radio-1" className="w-full text-sm font-medium text-gray-900 dark:text-gray-900 flex gap-3 items-center">
                                    <svg className="w-[25px] h-[25px] fill-green-600" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M112 112c0 35.3-28.7 64-64 64V336c35.3 0 64 28.7 64 64H464c0-35.3 28.7-64 64-64V176c-35.3 0-64-28.7-64-64H112zM0 128C0 92.7 28.7 64 64 64H512c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM176 256a112 112 0 1 1 224 0 112 112 0 1 1 -224 0zm80-48c0 8.8 7.2 16 16 16v64h-8c-8.8 0-16 7.2-16 16s7.2 16 16 16h24 24c8.8 0 16-7.2 16-16s-7.2-16-16-16h-8V208c0-8.8-7.2-16-16-16H272c-8.8 0-16 7.2-16 16z"></path>
                                    </svg>
                                    Thanh toán khi nhận hàng
                                </label>
                                : order.payMethod === 2
                                    ? <label htmlFor="bordered-radio-2" className="w-full text-sm font-medium text-gray-900 dark:text-gray-900 flex gap-3 items-center">
                                        <svg className="w-[25px] h-[25px] fill-blue-600" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path>
                                        </svg>
                                        Chuyển khoản qua ngân hàng
                                    </label> : "Không xác định"}
                        </li>
                    </ul>

                    {/* {(order.shippingStatus === 2 || order.shippingStatus === 3) && (
                        <div className="flex items-center justify-end mt-5">
                            <button type="button" onClick={() => {
                                toggleUpdate();
                            }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-1 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-xs">Chỉnh sửa</button>
                        </div>
                    )}

                    {order.shippingStatus !== 1 && (
                        <div className="flex items-center justify-end mt-5">
                            <button type="button" onClick={() => {
                                toggleUpdate();
                            }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-1 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-xs">ádasdasd</button>
                        </div>
                    )} */}

                    {![2, 3].includes(order.shippingStatus) && (
                        <div className="flex items-center justify-end mt-5">
                            <button
                                type="button"
                                onClick={() => {
                                    toggleUpdate();
                                }}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-1 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-xs"
                            >
                                Chỉnh sửa
                            </button>
                        </div>
                    )}

                    {showUpdate && id && (
                        <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                            <DeliveryInfUpdation updateId={id} toggleUpdate={toggleUpdate} />
                        </div>
                    )}
                </div>

                <div className="mt-4 bg-white rounded-md px-4 py-6 h-max shadow-[0_2px_12px_-3px_rgba(61,63,68,0.3)]">
                    <ul className="text-slate-900 font-medium space-y-4">
                        <li className="flex flex-wrap gap-4 text-sm">Tổng tiền hàng <span className="ml-auto font-semibold">{formatCurrencyVND(order.totalPrice)}</span></li>
                        <li className="flex flex-wrap gap-4 text-sm">Phí vận chuyển <span className="ml-auto font-semibold">0₫</span></li>
                        <li className="flex flex-wrap gap-4 text-sm">Thuế <span className="ml-auto font-semibold">0₫</span></li>
                        <hr className="border-slate-300" />
                        <li className="flex flex-wrap gap-4 text-sm font-semibold">Tổng tiền <span className="ml-auto">{formatCurrencyVND(order.totalPrice)}</span></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>);
}
export default OrderDetail;