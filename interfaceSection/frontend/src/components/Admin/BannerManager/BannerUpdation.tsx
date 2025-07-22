import { useEffect, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import { bannerApi } from "../../../api-client/api";
import { ToastContainer } from "react-toastify";


interface BannerUpdationProps {
    updateId: string;
    toggleUpdate: () => void;
}

interface Banner {
    id: string;
    title: string;
    content: string;
    imageName: string;
    imageFile: File | null;
    status: number;
    createdAt: string;
    email: string;
}

export const BannerUpdation: React.FC<BannerUpdationProps> = ({ updateId, toggleUpdate }) => {
    const [banner, setBanner] = useState<Banner>({
        id: "",
        title: "",
        content: "",
        imageName: "",
        imageFile: null,
        status: 1,
        createdAt: "",
        email: "",
    });

    const setTitle = (newTitle: string) => {
        setBanner(prev => ({ ...prev, title: newTitle }));
    };

    const setContent = (newContent: string) => {
        setBanner(prev => ({ ...prev, content: newContent }));
    };

    const setImageName = (newImageName: string) => {
        setBanner(prev => ({ ...prev, imageName: newImageName }));
    };

    const setImageFile = (newImageFile: File | null) => {
        setBanner(prev => ({ ...prev, imageFile: newImageFile }));
    };

    const setStatus = (newStatus: number) => {
        setBanner(prev => ({ ...prev, status: newStatus }));
    };

    const loadBanner = async () => {
        try {
            const { data } = await bannerApi.getBannerDetail(updateId);
            setBanner(data);
        } catch (error) {
            console.error("Lỗi khi gọi API: ", error);
        }
    };

    useEffect(() => {
        if (!updateId) return;
        loadBanner();
    }, [updateId]);


    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImageName(reader.result as string);
            reader.readAsDataURL(file);
            setImageFile(file);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("id", updateId);
        formData.append("title", banner.title);
        formData.append("content", banner.content);
        formData.append("status", banner.status.toString());

        const userEmail = localStorage.getItem('email');
        if (userEmail !== null) {
            formData.append("email", userEmail);
        }

        if (banner.imageFile) {
            formData.append("imageFile", banner.imageFile);
        }

        try {
            await bannerApi.updateBanner(formData);
            window.location.reload();
        } catch (error: any) {
            console.error("Error saving product:", error);
        }
        
    }

    return (
        // <div className="mx-auto mt-10 p-4 border rounded-xl shadow-xl bg-white">
        <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative p-4 bg-white rounded-md shadow dark:bg-gray-800 sm:p-5">

                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Thêm banner mới</h3>
                        <button onClick={toggleUpdate}
                            type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-md text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    <div>
                        <label htmlFor="title" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Tiêu đề</label>
                        <input value={banner.title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 focus:outline-none focus:border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white placeholder-gray-600 placeholder-opacity-40 mb-6" placeholder="Tiêu đề" required />
                    </div>

                    <div className="flex flex-col items-center justify-center space-y-1">
                        <label htmlFor="title" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Ảnh</label>
                        <div className="mb-1">
                            <label className="">
                                <IoCloudUploadOutline className='text-gray-500 text-2xl cursor-pointer' />
                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e)} />
                            </label>
                        </div>

                        <div className="mt-1 w-fit inline-block relative">
                            <img src={
                                typeof banner.imageName === 'string'
                                    ? banner.imageName.startsWith('data:image') || banner.imageName.startsWith('blob:')
                                        ? banner.imageName // ảnh mới upload
                                        : import.meta.env.VITE_API_URL_BANNER_IMG + banner.imageName // ảnh từ server
                                    : '/path/to/default-image.jpg'
                            }

                                className="w-48 h-48 object-cover shadow border" />

                            <MdOutlineCancel className="absolute top-0 right-0 w-5 h-5 bg-white cursor-pointer text-gray-500 rounded-full -translate-y-1/2 translate-x-1/2"
                                onClick={() => {
                                    setImageName("");
                                    setImageFile(null)
                                }} />
                        </div>
                    </div>

                    <div className="my-3 flex items-center gap-3">
                        <label htmlFor="title" className="block text-base font-medium text-gray-900 dark:text-white">Trạng thái: </label>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center">
                                <input onChange={() => setStatus(1)} checked={banner.status === 1} value={1}
                                    id="default-radio-1" type="radio" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" required />
                                <label htmlFor="default-radio-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Active</label>
                            </div>
                            <div className="flex items-center">
                                <input onChange={() => setStatus(0)} checked={banner.status === 0} value={0}
                                    id="default-radio-2" type="radio" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" required />
                                <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Inactive</label>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="content" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Nội dung</label>
                        <textarea onChange={(e) => setContent(e.target.value)} value={banner.content}
                            name="content" id="content" className="bg-gray-50 border border-gray-300 focus:outline-none focus:border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white placeholder-gray-600 placeholder-opacity-40 mb-1" placeholder="Nội dung" required />
                    </div>

                    <p className="text-left text-gray-400 text-sm">Cập nhật lần cuối: {banner.email}</p>

                    <div className="flex items-center space-x-4 justify-end">
                        <button type="submit" className="inline-flex items-center
        text-white bg-orange-400 hover:bg-orange-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-400 dark:hover:bg-orange-500">
                            Cập nhật</button>
                        <button
                            onClick={toggleUpdate}
                            type="button" className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600">
                            Hủy
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div >
    );
}
