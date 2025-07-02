import React, { useEffect, useState } from "react";
import { productDetailApi } from "../../../api-client/api";

interface ProductReadProps {
    readId: string;
    toggleRead: () => void;
};

const ProductRead: React.FC<ProductReadProps> = ({ readId, toggleRead }) => {
    interface SizeQuantity {
        id: string;
        size: number;
        quantity: number;
    }

    interface Image {
        id: string;
        path: string | ArrayBuffer | null;
        imageFile: File | null; // Đây là file ảnh
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
        type: string;
        status: string;
        mainDes: string;
        sideDes: string;
        email: string;
        colors: Color[];
    }

    // const [product, setProduct] = useState<Product | null>(null);
    const [product, setProduct] = useState<Product>({
        id: "",
        productName: "",
        price: 0,
        type: "0",
        status: "1",
        mainDes: "",
        sideDes: "",
        email: "",
        colors: [
            {
                id: crypto.randomUUID(),
                colorHex: "",
                images: [
                    // { id: crypto.randomUUID(), path: "", imageFile: null },
                ],
                sizeQuantities: [
                    // { id: crypto.randomUUID(), size: 0, quantity: 0 },
                ],
            },
        ],
    });

    useEffect(() => {
        if (!readId) return;  // Chặn gọi API nếu id là undefined
        const fetchApi = async () => {
            try {
                const { data } = await productDetailApi.getById(readId);
                setProduct(data);
            } catch (error) {
                console.error("Lỗi khi gọi API sản phẩm:", error);
            }
        };
        fetchApi();
    }, [readId]);

    const setPrice = (newPrice: number) => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            price: newPrice < 0 ? 0 : newPrice, // Đảm bảo giá không âm
        }));
    };


    return (
        <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative p-4 bg-white rounded-md shadow dark:bg-gray-800 sm:p-5">
                <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Xem chi tiết sản phẩm</h3>
                    <button onClick={toggleRead}
                        type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-md text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="readProductModal">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <form action="#">
                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên</label>
                            <input disabled type="text" name="name" id="name" value={product?.productName} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Ex. Apple iMac 27&ldquo;" />
                        </div>
                        <div>
                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giá</label>
                            <p className="relative block w-full">
                                <input
                                    disabled type="text" value={product?.price.toLocaleString("en-US")} name="price" id="price" className="bg-gray-50 w-full pr-10 border border-gray-300 focus:outline-none focus:border-gray-300 text-gray-900 text-sm rounded-md p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300 pointer-events-none">₫</span>
                            </p>
                        </div>
                        <div>
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Loại</label>
                            <select
                                disabled
                                value={product?.type}
                                id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500">
                                <option value={1}>Giày thể thao</option>
                                <option value={2}>Giày lười</option>
                                <option value={3}>Giày boots</option>
                                <option value={4}>Giày tây Derby</option>
                                <option value={5}>Dép nam</option>
                                <option value={6}>Túi cầm tay nam</option>
                                <option value={7}>Thắt lưng nam</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trạng thái</label>
                            <select
                                disabled
                                value={product.status}
                                id="status" className="bg-gray-50 border border-gray-300 focus:outline-none focus:border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                                <option value={0} className="bg-red-100">Inactive</option>
                                <option value={1} className="bg-green-100">Active</option>
                            </select>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả tóm tắt</label>
                            <textarea disabled id="description" rows={2} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Viết phần mô tả sản phẩm ngắn gọn"
                                defaultValue={product?.mainDes}>
                            </textarea>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả chi tiết</label>
                            <textarea disabled id="description" rows={5} className="overflow-auto whitespace-pre-wrap block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Viết chi tiết cho phần mô tả sản phẩm"
                                defaultValue={product?.sideDes}>
                            </textarea>
                        </div>
                    </div>

                    <div className="w-full overflow-x-auto mb-1">
                        <table className="min-w-[600px] w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-4 py-4 text-center">Màu</th>
                                    <th scope="col" className="px-4 py-3 text-center">Ảnh</th>
                                    <th scope="col" className="px-4 py-3 text-center">Kích thước - Số lượng</th>
                                    <th scope="col" className="px-4 py-3">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {product?.colors.map((color) => (
                                    <tr key={color.id} className="border-b dark:border-gray-700">
                                        <th scope="row" className="px-4 py-3">
                                            <div className="flex flex-col items-center justify-center space-y-1">
                                                <input type="color" defaultValue={color?.colorHex} className="p-1 h-10 w-14 block bg-white cursor-pointer rounded-md disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700" id="hs-color-input" title="Choose your color" />
                                            </div>
                                        </th>
                                        <td className="px-4 py-3">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="grid grid-cols-2 gap-3">
                                                    {color.images.map((image) => (
                                                        <div className="flex flex-col items-center justify-center space-y-1">
                                                            <div className="mt-1 w-fit">
                                                                <img src={import.meta.env.VITE_API_URL_IMG + image.path}
                                                                    key={image.id}
                                                                    className="w-20 h-20 object-cover rounded-md shadow border" />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                        </td>
                                        <td>
                                            <div className="flex flex-col items-center justify-center space-y-1">
                                                <table className="table-auto">
                                                    <thead>
                                                        <tr>
                                                            <th> </th>
                                                            <th> </th>
                                                            <th> </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {color.sizeQuantities.map((sizeQuantity) => (
                                                            <tr>
                                                                <td>
                                                                    <input type="number" disabled value={sizeQuantity.size} name="size" id="" className="w-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-orange-600 focus:border-orange-600 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" required />
                                                                    -
                                                                </td>
                                                                <td>
                                                                    <input type="number" disabled value={sizeQuantity.quantity} name="amount" id="" className="w-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-orange-600 focus:border-orange-600 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" required />
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                    <p className="text-left text-gray-400 text-sm">Cập nhật lần cuối: {product.email}</p>
                </form>
            </div>
        </div>
    );

}
export default ProductRead;
