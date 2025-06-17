import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { blogApi } from '../../api-client/api';
import { BlogInf } from '../Admin/BlogManager/BlogInterface';
import formatDateDMYHM from '../../hooks/DateTimeFormat';

const BlogDetail = () => {
    const { id } = useParams<{ id: string }>();

    const [blog, setBlog] = useState<BlogInf | null>(null);

    useEffect(() => {
        if (!id) return;  // Chặn gọi API nếu id là undefined
        const fetchApi = async () => {
            try {
                const { data } = await blogApi.getBlogPage(id);
                console.log(data);
                setBlog(data);
            } catch (error) {
                console.error("Lỗi khi gọi API bài viết:", error);
            }
        };
        fetchApi();
    }, [id]);

    return (
        <div className="py-10 dark:bg-gray-950">
            <div className="container">
                <h1 className='text-center font-bold text-2xl mb-6'>{blog?.title}</h1>
                <p className='text-end text-sm mb-4'>{blog?.createdAt ? formatDateDMYHM(blog.createdAt) : ''}</p>

                {blog?.content && (
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                )}
                {/* {blog?.content} */}
            </div>
        </div>
    )
}

export default BlogDetail;