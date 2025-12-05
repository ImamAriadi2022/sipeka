# SIPEKA - Sistem Pelaporan Kerusakan

Aplikasi pelaporan kerusakan fasilitas kampus dengan React Frontend dan Laravel Backend.

## 🚀 Cara Menjalankan Aplikasi

### Prerequisites
- PHP 8.2 atau lebih tinggi
- MySQL Server
- Node.js & npm
- Composer

---

## Backend Setup

### 1. Setup Database
Buat database MySQL:
```sql
CREATE DATABASE sipeka CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Konfigurasi Environment
File `.env` sudah dikonfigurasi, pastikan kredensial database sesuai:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=sipeka
DB_USERNAME=root
DB_PASSWORD=
```

### 3. Install Dependencies & Migrasi
```bash
cd backend
composer install
php artisan migrate:fresh --seed
php artisan storage:link
```

### 4. Jalankan Backend Server
```bash
php artisan serve
```
Backend akan berjalan di: `http://localhost:8000`

---

## Frontend Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Jalankan Development Server
```bash
npm run dev
```
Frontend akan berjalan di: `http://localhost:5173`

---

## 👤 Demo Credentials

### Admin
- **Email**: `admin@sipeka.com`
- **Password**: `admin123`

### User (Mahasiswa)
- **Email**: `budi@student.com`
- **Password**: `user123`
- **Email**: `siti@student.com`
- **Password**: `user123`
- **Email**: `andi@student.com`
- **Password**: `user123`

---

## 🔧 Fitur yang Sudah Terintegrasi

### Authentication
✅ Register - Membuat akun baru (auto login setelah register)
✅ Login - Masuk ke sistem
✅ Logout - Keluar dari sistem
✅ Profile Management - Edit nama, email, avatar
✅ Change Password - Ganti password

### User (Mahasiswa)
✅ Dashboard - Statistik laporan pribadi
✅ Buat Laporan - Upload foto kerusakan
✅ Riwayat Laporan - Lihat semua laporan yang dibuat
✅ Detail Laporan - Lihat detail dan foto laporan

### Admin
✅ Dashboard - Statistik keseluruhan sistem
✅ Validasi Pimpinan - Approve/Reject laporan pending
✅ Kelola Laporan - Lihat semua laporan dengan filter
✅ Riwayat Admin - History laporan yang sudah diproses

---

## 📡 API Endpoints

### Public
- `POST /api/auth/register` - Registrasi user baru
- `POST /api/auth/login` - Login

### Protected (Butuh Token)
- `POST /api/auth/logout` - Logout
- `GET /api/auth/profile` - Get profile
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/change-password` - Ganti password

### Reports
- `GET /api/reports` - Get all reports (dengan filter)
- `POST /api/reports` - Buat laporan baru
- `GET /api/reports/{id}` - Detail laporan
- `PUT /api/reports/{id}` - Update laporan
- `DELETE /api/reports/{id}` - Hapus laporan

### Admin Only
- `GET /api/admin/pending-reports` - Laporan pending
- `POST /api/admin/validate-report/{id}` - Validasi laporan
- `GET /api/admin/report-history` - Riwayat laporan
- `GET /api/admin/statistics` - Statistik dashboard
- `GET /api/admin/reports` - Semua laporan

---

## 🐛 Troubleshooting

### Backend tidak bisa konek ke database
- Pastikan MySQL service berjalan
- Cek kredensial di file `.env`
- Pastikan database `sipeka` sudah dibuat

### CORS Error
- Pastikan backend berjalan di `http://localhost:8000`
- Pastikan frontend berjalan di `http://localhost:5173`
- Config CORS sudah diset di `backend/config/cors.php`

### Upload foto gagal
- Jalankan `php artisan storage:link` di folder backend
- Pastikan folder `storage/app/public` memiliki permission write

### Token expired
- Logout dan login ulang
- Token Sanctum tidak ada expiration by default

---

## 📝 Notes

- Data seeder sudah include 1 admin + 3 users + 9 sample reports
- Photo upload menggunakan `multipart/form-data`
- Authentication menggunakan Laravel Sanctum (Bearer Token)
- CORS sudah dikonfigurasi untuk localhost:5173
- Role middleware memproteksi admin routes

---

## 🎯 Developed By
SIPEKA Team - 2025
