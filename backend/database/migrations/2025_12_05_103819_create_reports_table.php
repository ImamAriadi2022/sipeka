<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('location');
            $table->string('category')->nullable();
            $table->enum('status', ['Menunggu', 'Disetujui', 'Ditolak', 'Proses', 'Selesai'])->default('Menunggu');
            $table->date('date');
            $table->json('photos')->nullable(); // Array of photo URLs
            $table->string('photo_url')->nullable(); // Single main photo
            $table->timestamps();
            
            $table->index('user_id');
            $table->index('status');
            $table->index('date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
