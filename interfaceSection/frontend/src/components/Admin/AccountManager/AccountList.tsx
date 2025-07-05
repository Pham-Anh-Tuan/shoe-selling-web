import { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import { accountApi } from "../../../api-client/api";
import formatDateDMYHM from "../../../hooks/DateTimeFormat";
import Pagination from "../../../hooks/Pagination";
import { AccountAdd } from "./AccountAdd";
import { AccountUpdation } from "./AccountUpdation";

const AccountList = () => {
    const [showAdd, setShowAdd] = useState(false);
    const toggleAdd = () => {
        setShowAdd(!showAdd);
    };

    const [showUpdate, setShowUpdate] = useState(false);
    const [updateId, setUpdateId] = useState<string>("");
    const toggleUpdate = () => {
        setShowUpdate(!showUpdate);
    };

    interface Account {
        id: string;
        email: string;
        fullName: string;
        role: number;
        status: number;
        createdAt: string;
    }

    const [accountsData, setAccountsData] = useState<Account[]>([]);


    const [page, setPage] = useState(0); // Trang hiện tại (bắt đầu từ 0)
    const [totalPages, setTotalPages] = useState(1); // Tổng số trang
    const [totalAccounts, setTotalAccounts] = useState(0);

    const [keyword, setKeyword] = useState("");

    const loadAccounts = async (pageParam: number) => {
        try {
            const { data } = await accountApi.getManagerAccounts(pageParam, 5);
            setAccountsData(data.content);
            setTotalPages(data.totalPages);
            setTotalAccounts(data.totalElements);
            setPage(data.number); // hoặc pageParam
        } catch (error) {
            console.error("Lỗi gọi API:", error);
        }
    };

    const loadSearchResults = async (pageParam: number, e?: React.FormEvent) => {
        if (e) e.preventDefault();
        try {
            const { data } = await accountApi.searchManagerAccounts(keyword.trim(), pageParam, 5);
            setAccountsData(data.content);
            setTotalPages(data.totalPages);
            setTotalAccounts(data.totalElements);
            setPage(data.number);
        } catch (err) {
            console.error("Lỗi khi tìm sản phẩm:", err);
        }
    };

    useEffect(() => {
        setAccountsData([]);
        setPage(0); // reset page
        loadAccounts(0); // bắt đầu từ trang 0
    }, []);

    useEffect(() => {
        if (keyword.trim() === "") {
            loadAccounts(0);
        }
    }, [keyword]);

    return (
        <div className='w-full min-h-screen p-4 bg-gray-100 dark:bg-gray-900 overflow-x-hidden'>
            <section className="antialiased mt-16 z-10">
                <div className="mx-auto w-full">


                    <div className=" bg-white dark:bg-gray-800 relative shadow-md rounded-md">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="flex-1 flex flex-col">
                                <h3 className="text-lg font-bold">
                                    Danh sách tài khoản
                                </h3>
                                <span className="dark:text-white text-sm">Tổng số: {totalAccounts}</span>
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
                                            type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Tìm kiếm theo email" required />
                                    </div>
                                </form>
                            </div>
                            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <button
                                    onClick={toggleAdd}
                                    type="button" className="flex items-center justify-center text-white bg-primary hover:bg-orange-400 font-medium rounded-lg text-sm px-4 py-2 dark:bg-orange-600 dark:hover:bg-orange-700 ">
                                    <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                    </svg>
                                    Tạo tài khoản
                                </button>
                            </div>
                        </div>
                        <div className="w-full overflow-x-scroll">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-4 py-3 text-center">Email</th>
                                        <th scope="col" className="px-4 py-3 text-center">Họ và tên</th>
                                        <th scope="col" className="px-4 py-3 text-center">Vai trò</th>
                                        <th scope="col" className="py-3 text-center">Trạng thái</th>
                                        <th scope="col" className="px-4 py-3 text-center">Thời gian tạo</th>
                                        <th scope="col" className="px-4 py-3">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {accountsData.map((data, index) => (
                                        <tr key={data.id}
                                            className="border-b dark:border-gray-700">
                                            <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <p className='w-48'>{data.email}</p>
                                            </th>
                                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <p className='w-28'> {data.fullName}</p>
                                            </td>
                                            <td className="w-24 px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {data?.role === 1
                                                    ? <p className=''> Quản trị viên </p>
                                                    : data?.role === 2
                                                        ?
                                                        <p className=''> Khách hàng </p>
                                                        : data?.role === 3
                                                            ? <p className=''> Nhân viên </p>
                                                            : "Không xác định"
                                                }
                                            </td>
                                            <td className="py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <div className="flex justify-center items-center">
                                                    {data?.status === 1
                                                        ?
                                                        <dd className="inline-flex items-center rounded bg-green-100 px-2.5 py-2 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                                                            Active
                                                        </dd>
                                                        : data?.status === 0 ?
                                                            <dd className="inline-flex items-center rounded bg-red-100 px-2.5 py-2 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                                                                Inactive
                                                            </dd>
                                                            : "Không xác định"}
                                                </div>
                                            </td>

                                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">{data?.createdAt ? formatDateDMYHM(data.createdAt) : ''}</td>

                                            <td className="px-4 py-3 flex items-center justify-start">
                                                <div className="flex items-center space-x-4">

                                                    <button onClick={() => {
                                                        setUpdateId(data.id);
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

                                                    {/* <button onClick={() => {
                                                        setDeleteId(data.id);
                                                        const dropdown = document.getElementById("deleteAlertId");
                                                        dropdown?.classList.toggle("hidden");
                                                    }}
                                                        type="button" className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 -ml-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                        </svg>
                                                        Xóa
                                                    </button> */}

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
                                keyword.trim() ? loadSearchResults(page) : loadAccounts(page);
                            }}
                        />
                    </div>
                </div>
            </section>

            {showAdd && (
                <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full bg-black bg-opacity-50">
                    <AccountAdd toggleAdd={toggleAdd} />
                </div>
            )}

            {showUpdate && (
                <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full bg-black bg-opacity-50">
                    <AccountUpdation updateId={updateId} toggleUpdate={toggleUpdate} />
                </div>
            )}
        </div>
    )
}

export default AccountList