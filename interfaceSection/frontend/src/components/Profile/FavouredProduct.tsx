import Img1 from "../../assets/male-sneaker/sneaker.png";
import Img2 from "../../assets/male-sneaker/sneaker2.png";
import Img3 from "../../assets/male-sneaker/sneaker3.png";
import Img4 from "../../assets/male-sneaker/sneaker4.png";
import Img5 from "../../assets/male-sneaker/sneaker5.png";
import Img6 from "../../assets/male-sneaker/sneaker6.png";
import Button from "../Shared/Button";
import { Link } from "react-router-dom";

const FavouredProduct = () => {
    const ProductsData = [
        {
            id: 1,
            img: Img1,
            title: "Giày Thể Thao Sneaker MULGATI YC25051P",
            rating: 5.0,
            color: "white",
            price: "2,200,000₫",
            aosDelay: "0",
        },
        {
            id: 2,
            img: Img2,
            title: "Giày Thể Thao Sneaker MULGATI HX483A",
            rating: 4.5,
            color: "Red",
            price: "2,400,000₫",
            aosDelay: "200",
        },
        {
            id: 3,
            img: Img3,
            title: "Giày Sneaker MULGATI HX487A",
            rating: 4.7,
            color: "brown",
            price: "2,400,000₫",
            aosDelay: "400",
        },
        {
            id: 4,
            img: Img4,
            title: "Giày Thể Thao MULGATI Urban Runner S383",
            rating: 4.4,
            color: "Yellow",
            price: "1,990,000₫",
            aosDelay: "600",
        },
        {
            id: 5,
            img: Img5,
            title: "Giày Thể Thao Sneaker Classic Retro M32016",
            rating: 4.5,
            color: "Pink",
            price: "2,400,000₫",
            aosDelay: "800",
        },
        {
            id: 6,
            img: Img6,
            title: "Giày Thể Thao MULGATI Trekker M31099",
            rating: 4.5,
            color: "Pink",
            price: "2,700,000₫",
            aosDelay: "800",
        },
    ];
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
                        {ProductsData.map((data) => (
                            <div key={data.id}>
                                <div
                                    data-aos="fade-up"
                                    data-aos-delay={data.aosDelay}
                                    className="group space-y-3"
                                >
                                    <div className="relative">
                                        <img
                                            src={data.img}
                                            alt=""

                                            className="w-[380px] h-[300px] object-cover rounded-md"
                                        />
                                        {/* hover button*/}
                                        <div className="hidden group-hover:flex absolute top-1/2 -translate-y-1/2 
                left-1/2 -translate-x-1/2 h-full w-full text-center
                group-hover:backdrop-blur-sm justify-center 
                items-center duration-200">
                                            <Link to="/ProductDetail">
                                                <Button
                                                    text={"Xem chi tiết"}
                                                    bgColor={"bg-primary"}
                                                    textColor={"text-white"} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="sm:w-[217px] md:w-[217px] lg:w-[217px] xl:w-[281px]">
                                    <h3 className="uppercase truncate text-center">{data.title}</h3>
                                    <p className="text-sm text-gray-600 font-bold text-center dark:text-white">{data.price}</p>
                                    <div className="flex items-center justify-center gap-2">
                                        {/* single color */}
                                        <div className="color-selector">
                                            <input type="radio" name="color" className="hidden" id="color-white" />
                                            <label htmlFor="color-white" className="border border-gray-200 rounded-full h-6 w-6 cursor-pointer shadow-sm bg-white block"></label>
                                        </div>
                                        {/* single color end*/}

                                        {/* single color */}
                                        <div className="color-selector">
                                            <input type="radio" name="color" className="hidden" id="color-blue" />
                                            <label htmlFor="color-blue" className="text-xs border border-gray-200 rounded-full h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm bg-blue-950"></label>
                                        </div>
                                        {/* single color end*/}
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
    )
}

export default FavouredProduct;