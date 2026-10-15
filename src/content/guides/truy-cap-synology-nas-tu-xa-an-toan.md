---
title: 'Truy cập Synology NAS từ xa an toàn và quản lý bằng iPhone, iPad, Mac'
description: So sánh QuickConnect, DDNS mở cổng và VPN để vào Synology NAS khi ở ngoài nhà, các bước bảo mật cần làm trước, rồi kết nối và giám sát NAS bằng My NAS Manager.
published: 2026-10-15
app: mynasmanager
topic: My NAS Manager
---

Có một chiếc Synology NAS ở nhà thì tiện thật: ảnh gia đình, tài liệu, phim đều ở một chỗ. Nhưng câu hỏi tiếp theo luôn là: **làm sao vào được NAS khi đang ở ngoài**, mà không biến nó thành mục tiêu cho kẻ xấu trên Internet? Bài này so sánh các cách truy cập từ xa, liệt kê những việc bảo mật nên làm trước, rồi hướng dẫn kết nối và theo dõi NAS bằng [My NAS Manager](/MyNASManager/) trên iPhone, iPad và Mac.

## Trước hết: NAS của bạn nhận kết nối ở đâu?

Trong mạng nhà, bạn vào DSM (hệ điều hành của Synology) bằng địa chỉ IP nội bộ, ví dụ `192.168.1.10`, với hai cổng mặc định:

- **5000** cho HTTP (không mã hóa);
- **5001** cho HTTPS (có mã hóa).

Khi ra khỏi nhà, địa chỉ `192.168.x.x` không còn dùng được nữa vì đó là địa chỉ trong mạng riêng. Bạn cần một trong ba cách dưới đây.

## Ba cách truy cập NAS từ xa

### 1. QuickConnect: dễ nhất

QuickConnect là dịch vụ của Synology. Bạn đặt một **QuickConnect ID**, rồi vào NAS qua địa chỉ dạng `quickconnect.to/ten-cua-ban`. Synology tự tìm đường đến NAS, kể cả khi bạn không mở cổng trên router. Khi không kết nối thẳng được, dữ liệu đi vòng qua máy chủ trung gian (relay) của Synology.

- **Ưu điểm:** không cần cấu hình router, không cần IP tĩnh.
- **Nhược điểm:** qua relay thì chậm, không hợp để chép file lớn. Ứng dụng bên thứ ba thường không dùng được QuickConnect ID trực tiếp.

### 2. DDNS và mở cổng: nhanh, nhưng phải cẩn thận

Phần lớn mạng gia đình ở Việt Nam có **IP động**, nghĩa là địa chỉ IP công cộng thay đổi theo thời gian. **DDNS** (Dynamic DNS) gắn một tên miền cố định, ví dụ `tennas.synology.me`, với IP hiện tại của nhà bạn và tự cập nhật khi IP đổi. Synology cung cấp miễn phí tên miền `synology.me` trong **Bảng điều khiển › Truy cập ngoài › DDNS**.

Sau đó bạn **chuyển tiếp cổng** (port forwarding) trên router: cho cổng 5001 từ Internet đi vào NAS.

- **Ưu điểm:** kết nối trực tiếp, tốc độ tối đa theo đường truyền nhà bạn.
- **Nhược điểm:** NAS lộ ra Internet. Bất kỳ ai cũng có thể thử đăng nhập, nên bắt buộc phải làm đủ các bước bảo mật ở phần sau.
- **Lưu ý:** nếu nhà mạng dùng **CGNAT** (bạn không có IP công cộng riêng), mở cổng sẽ không có tác dụng. Hãy kiểm tra IP WAN trên router có trùng với IP mà các trang "what is my IP" báo không.

### 3. VPN: an toàn nhất

Với VPN, điện thoại của bạn "vào" mạng nhà qua một đường hầm mã hóa, rồi truy cập NAS bằng IP nội bộ như đang ở nhà. NAS **không cần lộ cổng DSM ra Internet**.

- **Tailscale:** cài gói Tailscale từ Trung tâm gói trên NAS và ứng dụng Tailscale trên iPhone, iPad, Mac. Không cần mở cổng, hoạt động được cả khi nhà mạng dùng CGNAT. Đây là lựa chọn dễ nhất cho gia đình.
- **VPN Server của Synology:** gói chính thức, hỗ trợ OpenVPN và L2TP/IPSec. Cần mở một cổng cho VPN, nhưng chỉ một cổng đó.
- Nhiều router đời mới cũng có sẵn máy chủ WireGuard hoặc OpenVPN.

### Nên chọn cách nào?

| Nhu cầu                                              | Gợi ý                                              |
| ---------------------------------------------------- | -------------------------------------------------- |
| Thỉnh thoảng xem ảnh, mở vài tài liệu                | QuickConnect hoặc ứng dụng chính thức của Synology |
| Quản lý NAS, chép file lớn, dùng ứng dụng bên thứ ba | VPN (Tailscale), rồi kết nối bằng IP nội bộ        |
| Cần truy cập trực tiếp không qua VPN                 | DDNS + mở cổng 5001, kèm đủ các bước bảo mật       |

Nếu không chắc, hãy chọn **VPN**. Đó là cách vừa nhanh vừa không để NAS lộ ra ngoài.

## Bảo mật NAS trước khi cho truy cập từ xa

NAS bị mã độc tống tiền (ransomware) mã hóa toàn bộ dữ liệu là chuyện đã xảy ra nhiều lần trên thế giới, và gần như luôn bắt đầu từ một NAS lộ ra Internet với mật khẩu yếu. Hãy làm đủ những việc sau, đặc biệt nếu dùng cách mở cổng:

