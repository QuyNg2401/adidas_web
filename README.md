# ADIDAS — TMĐT fullstack (React + Express + MySQL)

Dự án monorepo gồm **frontend Vite/React** (`client/`) và **backend Express** (`server/`), kết nối **MySQL** (phù hợp XAMPP/local).

---

## Yêu cầu môi trường

- **Node.js** 18+ (khuyến nghị LTS)
- **npm**
- **MySQL** (ví dụ XAMPP — bật MySQL, port mặc định `3306`)

---

## Cấu trúc thư mục


| Thư mục       | Mô tả                                    |
| ------------- | ---------------------------------------- |
| `client/`     | Giao diện React, Tailwind, React Router  |
| `server/`     | REST API Express, JWT cookie, Zod, MySQL |
| `server/sql/` | `init.sql` tạo DB/bảng + seed            |


---

## Cài đặt

### 1. Cài dependency

Từ thư mục gốc `CK_QTHHTT`:

```powershell
npm install
npm --prefix client install
npm --prefix server install
```

### 2. Tạo database

1. Mở phpMyAdmin hoặc MySQL client.
2. Chạy toàn bộ nội dung `server/sql/init.sql` (tạo DB `stride`, bảng, dữ liệu mẫu).

### 3. Biến môi trường backend

Sao chép `server/.env.example` thành `server/.env` và chỉnh cho đúng máy bạn (đặc biệt `DB_PASSWORD`, `JWT_SECRET`).

**Google OAuth** (tuỳ chọn, cho nút “Continue with Google”):

- Tạo OAuth 2.0 Client (Web) trên Google Cloud Console.
- Authorized redirect URI khớp `GOOGLE_REDIRECT_URI`, ví dụ:  
`http://localhost:4000/api/auth/google/callback`
- Điền vào `server/.env`:

```env
CLIENT_ORIGIN=http://localhost:5173
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_REDIRECT_URI=http://localhost:4000/api/auth/google/callback
```

Nếu chưa cấu hình Google, nút đăng nhập Google sẽ báo lỗi cấu hình — đăng nhập email/mật khẩu vẫn hoạt động.

### 4. Tài khoản mẫu sau khi chạy `init.sql`


| Email               | Vai trò  | Mật khẩu  |
| ------------------- | -------- | --------- |
| `admin@stride.test` | admin    | `Test123` |
| `user1@stride.test` | customer | `Test123` |
| `user2@stride.test` | customer | `Test123` |


Thêm admin khác: tự `INSERT` vào `users` với `role = 'admin'` và `password_hash` bcrypt, hoặc đổi `role` một user có sẵn trong phpMyAdmin.

---

## Chạy development

Từ thư mục gốc:

```powershell
npm run dev
```

- Client (Vite): thường `http://localhost:5173` (proxy `/api` → backend).
- API: `http://localhost:4000`  
- Kiểm tra: `GET http://localhost:4000/health`

---

## Chức năng chính (tóm tắt)

**Khách hàng**

- Đăng ký / đăng nhập JWT (cookie `httpOnly`), OAuth Google (nếu bật env).
- Danh sách sản phẩm: tìm kiếm, lọc danh mục, khoảng giá (USD).
- Chi tiết sản phẩm, đánh giá (đọc + gửi khi đã đăng nhập).
- Giỏ hàng, checkout (tạo đơn trên server), lịch sử đơn ở `/account`.

**Admin** (`role: admin`)

- Dashboard thống kê doanh thu / đơn / sản phẩm / danh mục.
- CRUD danh mục & sản phẩm (kèm PATCH cập nhật danh mục / giá SP trên UI).
- Danh sách đơn và đổi trạng thái đơn.

Route `/admin` được bảo vệ (redirect nếu không phải admin).

---

## API (prefix `/api`)

Ví dụ: `GET /api/products`, `GET /api/products/:slug`, `POST /api/orders`, `GET /api/admin/stats`, …

Chi tiết route nằm trong `server/src/routes/`.

---

