import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { productApi } from "../../api-client/api";
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

interface RelatedProductsProps {
  excludedId: string;
  types: number[];
};

const RelatedProducts: React.FC<RelatedProductsProps> = ({ excludedId, types }) => {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  // const [types, setTypes] = useState<number[]>([]);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const [selectedColors, setSelectedColors] = useState<{ [key: number]: number }>({});

  const navigate = useNavigate();

  const updateLogStatus = () => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!token);
  };

  const loadProducts = async (typesParam: number[], pageParam: number) => {
    try {
      const { data } = await productApi.getRelatedProducts(typesParam, excludedId, pageParam, 8);
      setProductsData((prev) => [...prev, ...data.content]);
      setTotalPages(data.totalPages);
      setPage(data.number + 1); // cập nhật trang tiếp theo
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };


  useEffect(() => {
    updateLogStatus();
    loadProducts(types, 0); // load theo type
  }, []);

  return (
    <div className="border-t border-gray-200 pt-8">
      {/* Header section */}
      <div className="text-center mb-10 max-w-[600px] mx-auto">
        <h1 data-aos="fade-up" className="text-3xl font-bold">
          SẢN PHẨM TƯƠNG TỰ
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
                    onClick={() => navigate(`/productDetail/${data.id}`)}
                    className="w-[350px] sm:w-[380px] h-[300px] object-cover rounded-md"
                  />
                  {!isLoggedIn && (
                    <div className="absolute top-4 left-4">
                      <FaHeart className='text-gray-400 text-2xl hover:text-red-500' />
                    </div>
                  )}
                </div>
              </div>
              <div className="w-[350px] sm:w-[270px] md:w-[217px] lg:w-[217px] xl:w-[281px]">
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

        {page < totalPages && (
          <div className="flex justify-center">
            <button className="text-center mt-10 cursor-pointer bg-primary text-white py-1 px-5 rounded-md"
              onClick={() => loadProducts(types, page)}>
              XEM THÊM
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default RelatedProducts;