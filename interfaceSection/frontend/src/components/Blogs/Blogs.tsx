import React, { useEffect, useState } from 'react'
import { SumBlog } from '../Admin/BlogManager/BlogInterface';
import { blogApi } from '../../api-client/api';
import { useNavigate } from 'react-router-dom';

const Blogs = () => {
    const [sumBlogs, setSumBlogs] = useState<SumBlog[]>([]);

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    // const getSumBlogs = async () => {
    //     const { data } = await blogApi.getSumBlogs();
    //     console.log(data);
    //     setSumBlogs(data);
    // }

    const loadBlogs = async (pageParam: number) => {
        try {
            const { data } = await blogApi.getSumBlogs(pageParam, 12);
            setSumBlogs((prev) => [...prev, ...data.content]);
            setTotalPages(data.totalPages);
            setPage(data.number + 1); // cập nhật trang tiếp theo
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
        }
    };

    useEffect(() => {
        setSumBlogs([]);
        setPage(0); // reset page
        loadBlogs(0);
    }, []);

    const navigate = useNavigate();

    return (
        <div className="mt-10 mb-12">
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
                                            className="w-[350px] sm:w-[380px] h-[200px] object-cover rounded-md"
                                        />
                                    </div>
                                </div>
                                <div className="w-[350px] sm:w-[270px] md:w-[217px] lg:w-[217px] xl:w-[281px]">
                                    <h3 className="uppercase font-semibold hover:text-orange-500 cursor-pointer"
                                        style={{
                                            display: "-webkit-box",
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}>{data.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* view all button */}
                    {page < totalPages && (
                        <div className="flex justify-center">
                            <button onClick={() => loadBlogs(page)}
                                className="text-center mt-10 cursor-pointer bg-primary text-white py-1 px-5 rounded-md">
                                XEM THÊM
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};


export default Blogs;