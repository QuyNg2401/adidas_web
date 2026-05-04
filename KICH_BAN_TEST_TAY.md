# Kịch bản test tay — ADIDAS (client + server)

Làm **lần lượt từ Phần 0**. Đánh dấu `[x]` khi xong từng bước. Ghi chú lỗi (màn hình / URL / thông báo) nếu có.

---

## Phần 0 — Chuẩn bị (chỉ làm một lần)

### 0.1 Phần mềm

- [ ] **Node.js** 18+ đã cài (`node -v`).
- [ ] **MySQL** đang chạy (ví dụ XAMPP: Start MySQL, port `3306`).

### 0.2 Database

- [ ] Mở phpMyAdmin hoặc client MySQL.
- [ ] Chạy **toàn bộ** file `server/sql/init.sql` (tạo DB `stride`, bảng, dữ liệu mẫu).
- [ ] Nếu DB cũ từ trước khi có OAuth: chạy thêm `server/sql/migrate_oauth_accounts.sql` (nếu có).

### 0.3 Biến môi trường backend

- [ ] File `server/.env` tồn tại (tham chiếu `server/.env.example`).
- [ ] Kiểm tra: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME=stride`, `JWT_SECRET` (đổi khỏi `change-me` khi deploy thật).
- [ ] **Google OAuth** (tuỳ chọn lúc này): `CLIENT_ORIGIN`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI` — có thể để trống Google, chỉ test email/mật khẩu trước.

### 0.4 Cài dependency

Trong PowerShell, **thư mục gốc** dự án (ví dụ `d:\CK_QTHHTT`):

```powershell
npm install
npm --prefix client install
npm --prefix server install
```

- [ ] Ba lệnh trên chạy xong không lỗi.

### 0.5 Tài khoản mẫu (sau `init.sql`)

- Admin: `admin@stride.test` / `Test123` — vào `/admin`.
- [ ] Đã biết email/mật khẩu admin (hoặc dùng `user1@stride.test` / `Test123` cho khách).

---

## Phần 1 — Khởi động & kiểm tra “sống”

### 1.1 Chạy dev

Từ thư mục gốc dự án:

```powershell
npm run dev
```

- [ ] Terminal có **client** (Vite) và **server** (nodemon).
- [ ] Server có dòng kiểu: `[server] listening on http://localhost:4000`.

### 1.2 API health

Mở trình duyệt:

- [ ] `http://localhost:4000/health` → JSON có `"ok": true`.

### 1.3 Frontend

- [ ] `http://localhost:5173` mở được trang chủ (không báo proxy `ECONNREFUSED` kéo dài trong terminal).

---

## Phần 2 — Module khách: đăng ký / đăng nhập (JWT)

### 2.1 Đăng ký

- [ ] Vào `http://localhost:5173/register`.
- [ ] Điền Họ tên, Email (chưa dùng trong DB), Mật khẩu → **CREATE ACCOUNT**.
- [ ] Sau khi thành công, chuyển tới trang phù hợp (thường là `/account` sau khi đăng nhập tự động).

### 2.2 Đăng xuất / đăng nhập lại

- [ ] Nếu có nút đăng xuất trên UI, bấm đăng xuất; nếu chưa có, đóng session: xóa cookie site `localhost` (DevTools → Application → Cookies) hoặc cửa sổ ẩn danh.
- [ ] Vào `http://localhost:5173/login` → đăng nhập **cùng email/mật khẩu** vừa đăng ký.
- [ ] Đăng nhập thành công → vào `/account` hoặc `/admin` nếu user là admin.

### 2.3 Sai mật khẩu

- [ ] `/login` → nhập sai mật khẩu → có thông báo lỗi, **không** vào account.

### 2.4 OAuth Google (khi đã cấu hình `.env`)

- [ ] `/login` → **Continue with Google** → hoàn tất trên Google → quay lại app, đã đăng nhập.
- [ ] Nếu chưa cấu hình Google: nút vẫn bấm được nhưng server báo chưa cấu hình — ghi nhận, không bắt buộc cho JWT.

---

## Phần 3 — Tìm kiếm & lọc sản phẩm

- [ ] Vào `http://localhost:5173/products`.
- [ ] **Search**: gõ từ khóa (ví dụ tên SP) → danh sách thay đổi sau ~0.25s (debounce).
- [ ] **Danh mục**: chọn một category trong sidebar → danh sách khớp.
- [ ] **Giá**: nhập min/max (USD) → danh sách / số lượng hợp lý.
- [ ] Bấm vào một sản phẩm → vào `http://localhost:5173/products/<slug>` (chi tiết).

---

