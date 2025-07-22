import { useEffect, useState } from "react";
import DatePicker from "./util/DatePicker";
import { orderApi } from "../../../api-client/api";
import { OrderUpdate } from "./OrderContext";
import { alertError } from "../../Shared/AlertError";

interface OrderUpdationProps {
  updateId: string;
  toggleUpdate: () => void;
};

const OrderUpdation: React.FC<OrderUpdationProps> = ({ updateId, toggleUpdate }) => {
  const [order, setOrder] = useState<OrderUpdate>({
    id: "",
    deliveryDate: "",
    shippingStatus: "0",
    paymentStatus: "0",
    email: "",
  });

  const setDeliveryDate = (newDate: string) => {
    setOrder(prev => ({ ...prev, deliveryDate: newDate }));
  };

  const handleChildDelDate = (value: string) => {
    setDeliveryDate(value);
  };

  const setShippingStatus = (newStatus: string) => {
    setOrder(prev => ({ ...prev, shippingStatus: newStatus }));
  };

  const setPaymentStatus = (newStatus: string) => {
    setOrder(prev => ({ ...prev, paymentStatus: newStatus }));
  };

  useEffect(() => {
    if (!updateId) return;  // Chặn gọi API nếu id là undefined
    const fetchApi = async () => {
      try {
        const { data } = await orderApi.getUpdationById(updateId);
        setOrder(data);
      } catch (error) {
        console.error("Lỗi khi gọi API sản phẩm:", error);
      }
    };
    fetchApi();
  }, [updateId]);

  function formatDateString2(dateStr: string): string {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  }

  const updateOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userEmail = localStorage.getItem('email');

    try {
      const updatedOrder = {
        ...order,
        email: userEmail || "", // Gán email vào bản sao của order
      };

      await orderApi.updateOrder(updatedOrder); // Gửi bản đã cập nhật email
      window.location.reload();
    } catch (error: any) {
      alertError(error?.response?.data);
    }
  };
  
  return (
    <div className="relative p-4 w-full max-w-xl max-h-full">
      <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Cập nhật đơn hàng</h3>
          <button onClick={toggleUpdate}
            type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="updateOrderModal">
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <form onSubmit={updateOrder}>
          <div className="grid gap-4 mb-1 sm:grid-cols-1 border-b pb-8">
            {/* <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên</label>
              <input disabled type="text" name="name" id="name" value={""} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Ex. Apple iMac 27&ldquo;" />
            </div>
            <div>
              <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giá</label>
              <p className="block w-full"><input disabled type="number" value={""} name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="" required />₫</p>
            </div> */}
            <div>
              <DatePicker deliveryDate={formatDateString2(order.deliveryDate)}
                onValueChange={handleChildDelDate} />
            </div>

            <div>
              <label htmlFor="category" className="block mb-2 text-base font-medium text-dark dark:text-white">Trạng thái</label>
              <select
                id="category" value={order.shippingStatus}
                onChange={(e) => setShippingStatus(e.target.value)} className="bg-gray-50 border border-gray-300 focus:outline-none focus:border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black">
                <option value={1} className="bg-yellow-100">Đang giao</option>
                <option value={2} className="bg-green-100">Đã giao</option>
                {/* <option value={3} className="bg-red-100">Đã hủy</option> */}
                <option value={0} className="bg-blue-100">Chưa giao</option>
              </select>
            </div>

            <div>
              <label htmlFor="category" className="block mb-2 text-base font-medium text-dark dark:text-white">Thanh toán</label>
              <select
                id="category" value={order.paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)} className="bg-gray-50 border border-gray-300 focus:outline-none focus:border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black">
                <option value={1} className="bg-green-100">Đã thanh toán</option>
                <option value={0} className="bg-red-100">Chưa thanh toán</option>
              </select>
            </div>

          </div>

          <p className="text-left text-gray-400 text-sm">Cập nhật lần cuối: {order.email}</p>

          {/* <div className="flex items-center space-x-4"> */}
          <div className="flex items-center space-x-4 justify-end">
            <button type="submit" className="text-white bg-orange-700 hover:bg-orange-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700">Cập nhật</button>
            <button onClick={toggleUpdate}
              type="button" className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600">Hủy</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default OrderUpdation;