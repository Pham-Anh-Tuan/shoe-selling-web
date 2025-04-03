import Img1 from "../../../assets/male-sneaker/sneaker.png";
import React, { useState } from "react";

const ProductUpdation = () => {
    // các biến của update
    interface SizeAmount {
        id: number;
        size: number;
        amount: number;
    }

    interface ColorImage {
        id: number;
        color: string;
        image: string | ArrayBuffer | null;
        sizeAmounts: SizeAmount[];
    }

    interface Product {
        id: string;
        name: string;
        price: number;
        type: string;
        mainDes: string;
        sideDes: string;
        colorImages: ColorImage[];
    }

    const [product, setProduct] = useState<Product>({
        id: "YC25051P",
        name: "Giày Thể Thao Sneaker MULGATI YC25051P",
        price: 2200000,
        type: "1",
        mainDes: "Giày Sneaker Da Bò Nam MULGATI - Màu Trắng Kem, Phong Cách Thể Thao, Đế Cao Su Êm Ái.",
        sideDes: "Chất liệu cao cấp: Giày được làm từ da bò thật, mềm mại, bền bỉ, giúp ôm chân thoải mái và thoáng khí. \nThiết kế năng động: Phối màu trắng kem sang trọng với điểm nhấn sọc đen tạo phong cách trẻ trung, dễ dàng phối đồ.\nĐế cao su đúc nguyên khối: Nhẹ, êm chân, hỗ trợ di chuyển linh hoạt và chống trơn trượt hiệu quả.\nGia công tỉ mỉ: Đường may chắc chắn, hoàn thiện tinh tế, đảm bảo độ bền lâu dài.\nỨng dụng linh hoạt: Phù hợp cho nhiều dịp: đi chơi, dạo phố, đi làm, du lịch,...",
        colorImages: [
            {
                id: 1,
                color: "#1e3a8a",
                image: Img1,
                sizeAmounts: [
                    { id: 1, size: 38, amount: 13 },
                    { id: 2, size: 39, amount: 20 },
                ],
            },
        ],
    });

    const addColorImage = () => {
        const temp = Date.now() % 100000;
        const newColorImage = {
            id: temp,
            color: "#ffffff",
            image: null,
            sizeAmounts: [{ id: temp + 101, size: 0, amount: 0 }],
        };

        setProduct((prev) => ({
            ...prev,
            colorImages: [...prev.colorImages, newColorImage],
        }));

    };

    const deleteColorImage = (colorImageId: number) => {
        setProduct((prev) => ({
            ...prev,
            colorImages: prev.colorImages.filter((colorImage) => colorImage.id !== colorImageId),
        }));
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProduct((prev) => ({
                    ...prev,
                    colorImages: prev.colorImages.map((colorImage) =>
                        colorImage.id === id
                            ? {
                                ...colorImage,
                                image: reader.result, // Cập nhật hình ảnh cho màu này
                            }
                            : colorImage
                    ),
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const addSizeAmount = (colorImageId: number) => {
        const newSizeAmount = {
            id: Date.now() % 10000,
            size: 0,
            amount: 0,
        };

        setProduct((prev) => ({
            ...prev,
            colorImages: prev.colorImages.map((colorImage) =>
                colorImage.id === colorImageId
                    ? {
                        ...colorImage,
                        sizeAmounts: [...colorImage.sizeAmounts, newSizeAmount],
                    }
                    : colorImage
            ),
        }));
    };

    const deleteSizeAmount = (colorImageId: number, sizeAmountId: number) => {
        setProduct((prev) => ({
            ...prev,
            colorImages: prev.colorImages.map((colorImage) =>
                colorImage.id === colorImageId
                    ? {
                        ...colorImage,
                        sizeAmounts: colorImage.sizeAmounts.filter(
                            (sizeAmount) => sizeAmount.id !== sizeAmountId
                        ),
                    }
                    : colorImage
            ),
        }));
    };

    const setSizeAmount = (colorImageId: number, sizeAmountId: number, field: "size" | "amount", value: number) => {
        setProduct((prev) => ({
            ...prev,
            colorImages: prev.colorImages.map((colorImage) =>
                colorImage.id === colorImageId
                    ? {
                        ...colorImage,
                        sizeAmounts: colorImage.sizeAmounts.map((sizeAmount) =>
                            sizeAmount.id === sizeAmountId
                                ? { ...sizeAmount, [field]: value < 0 ? 0 : value } // Đảm bảo giá trị không nhỏ hơn 0
                                : sizeAmount
                        ),
                    }
                    : colorImage
            ),
        }));
    };
    return (
        <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Cập nhật sản phẩm</h3>
                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="updateProductModal">
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
                            <input type="text" name="name" id="name" value={product.name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Ex. Apple iMac 27&ldquo;" />
                        </div>
                        <div>
                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giá</label>
                            <p className="block w-full"><input type="number" value={product.price.toLocaleString("en-US")} name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="2,200,000" required
                                onChange={(e) => {
                                    const value = parseInt(e.target.value, 10);
                                    setProduct((prev) => ({ ...prev, price: isNaN(value) || value < 0 ? 0 : value }));
                                }} />₫</p>
                        </div>
                        <div>
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Loại</label>
                            <select
                                value={product.type}
                                onChange={(e) => setProduct((prev) => ({ ...prev, type: e.target.value }))}
                                id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500">
                                <option>Chọn loại giày</option>
                                <option value="1">Giày thể thao nam</option>
                                <option value="2">Sandal nam</option>
                                <option value="3">Giày cao gót</option>
                                <option value="4">Giày thể thao nữ</option>
                            </select>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả tóm tắt</label>
                            <textarea id="description" rows={2} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Viết phần mô tả sản phẩm ngắn gọn">
                                {product.mainDes}
                            </textarea>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả chi tiết</label>
                            <textarea id="description" rows={5} className="overflow-auto whitespace-pre-wrap block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Viết chi tiết cho phần mô tả sản phẩm"
                                defaultValue={product.sideDes}>
                            </textarea>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 mb-1">
                        <button type="button" onClick={addColorImage} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg px-1 py-1 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 text-xs">Thêm màu</button>
                    </div>

                    <div className="overflow-x-auto mb-4">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
                                {product.colorImages.map((colorImage) => (
                                    <tr key={colorImage.id} className="border-b dark:border-gray-700">
                                        <th scope="row" className="px-4 py-3">
                                            <div className="flex flex-col items-center justify-center space-y-1">
                                                <input type="color" defaultValue={colorImage.color} className="p-1 h-10 w-14 block bg-white cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700" id="hs-color-input" title="Choose your color" />
                                            </div>
                                        </th>
                                        <td className="px-4 py-3">
                                            <div className="flex flex-col items-center justify-center space-y-1">
                                                <label className="cursor-pointer bg-orange-500 text-white px-1 py-1 rounded-lg hover:bg-orange-600 text-xs">
                                                    Chọn ảnh
                                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, colorImage.id)} />
                                                </label>

                                                <div className="mt-1 border w-fit">
                                                    <img src={typeof colorImage.image === 'string'
                                                        ? colorImage.image // Nếu image là string, dùng luôn
                                                        : colorImage.image instanceof ArrayBuffer
                                                            ? URL.createObjectURL(new Blob([colorImage.image])) // Nếu image là ArrayBuffer, tạo URL từ nó
                                                            : '/path/to/default-image.jpg'}
                                                        className="w-16 h-16 object-cover rounded-lg shadow" />
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
                                                        {colorImage.sizeAmounts.map((sizeAmount) => (
                                                            <tr>
                                                                <td>
                                                                    <input type="number" value={sizeAmount.size} name="size" id="" className="w-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" required
                                                                        onChange={(e) => setSizeAmount(colorImage.id, sizeAmount.id, "size", parseInt(e.target.value, 10) || 0)} />
                                                                    -
                                                                </td>
                                                                <td>
                                                                    <input type="number" value={sizeAmount.amount} name="amount" id="" className="w-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" required
                                                                        onChange={(e) => setSizeAmount(colorImage.id, sizeAmount.id, "amount", parseInt(e.target.value, 10) || 0)} />
                                                                </td>
                                                                <td>
                                                                    <button onClick={() => deleteSizeAmount(colorImage.id, sizeAmount.id)} type="button" className="text-gray-400 bg-transparent hover:text-red-600 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:text-red-600">
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

                                        <td className="px-4 py-3 flex flex-col items-center justify-end">
                                            <div className='flex flex-col items-center justify-center space-y-2'>
                                                <button
                                                    type='button'
                                                    onClick={() => addSizeAmount(colorImage.id)}
                                                    className="bg-orange-300 hover:bg-orange-400 w-20 rounded-md block px-1 py-1 text-sm text-gray-700"
                                                >
                                                    Thêm size
                                                </button>

                                                <button
                                                    type='button'
                                                    onClick={() => deleteColorImage(colorImage.id)}
                                                    className="bg-red-500 hover:bg-red-600 w-20 rounded-md block px-1 py-1 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
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

                    <div className="flex items-center space-x-4">
                        <button type="submit" className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Cập nhật</button>
                        <button type="button" className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                            <svg className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                            </svg>
                            Hủy
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProductUpdation;