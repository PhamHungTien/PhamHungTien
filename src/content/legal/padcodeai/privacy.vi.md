---
title: "Chính sách quyền riêng tư"
description: "Cách Pad Code AI xử lý dự án, AI, tải gói thư viện, Git và GitHub, SSH và SFTP, và giao dịch App Store."
updated: '2026-11-22'
lang: vi
---
## Tổng quan

Pad Code AI là trình soạn thảo mã và IDE cho iPad, iPhone, ưu tiên xử lý trên thiết bị. Chính sách này giải thích dữ liệu nào được giữ trên máy và khi nào các tính năng bạn sử dụng kết nối với dịch vụ bên thứ ba.

## Dữ liệu nhà phát triển thu thập

- Ứng dụng không yêu cầu tài khoản do nhà phát triển quản lý.
- Ứng dụng không tích hợp bộ công cụ phân tích, quảng cáo hoặc theo dõi của bên thứ ba và không gửi dữ liệu đo lường hoạt động ứng dụng đến máy chủ do nhà phát triển vận hành.
- Chúng tôi không vận hành máy chủ nhận dự án hay hội thoại AI của bạn. Nếu bạn gửi email hỗ trợ, chúng tôi nhận những thông tin bạn chọn đưa vào email.
- Apple có thể xử lý thông tin App Store và chẩn đoán theo cài đặt thiết bị cùng chính sách của Apple. Các dịch vụ mạng được mô tả dưới đây có thể nhận thông tin cần thiết để cung cấp tính năng bạn sử dụng.

## Mã nguồn, tệp và thực thi trên thiết bị

Dự án và mã nguồn nằm trong bộ nhớ ứng dụng hoặc thư mục bạn mở từ ứng dụng Tệp, trừ khi bạn chọn tính năng chia sẻ hay kết nối mạng. Nhà cung cấp lưu trữ bạn chọn trong Tệp có thể đồng bộ các thư mục đó theo chính sách riêng.

Chương trình được hỗ trợ được biên dịch hoặc thông dịch và thực thi trong môi trường cách ly trên thiết bị. Ứng dụng không tải mã nguồn của bạn lên máy chủ để biên dịch hay thực thi. Quyền truy cập của môi trường chạy bị giới hạn, không phải quyền truy cập toàn bộ thiết bị hoặc hệ thống.

### Gói Python

Khi bạn chạy mã Python có nhập thêm gói thư viện, ứng dụng có thể tải gói và các phụ thuộc từ CDN phân phối gói Pyodide hoặc Python Package Index (PyPI). Chương trình chỉ dùng thư viện chuẩn không cần tải các gói này. Dịch vụ phân phối gói nhận tên gói, phiên bản được yêu cầu và thông tin kết nối thông thường như địa chỉ IP. Ứng dụng phân tích câu lệnh nhập thư viện trên thiết bị; không tải mã nguồn lên các dịch vụ đó để xác định gói cần dùng. Việc tải cần kết nối internet và tuân theo chính sách riêng của dịch vụ.

### Xem trước web

Tính năng xem trước web dùng WebKit để hiển thị HTML, CSS và JavaScript trình duyệt mà bạn chọn xem trước. Nội dung này có thể yêu cầu ảnh, tập lệnh, tài nguyên từ xa hoặc kết nối với dịch vụ được tham chiếu trong mã của bạn. Những dịch vụ đó nhận dữ liệu do nội dung của bạn gửi đi. Việc biên dịch và chạy mã trên thiết bị không có nghĩa mọi thao tác xem trước hay tải gói đều ngoại tuyến.

## Trợ lý AI tùy chọn

Bạn chọn có dùng AI hay không và cách hoạt động trong Cài đặt:

- **Mô hình trên thiết bị.** Yêu cầu và mã được xử lý trên thiết bị. Bạn có thể tải mô hình được hỗ trợ từ máy chủ phân phối hoặc nhập tệp mô hình do bạn chọn. Máy chủ nhận yêu cầu tải mô hình và thông tin kết nối thông thường. Nội dung trò chuyện và không gian làm việc được xử lý cục bộ ở chế độ này.
- **Nhà cung cấp bên thứ ba tùy chọn**: khi bạn gửi tin nhắn, câu lệnh được gửi trực tiếp từ thiết bị đến nhà cung cấp hoặc điểm cuối tương thích mà bạn cấu hình, nếu có tại khu vực App Store của bạn. Nội dung tệp đang mở và tên tệp trong dự án được gửi theo tùy chọn chia sẻ bạn bật. Nếu bạn cho phép truy cập không gian làm việc cho một tác vụ Agent, nội dung tệp liên quan và kết quả công cụ cũng có thể được đưa vào hội thoại của tác vụ đó.

