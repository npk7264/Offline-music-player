# ỨNG DỤNG NGHE NHẠC OFFLINE
## Thông tin nhóm N06
| STT  | Họ tên              | MSSV       | Tài khoản Github     | 
| -    | -                   | -          | -                    |
| 1    | Nguyễn Phúc Khang   | 20520569   | npk7264		           |
| 2    | Võ Trung Kiên       | 20521492   | kienvo3105           |
| 3    | Bùi Duy Anh Đức     | 20520047   | anhducbuui270802     |
| 4    | Hà Văn Linh         | 20521529   | hvl052k2             |
## Các chức năng của ứng dụng
- Nghe nhạc với các chức năng cơ bản: phát hoặc dừng bài hát, chuyển tới bài kế tiếp hoặc bài trước đó, lặp lại bài hát, tua thời gian bài hát.
- Sắp xếp bài hát theo tên bài hát, tên ca sĩ, ngày thêm.
- Tìm kiếm bài hát theo tên bài hát, tên ca sĩ.
- Tạo playlist, thêm bài hát vào playlist, xóa bài hát khỏi playlist.
- Đánh dấu bài hát yêu thích.
- Lưu lịch sử nghe gần đây.

**_Các chức năng đã bổ sung sau buổi vấn đáp_**
- Truy cập bộ nhớ điện thoại để lấy nhạc (nếu trên điện thoại không có nhạc thì danh sách nhạc sẽ là 35 bài hát có sẵn).
- Phát nhạc ở tất cả màn hình (thay vì chỉ phát nhạc trong màn hình Player, sử dụng useContext).
- Tạo nhanh một danh sách phát từ kết quả tìm kiếm.
- Lọc danh sách nghệ sĩ.
- Bảng xếp hạng bài hát nghe nhiều, có thể lọc nghe nhiều trong hôm nay, theo tháng, theo năm.

## Hướng dẫn cài đặt
- Clone repository về máy
  ```powershell
  git clone https://github.com/npk7264/MusicApp_ReactNative.git
  ```
  , hoặc download file zip, sau đó giải nén
- cd đến đường dẫn chứa thư mục MusicApp_ReactNative vừa clone về
- Sau đó chạy lệnh sau để cài đặt các thư viện cần thiết
```powershell
npm install
```
- Chạy tiếp lệnh sau để khởi động ứng dụng
```powershell
npx expo start
```
- Tải Expo Go trên điện thoại và khởi động Expo Go
- Để chạy MusicApp, ta có 2 cách:
  - Cách 1: Scan QR Code với QR Code hiển thị trên terminal máy tính
  - Cách 2: Tại mục `Enter URL manually` nhập: `exp://ip:19000`, với `ip` là địa chỉ ip của máy tính





