import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { homeProductsApi } from "../../api-client/api";
import formatCurrencyVND from '../../hooks/FormatCurrency';
import { FaHeart } from "react-icons/fa6";

interface ColorWithImage {
  colorHex: string;
  mainImage: string;
}

interface Product {
  id: string;
  productName: string;
  price: number;
  colors: ColorWithImage[];
}

const Products = () => {
  const [productsData, setProductsData] = useState<Product[]>([]);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const updateLogStatus = () => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!token);
  };

  useEffect(() => {
    const fetchApi = async () => {
      const { data } = await homeProductsApi.getAll();
      console.log("call homeProductsApi");
      setProductsData(data);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    updateLogStatus();
    // Tạo một sự kiện tuỳ chỉnh khi đăng nhập và đăng xuất
    const handleLogChange = () => {
      updateLogStatus();
    };

    window.addEventListener('logStatus', handleLogChange);

    return () => {
      window.removeEventListener('logStatus', handleLogChange);
    };
  }, []);

  const [selectedColors, setSelectedColors] = useState<{ [key: number]: number }>({});
  const navigate = useNavigate();
  return (
    <div className="mt-14 mb-12">
      <div className="container">
        {/* Header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            SẢN PHẨM MỚI NHẤT
          </h1>
        </div>
        {/* Body section */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-5">
            {productsData.map((data, index) => (
              <div key={data.id}>
                <div
                  data-aos="fade-up"
                  className="group space-y-3"
                >
                  <div
                    className="relative cursor-pointer">
                    <img
                      src={import.meta.env.VITE_API_URL_IMG + data.colors[selectedColors[index] ?? 0].mainImage}
                      alt=""
                      onClick={() => navigate(`/ProductDetail/${data.id}`)}
                      className="w-[380px] h-[300px] object-cover rounded-md"
                    />
                    {!isLoggedIn && (
                      <div className="absolute top-4 left-4">
                        <FaHeart className='text-gray-400 text-2xl hover:text-red-500' />
                      </div>
                    )}
                  </div>
                </div>
                <div className="sm:w-[217px] md:w-[217px] lg:w-[217px] xl:w-[281px]">
                  <h3 className="uppercase truncate text-center">{data.productName}</h3>
                  <p className="text-sm text-gray-600 font-bold text-center dark:text-white"> {formatCurrencyVND(data?.price || 0)}</p>
                  <div className="flex items-center justify-center gap-2">
                    {data.colors.map((color, i) => (
                      <div key={i} className="color-selector">
                        <input onChange={() =>
                          setSelectedColors((prev) => ({ ...prev, [index]: i }))
                        }
                          type="radio" name={`color-${index}`} className="hidden" id={`color-${index}-${i}`} />
                        <label style={{ backgroundColor: color.colorHex }}
                          htmlFor={`color-${index}-${i}`} className="text-xs border border-gray-200 rounded-full h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm"></label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* view all button */}
          <div className="flex justify-center">
            <button className="text-center mt-10 cursor-pointer bg-primary text-white py-1 px-5 rounded-md">
              XEM THÊM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;