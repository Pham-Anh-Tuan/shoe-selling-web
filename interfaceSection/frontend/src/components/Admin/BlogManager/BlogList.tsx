import { useEffect, useState } from 'react';
import { BlogAdd } from './BlogAdd';
import { ManagerBlog } from './BlogInterface';
import { blogApi } from '../../../api-client/api';
import formatDateDMYHM from '../../../hooks/DateTimeFormat';
import { BlogUpdation } from './BlogUpdation';
import { alertError } from '../../Shared/AlertError';
import { ToastContainer } from 'react-toastify';
import Pagination from '../../../hooks/Pagination';

const BlogList = () => {
    const [showAdd, setShowAdd] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [updateId, setUpdateId] = useState<string>("");
    const [deleteId, setDeleteId] = useState<string>("");

    const toggleAdd = () => {
        setShowAdd(!showAdd);
    };
    const toggleUpdate = () => {
        setShowUpdate(!showUpdate);
    };

    const [page, setPage] = useState(0); // Trang hiện tại (bắt đầu từ 0)
    const [totalPages, setTotalPages] = useState(1); // Tổng số trang
    const [totalBlogs, setTotalBlogs] = useState(0);
    const [keyword, setKeyword] = useState("");

    const [managerBlogs, setManagerBlogs] = useState<ManagerBlog[]>([]);

    const loadBlogs = async (pageParam: number) => {
        try {
            const { data } = await blogApi.getManagerBlogs(pageParam, 5);
            setManagerBlogs(data.content);
            setTotalPages(data.totalPages);
            setTotalBlogs(data.totalElements);
            setPage(data.number); // hoặc pageParam
        } catch (error) {
            console.error("Lỗi gọi API:", error);
        }
    };

    const loadSearchResults = async (pageParam: number, e?: React.FormEvent) => {
        if (e) e.preventDefault();
        try {
            const { data } = await blogApi.searchManagerBlogs(keyword.trim(), pageParam, 5);
            setManagerBlogs(data.content);
            setTotalPages(data.totalPages);
            setTotalBlogs(data.totalElements);
            setPage(data.number);
        } catch (err) {
            console.error("Lỗi khi tìm sản phẩm:", err);
        }
    };

    useEffect(() => {
        setManagerBlogs([]);
        setPage(0); // reset page
        loadBlogs(0); // bắt đầu từ trang 0
    }, []);

    useEffect(() => {
        if (keyword.trim() === "") {
            loadBlogs(0);
        }
    }, [keyword]);

    const deleteBlog = async () => {
        try {
            await blogApi.deleteBlogById(deleteId);
            window.location.reload();
        } catch (error: any) {
            alertError(error?.response?.data);
        }
    };

    return (
        <div className='w-full p-4 bg-gray-100 dark:bg-gray-900 overflow-x-hidden mt-[60px]'>
            <section className="antialiased z-10">
                <div className="mx-auto w-full">

                    <div className=" bg-white dark:bg-gray-800 relative shadow-md rounded-md">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="flex-1 flex flex-col">
                                <h3 className="text-lg font-bold">
                                    Danh sách bài viết
                                </h3>
                                <span className="dark:text-white text-sm">Tổng số: {totalBlogs}</span>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="w-full md:w-1/2">
                            <form className="flex items-center" onSubmit={(e) => loadSearchResults(0, e)}>
                                    <label htmlFor="simple-search" className="sr-only">Search</label>
                                    <div className="relative w-full">
                                        <button
                                            type="submit"
                                            className="cursor-pointer absolute inset-y-0 left-0 flex items-center pl-3">
                                            <svg aria-hidden="true" className="hover:text-orange-500 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                        <input
                                            value={keyword}
                                            onChange={(e) => setKeyword(e.target.value)}
                                            type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Tìm kiếm theo tiêu đề bài viết" required />
                                    </div>
                                </form>
                            </div>
                            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <button onClick={toggleAdd}
                                    type="button" className="flex items-center justify-center text-white bg-primary hover:bg-orange-400 font-medium rounded-lg text-sm px-4 py-2 dark:bg-orange-600 dark:hover:bg-orange-700 ">
                                    <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                    </svg>
                                    Thêm bài viết
                                </button>
                            </div>
                        </div>
                        <div className="w-full overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-4 py-4 text-center">Tiêu đề</th>
                                        <th scope="col" className="px-4 py-3 text-center">Ảnh</th>
                                        <th scope="col" className="px-4 py-3 text-center">Ngày tạo</th>
                                        <th scope="col" className="px-4 py-3 text-center">Trạng thái</th>
                                        <th scope="col" className="px-4 py-3">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {managerBlogs.map((managerBlog) => (
                                        <tr key={managerBlog.id}
                                            className="border-b dark:border-gray-700">
                                            <th scope="row" className="px-4 py-3 font-medium text-gray-900  dark:text-white">
                                                <p className='w-44'> {managerBlog.title}</p>
                                            </th>
                                            <td className="py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <img
                                                    src={
                                                        typeof managerBlog.thumbnailName === 'string'
                                                            ? managerBlog.thumbnailName.startsWith('data:image') || managerBlog.thumbnailName.startsWith('blob:')
                                                                ? managerBlog.thumbnailName // ảnh mới upload
                                                                : import.meta.env.VITE_API_URL_THUMB_IMG + managerBlog.thumbnailName // ảnh từ server
                                                            : '/path/to/default-image.jpg'
                                                    }
                                                    alt="Blog"
                                                    className="max-w-[180px] w-auto h-[180px] object-cover rounded-md mx-auto"
                                                />
                                            </td>

                                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">{managerBlog?.createdAt ? formatDateDMYHM(managerBlog.createdAt) : ''}</td>

                                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                                {managerBlog?.status === 0
                                                    ? <dd className="me-2 inline-flex items-center rounded bg-red-100 px-2.5 py-2 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                                                        Inactive
                                                    </dd>
                                                    : managerBlog?.status === 1
                                                        ? <dd className="me-2 inline-flex items-center rounded bg-green-100 px-2.5 py-2 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                                                            Active
                                                        </dd> : "Không xác định"}
                                            </td>

                                            <td className="px-4 py-3">
                                                <div className="flex items-center space-x-4">
                                                    <button
                                                        onClick={() => {
                                                            setUpdateId(managerBlog.id);
                                                            toggleUpdate();
                                                        }}
                                                        type="button" className="w-28 py-2 px-3 flex items-center text-sm font-medium text-center text-white
                                                         bg-primary hover:bg-orange-400  rounded-lg dark:bg-orange-600 dark:hover:bg-orange-700">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 -ml-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                                            <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                                        </svg>
                                                        Cập nhật
                                                    </button>

                                                    {/* <button
                                                    type="button" className="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2 -ml-0.5">
                                                        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" />
                                                    </svg>
                                                    Xem
                                                </button> */}

                                                    <button onClick={() => {
                                                        setDeleteId(managerBlog.id);
                                                        const dropdown = document.getElementById("deleteAlertId");
                                                        dropdown?.classList.toggle("hidden");
                                                    }}
                                                        type="button" className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 -ml-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                        </svg>
                                                        Xóa
                                                    </button>

                                                </div>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={(page) => {
                                keyword.trim() ? loadSearchResults(page) : loadBlogs(page);
                            }}
                        />
                    </div>
                </div>
            </section >

            {showAdd && (
                <div tabIndex={-1} aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full bg-black bg-opacity-50">
                    <BlogAdd toggleAdd={toggleAdd} />
                </div>
            )}

            {showUpdate && (
                <div tabIndex={-1} aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full bg-black bg-opacity-50">
                    <BlogUpdation updateId={updateId} toggleUpdate={toggleUpdate} />
                </div>
            )}

            <div id="deleteAlertId"
                className="flex hidden fixed inset-0 z-50 items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <button onClick={() => {
                            document.getElementById("deleteAlertId")?.classList.add("hidden");
                        }}
                            type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <svg className="text-orange-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <p className="mb-4 text-gray-500 dark:text-gray-300">Bạn có chắc chắn muốn xóa bài viết này không?</p>
                        <div className="flex justify-center items-center space-x-4">
                            <button onClick={() => {
                                document.getElementById("deleteAlertId")?.classList.add("hidden");
                            }}
                                type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">Không</button>
                            <button onClick={() => {
                                deleteBlog();
                            }}
                                type="button" className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700">Có</button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div >
    )
}

export default BlogList;