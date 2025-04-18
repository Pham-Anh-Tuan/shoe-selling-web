import Img1 from "../../assets/male-sneaker/sneaker.png";
import ImgWhite1 from "../../assets/male-sneaker/sneakerWhite1.png";
import ImgWhite2 from "../../assets/male-sneaker/sneakerWhite2.png";
import ImgWhite3 from "../../assets/male-sneaker/sneakerWhite3.png";

import Img1Blue from "../../assets/male-sneaker/sneaker-blue.png";
import Img1Blue1 from "../../assets/male-sneaker/sneakerBlue1.png";
import Img1Blue2 from "../../assets/male-sneaker/sneakerBlue2.png";
import Img1Blue3 from "../../assets/male-sneaker/sneakerBlue3.png";

import { FaStar, FaBagShopping } from "react-icons/fa6";
import { useEffect, useState } from "react";
import RelatedProducts from "./RelatedProducts";
import React, { useRef } from 'react';

import { GrSecure } from "react-icons/gr";
import { IoFastFood } from "react-icons/io5";
import { GiFoodTruck } from "react-icons/gi";
import { TbTruckDelivery } from "react-icons/tb";
import { FaExchangeAlt } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productDetailApi } from "../../api-client/api";
import formatCurrencyVND from '../../hooks/FormatCurrency';