1. **Không dùng tài khoản `admin` mặc định.** Tạo tài khoản quản trị riêng với tên khác và tắt `admin`. Kẻ tấn công luôn thử `admin` đầu tiên.
2. **Mật khẩu dài và riêng**, không dùng lại ở dịch vụ khác.
3. **Bật xác minh hai bước (2FA)** cho mọi tài khoản quản trị. Khi đăng nhập, ngoài mật khẩu còn cần mã OTP từ ứng dụng xác thực trên điện thoại.
4. **Bật Tự động chặn (Auto Block)** trong Bảng điều khiển › Bảo mật, để chặn IP đăng nhập sai nhiều lần.
5. **Chỉ dùng HTTPS (cổng 5001)** khi truy cập từ xa. Xin chứng chỉ **Let's Encrypt** miễn phí cho tên miền DDNS trong Bảng điều khiển › Bảo mật › Chứng chỉ.
6. **Chỉ mở đúng cổng cần thiết.** Không mở cổng SSH (22) ra Internet. Tắt UPnP trên router để thiết bị không tự mở cổng.
7. **Cập nhật DSM và các gói** thường xuyên.
8. **Có bản sao lưu ở nơi khác.** RAID giúp chống hỏng ổ cứng, nhưng **không phải là sao lưu**: xóa nhầm hay bị mã hóa thì RAID cũng mất theo. Bật Snapshot (nếu ổ dùng Btrfs) và sao lưu ra ổ ngoài hoặc dịch vụ đám mây.

## Kết nối NAS bằng My NAS Manager

My NAS Manager là ứng dụng mình làm để quản lý Synology NAS (DSM 7 trở lên) trên iPhone, iPad và Mac: xem tài nguyên theo thời gian thực, duyệt file, quản lý gói và bật tắt SSH.

### Thử trước bằng chế độ Demo

Chưa muốn nhập thông tin NAS thật? Ở màn hình đăng nhập, chọn **Chế độ trải nghiệm (Demo Mode)** để xem toàn bộ giao diện với dữ liệu mô phỏng.

### Đăng nhập NAS thật

Ở mục **Thông tin kết nối**, điền:

- **NAS IP / DNS:** IP nội bộ (ví dụ `192.168.1.10`) khi ở nhà hoặc khi đã bật VPN; tên miền DDNS (ví dụ `tennas.synology.me`) nếu bạn mở cổng.
- **Port DSM:** `5001` khi bật **HTTPS** (khuyên dùng), `5000` nếu dùng HTTP trong mạng nhà.
- **Username** và **Mật khẩu DSM:** tài khoản trên NAS. Nên dùng tài khoản riêng, không dùng `admin`.

Nếu tài khoản đã bật xác minh hai bước, bật **2FA** ở mục **Bảo mật & Cài đặt** và nhập mã OTP khi được hỏi. Bật **Ghi nhớ đăng nhập** nếu muốn giữ phiên cho lần mở sau.

Lời khuyên: khi ở ngoài nhà, hãy bật Tailscale hoặc VPN trước, rồi kết nối bằng IP nội bộ. Bạn có tốc độ trực tiếp mà không phải mở cổng DSM.

### Gặp lỗi khi kết nối?

| Thông báo                                     | Nguyên nhân thường gặp                                                                                     |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Không kết nối được DSM                        | Sai IP hoặc port, chưa bật VPN khi ở ngoài, HTTPS bật nhưng port đang là 5000, hoặc tường lửa của NAS chặn |
| DSM từ chối đăng nhập                         | Sai tên hoặc mật khẩu, thiếu mã 2FA, hoặc IP của bạn đã bị Tự động chặn                                    |
| NAS IP, QuickConnect ID hoặc DNS không hợp lệ | Địa chỉ gõ sai định dạng, có thừa `http://` hoặc dấu cách                                                  |

Nếu đã đăng nhập sai nhiều lần, hãy kiểm tra danh sách chặn trong Bảng điều khiển › Bảo mật trên DSM.

## Những gì bạn làm được sau khi kết nối

- **Giám sát thời gian thực:** CPU, RAM, nhiệt độ, lưu lượng mạng và trạng thái ổ đĩa, RAID. Rất tiện để kiểm tra NAS có đang quá tải hay ổ nào có dấu hiệu hỏng.
- **File Station di động:** duyệt thư mục, tải file lên từ điện thoại, tải file xuống rồi lưu vào ứng dụng Tệp, tạo thư mục và tạo **liên kết chia sẻ** để gửi file cho người khác.
- **Quản lý gói:** bật, tắt các ứng dụng đã cài trên NAS như Download Station.
- **SSH:** bật hoặc tắt dịch vụ SSH, đổi cổng, và chạy các lệnh xem nhanh như `ls`, `df -h`, `top`, `uptime` qua terminal mô phỏng.

Mẹo bảo mật: chỉ bật SSH khi cần dùng, xong việc thì tắt đi. My NAS Manager giúp bật tắt nhanh từ điện thoại mà không phải mở DSM trên máy tính.

Tải My NAS Manager trên [App Store](https://apps.apple.com/us/app/my-nas-manager/id6780180564). Ứng dụng có giao diện tiếng Việt và sáu ngôn ngữ khác.

## Tóm tắt

- Muốn đơn giản: QuickConnect. Muốn nhanh và an toàn: VPN như Tailscale. Mở cổng chỉ khi bạn làm đủ các bước bảo mật.
- Tắt `admin`, bật 2FA, bật Tự động chặn, chỉ dùng HTTPS và luôn có bản sao lưu ở nơi khác.
- Với My NAS Manager, kết nối bằng IP nội bộ qua VPN hoặc tên miền DDNS với cổng 5001 và HTTPS.
