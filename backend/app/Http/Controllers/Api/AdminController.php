<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Report;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Get pending reports that need validation
     */
    public function getPendingReports()
    {
        $reports = Report::with('user')
            ->byStatus('Menunggu')
            ->orderBy('date', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'reports' => $reports->map(function ($report) {
                return [
                    'id' => $report->id,
                    'userId' => $report->user_id,
                    'userEmail' => $report->user->email,
                    'userName' => $report->user->full_name ?? $report->user->name,
                    'userNpm' => $report->user->npm,
                    'title' => $report->title,
                    'description' => $report->description,
                    'location' => $report->location,
                    'category' => $report->category,
                    'status' => $report->status,
                    'date' => $report->date->format('Y-m-d'),
                    'photos' => array_map(fn($path) => asset('storage/' . $path), $report->photos ?? []),
                    'photoUrl' => $report->photo_url ? asset('storage/' . $report->photo_url) : null,
                    'photosCount' => count($report->photos ?? []),
                    'createdAt' => $report->created_at->toISOString(),
                ];
            })
        ]);
    }

    /**
     * Validate a report (approve or reject)
     */
    public function validateReport(Request $request, $id)
    {
        $report = Report::find($id);

        if (!$report) {
            return response()->json([
                'success' => false,
                'message' => 'Report not found'
            ], 404);
        }

        $request->validate([
            'status' => 'required|in:Disetujui,Ditolak',
        ]);

        $report->status = $request->status;
        $report->save();

        return response()->json([
            'success' => true,
            'message' => 'Report validated successfully',
            'report' => [
                'id' => $report->id,
                'status' => $report->status,
                'title' => $report->title,
            ]
        ]);
    }

    /**
     * Get report history (all processed reports)
     */
    public function getReportHistory(Request $request)
    {
        $query = Report::with('user');

        // Filter by status if provided
        if ($request->has('status')) {
            $query->byStatus($request->status);
        }

        $reports = $query->orderBy('updated_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'reports' => $reports->map(function ($report) {
                return [
                    'id' => $report->id,
                    'userId' => $report->user_id,
                    'userEmail' => $report->user->email,
                    'userName' => $report->user->full_name ?? $report->user->name,
                    'userNpm' => $report->user->npm,
                    'title' => $report->title,
                    'description' => $report->description,
                    'location' => $report->location,
                    'category' => $report->category,
                    'status' => $report->status,
                    'date' => $report->date->format('Y-m-d'),
                    'photos' => array_map(fn($path) => asset('storage/' . $path), $report->photos ?? []),
                    'photoUrl' => $report->photo_url ? asset('storage/' . $report->photo_url) : null,
                    'photosCount' => count($report->photos ?? []),
                    'createdAt' => $report->created_at->toISOString(),
                    'updatedAt' => $report->updated_at->toISOString(),
                ];
            })
        ]);
    }

    /**
     * Get statistics for admin dashboard
     */
    public function getStatistics()
    {
        $totalReports = Report::count();
        $pendingReports = Report::byStatus('Menunggu')->count();
        $approvedReports = Report::byStatus('Disetujui')->count();
        $rejectedReports = Report::byStatus('Ditolak')->count();
        $inProgressReports = Report::byStatus('Proses')->count();
        $completedReports = Report::byStatus('Selesai')->count();
        $totalUsers = User::where('role', 'user')->count();
        $totalAdmins = User::where('role', 'admin')->count();

        // Recent reports (last 10)
        $recentReports = Report::with('user')
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($report) {
                return [
                    'id' => $report->id,
                    'title' => $report->title,
                    'userName' => $report->user->full_name ?? $report->user->name,
                    'status' => $report->status,
                    'date' => $report->date->format('Y-m-d'),
                    'createdAt' => $report->created_at->toISOString(),
                ];
            });

        return response()->json([
            'success' => true,
            'statistics' => [
                'totalReports' => $totalReports,
                'pendingReports' => $pendingReports,
                'approvedReports' => $approvedReports,
                'rejectedReports' => $rejectedReports,
                'inProgressReports' => $inProgressReports,
                'completedReports' => $completedReports,
                'totalUsers' => $totalUsers,
                'totalAdmins' => $totalAdmins,
            ],
            'recentReports' => $recentReports
        ]);
    }

    /**
     * Get all reports for admin management
     */
    public function getAllReports(Request $request)
    {
        $query = Report::with('user');

        // Filter by status if provided
        if ($request->has('status')) {
            $query->byStatus($request->status);
        }

        // Filter by category if provided
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        // Search by title or description
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $reports = $query->orderBy('date', 'desc')->get();

        return response()->json([
            'success' => true,
            'reports' => $reports->map(function ($report) {
                return [
                    'id' => $report->id,
                    'userId' => $report->user_id,
                    'userEmail' => $report->user->email,
                    'userName' => $report->user->full_name ?? $report->user->name,
                    'userNpm' => $report->user->npm,
                    'title' => $report->title,
                    'description' => $report->description,
                    'location' => $report->location,
                    'category' => $report->category,
                    'status' => $report->status,
                    'date' => $report->date->format('Y-m-d'),
                    'photos' => array_map(fn($path) => asset('storage/' . $path), $report->photos ?? []),
                    'photoUrl' => $report->photo_url ? asset('storage/' . $report->photo_url) : null,
                    'photosCount' => count($report->photos ?? []),
                    'createdAt' => $report->created_at->toISOString(),
                ];
            })
        ]);
    }
}