const ProductDetail = () => {
    const [count, setCount] = useState<number>(1);
    const increase = () => setCount(count + 1);
    const decrease = () => setCount(count > 1 ? count - 1 : 1);

    const imgRef = useRef<HTMLImageElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const container = containerRef.current;
        const image = imgRef.current;

        if (container && image) {
            const rect = container.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            image.style.transformOrigin = `${x}% ${y}%`;
            image.classList.add('scale-150');
        }
    };

    const handleMouseLeave = () => {
        const image = imgRef.current;
        if (image) {
            image.style.transformOrigin = 'center center';
            image.classList.remove('scale-150');
        }
    }

    interface SizeQuantity {
        id: string;
        size: number;
        quantity: number;
    }
    interface Image {
        id: string;
        path: string | ArrayBuffer | null;
    }

    interface Color {
        id: string;
        colorHex: string;
        images: Image[];
        sizeQuantities: SizeQuantity[];
    }

    interface Product {
        id: string;
        productName: string;
        price: number;
        type: number;
        sideDes: string;
        mainDes: string;
        colors: Color[];
    }

    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);

    const [activeImg, setActiveImage] = useState('');
    const [currentImages, setCurrentImages] = useState<Image[] | null>();

    const [colorIndex, setColorIndex] = useState<number>(0);
    const [sizeIndex, setSizeIndex] = useState<number>(0);
    const [available, setAvailable] = useState<Boolean>(false);

    function checkQuantity(colorIndex: number, sizeQuantityIndex: number) {
        if (product !== null) {
            const isAvailable = product?.colors[colorIndex]?.sizeQuantities[sizeQuantityIndex].quantity > 0;
            setAvailable(isAvailable);
        }
    }

    useEffect(() => {
        if (!id) return;  // Chặn gọi API nếu id là undefined
        const fetchApi = async () => {
            try {
                const { data } = await productDetailApi.getById(id);
                setProduct(data);
                setCurrentImages(data.colors[0].images);
                setActiveImage(import.meta.env.VITE_API_URL + "/productImages/" + data.colors[0].images[0].path); // hoặc: setActiveImg(data.images[0])
            } catch (error) {
                console.error("Lỗi khi gọi API sản phẩm:", error);
            }
        };
        fetchApi();
    }, [id]);

    useEffect(() => {
        const quantity = product?.colors?.[colorIndex]?.sizeQuantities?.[sizeIndex]?.quantity;
        setAvailable(typeof quantity === 'number' && quantity > 0);
    }, [colorIndex, sizeIndex, product]);

    return (
        <div className="container">
            {/* product properties */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-14 mb-12">
                {/* product image */}
                <div className="">
                    <div className="overflow-hidden aspect-square group relative rounded-xl"
                        ref={containerRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}>
                        <img ref={imgRef} src={activeImg} alt="Zoomed" className="w-full aspect-square object-cover transform transition-transform duration-500 group-hover:scale-150" />

                    </div>
                    <div className='grid grid-cols-4 mt-4 w-full place-items-center gap-7'>
                        {currentImages && currentImages.map((image, i) => (
                            <img
                                key={i}
                                src={import.meta.env.VITE_API_URL + '/productImages/' + image.path}
                                alt=""
                                className='w-20 h-20 sm:w-28 sm:h-28 aspect-square object-cover rounded-md cursor-pointer'
                                onClick={() => setActiveImage(import.meta.env.VITE_API_URL + "/productImages/" + image.path)}
                            />
                        ))}
                    </div>
                </div>
                {/* product image end*/}

                {/* product content */}
                <div>
                    <h2 className="text-3xl font-medium uppercase mb-2">{product?.productName}</h2>
                    <div className="flex items-center mb-4">
                        <div className="flex gap-1 text-sm text-yellow-400">
                            <span><FaStar className="text-yellow-400" /></span>
                            <span><FaStar className="text-yellow-400" /></span>
                            <span><FaStar className="text-yellow-400" /></span>
                            <span><FaStar className="text-yellow-400" /></span>
                            <span><FaStar className="text-yellow-400" /></span>
                        </div>
                        <div className="text-xs text-gray-500 ml-3 dark:text-white">(150 Reviews)</div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-gray-800 font-semibold space-x-2">
                            <span className="dark:text-white">Tình trạng:</span>
                            <span className={available ? "text-green-600" : "text-red-600"}>
                                {available ? "Còn hàng" : "Hết hàng"}
                            </span>
                        </p>
                        <p className="text-gray-800 font-semibold space-x-2">
                            <span className="text-gray-800 font-semibold dark:text-white">Loại hàng:</span>
                            <span className="text-gray-600 dark:text-white">{product?.type === 1
                                ? "Giày thể thao nam"
                                : product?.type === 2
                                    ? "Sandal nam"
                                    : product?.type === 3
                                        ? "Giày cao gót"
                                        : product?.type === 4
                                            ? "Giày thể thao nữ"
                                            : "Không xác định"}</span>
                        </p>
                    </div>

                    <div className="flex items-baseline mb-1 space-x-2 mt-4">
                        <p className="text-2xl text-primary font-semibold"> {formatCurrencyVND(product?.price || 0)}</p>
                    </div>

                    <p className="mt-4 text-gray-600 dark:text-white">
                        {product?.mainDes}
                    </p>

                    {/* size filter */}
                    <div className="pt-4">
                        <h3 className="text-sm text-gray-800 uppercase mb-1 dark:text-white">KÍCH THƯỚC:</h3>
                        <div className="flex items-center gap-2">

                            {/* single size */}
                            {product?.colors[colorIndex].sizeQuantities.map((sizeQuantity, i) => (
                                <div className="size-selector">
                                    <input onChange={() => setSizeIndex(i)}
                                        type="radio" name="size" className="hidden" id={'size-' + i} defaultChecked={i === 0} />
                                    <label htmlFor={'size-' + i} className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600 dark:text-white">
                                        {sizeQuantity.size}
                                    </label>
                                </div>
                            ))}
                            {/* single size end */}
                        </div>
                    </div>
                    {/* size filter end */}

                    {/* color filter */}
                    <div className="pt-4">
                        <h3 className="text-sm text-gray-800 uppercase mb-1 dark:text-white">MÀU:</h3>
                        <div className="flex items-center gap-2">
                            {/* single color */}
                            {product?.colors.map((color, i) => (
                                <div className="color-selector">
                                    <input type="radio" name="color" className="hidden" id={"color-" + i} defaultChecked={i === 0} />
                                    {/* <label htmlFor="color-white" className="border border-gray-200 rounded-sm h-5 w-5 cursor-pointer shadow-sm bg-white block" onClick={() => setActiveImage(Img1)}></label> */}
                                    <label htmlFor={"color-" + i} className="border border-gray-200 rounded-sm h-5 w-5 cursor-pointer shadow-sm block"
                                        style={{ backgroundColor: color.colorHex }}
                                        onClick={() => {
                                            setCurrentImages(color.images);
                                            setActiveImage(import.meta.env.VITE_API_URL + "/productImages/" + color.images[0].path);
                                            setColorIndex(i);
                                        }}>
                                    </label>
                                </div>
                            ))}
                            {/* single color end*/}
                        </div>
                    </div>
                    {/* color filter end */}

                    {/* quantity */}
                    <div className="mt-4 ">
                        <h3 className="text-sm text-gray-800 uppercase mb-1 dark:text-white">SỐ LƯỢNG</h3>
                        <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
                            <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none dark:text-white" onClick={decrease}>-</div>
                            <div className="h-8 w-8 text-base flex items-center justify-center dark:text-white">{count}</div>
                            <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none dark:text-white" onClick={increase}>+</div>
                        </div>
                    </div>
                    {/* quantity end */}

                    {/* cart button */}
                    <div className="flex gap-3 border-b border-gray-200 pb-7 mt-6">
                        <a href="#" className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition">
                            <FaBagShopping /> Thêm vào giỏ hàng
                        </a>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                        <div data-aos="fade-up" className="flex items-center gap-4">
                            <TbTruckDelivery className="text-4xl h-10 w-10 shadow-sm p-2 rounded-full bg-violet-100 dark:bg-violet-400" />
                            <p>Miễn phí vận chuyển toàn quốc</p>
                        </div>
                        <div data-aos="fade-up" className="flex items-center gap-4">
                            <GiFoodTruck className="text-4xl h-10 w-10 shadow-sm p-2 rounded-full bg-orange-100 dark:bg-orange-400" />
                            <p>Giao hàng siêu nhanh</p>
                        </div>
                        <div data-aos="fade-up" className="flex items-center gap-4">
                            <FaExchangeAlt className="text-4xl h-10 w-10 shadow-sm p-2 rounded-full bg-green-100 dark:bg-green-400" />
                            <p>Đổi trả trong vòng 1 tháng</p>
                        </div>
                        <div data-aos="fade-up" className="flex items-center gap-4">
                            <FiPhone className="text-4xl h-10 w-10 shadow-sm p-2 rounded-full bg-yellow-100 dark:bg-yellow-400" />
                            <p>Hotline 1900 8897</p>
                        </div>
                    </div>
                    {/* cart button end */}
                </div>
                {/* product content end */}
            </div>
            {/* product properties end*/}

            {/* product description */}
            <div className="pb-16">
                <h3 className="border-b border-gray-200 text-gray-800 pb-3 font-medium dark:text-white">Mô tả sản phẩm</h3>
                <div className="lg:w-3/5 md:w-full pt-6">
                    <div className="text-gray-600 space-y-3 dark:text-white">
                        <p>Chất liệu cao cấp: Giày được làm từ da bò thật, mềm mại, bền bỉ, giúp ôm chân thoải mái và thoáng khí.</p>

                        <p>Thiết kế năng động: Phối màu trắng kem sang trọng với điểm nhấn sọc đen tạo phong cách trẻ trung, dễ dàng phối đồ.</p>

                        <p>Đế cao su đúc nguyên khối: Nhẹ, êm chân, hỗ trợ di chuyển linh hoạt và chống trơn trượt hiệu quả.</p>

                        <p>Gia công tỉ mỉ: Đường may chắc chắn, hoàn thiện tinh tế, đảm bảo độ bền lâu dài.</p>

                        <p>Ứng dụng linh hoạt: Phù hợp cho nhiều dịp: đi chơi, dạo phố, đi làm, du lịch,...</p>
                    </div>
                </div>
            </div>
            {/* product description end */}

            {/* related products */}
            <RelatedProducts />
            {/* related products end*/}
        </div>
    )
}
export default ProductDetail;