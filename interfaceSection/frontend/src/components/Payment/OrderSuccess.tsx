import { FaRegCheckCircle } from "react-icons/fa"; 

const OrderSuccess = () => {
  return (
    <div className="flex items-center justify-center bg-gray-100 py-20">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
        <FaRegCheckCircle className="mx-auto text-green-500 w-16 h-16" />
        <h1 className="text-2xl font-bold text-gray-800 mt-4">Đặt hàng thành công!</h1>
        <p className="text-gray-600 mt-2">
          Cảm ơn bạn đã mua hàng. Chúng tôi sẽ xử lý đơn hàng của bạn trong thời gian sớm nhất.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <a href="/" className="bg-orange-600 text-white px-5 py-2 rounded-xl hover:bg-orange-700 transition cursor-pointer">
            Về trang chủ
          </a>
          <a href="orders" className="border border-orange-600 text-orange-600 px-5 py-2 rounded-xl hover:bg-orange-50 transition cursor-pointer">
            Xem đơn hàng
          </a>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
