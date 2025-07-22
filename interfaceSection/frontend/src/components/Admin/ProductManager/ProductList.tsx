import ProductUpdation from "./ProductUpdation";
import ProductRead from "./ProductRead";
import { useEffect, useState } from "react";
import ProductAdd from "./ProductAdd";
import { deleteProductApi, productApi } from "../../../api-client/api";
import formatCurrencyVND from '../../../hooks/FormatCurrency';
import Pagination from "../../../hooks/Pagination";

const ProductList = () => {
    const [showAdd, setShowAdd] = useState(false);
    const [showRead, setShowRead] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [deleteId, setDeleteId] = useState<string>("");
    const [updateId, setUpdateId] = useState<string>("");
    const [refresh, setRefresh] = useState(false);
    const [readId, setReadId] = useState<string>("");
    const [totalProducts, setTotalProducts] = useState(0);

    const toggleAdd = () => {
        setShowAdd(!showAdd);
    };
    const toggleRead = () => {
        setShowRead(!showRead);
    };
    const toggleUpdate = () => {
        setShowUpdate(!showUpdate);
    };

    const toggleRefresh = () => {
        setRefresh(!refresh);
    };

    interface Product {
        id: string;
        productName: string;
        type: number;
        price: number;
        status: number;
    }

    const [page, setPage] = useState(0); // Trang hiện tại (bắt đầu từ 0)
    const [totalPages, setTotalPages] = useState(1); // Tổng số trang
    const [productsData, setProductsData] = useState<Product[]>([]);

    const [keyword, setKeyword] = useState("");

    const loadProducts = async (pageParam: number) => {
        try {
            const { data } = await productApi.getManagerProducts(pageParam, 5);
            setProductsData(data.content);
            setTotalPages(data.totalPages);
            setTotalProducts(data.totalElements);
            setPage(data.number); // hoặc pageParam
        } catch (error) {
            console.error("Lỗi gọi API:", error);
        }
    };

    const loadSearchResults = async (pageParam: number, e?: React.FormEvent) => {
        if (e) e.preventDefault();

        try {
            const { data } = await productApi.searchManagerProducts(keyword.trim(), pageParam, 5);
            setProductsData(data.content);
            setTotalPages(data.totalPages);
            setTotalProducts(data.totalElements);
            setPage(data.number);
        } catch (err) {
            console.error("Lỗi khi tìm sản phẩm:", err);
        }
    };



    useEffect(() => {
        setProductsData([]);
        setPage(0); // reset page
        loadProducts(0); // bắt đầu từ trang 0
    }, []);

    useEffect(() => {
        if (keyword.trim() === "") {
            loadProducts(0);
        }
    }, [keyword]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            productsData.forEach((_, index) => {
                const dropdown = document.getElementById(index + "giay-the-thao-1-dropdown");
                const button = document.getElementById(index + "giay-the-thao-1-dropdown-button");

                if (
                    dropdown &&
                    !dropdown.contains(event.target as Node) &&
                    button &&
                    !button.contains(event.target as Node)
                ) {
                    dropdown.classList.add("hidden");
                }
            });
        }

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [productsData]);

    const deleteProduct = async () => {
        try {
            await deleteProductApi.deleteById(deleteId);
            window.location.reload();
        } catch (error) {
            console.error("Xóa sản phẩm không thành công!", error);
        }
    };


    return (
        // <div className="p-4 w-full h-screen overflow-x-hidden bg-gray-100 dark:bg-gray-900">
        <div className='w-full p-4 bg-gray-100 dark:bg-gray-900 overflow-x-hidden mt-[60px]'>
            <section className="antialiased z-10">
                <div className="mx-auto w-full">

                    {/* ádasd */}
                    <div className="bg-white dark:bg-gray-800 relative shadow-md rounded-md">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="flex-1 flex flex-col">
                                <h3 className="text-lg font-bold">
                                    Danh sách sản phẩm
                                </h3>
                                <span className="dark:text-white text-sm">Tổng số: {totalProducts}</span>
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
                                            type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Tìm kiếm theo tên sản phẩm" required />
                                    </div>
                                </form>
                            </div>
                            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <button onClick={toggleAdd}
                                    type="button" className="flex items-center justify-center text-white bg-primary hover:bg-orange-400 font-medium rounded-lg text-sm px-4 py-2 dark:bg-orange-600 dark:hover:bg-orange-700 ">
                                    <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                    </svg>
                                    Thêm sản phẩm
                                </button>
                            </div>
                        </div>

                        {/* ádasd */}
                        <div className="w-full overflow-x-scroll">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-4 py-4 text-center">Tên sản phẩm</th>
                                        <th scope="col" className="px-4 py-3 text-center">Loại</th>
                                        <th scope="col" className="px-4 py-3 text-center">Giá</th>
                                        <th scope="col" className="py-3 text-center">Trạng thái</th>
                                        <th scope="col" className="px-4 py-3 text-center">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productsData.map((data) => (
                                        <tr key={data.id}
                                            className="border-b dark:border-gray-700">
                                            <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{data.productName}</th>
                                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{data?.type === 1
                                                ? "Giày thể thao"
                                                : data?.type === 2
                                                    ? "Giày lười"
                                                    : data?.type === 3
                                                        ? "Giày boots"
                                                        : data?.type === 4
                                                            ? "Giày tây Derby"
                                                            : data?.type === 5
                                                                ? "Dép nam"
                                                                : data?.type === 6
                                                                    ? "Túi cầm tay nam"
                                                                    : data?.type === 7
                                                                        ? "Thắt lưng nam"
                                                                        : "Không xác định"}</td>
                                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{formatCurrencyVND(data?.price || 0)}</td>
                                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{data?.status === 0
                                                ? <dd className="me-2 inline-flex items-center rounded bg-red-100 px-2.5 py-2 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                                                    Inactive
                                                </dd>
                                                : data?.status === 1
                                                    ? <dd className="me-2 inline-flex items-center rounded bg-green-100 px-2.5 py-2 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                                                        Active
                                                    </dd> : "Không xác định"}</td>

                                            {/* <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center justify-end relative">
                                                <button id={index + "giay-the-thao-1-dropdown-button"}
                                                    onClick={() => {
                                                        const dropdown = document.getElementById(index + "giay-the-thao-1-dropdown");
                                                        dropdown?.classList.toggle("hidden");
                                                    }}
                                                    className="inline-flex items-center text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 dark:hover-bg-gray-800 text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
                                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                    </svg>
                                                </button>
                                                <div id={index + "giay-the-thao-1-dropdown"}
                                                    className="hidden absolute right-0 top-full z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                                    <ul className="py-1 text-sm" aria-labelledby={index + "giay-the-thao-1-dropdown-button"}>
                                                        <li>
                                                            <button onClick={() => {
                                                                setUpdateId(data.id);
                                                                toggleUpdate();
                                                            }}
                                                                type="button" className="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200">
                                                                <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                                                                </svg>
                                                                Chỉnh sửa
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button onClick={() => {
                                                                setReadId(data.id);
                                                                toggleRead();
                                                            }}
                                                                type="button" className="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200">
                                                                <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />
                                                                </svg>
                                                                Xem
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button onClick={() => {
                                                                setDeleteId(data.id);
                                                                const dropdown = document.getElementById("deleteModal");
                                                                dropdown?.classList.toggle("hidden");
                                                            }}
                                                                type="button" className="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 text-red-500 dark:hover:text-red-400">
                                                                <svg className="w-4 h-4 mr-2" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                                    <path fill-rule="evenodd" clip-rule="evenodd" fill="currentColor" d="M6.09922 0.300781C5.93212 0.30087 5.76835 0.347476 5.62625 0.435378C5.48414 0.523281 5.36931 0.649009 5.29462 0.798481L4.64302 2.10078H1.59922C1.36052 2.10078 1.13161 2.1956 0.962823 2.36439C0.79404 2.53317 0.699219 2.76209 0.699219 3.00078C0.699219 3.23948 0.79404 3.46839 0.962823 3.63718C1.13161 3.80596 1.36052 3.90078 1.59922 3.90078V12.9008C1.59922 13.3782 1.78886 13.836 2.12643 14.1736C2.46399 14.5111 2.92183 14.7008 3.39922 14.7008H10.5992C11.0766 14.7008 11.5344 14.5111 11.872 14.1736C12.2096 13.836 12.3992 13.3782 12.3992 12.9008V3.90078C12.6379 3.90078 12.8668 3.80596 13.0356 3.63718C13.2044 3.46839 13.2992 3.23948 13.2992 3.00078C13.2992 2.76209 13.2044 2.53317 13.0356 2.36439C12.8668 2.1956 12.6379 2.10078 12.3992 2.10078H9.35542L8.70382 0.798481C8.62913 0.649009 8.5143 0.523281 8.37219 0.435378C8.23009 0.347476 8.06631 0.30087 7.89922 0.300781H6.09922ZM4.29922 5.70078C4.29922 5.46209 4.39404 5.23317 4.56282 5.06439C4.73161 4.8956 4.96052 4.80078 5.19922 4.80078C5.43791 4.80078 5.66683 4.8956 5.83561 5.06439C6.0044 5.23317 6.09922 5.46209 6.09922 5.70078V11.1008C6.09922 11.3395 6.0044 11.5684 5.83561 11.7372C5.66683 11.906 5.43791 12.0008 5.19922 12.0008C4.96052 12.0008 4.73161 11.906 4.56282 11.7372C4.39404 11.5684 4.29922 11.3395 4.29922 11.1008V5.70078ZM8.79922 4.80078C8.56052 4.80078 8.33161 4.8956 8.16282 5.06439C7.99404 5.23317 7.89922 5.46209 7.89922 5.70078V11.1008C7.89922 11.3395 7.99404 11.5684 8.16282 11.7372C8.33161 11.906 8.56052 12.0008 8.79922 12.0008C9.03791 12.0008 9.26683 11.906 9.43561 11.7372C9.6044 11.5684 9.69922 11.3395 9.69922 11.1008V5.70078C9.69922 5.46209 9.6044 5.23317 9.43561 5.06439C9.26683 4.8956 9.03791 4.80078 8.79922 4.80078Z" />
                                                                </svg>
                                                                Xóa
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td> */}

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

                                                    <button onClick={() => {
                                                        setReadId(data.id);
                                                        toggleRead();
                                                    }}
                                                        type="button" className="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2 -ml-0.5">
                                                            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" />
                                                        </svg>
                                                        Xem
                                                    </button>

                                                    <button onClick={() => {
                                                        setDeleteId(data.id);
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
                                keyword.trim() ? loadSearchResults(page) : loadProducts(page);
                            }}
                        />

                    </div>
                </div>
            </section>

            {showAdd && (
                <div tabIndex={-1} aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full bg-black bg-opacity-50">
                    <ProductAdd toggleAdd={toggleAdd} toggleRefresh={toggleRefresh} />
                </div>
            )}

            {showUpdate && (
                <div tabIndex={-1} aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full bg-black bg-opacity-50">
                    <ProductUpdation updateId={updateId} toggleUpdate={toggleUpdate} toggleRefresh={toggleRefresh} />
                </div>
            )}

            {showRead && (
                <div tabIndex={-1} aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full bg-black bg-opacity-50">
                    <ProductRead readId={readId} toggleRead={toggleRead} />
                </div>
            )}

            <div id="deleteAlertId" tabIndex={-1} aria-hidden="true"
                className="hidden fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
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
                        <p className="mb-4 text-gray-500 dark:text-gray-300">Bạn có chắc chắn muốn xóa sản phẩm này không?</p>
                        <div className="flex justify-center items-center space-x-4">
                            <button onClick={() => {
                                document.getElementById("deleteAlertId")?.classList.add("hidden");
                            }}
                                type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-orange-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Không</button>
                            <button onClick={() => {
                                deleteProduct();
                            }}
                                type="button" className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700">Có</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProductList;