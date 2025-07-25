import { useEffect, useState } from "react";
import Qr from "../../assets/QRnhanTien.png";
import { CartItem } from "../Cart/CartContext";
import formatCurrencyVND from "../../hooks/FormatCurrency";
import { orderApi, profileApi } from "../../api-client/api";
import { Order } from "./OrderInterface";
import { alertError } from "../Shared/AlertError";
import { useNavigate } from "react-router-dom";
const DeliveryInfor = () => {
    const [selected, setSelected] = useState(false);

    const [cart, setCart] = useState<CartItem[]>([]);
    useEffect(() => {
        const cartFromStorage = localStorage.getItem('cart');
        if (cartFromStorage) {
            setCart(JSON.parse(cartFromStorage));
        }
    }, []);

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const [order, setOrder] = useState<Order>({
        fullName: "",
        phoneNumber: "",
        shippingAddress: "",
        payMethod: 0,
        totalPrice: 0,
        email: "",
        orderItemRequests: cart,
    });

    const setFullName = (fullName: string) => {
        setOrder(prev => ({ ...prev, fullName }));
    };

    const setPhoneNumber = (phoneNumber: string) => {
        setOrder(prev => ({ ...prev, phoneNumber }));
    };

    const setShippingAddress = (shippingAddress: string) => {
        setOrder(prev => ({ ...prev, shippingAddress }));
    };

    const setPayMethod = (payMethod: number) => {
        setOrder(prev => ({ ...prev, payMethod }));
    };

    const setEmail = (email: string) => {
        setOrder(prev => ({ ...prev, email }));
    };

    const getOrderData = async () => {
        const userEmail = localStorage.getItem('email');
        if (userEmail !== null) {
            const { data } = await profileApi.getProfileSumByEmail(userEmail);
            // setOrder(data);
            // setEmail(userEmail);
            setOrder(prev => ({
                ...prev,
                ...data
            }));
            setEmail(userEmail);
        }
    };

    const navigate = useNavigate();
    const handleOrder = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const dynamicTotalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
            const updatedOrder = {
                ...order,
                totalPrice: dynamicTotalPrice,
                orderItemRequests: cart,
            };
            // console.log("Dữ liệu order đầy đủ:", JSON.stringify(updatedOrder, null, 2));
            await orderApi.createOrder(updatedOrder);
            localStorage.removeItem('cart');
            navigate("/orderSuccess");
        } catch (error: any) {
            alertError(error?.response?.data);
        }
    };

    useEffect(() => {
        getOrderData();
    }, []);

    return (<div className="container max-md:max-w-xl mx-auto p-4 mt-10 mb-12">
        <h1 className="text-2xl font-semibold text-slate-900 container dark:text-white">THÔNG TIN GIAO HÀNG</h1>
        <div className="grid md:grid-cols-3 gap-10 mt-8 container">
            <div className="md:col-span-2 space-y-4 lg:w-4/5">
                <form className="space-y-4 md:space-y-6" onSubmit={handleOrder}>
                    <div>
                        <label htmlFor="name" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Họ và tên </label>
                        <input value={order.fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            type="name" name="name" id="name" className="bg-white border border-gray-300 text-gray-900 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="" required />
                    </div>
                    <div>
                        <label htmlFor="tel" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Số điện thoại</label>
                        <input value={order.phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            type="tel" name="tel" id="tel" placeholder="" className="bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-gray-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    <div>
                        <label htmlFor="address" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Địa chỉ nhận hàng</label>
                        <input value={order.shippingAddress}
                            onChange={(e) => setShippingAddress(e.target.value)}
                            type="address" name="address" id="address" placeholder="" className="bg-white border border-gray-300 text-gray-900 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    <h1 className="text-2xl font-semibold text-slate-900 container dark:text-white px-0 py-5">PHƯƠNG THỨC THANH TOÁN</h1>
                    <div className="flex items-center ps-4 border border-gray-200 rounded-sm dark:border-gray-700">
                        <input value={1} onChange={() => setPayMethod(1)}
                            id="bordered-radio-1" type="radio" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={() => setSelected(false)} required />
                        <label htmlFor="bordered-radio-1" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 flex gap-3 items-center">
                            <svg className="w-[25px] h-[25px] fill-green-600" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
                                <path d="M112 112c0 35.3-28.7 64-64 64V336c35.3 0 64 28.7 64 64H464c0-35.3 28.7-64 64-64V176c-35.3 0-64-28.7-64-64H112zM0 128C0 92.7 28.7 64 64 64H512c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM176 256a112 112 0 1 1 224 0 112 112 0 1 1 -224 0zm80-48c0 8.8 7.2 16 16 16v64h-8c-8.8 0-16 7.2-16 16s7.2 16 16 16h24 24c8.8 0 16-7.2 16-16s-7.2-16-16-16h-8V208c0-8.8-7.2-16-16-16H272c-8.8 0-16 7.2-16 16z"></path>
                            </svg>
                            Thanh toán khi nhận hàng</label>
                    </div>

                    <div className="flex items-center ps-4 border border-gray-200 rounded-sm dark:border-gray-700">
                        <input value={2} onChange={() => setPayMethod(2)}
                            id="bordered-radio-2" type="radio" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={() => setSelected(!selected)} required />
                        <label htmlFor="bordered-radio-2" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 flex gap-3 items-center">
                            <svg className="w-[25px] h-[25px] fill-blue-600" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
                                <path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path>
                            </svg>
                            Chuyển khoản qua ngân hàng</label>
                    </div>

                    {/* Nội dung xổ xuống */}
                    <> {selected && (
                        <div className="p-4 border border-gray-200 rounded-md dark:border-gray-700 flex flex-col items-center">
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                Nội dung chuyển khoản: Họ tên + Số điện thoại. VÍ DỤ: Nguyễn Văn B 8928258742
                            </p>
                            <img
                                src={Qr}
                                alt="Bank Transfer"
                                className="mt-2 rounded-md w-full max-w-xs"
                            />
                        </div>
                    )} </>

                    <div className="mt-8 space-y-2 w-full">
                        <button type="submit" className="text-sm px-4 py-2.5 w-3/5 mx-auto block dark:bg-white dark:text-black font-semibold tracking-wide bg-slate-800 hover:bg-slate-900 text-white rounded-md">Hoàn tất đặt hàng</button>
                    </div>
                </form>
            </div>

            <div className="bg-white rounded-md px-4 py-6 h-max shadow-[0_2px_12px_-3px_rgba(61,63,68,0.3)]">
                <ul className="text-slate-900 font-medium space-y-4">
                    <li className="flex flex-wrap gap-4 text-sm">Tổng tiền hàng <span className="ml-auto font-semibold">{formatCurrencyVND(totalPrice)}</span></li>
                    <li className="flex flex-wrap gap-4 text-sm">Phí vận chuyển <span className="ml-auto font-semibold">0₫</span></li>
                    <li className="flex flex-wrap gap-4 text-sm">Thuế <span className="ml-auto font-semibold">0₫</span></li>
                    <hr className="border-slate-300" />
                    <li className="flex flex-wrap gap-4 text-sm font-semibold">Thành tiền <span className="ml-auto">{formatCurrencyVND(totalPrice)}</span></li>
                </ul>

                {/* <div className="mt-8 space-y-2">
                    <Link to="/DeliveryInformation">
                        <button type="submit" className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-slate-800 hover:bg-slate-900 text-white rounded-md">Hoàn tất đặt hàng</button>
                    </Link>
                </div> */}

                {/* <div className="mt-4 flex flex-wrap justify-center gap-4">
                    <img src='https://readymadeui.com/images/master.webp' alt="card1" className="w-10 object-contain" />
                    <img src='https://readymadeui.com/images/visa.webp' alt="card2" className="w-10 object-contain" />
                    <img src='https://readymadeui.com/images/american-express.webp' alt="card3" className="w-10 object-contain" />
                </div> */}
            </div>
        </div>
    </div>)
}
export default DeliveryInfor;