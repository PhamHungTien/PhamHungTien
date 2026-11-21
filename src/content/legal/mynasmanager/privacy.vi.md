---
title: 'Chính sách quyền riêng tư'
description: 'Cách My NAS Manager kết nối Synology DSM, xử lý thông tin đăng nhập, truyền tệp và kiểm tra giao dịch App Store.'
updated: '2026-11-22'
lang: vi
---

My NAS Manager là ứng dụng kết nối với Synology DiskStation Manager (DSM). Chính sách này giải thích cách ứng dụng xử lý kết nối máy chủ, tệp và quyền truy cập đã mua.

## Kết nối và dữ liệu trên NAS

Ứng dụng gửi yêu cầu DSM và truyền tệp đến địa chỉ NAS bạn nhập. Dữ liệu gửi đi có thể bao gồm thông tin đăng nhập, tệp và yêu cầu quản lý. Nhà phát triển không vận hành proxy hay máy chủ để chuyển tiếp lưu lượng này. Ứng dụng không tích hợp quảng cáo hay SDK phân tích của bên thứ ba.

Ứng dụng dùng mật khẩu và mã xác minh một lần để đăng nhập NAS rồi không lưu các giá trị này. Phiên DSM đã lưu, gồm mã phiên và thông tin kết nối, được giữ trong Keychain của thiết bị. Khi đăng xuất, ứng dụng xóa phiên đã lưu.

Khi kết nối NAS trong mạng cục bộ, hệ thống có thể yêu cầu cấp quyền truy cập mạng cục bộ. Ứng dụng hỗ trợ HTTPS và cho phép HTTP thường với các địa chỉ riêng hoặc cục bộ được hỗ trợ. HTTP thường truyền dữ liệu mà không mã hóa. Nếu bạn tải xuống, chia sẻ tệp hoặc tạo liên kết chia sẻ DSM, bản sao và quyền truy cập tại nơi nhận tuân theo cài đặt của nơi đó hoặc cài đặt trên NAS của bạn.

## Giao dịch App Store

Apple xử lý giao dịch và khôi phục mục đã mua qua App Store. My NAS Manager dùng StoreKit để kiểm tra quyền sử dụng đã mua và không nhận thông tin thẻ thanh toán. [Chính sách quyền riêng tư của Apple](https://www.apple.com/legal/privacy/)

## Hỗ trợ và thay đổi chính sách

Khi bạn gửi email, chúng tôi dùng thông tin bạn cung cấp để phản hồi yêu cầu. Vui lòng bỏ mật khẩu, mã phiên và mã xác minh khỏi thư hỗ trợ. Khi chính sách thay đổi, chúng tôi đăng bản mới cùng ngày cập nhật trên trang này.

Nếu có câu hỏi về quyền riêng tư, hãy gửi email đến [contact@phamhungtien.com](mailto:contact@phamhungtien.com).
