import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { favoriteApi } from "../../api-client/api";
import { FaHeart } from "react-icons/fa6";
import { alertSuccess } from "../Shared/AlertSuccess";
import { alertError } from "../Shared/AlertError";
import formatCurrencyVND from "../../hooks/FormatCurrency";
import Pagination from "../../hooks/Pagination";

const FavouredProduct = () => {
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

    const [productsData, setProductsData] = useState<Product[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [selectedColors, setSelectedColors] = useState<{ [key: number]: number }>({});
    const navigate = useNavigate();
    const updateLogStatus = () => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!token);
    };

    const loadProducts = async (pageParam: number) => {
        try {
            const email = localStorage.getItem("email");
            if (email) {
                const { data } = await favoriteApi.getFavorites(email, pageParam, 6);
                setProductsData(data.content);
                setTotalPages(data.totalPages);
                setPage(data.number); // cập nhật trang tiếp theo
            }
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
        }
    };

    useEffect(() => {
        setProductsData([]);
        setPage(0);
        updateLogStatus();
        loadProducts(0);
        loadFavoriteProducts();
    }, []);

    const handleToggleFavorite = async (productId: string) => {
        try {
            const email = localStorage.getItem("email");
            if (email) {
                const response = await favoriteApi.toggleFavorite(email, productId);
                // Toggle trong local state
                setFavoriteProductIds((prev) =>
                    prev.includes(productId)
                        ? prev.filter((id) => id !== productId)
                        : [...prev, productId]
                );

                alertSuccess(response.data);
            }
        } catch (error: any) {
            alertError(error?.response?.data);
        }
    };

    const [favoriteProductIds, setFavoriteProductIds] = useState<string[]>([]);

    const loadFavoriteProducts = async () => {
        try {
            const email = localStorage.getItem("email");
            if (!email) return;
            let response = await favoriteApi.getFavoriteProductIds(email);
            let data = response.data;
            setFavoriteProductIds(data);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách yêu thích:", error);
        }
    };

    return (
        <div className="flex-1 mb-2">
            <div className="">
                {/* Header section */}
                <div className="mb-5 max-w-[600px]">
                    <h1 data-aos="fade-up" className="text-lg font-semibold">
                        SẢN PHẨM YÊU THÍCH
                    </h1>
                </div>
                {/* Body section */}
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-5">
                        {/* card section */}
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
                                            <div
                                                className="absolute top-4 left-4 cursor-pointer"
                                                onClick={() => handleToggleFavorite(data.id)}
                                            >
                                                <FaHeart
                                                    className={
                                                        favoriteProductIds.includes(data.id)
                                                            ? "text-red-500 text-2xl"
                                                            : "text-gray-400 text-2xl hover:text-red-500"
                                                    }
                                                />
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

                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={(page) => {
                            loadProducts(page);
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default FavouredProduct;