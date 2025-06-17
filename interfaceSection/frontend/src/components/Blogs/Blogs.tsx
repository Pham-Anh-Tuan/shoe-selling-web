import React, { useEffect, useState } from 'react'
import { SumBlog } from '../Admin/BlogManager/BlogInterface';
import { blogApi } from '../../api-client/api';
import { useNavigate } from 'react-router-dom';

const Blogs = () => {
    const [sumBlogs, setSumBlogs] = useState<SumBlog[]>([]);

    const getSumBlogs = async () => {
        const { data } = await blogApi.getSumBlogs();
        console.log(data);
        setSumBlogs(data);
    }

    useEffect(() => {
        getSumBlogs();
    }, []);

    const navigate = useNavigate();

    return (
        <div className="mt-14 mb-12">
            <div className="container">
                {/* Header section */}
                <div className="text-center mb-10 max-w-[600px] mx-auto">
                    <h1 data-aos="fade-up" className="text-3xl font-bold">
                        TẤT CẢ BÀI VIẾT
                    </h1>
                </div>
                {/* Body section */}
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-5">
                        {sumBlogs.map((data) => (
                            <div key={data.id} onClick={() => navigate(`/blogDetail/${data.id}`)}>
                                <div
                                    data-aos="fade-up"
                                    className="group space-y-3"
                                >
                                    <div
                                        className="relative cursor-pointer">
                                        <img
                                            src={import.meta.env.VITE_API_URL_THUMB_IMG + data.thumbnailName + ""}
                                            alt=""
                                            // onClick={() => navigate(`/productDetail/${data.id}`)}
                                            className="w-[380px] h-[200px] object-cover rounded-md"
                                        />
                                    </div>
                                </div>
                                <div className="sm:w-[217px] md:w-[217px] lg:w-[217px] xl:w-[281px]">
                                    <h3 className="uppercase font-semibold hover:text-orange-500 cursor-pointer"
                                        style={{
                                            display: "-webkit-box",
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}>{data.title}</h3>
                                    {/* <p className="text-sm text-gray-600 font-bold text-center dark:text-white"> ádasdasd</p> */}
                                    <div className="flex items-center justify-center gap-2">
                                        {/* {data.colors.map((color, i) => (
                                            <div key={i} className="color-selector">
                                                <input onChange={() =>
                                                    setSelectedColors((prev) => ({ ...prev, [index]: i }))
                                                }
                                                    type="radio" name={`color-${index}`} className="hidden" id={`color-${index}-${i}`} />
                                                <label style={{ backgroundColor: color.colorHex }}
                                                    htmlFor={`color-${index}-${i}`} className="text-xs border border-gray-200 rounded-full h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm"></label>
                                            </div>
                                        ))} */}
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


export default Blogs;