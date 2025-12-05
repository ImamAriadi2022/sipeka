<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ReportController;
use App\Http\Controllers\Api\AdminController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes (no authentication required)
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

// Protected routes (authentication required)
Route::middleware('auth:sanctum')->group(function () {
    
    // Auth routes
    Route::prefix('auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/profile', [AuthController::class, 'getProfile']);
        Route::put('/profile', [AuthController::class, 'updateProfile']);
        Route::post('/change-password', [AuthController::class, 'changePassword']);
    });

    // Report routes (available to all authenticated users)
    Route::prefix('reports')->group(function () {
        Route::get('/', [ReportController::class, 'index']);
        Route::post('/', [ReportController::class, 'store']);
        Route::get('/{id}', [ReportController::class, 'show']);
        Route::put('/{id}', [ReportController::class, 'update']);
        Route::delete('/{id}', [ReportController::class, 'destroy']);
    });

    // Admin routes (restricted to admin role)
    Route::prefix('admin')->middleware('role:admin')->group(function () {
        Route::get('/pending-reports', [AdminController::class, 'getPendingReports']);
        Route::post('/validate-report/{id}', [AdminController::class, 'validateReport']);
        Route::get('/report-history', [AdminController::class, 'getReportHistory']);
        Route::get('/statistics', [AdminController::class, 'getStatistics']);
        Route::get('/reports', [AdminController::class, 'getAllReports']);
    });
});
