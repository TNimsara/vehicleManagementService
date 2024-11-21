<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;


class VehicleController extends Controller
{
    public function store(Request $request)
    {
        try {
            $request->validate([
                'vehicle_id' => 'required|string|max:10|unique:vehicles,vehicle_id',
                'year' => 'required|integer',
                'last_service_date' => 'nullable|date',
                'category' => 'required|string',
                'colour' => 'required|string',
                'brand' => 'required|string',
                'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json($e->errors(), 422);
        }
        
        $user_id = auth()->id();

        // Handle the uploaded photo if it exists
        $photoPath = null;
        if ($request->hasFile('photo')) {
            // Store the photo in the 'photos' directory within the 'public' disk
            $photoPath = $request->file('photo')->store('photos', 'public');
        }

        Log::info('Request Data:', ['data' => $request->all()]);


        // Create the vehicle and save the data
        $vehicle = Vehicle::create([
            'vehicle_id' => $request->vehicle_id,
            'user_id' => $request->user_id,
            'year' => $request->year,
            'last_service_date' => $request->last_service_date,
            'category' => $request->category,
            'colour' => $request->colour,
            'brand' => $request->brand,
            'photo' => $photoPath, // Use the photo path here, not the file object
        ]);

        // Return a response with the created vehicle data
        return response()->json([
            'success' => true,
            'message' => 'Vehicle added successfully!',
            'vehicle' => $vehicle,
            'photo_url' => $photoPath ? Storage::url($photoPath) : null,
        ], 201);
    }

    public function update(Request $request, $id)
{
    Log::info('Updating vehicle with ID:', ['vehicle_id' => $id]);
    // Find the vehicle by vehicle_id
    $vehicle = Vehicle::where('vehicle_id', $id)->first();

    if (!$vehicle) {
        return response()->json(['success' => false, 'message' => 'Vehicle not found!'], 404);
    }

    try {
        $request->validate([
            'vehicle_id' => 'required|string|max:10|unique:vehicles,vehicle_id,' . $vehicle->vehicle_id . ',vehicle_id',
            'user_id' => 'required|string|max:7',
            'year' => 'required|integer',
            'last_service_date' => 'nullable|date',
            'category' => 'required|string',
            'colour' => 'required|string',
            'brand' => 'required|string',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
    } catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json($e->errors(), 422);
    }

    // Handle the uploaded photo if it exists
    $photoPath = $vehicle->photo;  // Keep the old photo if no new photo is uploaded
    if ($request->hasFile('photo')) {
        if ($vehicle->photo) {
            // Delete the old photo
            Storage::disk('public')->delete($vehicle->photo);
        }

        // Store the new photo
        $photoPath = $request->file('photo')->store('vehicle_photos', 'public');
    }

    // Update the vehicle record
    $vehicle->update([
        'vehicle_id' => $request->vehicle_id,
        'user_id' => $request->user_id,
        'year' => $request->year,
        'last_service_date' => $request->last_service_date,
        'category' => $request->category,
        'colour' => $request->colour,
        'brand' => $request->brand,
        'photo' => $photoPath,
    ]);

    return response()->json([
        'success' => true,
        'message' => 'Vehicle updated successfully!',
        'vehicle' => $vehicle,
        'photo_url' => $photoPath ? Storage::url($photoPath) : null,
    ], 200);
}

    

}
