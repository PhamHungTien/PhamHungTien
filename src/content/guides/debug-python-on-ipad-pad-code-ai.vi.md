---
lang: vi
title: Gỡ lỗi Python trên iPad bằng điểm dừng trong Pad Code AI
description: Đặt điểm dừng, xem biến cục bộ và chạy từng bước trong Pad Code AI trên iPad để tìm và sửa lỗi tính số tiền giảm giá bằng Python.
published: 2026-11-23
app: padcodeai
topic: Pad Code AI
---

Chương trình Python có thể chạy đến cuối nhưng vẫn cho kết quả sai. Trong bài này, đoạn mã tính giá sau khi giảm 25% từ `80` in ra `79.75` thay vì `60.00`. Bạn sẽ dùng trình gỡ lỗi của Pad Code AI để tạm dừng chương trình và tìm phép tính đầu tiên cho ra giá trị sai. Ví dụ chạy ngay trên iPad bằng trình chạy Python tích hợp và không cần cài thêm gói.

## Chạy thử để thấy kết quả sai

Mở một dự án lưu trên thiết bị, tạo tệp `checkout.py`, nhập đoạn mã sau rồi lưu. Nếu chưa có dự án, hãy xem [cách tạo và chạy dự án Python đầu tiên trên iPad](/huong-dan/run-python-on-ipad-pad-code-ai/).

```python
def checkout(subtotal, percent):
    discount = percent / 100
    total = subtotal - discount
    return total

print(f"{checkout(80, 25):.2f}")
```

Mở `checkout.py`, chọn **Chạy › Chạy tệp đang hoạt động** và kiểm tra xem cửa sổ dòng lệnh có in `79.75` không.

## Đặt điểm dừng và xem biến cục bộ

1. Chạm vào số dòng bên cạnh `total = subtotal - discount`. Dấu điểm dừng xuất hiện ở lề trái.
2. Chạy lại tệp đang mở. Trình soạn thảo tô sáng dòng có điểm dừng và cửa sổ dòng lệnh hiện trạng thái tạm dừng. Python đang đứng ở dòng được tô sáng, ngay trước khi thực hiện phép trừ.
3. Ở mục **Cục bộ**, tìm `subtotal = 80`, `percent = 25` và `discount = 0.25`. Giá trị `0.25` là tỷ lệ giảm ở dạng số thập phân. Dòng tiếp theo lại dùng nó làm số tiền cần trừ.
4. Chạm **Bước qua** để thực hiện phép trừ và dừng ở `return total`. Lúc này bạn sẽ thấy `total = 79.75`. Trên cửa sổ hẹp, nút này có biểu tượng mũi tên gập sang phải. Nếu danh sách biến đang thu gọn, chạm dấu mũi tên ở đầu khung gỡ lỗi để mở ra.

## Kiểm tra công thức và chạy lại

Trong Pad Code AI 3.0, khi chương trình đang dừng trong hàm `checkout`, bạn có thể nhập `subtotal * percent / 100` vào ô **Thêm biểu thức** dưới mục **Theo dõi** rồi xác nhận. Trình gỡ lỗi dùng giá trị các biến tại điểm dừng và trả về `20.0`.

Chạm **Tiếp tục** để hoàn tất lượt chạy. Chạm lại số dòng để bỏ điểm dừng, sau đó sửa dòng tính mức giảm thành `discount = subtotal * percent / 100`. Lưu và chạy lại. Kết quả đúng là `60.00`. Để kiểm tra thêm một trường hợp, đổi lời gọi hàm thành `checkout(120, 10)` rồi chạy lại. Lần này kết quả là `108.00`.

Nếu chương trình chạy qua điểm dừng, hãy kiểm tra bạn có đang chạy đúng tệp `checkout.py` và dấu điểm dừng có nằm trên dòng mã thực thi hay không. Với dự án lớn hơn, khi trình gỡ lỗi có nhiều khung thực thi, bạn có thể dùng ngăn xếp lời gọi để tìm nơi gọi hàm. Xem thêm các công cụ lập trình cục bộ trên [trang Pad Code AI](/vi/PadCodeAI/).
