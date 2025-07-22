const DeleteAccount = () => {
    return (
        <div className="max-w-2xl mx-auto p-6 text-gray-800">
            <h1 className="text-2xl font-bold mb-4 text-red-600">Yêu Cầu Xóa Dữ Liệu</h1>
            <p className="mb-4">
                Nếu bạn muốn xóa dữ liệu tài khoản của mình khỏi hệ thống <strong>kushoe.xyz</strong>, vui lòng gửi email đến địa chỉ:
                <a href="mailto:support@kushoe.xyz" className="text-blue-600 underline">support@kushoe.xyz</a> với tiêu đề <strong>"Yêu cầu xóa dữ liệu"</strong>.
            </p>
            <p className="mb-4">
                Sau khi nhận được yêu cầu, chúng tôi sẽ xác thực danh tính của bạn và tiến hành xóa tất cả dữ liệu liên quan trong vòng 7 ngày làm việc.
            </p>
            <p>
                Nếu bạn đăng nhập qua Facebook, bạn cũng có thể hủy quyền truy cập của ứng dụng trong phần <a href="https://www.facebook.com/settings?tab=applications" className="text-blue-600 underline" target="_blank">Cài đặt Ứng dụng của Facebook</a>.
            </p>
        </div>
    )
}

export default DeleteAccount;