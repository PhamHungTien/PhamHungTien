---
lang: vi
title: Truy cập Synology NAS từ xa với iPhone và iPad
description: So sánh QuickConnect, DDNS và VPN cho Synology NAS, thiết lập bảo mật DSM và kết nối với My NAS Manager trên iPhone hoặc iPad.
published: 2026-11-22
app: mynasmanager
topic: My NAS Manager
---

Bạn có thể xem ảnh, tài liệu hoặc trạng thái Synology NAS khi đi xa bằng cách thiết lập một đường kết nối phù hợp. Bài này so sánh QuickConnect, DDNS và VPN, rồi hướng dẫn kiểm tra kết nối trong [My NAS Manager](/vi/MyNASManager/).

## Xác định địa chỉ và cổng DSM

Ở nhà, NAS thường có một địa chỉ nội bộ như `192.168.1.10`. DSM mặc định dùng cổng **5000 cho HTTP** và **5001 cho HTTPS**. Địa chỉ `192.168.x.x` chỉ có thể truy cập qua mạng nội bộ hoặc qua một đường kết nối riêng vào mạng đó. [Tài liệu cổng DSM của Synology](https://kb.synology.com/en-global/DSM/help/DSM/AdminCenter/system_login_portal_dsm)

## Chọn cách truy cập từ xa

### QuickConnect

QuickConnect dùng mã định danh của Synology để các ứng dụng tương thích tìm NAS qua Internet. Khi chưa thể kết nối trực tiếp, dịch vụ có thể chuyển tiếp lưu lượng qua máy chủ Synology. Cách này dễ dùng cho các ứng dụng như Synology Photos hoặc DS file. Một số ứng dụng bên thứ ba cần địa chỉ DSM trực tiếp. [Hướng dẫn QuickConnect](https://kb.synology.com/en-us/DSM/help/DSM/AdminCenter/connection_quickconnect)

### DDNS và chuyển tiếp cổng

**DDNS** cập nhật tên miền của NAS khi IP công cộng thay đổi. Để tên miền trỏ tới một dịch vụ phía sau router, người quản trị còn phải cấu hình đường truy cập mạng. Chuyển tiếp cổng DSM ra Internet công khai dịch vụ quản trị, nên hãy cân nhắc VPN trước. Nếu nhà mạng dùng CGNAT, chuyển tiếp cổng thông thường có thể không hoạt động. [Hướng dẫn truy cập từ xa của Synology](https://kb.synology.com/en-eu/DSM/tutorial/Quick_Start_External_Access)

### VPN hoặc Tailscale

VPN tạo một đường kết nối riêng tới NAS mà không phải công khai cổng quản trị DSM. Với Tailscale, cài ứng dụng trên NAS và thiết bị Apple, rồi dùng địa chỉ Tailscale của NAS. Muốn dùng IP nội bộ thông thường qua Tailscale, bạn cần cấu hình định tuyến mạng con. Nếu router hoặc NAS cung cấp OpenVPN hay WireGuard, làm theo hướng dẫn của thiết bị. Chỉ cho các tài khoản và thiết bị cần thiết quyền vào NAS. [Hướng dẫn Tailscale cho Synology](https://tailscale.com/docs/integrations/synology)

| Việc cần làm                                             | Phương án phù hợp               |
| -------------------------------------------------------- | ------------------------------- |
| Xem ảnh hoặc tài liệu bằng ứng dụng Synology tương thích | QuickConnect                    |
| Quản trị NAS hoặc dùng ứng dụng cần địa chỉ DSM          | VPN hoặc Tailscale              |
| Dùng tên miền công cộng cho một dịch vụ đã được bảo vệ   | DDNS cùng cấu hình mạng phù hợp |

## Chuẩn bị bảo mật trên DSM

1. Tạo một tài khoản quản trị riêng, thử đăng nhập rồi tắt tài khoản `admin` mặc định.
2. Đặt mật khẩu dài, riêng cho NAS. Bật xác thực hai bước cho tài khoản quản trị.
3. Bật **Auto Block** trong phần bảo mật của DSM để hạn chế các lần đăng nhập sai liên tiếp.
4. Dùng **HTTPS** và cài chứng chỉ đáng tin cậy khớp với tên miền bạn dùng để kết nối.
5. Rà lại quy tắc tường lửa và các cổng đang mở. Giữ dịch vụ quản trị DSM và SSH trong mạng riêng khi có thể.
6. Cập nhật DSM, các gói cài đặt và duy trì bản sao lưu riêng. RAID giúp hệ thống chịu được một số lỗi ổ đĩa, còn bản sao lưu giúp khôi phục khi tệp bị xóa hoặc ghi đè.

[Tài liệu tăng cường bảo mật NAS của Synology](https://kb.synology.com/en-us/DSM/tutorial/How_to_add_extra_security_to_your_Synology_NAS).

## Kết nối với My NAS Manager

My NAS Manager dùng với Synology **DSM 7 trở lên**. Khi kết nối với NAS của bạn, chuẩn bị:

- **IP hoặc tên máy chủ** có thể truy cập từ mạng hiện tại. Nếu đang ở xa, kết nối VPN trước và dùng địa chỉ mà VPN cung cấp.
- **Cổng DSM** đúng với cấu hình của bạn. Bật **HTTPS** và dùng `5001` nếu NAS đang dùng cổng mặc định.
- **Tên đăng nhập và mật khẩu DSM**. Dùng tài khoản chỉ có quyền cần cho công việc. Nếu DSM yêu cầu xác thực hai bước, nhập mã OTP khi ứng dụng hỏi.

Tùy chọn ghi nhớ đăng nhập lưu phiên DSM trong Keychain. Sau khi vào, bạn có thể xem CPU, RAM, lưu lượng mạng, tình trạng ổ đĩa và RAID, rồi duyệt thư mục hoặc quản lý gói theo quyền tài khoản. Các chức năng quản trị như SSH chỉ cần bật trong thời gian sử dụng.

## Khi kết nối không thành công

| Triệu chứng                        | Kiểm tra                                              |
| ---------------------------------- | ----------------------------------------------------- |
| Không tìm thấy DSM                 | Địa chỉ, cổng, trạng thái VPN và quy tắc tường lửa    |
| Chứng chỉ HTTPS không đáng tin cậy | Tên máy chủ, ngày hết hạn và chuỗi chứng chỉ của DSM  |
| DSM từ chối đăng nhập              | Tên người dùng, mật khẩu, OTP và danh sách Auto Block |
| Địa chỉ không hợp lệ               | Khoảng trắng, lỗi chính tả và cổng đã nhập            |

Đọc thêm về các khả năng quản trị trên [trang My NAS Manager](/vi/MyNASManager/) hoặc xem [ứng dụng trên App Store](https://apps.apple.com/app/id6780180564).
