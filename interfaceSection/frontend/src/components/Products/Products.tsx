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

const Products = () => {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [types, setTypes] = useState<number[]>([]);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const [selectedColors, setSelectedColors] = useState<{ [key: number]: number }>({});

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword")?.trim() || "";
  const [totalProducts, setTotalProducts] = useState(0);

  const [category, setCategory] = useState<string>("SẢN PHẨM MỚI NHẤT");

  const updateLogStatus = () => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!token);
  };

  const getTypesFromPath = (path: string): number[] => {
    switch (path) {
      case "/giay-nam":
        setCategory("GIÀY NAM")
        return [1, 2, 3, 4];
      case "/giay-the-thao":
        setCategory("GIÀY THỂ THAO")
        return [1];
      case "/giay-luoi":
        setCategory("GIÀY LƯỜI")
        return [2];
      case "/giay-boots":
        setCategory("GIÀY BOOTS")
        return [3];
      case "/giay-tay-derby":
        setCategory("GIÀY TÂY DERBY")
        return [4];
      case "/dep-da-nam":
        setCategory("DÉP DA NAM")
        return [5];
      case "/phu-kien":
        setCategory("PHỤ KIỆN")
        return [6, 7];
      case "/tui-cam-tay-nam":
        setCategory("TÚI CẦM TAY NAM")
        return [6];
      case "/that-lung-nam":
        setCategory("THẮT LƯNG NAM")
        return [7];
      default:
        setCategory("SẢN PHẨM NỔI BẬT")
        return [1];
    }
  };

  const loadProducts = async (typesParam: number[], pageParam: number) => {
    try {
      const { data } = await productApi.getProductByType(typesParam, pageParam, 12);
      setProductsData((prev) => [...prev, ...data.content]);
      setTotalPages(data.totalPages);
      setPage(data.number + 1); // cập nhật trang tiếp theo
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  const loadSearchResults = async (pageParam: number) => {
    try {
      const { data } = await productApi.searchProducts(keyword, pageParam, 12);
      setProductsData((prev) => [...prev, ...data.content]);
      setTotalPages(data.totalPages);
      setPage(data.number + 1);
      setTotalProducts(data.totalElements);
    } catch (err) {
      console.error("Lỗi khi tìm sản phẩm:", err);
    }
  };

  useEffect(() => {
    setProductsData([]); // reset
    setPage(0);

    if (keyword) {
      setCategory("TÌM KIẾM");
      loadSearchResults(0); // tìm kiếm
    } else {
      const pathTypes = getTypesFromPath(location.pathname);
      setTypes(pathTypes);
      loadProducts(pathTypes, 0); // load theo type
    }
  }, [location.pathname, keyword]);

  useEffect(() => {
    updateLogStatus();
  }, []);



  return (
    <div className="mt-12 mb-12">
      <div className="container">
        {/* Header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            {category}
          </h1>
          <div className="h-1 w-16 bg-primary mx-auto mt-2 rounded-full"></div>
          {keyword && (
            <p className="text-base mt-2">
              Có {totalProducts} sản phẩm cho tìm kiếm
            </p>
          )}
        </div>

        {keyword && (
          <div className="mb-4 mt-[-30px]">
            <p className="text-sm text-gray-800">
              Kết quả tìm kiếm cho <span className="font-bold">"{keyword}"</span>.
            </p>
          </div>
        )}

        {/* {keyword && (
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-1">
              Kết quả tìm kiếm cho "<span className="font-medium">{keyword}</span>"
            </p>
            <p className="text-lg font-semibold">
              Có {productsData.length} sản phẩm cho tìm kiếm
            </p>
          </div>
        )} */}

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
          {/* view all button */}
          {/* <div className="flex justify-center">
            <button className="text-center mt-10 cursor-pointer bg-primary text-white py-1 px-5 rounded-md">
              XEM THÊM
            </button>
          </div> */}
          {page < totalPages && (
            <div className="flex justify-center">
              <button
                className="text-center mt-10 cursor-pointer bg-primary text-white py-1 px-5 rounded-md"
                onClick={() => keyword ? loadSearchResults(page) : loadProducts(types, page)}
              >
                XEM THÊM
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Products;