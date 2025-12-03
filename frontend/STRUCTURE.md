# Sipeka Project Structure

## 📁 Struktur Folder

Proyek ini mengikuti pattern yang rapi dengan pemisahan yang jelas antara user dan admin:

```
src/
├── pages/                          # Halaman utama aplikasi
│   ├── Login.jsx                   # Halaman login (public)
│   ├── Sign.jsx                    # Halaman registrasi (public)
│   │
│   ├── user/                       # Pages khusus user
│   │   ├── Dashboard.jsx           # Dashboard user
│   │   ├── BuatLaporan.jsx        # Halaman buat laporan
│   │   ├── RiwayatLaporan.jsx     # Riwayat laporan user
│   │   └── Profil.jsx             # Profil user
│   │
│   └── admin/                      # Pages khusus admin
│       ├── Dashboard.jsx           # Dashboard admin
│       ├── KelolaaLaporan.jsx     # Kelola semua laporan
│       ├── DetailLaporan.jsx      # Detail laporan admin
│       └── RiwayatAdmin.jsx       # Riwayat aktivitas admin
│
├── components/                     # Komponen berdasarkan role dan page
│   ├── auth/                      # Komponen untuk authentication
│   │   ├── login/
│   │   │   ├── LoginForm.jsx
│   │   │   └── LoginHeader.jsx
│   │   └── sign/
│   │       ├── SignForm.jsx
│   │       └── SignHeader.jsx
│   │
│   ├── user/                      # Komponen untuk user pages
│   │   ├── dashboard/             # Dashboard user components
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── StatsCard.jsx
│   │   │   ├── RecentReports.jsx
│   │   │   └── QuickActions.jsx
│   │   │
│   │   ├── buatlaporan/          # Buat laporan components
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── ReportForm.jsx
│   │   │   ├── LocationPicker.jsx
│   │   │   └── PhotoUpload.jsx
│   │   │
│   │   ├── riwayatlaporan/       # Riwayat laporan components
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── ReportFilters.jsx
│   │   │   ├── ReportList.jsx
│   │   │   └── ReportCard.jsx
│   │   │
│   │   └── profil/               # Profil components
│   │       ├── Sidebar.jsx
│   │       ├── Header.jsx
│   │       ├── ProfileCard.jsx
│   │       ├── ProfileForm.jsx
│   │       ├── PasswordChange.jsx
│   │       └── ProfileStats.jsx
│   │
│   ├── admin/                     # Komponen untuk admin pages
│   │   ├── dashboard/             # Dashboard admin components
│   │   │   ├── AdminSidebar.jsx
│   │   │   ├── AdminHeader.jsx
│   │   │   ├── AdminStatsCard.jsx
│   │   │   ├── ReportsOverview.jsx
│   │   │   ├── UserActivity.jsx
│   │   │   └── SystemHealth.jsx
│   │   │
│   │   ├── kelolaalaporan/       # Kelola laporan components
│   │   │   ├── AdminSidebar.jsx
│   │   │   ├── AdminHeader.jsx
│   │   │   ├── ReportFilters.jsx
│   │   │   ├── ReportTable.jsx
│   │   │   └── ReportPagination.jsx
│   │   │
│   │   ├── detaillaporan/        # Detail laporan components
│   │   └── riwayatadmin/         # Riwayat admin components
│   │
│   └── index.js                  # Export semua komponen
│
├── App.jsx                       # Main app dengan routing
├── App.css                       # Global styles
├── main.jsx                      # Entry point
└── index.css                     # Base styles
```

## 🎯 Konsep Blueprint

### Page Structure
Pages diorganisir berdasarkan role untuk maintainability yang lebih baik:

**Public Pages**: Login dan Sign untuk authentication
**User Pages**: Dashboard, BuatLaporan, RiwayatLaporan, Profil
**Admin Pages**: Dashboard, KelolaaLaporan, DetailLaporan, RiwayatAdmin

Setiap page bertanggung jawab untuk:
- Mengatur state management page
- Mengintegrasikan komponen-komponen
- Menangani logic bisnis page
- API calls dan data fetching

### Component Structure  
Komponen diorganisir berdasarkan role dan page untuk menghindari konflik:

**Auth Components**: Untuk login dan registrasi
**User Components**: Komponen yang digunakan di user pages
**Admin Components**: Komponen yang digunakan di admin pages

Setiap folder berisi:
- **UI Components**: Sidebar, Header, Cards, Forms
- **Feature Components**: LocationPicker, PhotoUpload, Filters, etc
- **Data Components**: Tables, Lists, Stats

### Routing
Menggunakan simple router dengan role-based access control:
- **Public routes**: `/login`, `/sign`
- **User routes**: `/dashboard`, `/buat-laporan`, `/riwayat-laporan`, `/profil`
- **Admin routes**: `/admin/dashboard`, `/admin/laporan`, `/admin/riwayat`

## 🔧 Komponen yang Sudah Dibuat

### User Pages
1. **Login** - Form login dengan validasi
2. **Sign** - Form registrasi lengkap
3. **Dashboard** - Overview dengan stats dan quick actions
4. **Buat Laporan** - Form laporan dengan upload foto dan lokasi
5. **Riwayat Laporan** - Daftar laporan user
6. **Profil** - Manajemen profil dan password

### Admin Pages  
1. **Dashboard Admin** - Overview sistem dan statistik
2. **Halaman Laporan Admin** - Kelola semua laporan
3. **Halaman Detail Laporan Admin** - Detail dan aksi laporan
4. **Halaman Riwayat Admin** - Riwayat aktivitas admin

## 🚀 Cara Pengembangan

1. **Menambah Page Baru**: 
   - Buat file JSX di folder `pages/`
   - Buat folder komponen di `components/[pagename]/`
   - Update routing di `App.jsx`

2. **Menambah Komponen**:
   - Buat komponen di folder yang sesuai
   - Export di `components/index.js`
   - Import di page yang membutuhkan

3. **Integrasi API**:
   - Tambahkan logic API di setiap page
   - Gunakan useEffect untuk data fetching
   - Implement error handling

## 📝 TODO Next Steps

- [ ] Integrasi React Router untuk routing yang lebih robust
- [ ] Setup state management (Redux/Context API)
- [ ] Implementasi API integration
- [ ] Setup authentication & authorization
- [ ] Styling dengan CSS/Tailwind
- [ ] Unit testing untuk komponen
- [ ] Setup PWA untuk mobile experience

## 🎨 Style Guide

- Gunakan functional components dengan hooks
- Implement PropTypes untuk type checking  
- Consistent naming convention (PascalCase untuk komponen)
- Responsive design dengan mobile-first approach
- Accessibility compliance (a11y)

Struktur ini memungkinkan pengembangan yang scalable dan maintainable dengan pemisahan concern yang jelas antara UI dan business logic.