Ứng dụng yêu cầu cho phép trước khi chia sẻ với nhà cung cấp từ xa. Bạn có thể đổi tùy chọn chia sẻ hoặc thu hồi quyền trong Cài đặt. Dữ liệu AI từ xa đi đến nhà cung cấp bạn chọn, không qua máy chủ AI do nhà phát triển vận hành. Chính sách quyền riêng tư, quy định lưu giữ dữ liệu và điều khoản của nhà cung cấp đó được áp dụng. Nếu bạn chọn đăng nhập OpenRouter, OpenRouter xử lý xác thực và cấp khóa API cho ứng dụng.

## Git, GitHub và thông tin xác thực

Các tính năng Git kết nối trực tiếp với máy chủ kho mã HTTPS được hỗ trợ mà bạn chọn, bao gồm cả máy chủ ngoài GitHub. Clone, fetch và pull yêu cầu dữ liệu kho mã; push tải lên các commit và tệp mà bạn chọn công bố. Khi xác thực, thông tin đăng nhập cần thiết được gửi đến máy chủ kho mã. Máy chủ nhận thông tin kết nối thông thường và áp dụng chính sách riêng. Nếu bạn đăng nhập GitHub trong Cài đặt, GitHub xử lý cấp quyền và ứng dụng dùng mã truy cập để liệt kê và mở những kho mã mà tài khoản của bạn có quyền truy cập.

Khóa API và token truy cập Git đã lưu được giữ trong Keychain của iOS trên thiết bị. Ứng dụng dùng chúng cho dịch vụ đã cấu hình có yêu cầu xác thực. Hãy giữ kín URL kho mã, thông tin xác thực và chỉ kết nối với dịch vụ bạn tin cậy.

## Máy chủ từ xa qua SSH và SFTP

Khi bạn kết nối với máy chủ đã cấu hình, thiết bị gửi dữ liệu xác thực, nội dung nhập vào terminal và các tệp bạn chọn đọc hoặc ghi trực tiếp đến máy chủ đó. Địa chỉ máy chủ, tên người dùng và dấu vân tay khóa máy chủ đã lưu được giữ trên thiết bị. Mật khẩu, khóa riêng và cụm mật khẩu đã lưu được giữ trong Keychain. Khóa riêng được dùng trên thiết bị để xác thực. Khi mất kết nối, ứng dụng có thể giữ cục bộ nội dung sửa đã lưu của tệp từ xa rồi tải lên khi kết nối được với máy chủ. Máy chủ từ xa có thể ghi nhận truy cập, lệnh và tệp theo chính sách riêng.

## Giao dịch App Store

Các giao dịch Premium tùy chọn dùng StoreKit của Apple. Apple xử lý thanh toán và khôi phục giao dịch. Ứng dụng kiểm tra quyền mua đã xác minh để mở công cụ nâng cao và kiểm tra storefront của App Store để xác định khả năng cung cấp theo khu vực. StoreKit có thể kết nối với Apple để tải giá, cập nhật giao dịch hoặc thông tin storefront, kể cả ngoài lúc bạn chủ động mua hàng. Thông tin thẻ thanh toán của bạn không được gửi đến nhà phát triển.

## Các tính năng mạng khác

Khi mở liên kết hỗ trợ, cộng đồng, video hoặc App Store, trình duyệt hay ứng dụng phù hợp sẽ kết nối với dịch vụ đích. Chia sẻ hoặc xuất dự án chỉ gửi dữ liệu đến nơi bạn chọn. Những dịch vụ và nơi nhận đó có cách xử lý quyền riêng tư riêng.

## Quyền riêng tư của trẻ em

Ứng dụng không yêu cầu hồ sơ cá nhân và không tích hợp bộ công cụ quảng cáo hoặc theo dõi dành cho trẻ em. Cách lưu trữ trên thiết bị và sử dụng dịch vụ tùy chọn nêu trên áp dụng cho mọi người dùng; dịch vụ bên thứ ba có thể có yêu cầu độ tuổi và chính sách riêng.

## Thay đổi chính sách

Chúng tôi có thể cập nhật chính sách theo thời gian. Các thay đổi sẽ được đăng trên trang này kèm ngày cập nhật mới.

## Liên hệ

Nếu có câu hỏi về chính sách này, hãy liên hệ **contact@phamhungtien.com**.
