<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Report;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::create([
            'name' => 'Admin',
            'full_name' => 'Administrator SIPEKA',
            'email' => 'admin@sipeka.com',
            'npm' => 'ADM001',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
        ]);

        // Create regular users
        $user1 = User::create([
            'name' => 'Budi Santoso',
            'full_name' => 'Budi Santoso',
            'email' => 'budi@student.com',
            'npm' => '2021001',
            'password' => Hash::make('user123'),
            'role' => 'user',
        ]);

        $user2 = User::create([
            'name' => 'Siti Aminah',
            'full_name' => 'Siti Aminah',
            'email' => 'siti@student.com',
            'npm' => '2021002',
            'password' => Hash::make('user123'),
            'role' => 'user',
        ]);

        $user3 = User::create([
            'name' => 'Andi Wijaya',
            'full_name' => 'Andi Wijaya',
            'email' => 'andi@student.com',
            'npm' => '2021003',
            'password' => Hash::make('user123'),
            'role' => 'user',
        ]);

        // Create sample reports with various statuses
        
        // Pending reports
        Report::create([
            'user_id' => $user1->id,
            'title' => 'Lampu Rusak di Gedung A',
            'description' => 'Lampu di lantai 2 gedung A tidak menyala sejak kemarin. Mohon segera diperbaiki.',
            'location' => 'Gedung A Lantai 2',
            'category' => 'Infrastruktur',
            'status' => 'Menunggu',
            'date' => now()->subDays(1),
            'photos' => [],
        ]);

        Report::create([
            'user_id' => $user2->id,
            'title' => 'AC Tidak Dingin di Ruang Kelas B201',
            'description' => 'AC di ruang kelas B201 tidak dingin, suhu ruangan sangat panas.',
            'location' => 'Gedung B Ruang 201',
            'category' => 'Fasilitas',
            'status' => 'Menunggu',
            'date' => now()->subDays(2),
            'photos' => [],
        ]);

        // Approved reports
        Report::create([
            'user_id' => $user1->id,
            'title' => 'Kebocoran Atap di Perpustakaan',
            'description' => 'Atap perpustakaan bocor saat hujan, air menetes ke area baca.',
            'location' => 'Perpustakaan Lantai 1',
            'category' => 'Infrastruktur',
            'status' => 'Disetujui',
            'date' => now()->subDays(5),
            'photos' => [],
        ]);

        Report::create([
            'user_id' => $user3->id,
            'title' => 'Toilet Tersumbat di Gedung C',
            'description' => 'Toilet pria di gedung C lantai 1 tersumbat dan tidak bisa digunakan.',
            'location' => 'Gedung C Lantai 1',
            'category' => 'Sanitasi',
            'status' => 'Disetujui',
            'date' => now()->subDays(4),
            'photos' => [],
        ]);

        // In progress reports
        Report::create([
            'user_id' => $user2->id,
            'title' => 'Proyektor Tidak Berfungsi',
            'description' => 'Proyektor di ruang seminar tidak bisa menampilkan gambar.',
            'location' => 'Ruang Seminar',
            'category' => 'Elektronik',
            'status' => 'Proses',
            'date' => now()->subDays(7),
            'photos' => [],
        ]);

        // Completed reports
        Report::create([
            'user_id' => $user1->id,
            'title' => 'Meja Rusak di Lab Komputer',
            'description' => 'Meja lab komputer nomor 5 kaki nya patah.',
            'location' => 'Lab Komputer 1',
            'category' => 'Perabotan',
            'status' => 'Selesai',
            'date' => now()->subDays(10),
            'photos' => [],
        ]);

        Report::create([
            'user_id' => $user3->id,
            'title' => 'Pintu Kelas Rusak',
            'description' => 'Pintu kelas A101 tidak bisa ditutup dengan baik, handle nya lepas.',
            'location' => 'Gedung A Ruang 101',
            'category' => 'Infrastruktur',
            'status' => 'Selesai',
            'date' => now()->subDays(12),
            'photos' => [],
        ]);

        // Rejected reports
        Report::create([
            'user_id' => $user2->id,
            'title' => 'WiFi Lambat',
            'description' => 'Koneksi WiFi di gedung D sangat lambat.',
            'location' => 'Gedung D',
            'category' => 'Teknologi',
            'status' => 'Ditolak',
            'date' => now()->subDays(15),
            'photos' => [],
        ]);
    }
}
