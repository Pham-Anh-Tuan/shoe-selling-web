import { useEffect, useState } from "react";
import Qr from "../../assets/QRnhanTien.png";
import { orderApi } from "../../api-client/api";

interface DeliveryInfUpdationProps {
    updateId: string;
    toggleUpdate: () => void;
};

const DeliveryInfUpdation: React.FC<DeliveryInfUpdationProps> = ({ updateId, toggleUpdate }) => {
    const [selected, setSelected] = useState(false);

    interface OrderUpdate {
        id: string;
        phoneNumber: string;
        shippingAddress: string;
        payMethod: number;
        shippingStatus: number;
    }

    const [order, setOrder] = useState<OrderUpdate>({
        id: "",
        phoneNumber: "",
        shippingAddress: "",
        payMethod: 0,
        shippingStatus: 0
    });

    const setPhoneNumber = (phone: string) => {
        setOrder(prev => ({ ...prev, phoneNumber: phone }));
    };

    const setShippingAddress = (address: string) => {
        setOrder(prev => ({ ...prev, shippingAddress: address }));
    };

    const setPayMethod = (method: number) => {
        setOrder(prev => ({ ...prev, payMethod: method }));
    };

    useEffect(() => {
        if (!updateId) return;
        const fetchApi = async () => {
            try {
                const { data } = await orderApi.getUserUpdationById(updateId);
                setOrder(data);
            } catch (error) {
                console.error("Lỗi khi gọi API sản phẩm:", error);
            }
        };
        fetchApi();
    }, [updateId]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("id", updateId);
        formData.append("phoneNumber", order.phoneNumber);
        formData.append("shippingAddress", order.shippingAddress);
        formData.append("payMethod", order.payMethod.toString());

        try {
            await orderApi.updateUserOrder(formData);
            window.location.reload();
        } catch (error: any) {
            console.error("!", error);
        }
    }

    return (
        <div className="relative p-4 w-full max-w-xl max-h-full">
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Cập nhật thông tin giao hàng</h3>
                    <button onClick={toggleUpdate}
                        type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="updateDeliveryInf">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="address" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Địa chỉ</label>
                        <input type="address"
                            onChange={(e) => setShippingAddress(e.target.value)}
                            value={order.shippingAddress} name="address" id="address" placeholder="" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-gray-300 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    <div>
                        <label htmlFor="tel" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Số điện thoại</label>
                        <input type="tel"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            value={order.phoneNumber} name="tel" id="tel" placeholder="" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:border-gray-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
                    </div>

                    <h1 className="text-base font-medium text-slate-900 container dark:text-white px-0 py-3">Phương thức thanh toán</h1>
                    <div className="flex items-center ps-4 border border-gray-200 rounded-sm dark:border-gray-700">
                        <input value={1} checked={order.payMethod === 1}
                            onClick={() => setSelected(false)}
                            onChange={() => setPayMethod(1)}
                            type="radio" name="payMethod" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" required />
                        <label className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 flex gap-3 items-center">
                            <svg className="w-[25px] h-[25px] fill-green-600" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
                                <path d="M112 112c0 35.3-28.7 64-64 64V336c35.3 0 64 28.7 64 64H464c0-35.3 28.7-64 64-64V176c-35.3 0-64-28.7-64-64H112zM0 128C0 92.7 28.7 64 64 64H512c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM176 256a112 112 0 1 1 224 0 112 112 0 1 1 -224 0zm80-48c0 8.8 7.2 16 16 16v64h-8c-8.8 0-16 7.2-16 16s7.2 16 16 16h24 24c8.8 0 16-7.2 16-16s-7.2-16-16-16h-8V208c0-8.8-7.2-16-16-16H272c-8.8 0-16 7.2-16 16z"></path>
                            </svg>
                            Thanh toán khi nhận hàng</label>
                    </div>

                    <div className="flex items-center ps-4 border border-gray-200 rounded-sm dark:border-gray-700 mt-2">
                        <input value={2} checked={order.payMethod === 2}
                            onClick={() => setSelected(!selected)}
                            onChange={() => setPayMethod(2)}
                            type="radio" name="payMethod" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" required />
                        <label className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 flex gap-3 items-center">
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

                    <div className="flex items-center justify-end space-x-4 mt-5">
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cập nhật</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default DeliveryInfUpdation;