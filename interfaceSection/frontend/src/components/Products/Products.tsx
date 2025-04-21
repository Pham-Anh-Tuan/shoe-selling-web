import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { homeProductsApi } from "../../api-client/api";
import formatCurrencyVND from '../../hooks/FormatCurrency';

// const ProductsData = [
//   {
//     id: 1,
//     img: Img1,
//     title: "Giày Thể Thao Sneaker MULGATI YC25051P",
//     rating: 5.0,
//     color: "white",
//     price: "2,200,000₫",
//     aosDelay: "0",
//   },
//   {
//     id: 2,
//     img: Img2,
//     title: "Giày Thể Thao Sneaker MULGATI HX483A",
//     rating: 4.5,
//     color: "Red",
//     price: "2,400,000₫",
//     aosDelay: "200",
//   },
//   {
//     id: 3,
//     img: Img3,
//     title: "Giày Sneaker MULGATI HX487A",
//     rating: 4.7,
//     color: "brown",
//     price: "2,400,000₫",
//     aosDelay: "400",
//   },
//   {
//     id: 4,
//     img: Img4,
//     title: "Giày Thể Thao MULGATI Urban Runner S383",
//     rating: 4.4,
//     color: "Yellow",
//     price: "1,990,000₫",
//     aosDelay: "600",
//   },
//   {
//     id: 5,
//     img: Img5,
//     title: "Giày Thể Thao Sneaker Classic Retro M32016",
//     rating: 4.5,
//     color: "Pink",
//     price: "2,400,000₫",
//     aosDelay: "800",
//   },
//   {
//     id: 6,
//     img: Img6,
//     title: "Giày Thể Thao MULGATI Trekker M31099",
//     rating: 4.5,
//     color: "Pink",
//     price: "2,700,000₫",
//     aosDelay: "800",
//   },
// ];

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

  useEffect(() => {
    const fetchApi = async () => {
      const { data } = await homeProductsApi.getAll();
      setProductsData(data);
    };
    fetchApi();
  }, []);

  const [selectedColors, setSelectedColors] = useState<{ [key: number]: number }>({});
  const navigate = useNavigate();
  return (
    <div className="mt-14 mb-12">
      <div className="container">
        {/* Header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            SẢN PHẨM NỔI BẬT
          </h1>
        </div>
        {/* Body section */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-5">
            {/* card section */}
            {productsData.map((data, index) => (
              <div>
                <div
                  data-aos="fade-up"
                  key={data.id}
                  className="group space-y-3"
                >
                  <div className="relative">
                    <img
                      src={import.meta.env.VITE_API_URL_IMG + data.colors[selectedColors[index] ?? 0].mainImage}
                      alt=""

                      className="w-[380px] h-[300px] object-cover rounded-md"
                    />
                    {/* hover button*/}
                    <div className="hidden group-hover:flex absolute top-1/2 -translate-y-1/2 
                left-1/2 -translate-x-1/2 h-full w-full text-center
                group-hover:backdrop-blur-sm justify-center 
                items-center duration-200">

                      <button
                        onClick={() => navigate(`/ProductDetail/${data.id}`)}
                        className="bg-primary text-white cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full relative z-10"
                      > Xem chi tiết </button>

                    </div>
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