## Phần 4 — Giỏ hàng + thanh toán (mock)

### 4.1 Giỏ

- [ ] Ở trang chi tiết SP → **Add to bag** (hoặc tương đương) → sang `/cart`.
- [ ] Số lượng / tổng tiền hiển thị đúng; đổi số lượng nếu UI cho phép.

### 4.2 Checkout chưa đăng nhập

- [ ] Đăng xuất (hoặc ẩn danh).
- [ ] Thêm SP vào giỏ → `/checkout` → **Place order** (hoặc nút đặt hàng).
- [ ] Kỳ vọng: bị đẩy về **login** hoặc báo không đủ quyền (401).

### 4.3 Checkout đã đăng nhập

- [ ] Đăng nhập lại.
- [ ] Giỏ có ít nhất 1 SP → `/checkout` → đặt hàng.
- [ ] Kỳ vọng: thành công, giỏ **trống** (hoặc đã clear), chuyển về **`/account`**.

---

## Phần 5 — Lịch sử đơn hàng

- [ ] Vào `http://localhost:5173/account` (đã đăng nhập).
- [ ] Bảng / danh sách đơn có **đơn vừa tạo** (mã, ngày, tổng, trạng thái).

---

## Phần 6 — Đánh giá sản phẩm

- [ ] Vào PDP của SP đã mua hoặc bất kỳ SP có trên site.
- [ ] **Chưa đăng nhập**: thử gửi đánh giá → báo cần đăng nhập (hoặc không cho submit).
- [ ] **Đã đăng nhập**: chọn rating, nhập comment → Submit → danh sách đánh giá cập nhật (có dòng mới).

---

## Phần 7 — Module Admin

### 7.1 Vào admin bằng tài khoản thường

- [ ] Đăng nhập **user khách** (không phải admin) → truy cập `http://localhost:5173/admin`.
- [ ] Kỳ vọng: **không** vào dashboard (redirect login hoặc thông báo kiểm tra quyền).

### 7.2 Vào admin bằng admin

- [ ] Đăng xuất → đăng nhập **admin** (từ bước 0.5).
- [ ] `http://localhost:5173/admin` → vào **Overview**: có các ô thống kê (doanh thu, đơn, SP, danh mục…).

### 7.3 CRUD danh mục

- [ ] Tab **Categories** → tạo danh mục mới (slug + name) → thấy trong bảng.
- [ ] Cập nhật danh mục (form PATCH / id) → dòng trong bảng đổi.
- [ ] Xóa danh mục (nếu không bị ràng buộc FK) → dòng biến mất.

### 7.4 CRUD sản phẩm (theo UI hiện có)

- [ ] Tab **Products** → **Create product** (đủ slug, name, meta, giá USD, URL ảnh https, alt, category nếu cần) → SP xuất hiện trong bảng.
- [ ] **Update price** (PATCH giá theo product id) → giá trên bảng đổi.
- [ ] **Delete** một SP test (nếu không cần giữ) → dòng biến mất.

### 7.5 Quản lý đơn hàng

- [ ] Tab **Orders** → chọn đơn của khách → đổi **status** (pending → paid → …).
- [ ] Reload hoặc chuyển tab rồi quay lại → status **giữ** đúng.

---

## Phần 8 — Hạ tầng nộp bài (đề yêu cầu)

- [ ] Repo đã đẩy **GitHub** (public hoặc link GV được mời).
- [ ] **Frontend** deploy (ví dụ Vercel): build từ `client/`, env production trỏ đúng URL API.
- [ ] **Backend + MySQL** deploy (Railway/Render/…): biến môi trường DB, JWT, CORS, cookie `Secure` nếu HTTPS.
- [ ] Ghi vào báo cáo: **URL public** + **link GitHub**.

---

## Ghi chú nhanh khi gặp lỗi

| Hiện tượng | Hướng xử lý |
|-------------|-------------|
| `ECONNREFUSED` proxy `/api` | Chờ server lên; kiểm tra `PORT` trong `server/.env` khớp `4000` với `client/vite.config.js`. |
| MySQL connection refused | Bật MySQL; kiểm tra `DB_*` trong `server/.env`. |
| 401 khi đặt hàng | Đảm bảo đã đăng nhập; cookie `localhost` không bị chặn. |
| 403 trên `/admin` | User không phải `role: admin` — đăng nhập `admin@stride.test` / `Test123` (sau `init.sql`). |

---

**Xong:** khi Phần 0–7 đều tick, bạn đã cover đúng chức năng tối thiểu đề mô tả trên môi trường local. Phần 8 dùng khi chuẩn bị nộp bài / demo online.
