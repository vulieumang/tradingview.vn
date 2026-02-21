# TradingView.vn - Cache Busting Guide

## Vấn đề Browser Cache

Khi bạn cập nhật CSS hoặc JS, trình duyệt của khách hàng có thể vẫn dùng phiên bản cũ do cache. Điều này gây ra lỗi hiển thị hoặc chức năng không hoạt động đúng.

## Giải pháp: Auto-Versioning

Tôi đã thêm hệ thống versioning tự động sử dụng timestamp. Mỗi khi bạn update code, chỉ cần chạy 1 lệnh và version sẽ tự động thay đổi.

## Cách sử dụng

### Khi bạn cập nhật CSS hoặc JS:

```bash
# Chạy script này trước khi commit lên GitHub
./update-version.sh
```

Script sẽ tự động:
1. Tạo version mới dựa trên timestamp hiện tại
2. Cập nhật `styles.css?v=TIMESTAMP` trong index.html
3. Cập nhật `script.js?v=TIMESTAMP` trong index.html

### Ví dụ:

```bash
cd /Users/vu/project/tradingview.vn
./update-version.sh
```

**Output:**
```
Updating version to: 20251120223807
✅ Version updated successfully!
CSS: styles.css?v=20251120223807
JS: script.js?v=20251120223807
```

## Workflow Deploy lên GitHub Pages

```bash
# 1. Sửa code CSS/JS của bạn
vim styles.css

# 2. Chạy script update version
./update-version.sh

# 3. Commit và push lên GitHub
git add .
git commit -m "Update styles"
git push origin main
```

## Tại sao cách này hiệu quả?

- ✅ **Tự động**: Không cần nhớ thay đổi version thủ công
- ✅ **Unique**: Mỗi lần update có version khác nhau (timestamp)
- ✅ **Simple**: Chỉ 1 lệnh duy nhất
- ✅ **GitHub Pages Compatible**: Hoạt động hoàn hảo với static hosting
- ✅ **No Server Required**: Không cần PHP hay backend

## Cách hoạt động

### Trước khi update:
```html
<link rel="stylesheet" href="styles.css?v=20251120000000">
<script src="script.js?v=20251120000000"></script>
```

### Sau khi chạy `./update-version.sh`:
```html
<link rel="stylesheet" href="styles.css?v=20251120223807">
<script src="script.js?v=20251120223807"></script>
```

Browser sẽ thấy đây là file mới và tải lại thay vì dùng cache!

## Lưu ý

- Script chỉ cần chạy khi bạn **thực sự thay đổi** CSS hoặc JS
- Nếu chỉ sửa HTML, không cần chạy script
- Version format: `YYYYMMDDHHmmss` (năm-tháng-ngày-giờ-phút-giây)

## Troubleshooting

### Script không chạy được?

```bash
# Đảm bảo script có quyền thực thi
chmod +x update-version.sh
```

### Muốn xem version hiện tại?

```bash
grep "styles.css?v=" index.html
grep "script.js?v=" index.html
```

## Alternative: Manual Update

Nếu không muốn dùng script, bạn có thể tự thay đổi số version trong `index.html`:

```html
<!-- Thay đổi số cuối cùng -->
<link rel="stylesheet" href="styles.css?v=1">  <!-- version 1 -->
<link rel="stylesheet" href="styles.css?v=2">  <!-- version 2 -->
<link rel="stylesheet" href="styles.css?v=3">  <!-- version 3 -->
```

Nhưng dùng script sẽ tiện hơn và tránh quên! 😊
