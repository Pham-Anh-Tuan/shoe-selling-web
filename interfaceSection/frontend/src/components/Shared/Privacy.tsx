
const Privacy = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
    <h1 className="text-3xl font-bold mb-6 text-blue-600">Chính Sách Bảo Mật</h1>
    <p className="text-sm text-gray-500 mb-8">Cập nhật lần cuối: 22/07/2025</p>

    <p className="mb-4">
      Chúng tôi tôn trọng quyền riêng tư của bạn và cam kết bảo vệ thông tin cá nhân của bạn khi sử dụng website <strong>kushoe.xyz</strong>.
    </p>

    <h2 className="text-2xl font-semibold mt-8 mb-3">1. Thông Tin Chúng Tôi Thu Thập</h2>
    <ul className="list-disc ml-6 mb-4 space-y-1">
      <li>Họ tên</li>
      <li>Email</li>
      <li>Ảnh đại diện</li>
      <li>ID người dùng từ mạng xã hội</li>
    </ul>
    <p className="mb-4">
      Chúng tôi không thu thập mật khẩu hoặc bất kỳ thông tin nhạy cảm nào khác.
    </p>

    <h2 className="text-2xl font-semibold mt-8 mb-3">2. Mục Đích Sử Dụng Thông Tin</h2>
    <ul className="list-disc ml-6 mb-4 space-y-1">
      <li>Xác thực và quản lý tài khoản</li>
      <li>Hiển thị thông tin cá nhân trong giao diện người dùng (nếu có)</li>
      <li>Cải thiện trải nghiệm người dùng</li>
    </ul>
    <p className="mb-4">
      Chúng tôi không bán hoặc chia sẻ thông tin cá nhân của bạn cho bên thứ ba, trừ khi có yêu cầu từ pháp luật.
    </p>

    <h2 className="text-2xl font-semibold mt-8 mb-3">3. Bảo Mật</h2>
    <p className="mb-4">
      Chúng tôi áp dụng các biện pháp bảo mật phù hợp để bảo vệ dữ liệu cá nhân, bao gồm mã hoá và kiểm soát truy cập.
    </p>

    <h2 className="text-2xl font-semibold mt-8 mb-3">4. Quyền Của Bạn</h2>
    <p className="mb-4">
      Bạn có quyền yêu cầu truy cập, chỉnh sửa hoặc xoá dữ liệu cá nhân của mình bất kỳ lúc nào bằng cách liên hệ với chúng tôi qua email:
      <a href="mailto:support@kushoe.xyz" className="text-blue-500 underline">support@kushoe.xyz</a>
    </p>
  </div>
  )
}

export default Privacy;