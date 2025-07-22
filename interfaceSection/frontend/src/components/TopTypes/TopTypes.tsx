import Img1 from "../../assets/hero/img1.png";
import Img2 from "../../assets/hero/img2.png";
import Img3 from "../../assets/hero/img3.png";
import { FaStar } from "react-icons/fa";

const ProductsData = [
  {
    id: 1,
    img: Img1,
    title: "Giày lười",
    description:
      "Hiện nay, giày lười nam là một mẫu giày được nhiều chàng ưa chuộng. Không chỉ đem đến sự thoải mái, tiện lợi mà những mẫu giày lười hiện nay cũng cực kỳ phong cách và thời thượng.",
    link: "/giay-luoi"
  },
  {
    id: 2,
    img: Img2,
    title: "Dép da nam",
    description:
      "Dép da nam không chỉ đơn thuần là một đôi dép, mà còn là phụ kiện thể hiện gu thẩm mỹ và phong cách của phái mạnh. Với chất liệu da cao cấp, thiết kế đa dạng, dép da nam mang đến sự thoải mái, bền bỉ và sang trọng cho người sử dụng.",
    link: "/dep-da-nam"
  },
  {
    id: 3,
    img: Img3,
    title: "Thắt lưng nam",
    description:
      "Trong thế giới thời trang nam giới, thắt lưng da bò thật luôn chiếm vị trí đặc biệt nhờ vẻ ngoài sang trọng, độ bền vượt trội và khả năng kết hợp linh hoạt với nhiều loại trang phục.",
    link: "/that-lung-nam"
  },
];
const TopTypes = () => {
  return (
    <div>
      <div className="container">
        {/* Header section */}
        <div className="text-left mb-24">
          {/* <p data-aos="fade-up" className="text-sm text-primary">
            Top Rated Products for you
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Best Products
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit
            asperiores modi Sit asperiores modi
          </p> */}
        </div>
        {/* Body section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 md:gap-5 place-items-center">
          {ProductsData.map((data) => (
            <div
              data-aos="zoom-in"
              className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-primary hover:text-white relative shadow-xl duration-300 group max-w-[300px]"
            >
              {/* image section */}
              <div className="h-[100px]">
                <img
                  src={data.img}
                  alt=""
                  className="max-w-[200px] block mx-auto transform -translate-y-40 group-hover:scale-105 duration-300 drop-shadow-md"
                />
              </div>
              {/* details section */}
              <div className="p-4 text-center -mt-8">
                {/* star rating */}
                <div className="w-full flex items-center justify-center gap-1">
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                </div>
                <h1 className="text-xl font-bold">{data.title}</h1>
                <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-3">
                  {data.description}
                </p>
                <a href={data.link}
                  className="inline-block bg-primary hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-primary"
                >
                  Xem thêm
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopTypes;