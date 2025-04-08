import Img1 from "../../assets/male-sneaker/sneaker.png";
import ImgWhite1 from "../../assets/male-sneaker/sneakerWhite1.png";
import ImgWhite2 from "../../assets/male-sneaker/sneakerWhite2.png";
import ImgWhite3 from "../../assets/male-sneaker/sneakerWhite3.png";

import Img1Blue from "../../assets/male-sneaker/sneaker-blue.png";
import Img1Blue1 from "../../assets/male-sneaker/sneakerBlue1.png";
import Img1Blue2 from "../../assets/male-sneaker/sneakerBlue2.png";
import Img1Blue3 from "../../assets/male-sneaker/sneakerBlue3.png";

import { FaStar, FaBagShopping } from "react-icons/fa6";
import { useState } from "react";
import RelatedProducts from "./RelatedProducts";
import React, { useRef } from 'react';

import { GrSecure } from "react-icons/gr";
import { IoFastFood } from "react-icons/io5";
import { GiFoodTruck } from "react-icons/gi";
import { TbTruckDelivery } from "react-icons/tb";
import { FaExchangeAlt } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";

const ProductDetail = () => {
    const [count, setCount] = useState<number>(1);
    const increase = () => setCount(count + 1);
    const decrease = () => setCount(count > 1 ? count - 1 : 1);

    const [whiteImages, setWhiteImages] = useState({
        img0: Img1,
        img1: ImgWhite1,
        img2: ImgWhite2,
        img3: ImgWhite3,
    })

    const [blueImages, setBlueImages] = useState({
        img0: Img1Blue,
        img1: Img1Blue1,
        img2: Img1Blue2,
        img3: Img1Blue3,
    })

    const [activeImg, setActiveImage] = useState(Img1);
    const [currentImages, setCurrentImages] = useState(whiteImages);

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
                        {/* <img src={whiteImages.img0} alt="" className='w-28 h-28 aspect-square object-cover rounded-md cursor-pointer' onClick={() => setActiveImage(whiteImages.img0)} />
                        <img src={whiteImages.img1} alt="" className='w-28 h-28 aspect-square object-cover rounded-md cursor-pointer' onClick={() => setActiveImage(whiteImages.img1)} />
                        <img src={whiteImages.img2} alt="" className='w-28 h-28 aspect-square object-cover rounded-md cursor-pointer' onClick={() => setActiveImage(whiteImages.img2)} />
                        <img src={whiteImages.img3} alt="" className='w-28 h-28 aspect-square object-cover rounded-md cursor-pointer' onClick={() => setActiveImage(whiteImages.img3)} /> */}
                        {Object.entries(currentImages).map(([key, src]) => (
                            <img
                                key={key}
                                src={src}
                                alt=""
                                className='w-20 h-20 sm:w-28 sm:h-28 aspect-square object-cover rounded-md cursor-pointer'
                                onClick={() => setActiveImage(src)}
                            />
                        ))}
                    </div>
                </div>
                {/* product image end*/}

                {/* product content */}
                <div>
                    <h2 className="text-3xl font-medium uppercase mb-2">Giày Thể Thao Sneaker MULGATI YC25051P</h2>
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
                            <span className="text-green-600">Còn hàng</span>
                        </p>
                        <p className="text-gray-800 font-semibold space-x-2">
                            <span className="text-gray-800 font-semibold dark:text-white">Loại hàng:</span>
                            <span className="text-gray-600 dark:text-white">Giày thể thao nam</span>
                        </p>
                    </div>

                    <div className="flex items-baseline mb-1 space-x-2 mt-4">
                        <p className="text-2xl text-primary font-semibold">2,200,000₫</p>
                    </div>

                    <p className="mt-4 text-gray-600 dark:text-white">
                        Giày Sneaker Da Bò Nam MULGATI - Màu Trắng Kem, Phong Cách Thể Thao, Đế Cao Su Êm Ái
                    </p>

                    {/* size filter */}
                    <div className="pt-4">
                        <h3 className="text-sm text-gray-800 uppercase mb-1 dark:text-white">KÍCH THƯỚC:</h3>
                        <div className="flex items-center gap-2">
                            {/* single size */}
                            <div className="size-selector">
                                <input type="radio" name="size" className="hidden" id="size-38" defaultChecked />
                                <label htmlFor="size-38" className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600 dark:text-white">
                                    38
                                </label>
                            </div>
                            {/* single size end */}
                            {/* single size */}
                            <div className="size-selector">
                                <input type="radio" name="size" className="hidden" id="size-39" />
                                <label htmlFor="size-39" className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600 dark:text-white">
                                    39
                                </label>
                            </div>
                            {/* single size end */}
                            {/* single size */}
                            <div className="size-selector">
                                <input type="radio" name="size" className="hidden" id="size-40" />
                                <label htmlFor="size-40" className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600 dark:text-white">
                                    40
                                </label>
                            </div>
                            {/* single size end */}
                        </div>
                    </div>
                    {/* size filter end */}

                    {/* color filter */}
                    <div className="pt-4">
                        <h3 className="text-sm text-gray-800 uppercase mb-1 dark:text-white">MÀU:</h3>
                        <div className="flex items-center gap-2">
                            {/* single color */}
                            <div className="color-selector">
                                <input type="radio" name="color" className="hidden" id="color-white" defaultChecked />
                                {/* <label htmlFor="color-white" className="border border-gray-200 rounded-sm h-5 w-5 cursor-pointer shadow-sm bg-white block" onClick={() => setActiveImage(Img1)}></label> */}
                                <label htmlFor="color-white" className="border border-gray-200 rounded-sm h-5 w-5 cursor-pointer shadow-sm bg-white block"
                                    onClick={() => {
                                        setCurrentImages(whiteImages);
                                        setActiveImage(whiteImages.img0);
                                    }}>
                                </label>
                            </div>
                            {/* single color end*/}

                            {/* single color */}
                            <div className="color-selector">
                                <input type="radio" name="color" className="hidden" id="color-blue" />
                                {/* <label htmlFor="color-blue" className="text-xs border border-gray-200 rounded-sm h-5 w-5 flex items-center justify-center cursor-pointer shadow-sm bg-blue-950" onClick={() => setActiveImage(Img1Blue)}></label> */}
                                <label htmlFor="color-blue" className="text-xs border border-gray-200 rounded-sm h-5 w-5 flex items-center justify-center cursor-pointer shadow-sm bg-blue-950"
                                    onClick={() => {
                                        setCurrentImages(blueImages);
                                        setActiveImage(blueImages.img0);
                                    }}>
                                </label>
                            </div>
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