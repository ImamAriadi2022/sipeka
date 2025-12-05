# SIPEKA Backend API Setup Guide

## Prerequisites
- PHP 8.2 or higher
- MySQL database server
- Composer

## Setup Instructions

### 1. Create Database
Create a MySQL database named `sipeka`:
```sql
CREATE DATABASE sipeka CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Or use your MySQL client (phpMyAdmin, MySQL Workbench, etc.) to create the database.

### 2. Configure Environment
The `.env` file is already configured with:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=sipeka
DB_USERNAME=root
DB_PASSWORD=
```

Update `DB_USERNAME` and `DB_PASSWORD` if your MySQL has different credentials.

### 3. Run Migrations and Seeders
After creating the database, run:
```bash
php artisan migrate:fresh --seed
```

This will:
- Create all database tables (users, reports, personal_access_tokens, cache, jobs, sessions)
- Seed demo data:
  - **Admin user**: admin@sipeka.com / admin123
  - **Regular users**: budi@student.com, siti@student.com, andi@student.com (all with password: user123)
  - **Sample reports** with various statuses (Menunggu, Disetujui, Ditolak, Proses, Selesai)

### 4. Create Storage Link
Create symbolic link for public storage:
```bash
php artisan storage:link
```

### 5. Start Development Server
```bash
php artisan serve
```

The API will be available at: `http://localhost:8000`

## API Endpoints

### Authentication (Public)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Authentication (Protected)
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/change-password` - Change password

### Reports
- `GET /api/reports` - Get all reports (with filters)
- `POST /api/reports` - Create new report
- `GET /api/reports/{id}` - Get single report
- `PUT /api/reports/{id}` - Update report
- `DELETE /api/reports/{id}` - Delete report

### Admin (Admin only)
- `GET /api/admin/pending-reports` - Get pending validation reports
- `POST /api/admin/validate-report/{id}` - Validate report (approve/reject)
- `GET /api/admin/report-history` - Get report history
- `GET /api/admin/statistics` - Get dashboard statistics
- `GET /api/admin/reports` - Get all reports with filters

## Demo Credentials

### Admin Account
- Email: `admin@sipeka.com`
- Password: `admin123`

### User Accounts
- Email: `budi@student.com` / Password: `user123`
- Email: `siti@student.com` / Password: `user123`
- Email: `andi@student.com` / Password: `user123`

## Features Implemented

✅ Laravel Sanctum authentication
✅ User registration and login
✅ Profile management with avatar upload
✅ Report CRUD operations
✅ Photo uploads for reports
✅ Admin validation workflow
✅ Report status management (Menunggu, Disetujui, Ditolak, Proses, Selesai)
✅ Role-based access control (admin/user)
✅ CORS configuration for frontend (localhost:5173)
✅ Database migrations and seeders

## Frontend Integration

The backend is configured to work with React frontend at `http://localhost:5173`.

API calls should include:
- `Authorization: Bearer {token}` header for protected routes
- `Content-Type: application/json` for JSON requests
- `Content-Type: multipart/form-data` for file uploads

## File Uploads

Photos are stored in `storage/app/public/reports` and `storage/app/public/avatars`.

Make sure to run `php artisan storage:link` to create the public symlink.

## Next Steps

1. Create the `sipeka` database in MySQL
2. Run `php artisan migrate:fresh --seed`
3. Run `php artisan storage:link`
4. Start the server with `php artisan serve`
5. Test the API with the demo credentials
6. Integrate with the React frontend
