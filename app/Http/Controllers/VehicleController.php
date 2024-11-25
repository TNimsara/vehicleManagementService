<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;



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
        
        if (auth()->check()) {
            $user_id = auth()->id();
            Log::info('Authenticated user ID: ' . $user_id);
        } else {
            Log::warning('No authenticated user found. Appointment cannot be created.');
            return response()->json(['status' => 'error', 'message' => 'User not authenticated.'], 401);
        }

        // $user_id = auth()->id();

        // if (!$user_id) {
        //     // If no user is logged in, you can throw an error or redirect
        //     return redirect()->route('login')->with('error', 'You must be logged in to add a vehicle.');
        // }

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
            'user_id' => $user_id, // Use the authenticated user's ID

            'year' => $request->year,
            'last_service_date' => $request->last_service_date,
            'category' => $request->category,
            'colour' => $request->colour,
            'brand' => $request->brand,
            'photo' => $photoPath, // Use the photo path here, not the file object
        ]);
  
    }

    //viewVehicles
    public function getVehicles(Request $request)
    {
       
        $user_id = auth()->id();
        Log::info('Authenticated user ID:', ['user_id' => $user_id]);
        // Fetch vehicles logged by this user
        $vehicles = Vehicle::where('user_id', $user_id)->get();
        Log::info($vehicles);

        return response()->json($vehicles);
    }


    public function deleteVehicle(Request $request, $vehicle_id)
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);
    
        $user = $request->user();
        
        // Find the vehicle by vehicle_id and user_id
        $vehicle = Vehicle::where('user_id', $user->id)->where('vehicle_id', $vehicle_id)->first();
    
        if ($vehicle) {
            $vehicle->delete(); // Delete the vehicle
            return response()->json(['message' => 'Vehicle deleted successfully']);
        } else {
            return response()->json(['error' => 'Vehicle not found'], 404);
        }
    }

    public function update(Request $request, $id)
{
        //Log::info('Incoming request data:', $request->all());
        Log::info('Update method triggered for vehicle ID: ' . $id);
        // Ensure the vehicle exists by vehicle_id
        $vehicle = Vehicle::where('vehicle_id', $id)->first();  // Fetch vehicle by vehicle_id
        if (!$vehicle) {
            Log::error('Vehicle not found for vehicle_id: ' . $id);
            return response()->json(['error' => 'Vehicle not found'], 404);  // Return an error if the vehicle is not found
        }
    
        // Check if user is authenticated
        if (auth()->check()) {
            $user_id = auth()->id();  // Get the authenticated user's ID
            Log::info('Authenticated user ID: ' . $user_id);
            // Ensure the vehicle belongs to the authenticated user
            Log::info('Authenticated user ID:', ['user_id' => auth()->id()]);
            Log::info('Vehicle user_id:', ['vehicle_user_id' => $vehicle->user_id]);
            

            if ((int)$vehicle->user_id !== (int)$user_id) {

                Log::error('Unauthorized attempt to update vehicle by user ID: ' . $user_id);
                return response()->json(['error' => 'Unauthorized to update this vehicle'], 403);
            }
            Log::info('Request data for vehicle update', $request->all());
    
            // Validate the request data
            $validatedData = $request->validate([
                'vehicle_id' => 'required|string|max:10|unique:vehicles,vehicle_id,' . $vehicle->vehicle_id . ',vehicle_id',

                'year' => 'required|integer',
                'last_service_date' => 'nullable|date',
                'category' => 'required|string',
                'colour' => 'required|string',
                'brand' => 'required|string',
                'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);
    
            // Handle the uploaded photo if it exists
            $photoPath = $vehicle->photo;  // Keep the old photo if no new photo is uploaded
            if ($request->hasFile('photo')) {
                // If the vehicle has a photo, delete the old one
                if ($vehicle->photo) {
                    Storage::disk('public')->delete($vehicle->photo);
                }
    
                // Store the new photo and get the path
                $photoPath = $request->file('photo')->store('vehicle_photos', 'public');
            }
    
            // Update the vehicle record
            $vehicle->update([
                'vehicle_id' => $request->vehicle_id,
                'user_id' => $user_id,  // Use the authenticated user's ID
                'year' => $request->year,
                'last_service_date' => $request->last_service_date,
                'category' => $request->category,
                'colour' => $request->colour,
                'brand' => $request->brand,
                'photo' => $photoPath,
            ]);
    
            
            Log::info('Vehicle updated successfully!');
            // Return a success response with the updated vehicle
            return response()->json([
                'success' => true,
                'message' => 'Vehicle updated successfully!',
                'vehicle' => $vehicle,
                'photo_url' => $photoPath ? Storage::url($photoPath) : null,
            ], 200);
        }
    
        // If user is not authenticated
        return response()->json(['error' => 'Unauthorized'], 401);  // Return Unauthorized if the user is not logged in
}
    
    

//getting vehicle_ids from user_id
public function getVehicleIds(Request $request)
{
    // Ensure the user is authenticated
    if (!auth()->check()) {
        return response()->json(['error' => 'User not authenticated'], 401);
    }

    $user_id = auth()->id();
        // Fetch all vehicles associated with the logged-in user
    
    $vehicles = Vehicle::where('user_id', $user_id)->get(['vehicle_id']); 
    // Log::info($vehicles);// Adjust the fields you need

    // Log::info('Fetched vehicles for user:', ['vehicles' => $vehicles]);

    if ($vehicles->isEmpty()) {
        return response()->json(['error' => 'No vehicles found for this user'], 404);
    }
     
    return response()->json([
        'vehicle_ids' => $vehicles->pluck('vehicle_id')->toArray() // Only return the vehicle_id
    ]);
}


//showing relevent vehicle details
public function showVehicleDetails($vehicle_id)
{
    // Ensure the user is authenticated
    if (auth()->check()) {
        $user_id = auth()->id();

        // Get the vehicle details for the logged-in user and the specified vehicle_id
        $vehicle = Vehicle::where('vehicle_id', $vehicle_id)->where('user_id', $user_id)->first();

        if (!$vehicle) {
            return response()->json(['error' => 'Vehicle not found or you do not have permission'], 404);
        }

        return response()->json([
            'vehicle' => $vehicle
        ]);
    } else {
        return response()->json(['error' => 'User not authenticated'], 401);
    }
}   

}
