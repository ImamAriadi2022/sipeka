<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class ReportController extends Controller
{
    /**
     * Get all reports with optional filters
     */
    public function index(Request $request)
    {
        $query = Report::with('user');

        // Filter by status
        if ($request->has('status')) {
            $query->byStatus($request->status);
        }

        // Filter by user (for user's own reports)
        if ($request->has('user_id')) {
            $query->forUser($request->user_id);
        }

        // Filter by category
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        // Sort by date
        $query->orderBy('date', 'desc');

        $reports = $query->get();

        return response()->json([
            'success' => true,
            'reports' => $reports->map(function ($report) {
                return [
                    'id' => $report->id,
                    'userId' => $report->user_id,
                    'userEmail' => $report->user->email,
                    'userName' => $report->user->full_name ?? $report->user->name,
                    'title' => $report->title,
                    'description' => $report->description,
                    'location' => $report->location,
                    'category' => $report->category,
                    'status' => $report->status,
                    'date' => $report->date->format('Y-m-d'),
                    'photos' => $report->photos ?? [],
                    'photoUrl' => $report->photo_url ? asset('storage/' . $report->photo_url) : null,
                    'photosCount' => count($report->photos ?? []),
                    'createdAt' => $report->created_at->toISOString(),
                ];
            })
        ]);
    }

    /**
     * Create a new report
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'date' => 'required|date',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
            'photos' => 'nullable|array',
            'photos.*' => 'image|mimes:jpeg,png,jpg,gif|max:5120',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $photoPaths = [];
        $mainPhotoUrl = null;

        // Handle main photo upload
        if ($request->hasFile('photo')) {
            $mainPhotoUrl = $request->file('photo')->store('reports', 'public');
            $photoPaths[] = $mainPhotoUrl;
        }

        // Handle multiple photos upload
        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $path = $photo->store('reports', 'public');
                $photoPaths[] = $path;
            }
        }

        $report = Report::create([
            'user_id' => $request->user()->id,
            'title' => $request->title,
            'description' => $request->description,
            'location' => $request->location,
            'category' => $request->category,
            'date' => $request->date,
            'status' => 'Menunggu',
            'photos' => $photoPaths,
            'photo_url' => $mainPhotoUrl,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Report created successfully',
            'report' => [
                'id' => $report->id,
                'userId' => $report->user_id,
                'userEmail' => $report->user->email,
                'title' => $report->title,
                'description' => $report->description,
                'location' => $report->location,
                'category' => $report->category,
                'status' => $report->status,
                'date' => $report->date->format('Y-m-d'),
                'photos' => array_map(fn($path) => asset('storage/' . $path), $photoPaths),
                'photoUrl' => $mainPhotoUrl ? asset('storage/' . $mainPhotoUrl) : null,
                'photosCount' => count($photoPaths),
            ]
        ], 201);
    }

    /**
     * Get a single report
     */
    public function show($id)
    {
        $report = Report::with('user')->find($id);

        if (!$report) {
            return response()->json([
                'success' => false,
                'message' => 'Report not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'report' => [
                'id' => $report->id,
                'userId' => $report->user_id,
                'userEmail' => $report->user->email,
                'userName' => $report->user->full_name ?? $report->user->name,
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
            ]
        ]);
    }

    /**
     * Update report status (mainly for admin)
     */
    public function update(Request $request, $id)
    {
        $report = Report::find($id);

        if (!$report) {
            return response()->json([
                'success' => false,
                'message' => 'Report not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'status' => 'sometimes|in:Menunggu,Disetujui,Ditolak,Proses,Selesai',
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'location' => 'sometimes|string|max:255',
            'category' => 'sometimes|string|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $report->update($request->only(['status', 'title', 'description', 'location', 'category']));

        return response()->json([
            'success' => true,
            'message' => 'Report updated successfully',
            'report' => [
                'id' => $report->id,
                'status' => $report->status,
                'title' => $report->title,
                'description' => $report->description,
                'location' => $report->location,
                'category' => $report->category,
            ]
        ]);
    }

    /**
     * Delete a report
     */
    public function destroy($id)
    {
        $report = Report::find($id);

        if (!$report) {
            return response()->json([
                'success' => false,
                'message' => 'Report not found'
            ], 404);
        }

        // Delete associated photos
        if ($report->photo_url) {
            Storage::disk('public')->delete($report->photo_url);
        }
        foreach ($report->photos ?? [] as $photoPath) {
            Storage::disk('public')->delete($photoPath);
        }

        $report->delete();

        return response()->json([
            'success' => true,
            'message' => 'Report deleted successfully'
        ]);
    }
}
