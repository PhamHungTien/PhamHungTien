---
lang: vi
title: 'Xem trước HTML, CSS và JavaScript trên iPad bằng Pad Code AI'
description: 'Tạo danh sách đọc sách với HTML, CSS và JavaScript trên iPad hoặc iPhone, rồi kiểm tra giao diện hẹp và tìm lỗi bằng bảng điều khiển.'
published: 2026-11-22
app: padcodeai
topic: Pad Code AI
---

Bạn có thể làm một trang web nhỏ trên iPad hoặc iPhone để thấy HTML, CSS và JavaScript phối hợp thế nào. Bài này dùng [Pad Code AI](/vi/PadCodeAI/) để tạo danh sách đọc sách. Khi bạn đánh dấu một mục, số việc đã xong sẽ đổi ngay. Sau khi cài ứng dụng, ví dụ này chạy ngoại tuyến vì mọi tệp đều nằm trong dự án.

## Tạo dự án và ba tệp

Từ màn hình chính của Pad Code AI, chọn **Dự án mới**, chọn **Thư mục trống** và lưu vào thư mục trên thiết bị mà bạn có thể mở trong ứng dụng Tệp. Dùng **Tệp mới** để tạo `index.html`, `styles.css` và `app.js` cùng cấp. Nếu tệp đã có nội dung mẫu, thay bằng đoạn tương ứng dưới đây.

### Viết phần HTML

Dán đoạn sau vào `index.html`. Cài đặt viewport giúp trang hiển thị vừa chiều rộng màn hình. Hai đường dẫn bắt đầu bằng `./` trỏ tới tệp nằm cùng thư mục.

```html
<!doctype html>
<html lang="vi">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Việc cần làm khi đọc sách</title>
    <link rel="stylesheet" href="./styles.css" />
    <script src="./app.js" defer></script>
  </head>
  <body>
    <main class="checklist">
      <h1>Việc cần làm khi đọc sách</h1>
      <label><input type="checkbox" /> Chọn một bài viết</label>
      <label><input type="checkbox" /> Đọc mười trang</label>
      <label><input type="checkbox" /> Viết một ghi chú ngắn</label>
      <p>Đã xong <output data-progress aria-live="polite">0 / 3</output></p>
    </main>
  </body>
</html>
```

### Định dạng danh sách với CSS

Dán đoạn này vào `styles.css`. Mỗi hàng có khoảng trống để dễ chạm trên màn hình nhỏ.

```css
body {
  margin: 0;
  padding: 1.25rem;
  font:
    1rem/1.5 system-ui,
    sans-serif;
  background: #e9f2ed;
  color: #18312a;
}

.checklist {
  max-width: 30rem;
  margin-inline: auto;
  padding: 1.25rem;
  border-radius: 1rem;
  background: white;
}

label {
  display: flex;
  gap: 0.65rem;
  align-items: center;
  min-height: 44px;
}
```

### Đếm số mục đã xong

Dán đoạn này vào `app.js`. Thuộc tính `defer` cho phép trình duyệt đọc xong phần HTML trước khi chạy mã tìm các ô đánh dấu.

```javascript
const items = [...document.querySelectorAll('input[type="checkbox"]')];
const progress = document.querySelector('[data-progress]');

function updateProgress() {
  const count = items.filter((item) => item.checked).length;
  progress.textContent = count + ' / ' + items.length;
}

items.forEach((item) => item.addEventListener('change', updateProgress));
updateProgress();
```

## Mở bản xem trước và thử trên màn hình hẹp

1. Lưu các tệp và mở `index.html`. Trong **Bảng lệnh**, tìm **Xem trước web trực tiếp**. Nếu dùng bàn phím rời, bạn cũng có thể chọn **Xem trước** trong menu **Chạy**.
2. Xem trang có đủ tiêu đề, ba ô đánh dấu và số `0 / 3` không. Đánh dấu hai ô để thử `2 / 3`, rồi bỏ một dấu và kiểm tra lại.
3. Mở **Các tùy chọn xem trước** và chọn **Chiều rộng cửa sổ hiển thị**. Thử chiều rộng 390 và 768 điểm khi cửa sổ đủ rộng. Xem nhãn dài có xuống dòng gọn và trang có tránh cuộn ngang không.
4. Chạm **Xong** để trở lại trình soạn thảo. Sửa khoảng đệm trong `styles.css` rồi mở lại bản xem trước. Pad Code AI dùng cả nội dung đang sửa trong các thẻ tệp đã mở. Hãy lưu tệp trước khi chuyển sang ứng dụng khác hoặc gửi cho người khác.

## Tìm lỗi khi trang chạy chưa đúng

Trang hiện chữ nhưng thiếu định dạng? Kiểm tra tên tệp và đường dẫn `href="./styles.css"`, kể cả chữ hoa và chữ thường. Nếu giao diện đúng mà số đếm đứng yên, mở **Bảng điều khiển** trong bản xem trước. So lại `src="./app.js"` và kiểm tra thuộc tính `data-progress` có khớp với bộ chọn trong JavaScript. Thêm tạm `console.log("checklist ready")` vào cuối tệp rồi **Tải lại** để biết mã có chạy tới cuối không. Xoá dòng log sau khi kiểm tra.

Bản xem trước phục vụ việc kiểm tra các tệp ngay trong ứng dụng. Để người khác mở trang qua một URL công khai, bạn cần đưa các tệp lên dịch vụ lưu trữ web. Nếu thường xuyên sửa HTML và CSS cùng lúc, bạn có thể thử chia đôi trình soạn thảo trong lượt dùng miễn phí mỗi ngày. Xem các lựa chọn Pro hiện có trong ứng dụng hoặc trên [trang App Store](https://apps.apple.com/app/id6774398897).

Khi danh sách đã chạy, bạn có thể [nhờ AI thêm nút bỏ đánh dấu và tự kiểm tra phần mã thay đổi](/huong-dan/review-ai-code-changes-on-ipad/).
