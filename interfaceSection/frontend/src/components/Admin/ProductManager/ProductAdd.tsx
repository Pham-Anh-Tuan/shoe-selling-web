import React, { useState } from "react";
import { addProductApi } from "../../../api-client/api";
import { ToastContainer } from 'react-toastify';
import { alertError } from "../../Shared/AlertError";

interface ProductAddProps {
    toggleAdd: () => void;
    toggleRefresh: () => void;
}

export const ProductAdd: React.FC<ProductAddProps> = ({ toggleAdd, toggleRefresh }) => {
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

    const [product, setProduct] = useState<Product>({
        id: crypto.randomUUID(),
        productName: "",
        price: 0,
        type: "1",
        status: "1",
        mainDes: "",
        sideDes: "",
        email: "",
        colors: [
            // {
            //     id: crypto.randomUUID(),
            //     colorHex: "",
            //     images: [
            //         // { id: crypto.randomUUID(), path: "", imageFile: null },
            //     ],
            //     sizeQuantities: [
            //         // { id: crypto.randomUUID(), size: 0, quantity: 0 },
            //     ],
            // },
        ],
    });

    const setImageFile = (
        colorId: string,
        imageId: string,
        file: File | null
    ) => {
        setProduct((prev) => ({
            ...prev,
            colors: prev.colors.map((color) =>
                color.id === colorId
                    ? {
                        ...color,
                        images: color.images.map((img) =>
                            img.id === imageId
                                ? { ...img, imageFile: file }
                                : img
                        ),
                    }
                    : color
            ),
        }));
    };

    const setProductName = (newProductName: string) => {
        setProduct((prev) => ({
            ...prev,
            productName: newProductName,
        }));
    };

    const setPrice = (newPrice: number) => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            price: newPrice < 0 ? 0 : newPrice, // Đảm bảo giá không âm
        }));
    };

    const setType = (newType: string) => {
        setProduct((prev) => ({
            ...prev,
            type: newType,
        }));
    };

    const setStatus = (newStatus: string) => {
        setProduct((prev) => ({
            ...prev,
            status: newStatus,
        }));
    };

    const setMainDes = (newMainDes: string) => {
        setProduct((prev) => ({
            ...prev,
            mainDes: newMainDes,
        }));
    };

    const setSideDes = (newSideDes: string) => {
        setProduct((prev) => ({
            ...prev,
            sideDes: newSideDes,
        }));
    };

    const addColor = () => {
        const newColor: Color = {
            id: crypto.randomUUID(),
            colorHex: "#FFFFFF",
            images: [],
            sizeQuantities: [],
        };

        setProduct((prev) => ({
            ...prev,
            colors: [...prev.colors, newColor],
        }));
    };

    const deleteColor = (colorId: string) => {
        setProduct((prev) => ({
            ...prev,
            colors: prev.colors.filter((color) => color.id !== colorId),
        }));
    };

    const setColorHex = (colorId: string, newColorHex: string) => {
        setProduct((prev) => ({
            ...prev,
            colors: prev.colors.map((color) =>
                color.id === colorId
                    ? { ...color, colorHex: newColorHex }
                    : color
            ),
        }));
    };

    const formData = new FormData();

    const handleImageUpload = (
        event: React.ChangeEvent<HTMLInputElement>,
        colorId: string,
        imageId: string
    ) => {
        const file = event.target.files?.[0];
        if (file) {

            const reader = new FileReader();
            reader.onload = () => {
                const newImageValue = reader.result;

                setProduct((prev) => ({
                    ...prev,
                    colors: prev.colors.map((color) =>
                        color.id === colorId
                            ? {
                                ...color,
                                images: color.images.map((img) =>
                                    img.id === imageId
                                        ? { ...img, path: newImageValue }
                                        : img
                                ),
                            }
                            : color
                    ),
                }));
            };
            reader.readAsDataURL(file);
            setImageFile(colorId, imageId, file);
        }
    };

    const addImage = (colorId: string) => {
        const newImage: Image = {
            id: crypto.randomUUID(),
            path: "",
            imageFile: null,
        };

        setProduct((prev) => ({
            ...prev,
            colors: prev.colors.map((color) =>
                color.id === colorId
                    ? { ...color, images: [...color.images, newImage] }
                    : color
            ),
        }));
    };

    const deleteImage = (colorId: string, imageId: string) => {
        setProduct((prev) => ({
            ...prev,
            colors: prev.colors.map((color) =>
                color.id === colorId
                    ? {
                        ...color,
                        images: color.images.filter((img) => img.id !== imageId),
                    }
                    : color
            ),
        }));
    };
    const addSizeQuantity = (colorId: string) => {
        const newSizeQuantity: SizeQuantity = {
            id: crypto.randomUUID(),
            size: 0,
            quantity: 0,
        };

        setProduct((prev) => ({
            ...prev,
            colors: prev.colors.map((color) =>
                color.id === colorId
                    ? {
                        ...color,
                        sizeQuantities: [...color.sizeQuantities, newSizeQuantity],
                    }
                    : color
            ),
        }));
    };

    const deleteSizeQuantity = (colorId: string, sizeQuantityId: string) => {
        setProduct((prev) => ({
            ...prev,
            colors: prev.colors.map((color) =>
                color.id === colorId
                    ? {
                        ...color,
                        sizeQuantities: color.sizeQuantities.filter((sa) => sa.id !== sizeQuantityId),
                    }
                    : color
            ),
        }));
    };

    const setSizeQuantity = (
        colorId: string,
        sizeQuantityId: string,
        field: "size" | "quantity",
        value: number
    ) => {
        setProduct((prev) => ({
            ...prev,
            colors: prev.colors.map((color) =>
                color.id === colorId
                    ? {
                        ...color,
                        sizeQuantities: color.sizeQuantities.map((sa) =>
                            sa.id === sizeQuantityId
                                ? { ...sa, [field]: value < 0 ? 0 : value }
                                : sa
                        ),
                    }
                    : color
            ),
        }));
    };


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // 1. Validate toàn bộ dữ liệu trước
        if (!product.colors || product.colors.length === 0) {
            alertError("Sản phẩm phải có ít nhất một màu!");
            return;
        }

        for (const [colorIndex, color] of product.colors.entries()) {
            if (!color.images || color.images.length === 0) {
                alertError(`Màu thứ ${colorIndex + 1} phải có ít nhất một ảnh!`);
                return;
            }

            if (!color.sizeQuantities || color.sizeQuantities.length === 0) {
                alertError(`Màu thứ ${colorIndex + 1} cần nhập kích thước và số lượng!`);
                return;
            }
        }

        formData.append("id", product.id);
        formData.append("productName", product.productName);
        formData.append("price", product.price.toString());
        formData.append("type", product.type.toString());
        formData.append("status", product.status);
        formData.append("mainDes", product.mainDes);
        formData.append("sideDes", product.sideDes);

        const userEmail = localStorage.getItem('email');
        if (userEmail !== null) {
            formData.append("email", userEmail);
        }

        product.colors.forEach((color, colorIndex) => {
            formData.append(`colors[${colorIndex}].id`, color.id);
            formData.append(`colors[${colorIndex}].colorHex`, color.colorHex);

            color.images.forEach((image) => {
                if (!image.imageFile) {
                    alertError("Bạn cần tải ảnh lên!");
                    throw new Error("Missing image file."); // Dừng hẳn hàm luôn
                }
                // if (image.imageFile) {
                formData.append(`colors[${colorIndex}].imageFiles`, image.imageFile);
                // }
            });

            color.sizeQuantities.forEach((sq, sqIndex) => {
                formData.append(`colors[${colorIndex}].sizeQuantities[${sqIndex}].id`, sq.id);
                formData.append(`colors[${colorIndex}].sizeQuantities[${sqIndex}].size`, sq.size.toString());
                formData.append(`colors[${colorIndex}].sizeQuantities[${sqIndex}].quantity`, sq.quantity.toString());
            });
        });

        try {
            const response = await addProductApi.addProduct(formData);
            window.location.reload();
        } catch (error: any) {
            alertError(error?.response?.data);
        }
        // toggleRefresh();
        // toggleAdd();
        
    }

    return (
        <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative p-4 bg-white rounded-md shadow dark:bg-gray-800 sm:p-5">
                <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Thêm sản phẩm</h3>
                    <button onClick={toggleAdd}
                        type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-md text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên</label>
                            <input onChange={(e) => setProductName(e.target.value)}
                                type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 focus:outline-none focus:border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white placeholder-gray-600 placeholder-opacity-40" placeholder="Tên sản phẩm" required />
                        </div>
                        <div>
                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giá</label>
                            <p className="relative block w-full">
                                <input type="text" min="0" value={product?.price.toLocaleString("en-US")}
                                    onChange={(e) => {
                                        let value = e.target.value.replace(/,/g, '');
                                        const number = parseFloat(value);
                                        if (!isNaN(number)) setPrice(number);
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === '-' || e.key === 'e') {  // Ngăn "-" và "e" (tránh nhập số mũ)
                                            e.preventDefault();
                                        }
                                    }}
                                    name="price" id="price" className="bg-gray-50 w-full pr-10 border border-gray-300 focus:outline-none focus:border-gray-300 text-gray-900 text-sm rounded-md p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300 pointer-events-none">₫</span>
                            </p>
                        </div>
                        <div>
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Loại</label>
                            <select onChange={(e) => setType(e.target.value)}
                                id="category" className="bg-gray-50 border border-gray-300 focus:outline-none focus:border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required>
                                <option value={1}>Giày thể thao</option>
                                <option value={2}>Giày lười</option>
                                <option value={3}>Giày boots</option>
                                <option value={4}>Giày tây Derby</option>
                                <option value={5}>Dép nam</option>
                                <option value={6}>Vớ</option>
                                <option value={7}>Dây giày</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trạng thái</label>
                            <select
                                value={product.status}
                                onChange={(e) => setStatus(e.target.value)}
                                id="status" className="bg-gray-50 border border-gray-300 focus:outline-none focus:border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                                <option value={0} className="bg-red-100">Inactive</option>
                                <option value={1} className="bg-green-100">Active</option>
                            </select>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả tóm tắt</label>
                            <textarea onChange={(e) => setMainDes(e.target.value)}
                                id="description" rows={1} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:outline-none focus:border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white placeholder-gray-600 placeholder-opacity-40" placeholder="Viết phần mô tả sản phẩm ngắn gọn" required></textarea>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả chi tiết</label>
                            <textarea onChange={(e) => setSideDes(e.target.value)}
                                id="description" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:outline-none focus:border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white placeholder-gray-600 placeholder-opacity-40" placeholder="Viết chi tiết cho phần mô tả sản phẩm" required></textarea>
                        </div>
                    </div>

                    <div className="flex items-center justify-end space-x-4 mb-1">
                        <button type="button" onClick={addColor} className="flex items-center justify-center text-white bg-green-700 hover:bg-green-800 font-medium rounded-md w-28 px-2 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 text-sm">
                            <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                            </svg>
                            Thêm màu
                        </button>
                    </div>

                    <div className="w-full overflow-x-auto mb-4">
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
                                {product.colors.map((color) => (
                                    <tr key={color.id} className="border-b dark:border-gray-700">
                                        <th scope="row" className="px-4 py-3">
                                            <div className="flex flex-col items-center justify-center space-y-1">
                                                <input onChange={(e) => setColorHex(color.id, e.target.value)}
                                                    type="color" defaultValue={color.colorHex} className="p-1 h-10 w-14 block bg-white cursor-pointer rounded-md disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700" id="hs-color-input" title="Choose your color" />
                                            </div>
                                        </th>
                                        <td className="px-4 py-3">
                                            <div className="flex flex-col items-center justify-center">
                                                <button
                                                    type='button'
                                                    onClick={() => addImage(color.id)}
                                                    className="bg-orange-300 hover:bg-orange-400 w-20 rounded-md block px-1 py-1 text-sm text-white mb-2"
                                                >
                                                    Thêm ảnh
                                                </button>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {color.images.map((image) => (
                                                        <div className="flex flex-col items-center justify-center space-y-1">
                                                            <div className="mb-1">
                                                                <label className="cursor-pointer bg-blue-500 text-white px-1 py-1 rounded-md hover:bg-blue-600 text-xs mr-1">
                                                                    Chọn
                                                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, color.id, image.id)} />
                                                                </label>
                                                                <button type='button' className="cursor-pointer bg-red-500 text-white px-1 py-1 rounded-md hover:bg-red-600 text-xs" onClick={() => deleteImage(color.id, image.id)}>
                                                                    Xóa
                                                                </button>
                                                            </div>

                                                            <div className="mt-1 w-fit">
                                                                <img
                                                                    src={typeof image.path === 'string'
                                                                        ? image.path // Nếu image là string, dùng luôn
                                                                        : image.path instanceof ArrayBuffer
                                                                            ? URL.createObjectURL(new Blob([image.path])) // Nếu image là ArrayBuffer, tạo URL từ nó
                                                                            : '/path/to/default-image.jpg'}
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
                                                <button
                                                    type='button'
                                                    onClick={() => addSizeQuantity(color.id)}
                                                    className="bg-orange-300 hover:bg-orange-400 w-23 rounded-md block px-1 py-1 text-sm text-white"
                                                >
                                                    Thêm KT-SL
                                                </button>
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
                                                                    <input type="number" value={sizeQuantity.size} name="size" id="" className="w-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-orange-600 focus:border-orange-600 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" required
                                                                        onChange={(e) => setSizeQuantity(color.id, sizeQuantity.id, "size", parseInt(e.target.value, 10) || 0)} />
                                                                    -
                                                                </td>
                                                                <td>
                                                                    <input type="number" value={sizeQuantity.quantity} name="quantity" id="" className="w-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-orange-600 focus:border-orange-600 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" required
                                                                        onChange={(e) => setSizeQuantity(color.id, sizeQuantity.id, "quantity", parseInt(e.target.value, 10) || 0)} />
                                                                </td>
                                                                <td>
                                                                    <button onClick={() => deleteSizeQuantity(color.id, sizeQuantity.id)} type="button" className="text-gray-400 bg-transparent hover:text-red-600 rounded-md text-sm p-1.5 ml-auto inline-flex items-center dark:hover:text-red-600">
                                                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                                                                        </svg>
                                                                        <span className="sr-only">Close modal</span>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>

                                        <td>
                                            <div className='flex flex-col items-center justify-center space-y-2'>
                                                <button
                                                    type='button'
                                                    onClick={() => deleteColor(color.id)}
                                                    className="bg-red-500 hover:bg-red-600 w-20 rounded-md block px-1 py-1 text-sm text-white data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                                                >
                                                    Xóa màu
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>

                    <button type="submit" className="text-white inline-flex items-center bg-orange-400 hover:bg-orange-500 font-medium rounded-md text-sm px-4 py-2.5 text-center dark:bg-orange-400 dark:hover:bg-orange-500">
                        <svg className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                        </svg>
                        Thêm sản phẩm
                    </button>

                </form>
            </div>
            <ToastContainer />
        </div>

    )
}
export default ProductAdd;