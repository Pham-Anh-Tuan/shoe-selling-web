import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import Toolbar from "./Toolbar";
import { CustomResizableImage } from "./CustomResizableImage";
import { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { Blog } from "./BlogInterface";
import { blogApi } from "../../../api-client/api";


interface BlogAddProps {
  toggleAdd: () => void;
}

export const BlogAdd: React.FC<BlogAddProps> = ({ toggleAdd }) => {
  const editor = useEditor({
    extensions: [
      // StarterKit,
      StarterKit.configure({
        heading: false,  // Tắt heading mặc định trong StarterKit
      }),
      Underline,
      Heading.configure({ levels: [1, 2, 3] }),
      TextAlign.configure({ types: ["heading", "paragraph", "resizableImage"] }),
      CustomResizableImage,
    ],
    content: "",
  });

  const [blog, setBlog] = useState<Blog>({
    id: "",
    title: "",
    thumbnailName: "",
    thumbnailFile: null,
    status: 1,
    content: "",
    email: "",
  });

  const setTitle = (title: string) => {
    setBlog(prev => ({ ...prev, title }));
  };

  const setThumbnailName = (thumbnailName: string) => {
    setBlog(prev => ({ ...prev, thumbnailName }));
  };

  const setThumbnailFile = (thumbnailFile: File | null) => {
    setBlog(prev => ({ ...prev, thumbnailFile }));
  };

  const setStatus = (status: number) => {
    setBlog(prev => ({ ...prev, status }));
  };


  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setThumbnailName(reader.result as string);
      reader.readAsDataURL(file);
      setThumbnailFile(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!editor) return;

    const contentHTML = editor.getHTML();
    const cleanedHTML = contentHTML.replace(/<p[^>]*>\s*<\/p>/g, '<p>&nbsp;</p>');

    const formData = new FormData();
    formData.append("title", blog.title);

    if (blog.thumbnailFile) {
      formData.append("thumbnailName", blog.thumbnailFile.name);
      formData.append("thumbnailFile", blog.thumbnailFile);
    }
    formData.append("status", blog.status.toString());

    formData.append("content", cleanedHTML);

    const userEmail = localStorage.getItem('email');
    if (userEmail !== null) {
      formData.append("email", userEmail);
    }

    try {
      const response = await blogApi.createBlog(formData);
      console.log("Blog saved:", response.data);
    } catch (error) {
      console.error("Error saving product:", error);
    }

    window.location.reload();
  }

  return (
    // <div className="mx-auto mt-10 p-4 border rounded-xl shadow-xl bg-white">
    <div className="relative p-4 w-full max-h-full">
      <div className="relative p-4 bg-white rounded-md shadow dark:bg-gray-800 sm:p-5">

        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Thêm bài viết mới</h3>
            <button onClick={toggleAdd}
              type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-md text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div>
            <label htmlFor="title" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Tiêu đề</label>
            <input onChange={(e) => setTitle(e.target.value)}
              type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 focus:outline-none focus:border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white placeholder-gray-600 placeholder-opacity-40 mb-6" placeholder="Tiêu đề bài viết" required />
          </div>

          <div className="flex flex-col items-center justify-center space-y-1">

            <label htmlFor="title" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Ảnh đại điện bài viết</label>

            <div className="mb-1">
              <label className="">
                <IoCloudUploadOutline className='text-gray-500 text-2xl cursor-pointer' />
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e)} required />
              </label>
            </div>

            <div className="mt-1 w-fit inline-block relative">
              <img src={
                typeof blog.thumbnailName === 'string'
                  ? blog.thumbnailName.startsWith('data:image') || blog.thumbnailName.startsWith('blob:')
                    ? blog.thumbnailName // ảnh mới upload
                    : import.meta.env.VITE_API_URL_THUMB_IMG + blog.thumbnailName // ảnh từ server
                  : '/path/to/default-image.jpg'
              }

                className="w-48 h-48 object-cover shadow border" />

              <MdOutlineCancel className="absolute top-0 right-0 w-5 h-5 bg-white cursor-pointer text-gray-500 rounded-full -translate-y-1/2 translate-x-1/2"
                onClick={() => {
                  setThumbnailName("");
                  setThumbnailFile(null)
                }} />
            </div>
          </div>

          <div className="my-3 flex items-center gap-3">
            <label htmlFor="title" className="block text-base font-medium text-gray-900 dark:text-white">Trạng thái: </label>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <input onChange={() => setStatus(1)}
                  id="default-radio-1" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" required />
                <label htmlFor="default-radio-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Công khai</label>
              </div>
              <div className="flex items-center">
                <input onChange={() => setStatus(0)}
                  id="default-radio-2" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" required />
                <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Riêng tư</label>
              </div>
            </div>
          </div>


          <label htmlFor="content" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Nội dung bài viết</label>

          <Toolbar editor={editor} />
          <div className="border rounded-md p-2 min-h-[300px]">
            <EditorContent
              editor={editor}
              className="space-y-4 [&_h1]:text-3xl [&_h1]:font-bold [&_h2]:text-2xl [&_ul]:list-disc [&_ol]:list-decimal [&_li]:ml-6 [&_*:focus]:outline [&_*:focus]:outline-2 [&_*:focus]:outline-white [&_*:focus]:rounded-md
          prose max-w-none
             [&_img]:shadow
             [&_div[data-align='center']]:text-center
             [&_div[data-align='right']]:text-right
             [&_div[data-align='left']]:text-left
             [&_div[data-align='center']>img]:mx-auto
             [&_div[data-align='right']>img]:ml-auto
             [&_div[data-align='left']>img]:mr-auto"
            />
          </div>

          <div className="flex items-center space-x-4 justify-end mt-6">
            <button type="submit" className="inline-flex items-center
        text-white bg-orange-400 hover:bg-orange-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-400 dark:hover:bg-orange-500">
              <IoDocumentTextOutline className="mr-1 -ml-1 w-5 h-5" />
              Thêm</button>
            <button
              onClick={toggleAdd}
              type="button" className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600">
              <svg className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div >
  );
}
