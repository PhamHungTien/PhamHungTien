---
lang: vi
title: 'Cách xem và kiểm tra mã do AI sửa trên iPad với Pad Code AI'
description: 'Dùng Pad Code AI để lập kế hoạch cho một thay đổi JavaScript, đối chiếu các dòng mã đã sửa, thử trong bản xem trước và hoàn tác khi cần.'
published: 2026-11-22
app: padcodeai
topic: Pad Code AI
---

Bài này dùng [Pad Code AI](/vi/PadCodeAI/) để thêm nút bỏ đánh dấu cho danh sách đọc sách gồm ba mục. Bạn có thể thực hiện trên iPad hoặc iPhone. Bắt đầu bằng một yêu cầu nhỏ để biết chính xác tệp nào cần sửa và kết quả nào cần kiểm tra.

## Chuẩn bị dự án mẫu và chọn nhà cung cấp

Dùng dự án trong [bài xem trước HTML, CSS và JavaScript](/huong-dan/preview-html-css-javascript-on-ipad/) hoặc thử trên bản sao của một danh sách nhỏ bạn đã có. Lưu lại các tệp, mở bản xem trước và đánh dấu một mục. Hãy xác nhận bộ đếm hiện `1 / 3` trước khi nhờ AI chỉnh sửa.

Trong **Cài đặt**, mở **Trợ lý AI** và chọn nhà cung cấp. Nhà cung cấp Apple Intelligence cần iOS hoặc iPadOS 26 trở lên và thiết bị tương thích đã bật tính năng. Xem [yêu cầu về thiết bị và khu vực của Apple](https://support.apple.com/en-us/121115). Mô hình tải về cần đủ dung lượng và bộ nhớ. Các chế độ Plan, Edit và Auto cần mô hình có thể gọi công cụ. Khi chọn nhà cung cấp trực tuyến, ứng dụng dùng khoá API của bạn để gửi câu hỏi và nội dung bạn cho phép chia sẻ. Trong lượt làm việc, agent có thể yêu cầu thêm dữ liệu từ dự án. Xem thông tin sẽ gửi và quyền chia sẻ trước khi xác nhận. Với bài tập này, hãy dùng dự án mẫu và để khoá API, thông tin riêng tư bên ngoài mã. Xem [chính sách quyền riêng tư](/vi/PadCodeAI/privacy.html) để biết thêm chi tiết.

## Xem kế hoạch rồi mới giao việc sửa

Mở bảng AI của dự án. Chọn **Hỏi** nếu bạn muốn trợ lý giải thích một hàm. Chọn **Lập kế hoạch** để trợ lý đọc tệp cần thiết và đề xuất cách làm. Nếu chế độ này chưa dùng được, kiểm tra xem bạn đã mở dự án chưa và mô hình đang chọn có hỗ trợ thao tác của agent không.

Hãy mô tả phạm vi sửa và cách kiểm tra cụ thể.

> Lập kế hoạch thêm nút Bỏ đánh dấu. Đặt nút trong index.html và viết phần xử lý trong app.js. Khi bấm nút, bỏ dấu cả ba ô và cập nhật bộ đếm thành 0 / 3. Giữ định dạng hiện có và thao tác đánh dấu từng ô. Dùng JavaScript có sẵn trong bản xem trước.

Một kế hoạch phù hợp sẽ dùng lại danh sách ô đánh dấu và hàm `updateProgress()`. Nếu đồng ý với cách làm, chọn **Sửa** rồi yêu cầu thực hiện. Chế độ này cho phép agent sửa tệp. **Tự động** còn cho phép agent chạy mã mà ứng dụng hỗ trợ.

## So lại các dòng thay đổi và thử nút

1. Mở **Thay đổi của Agent** trong bảng AI và chọn thao tác mới nhất. Trên màn hình hẹp, mục này có thể nằm trong menu mở rộng. Màn hình **Xem thay đổi** hiển thị các dòng thêm và xoá theo từng tệp.
2. Kiểm tra `index.html` có thêm nút và `app.js` có thêm xử lý khi chạm. Đoạn xử lý cần bỏ dấu các ô hiện có rồi gọi `updateProgress()`. Nếu agent sửa vượt phạm vi, chọn **Hoàn tác thao tác** cho lượt đó và gửi lại yêu cầu ngắn hơn.
3. Mở `index.html` bằng **Xem trước web trực tiếp**. Kiểm tra số ban đầu là `0 / 3`. Đánh dấu hai mục để thấy `2 / 3`, rồi chạm **Bỏ đánh dấu** và kiểm tra số trở về `0 / 3`. Đánh dấu thêm một ô để xác nhận thao tác cũ vẫn dùng được. Nếu có bàn phím rời, thử dùng Tab đưa tiêu điểm đến nút và Enter để kích hoạt.

Agent ghi thay đổi vào dự án trước khi bạn mở lịch sử để xem lại. Dùng dự án mẫu hoặc bản sao khi mới thử thao tác này. Nếu đã dùng Git, hãy mở mục quản lý mã nguồn để đối chiếu lần cuối trước khi commit. Khi bạn có thể đọc phần thay đổi và tự lặp lại bài thử, hãy áp dụng quy trình đó cho công việc tiếp theo.
