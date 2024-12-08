<?php

namespace App\Http\Controllers;
use App\Models\Appointment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use App\Http\Controllers\BusinessHourController;
use App\Models\BusinessHour;

class AppointmentController extends Controller
{
    public function store(Request $request){

        $validateData = $request->validate([
            'vehicle_id' => 'required|string',
            'appointment_date' => 'required|date',
            'appointment_time' => 'required|date_format:H:i',
            'description' => 'nullable|string',
            'service_type'=> 'required|string',

        ]);

        Log::info('Validated Data:', $validateData);

        $appointment = Appointment::create(array_merge($validateData, [
            'user_id' => Auth::id(), // Use the customerId from the session
            'status' => 'scheduled',
         
        ]));

        return response()->json([
            'status' => 'success',
            'message' => 'Appointment created successfully!'
        ]);
    }

    public function getAvailableTimes($appointment_date)
{

        if (!$appointment_date) {
           // Log::error('Missing appointment_date in request');
            return response()->json(['error' => 'appointment_date is required'], 400); // Return a 400 error if no date is provided
        }

        try {
            // Parse the appointment_date using Carbon
            $appointment_date = Carbon::parse($appointment_date);
        } catch (\Exception $e) {
            //Log::error('Invalid appointment_date format', ['appointment_date' => $appointment_date, 'error' => $e->getMessage()]);
            return response()->json(['error' => 'Invalid date format'], 400); // Return a 400 error if the date is invalid
        }

        $dayOfWeek = $appointment_date->dayOfWeek;

       
        $dayOfWeekMapping = [
            0 => 'Sunday',
            1 => 'Monday',
            2 => 'Tuesday',
            3 => 'Wednesday',
            4 => 'Thursday',
            5 => 'Friday',
            6 => 'Saturday',
        ];
        
        // Convert the integer dayOfWeek to the corresponding string
        $dayName = $dayOfWeekMapping[$dayOfWeek];
        
        // Now query using the string value (e.g., "Tuesday")
        $businessHours = BusinessHour::where('dayOfWeek', $dayName)->first();
        
        if ($businessHours) {
            // Log::info('Found business hours for the selected day', [
            //     'businessHours' => $businessHours,
            // ]);
    
            // Ensure opening and closing times are not null
            $openingTime = $businessHours->openingTime;
            $closingTime = $businessHours->closingTime;
    
            if (!$openingTime || !$closingTime) {
                // Log and return an error if opening or closing time is null
                // Log::warning('Missing opening or closing time for the selected day', [
                //     'appointment_date' => $appointment_date->toDateString(),
                //     'openingTime' => $openingTime,
                //     'closingTime' => $closingTime,
                // ]);
                return response()->json(['error' => 'Business hours are not properly defined for the selected day.'], 400);
            }
    
            // Create Carbon instances for opening and closing times
            $openingTime = Carbon::createFromTimeString($openingTime);
            $closingTime = Carbon::createFromTimeString($closingTime);
    
            // Generate available times directly in this method
            $availableTimes = [];
            $stepInterval = $businessHours->step;
    
            $currentTime = $openingTime->copy();
            while ($currentTime->lessThanOrEqualTo($closingTime)) {
                $availableTimes[] = $currentTime->format('H:i');
                $currentTime->addMinutes($stepInterval); // Add step interval
            }
    
           
    
            $bookedTimes = Appointment::whereDate('appointment_date', $appointment_date->toDateString())
                ->pluck('appointment_time')
                ->map(function ($time) {
                    return Carbon::parse($time)->format('H:i');
                })
                ->toArray();
    
            // Log::info('Fetched booked times for the selected date', [
            //     'bookedTimes' => $bookedTimes,
            // ]);
    
            $availableTimes = array_diff($availableTimes, $bookedTimes);
    
            // Log::info('Available times after filtering booked times', [
            //     'availableTimes' => $availableTimes,
            // ]);
        
            return response()->json($availableTimes);
        } else {
            // Log::warning('No business hours found for the selected day', [
            //     'appointment_date' => $appointment_date->toDateString(),
            //     'dayOfWeek' => $dayOfWeek,
            // ]);
        }
    
        return response()->json([]);
    }


private function generateAvailableTimes($openingTime, $closingTime, $step)
    {
        $times = [];
        $start = Carbon::createFromTimeString($openingTime);
        $end = Carbon::createFromTimeString($closingTime);
    
        while ($start->lt($end)) {
            $times[] = $start->format('H:i');
            $start->addMinutes($step);
        }
    
        return $times;
    }
    //get appoinments
    public function getAppointments(Request $request)
{
    try {
        // Ensure the user is authenticated
        $user = auth()->user();
        if (!$user) {
            // Log the authentication failure
            \Log::error('Authentication failed: User not logged in.');
            return response()->json(['error' => 'User is not authenticated'], 401);
        }

        // Log the user info for debugging
        \Log::info('Fetching appointments for user:', ['user_id' => $user->id]);

        // Fetch appointments for the authenticated user
        $appointments = Appointment::where('user_id', $user->id)->get();

        // Log the result of the database query
        \Log::info('Appointments fetched successfully:', ['appointments_count' => $appointments->count()]);

        return response()->json($appointments);

    } catch (\Exception $e) {
        // Log any exceptions that occur during the process
        \Log::error('Error fetching appointments: ' . $e->getMessage(), ['exception' => $e]);

        // Return a generic error response
        return response()->json(['error' => 'Failed to fetch appointments'], 500);
    }
}

    // delete appointment
    public function deleteAppointment($appointmentId)
    {
        $appointment = Appointment::find($appointmentId);
        if ($appointment) {
            $appointment->delete();
            return response()->json(['message' => 'Appointment deleted successfully']);
        } else {
            return response()->json(['message' => 'Appointment not found'], 404);
        }
    }

    //Appointment Handling
    public function getAllAppointments(Request $request)
{
    try {
        // Ensure the user is authenticated
        $user = auth()->user();
        if (!$user) {
            // Log the authentication failure
            \Log::error('Authentication failed: User not logged in.');
            return response()->json(['error' => 'User is not authenticated'], 401);
        }

        // Log the user info for debugging
        \Log::info('Fetching all appointments.');

        // Fetch all appointments and order by appointment_date in ascending order
        $appointments = Appointment::orderBy('appointment_date', 'asc')->get();

        // Log the result of the database query
        \Log::info('Appointments fetched successfully:', ['appointments_count' => $appointments->count()]);

        return response()->json($appointments);

    } catch (\Exception $e) {
        // Log any exceptions that occur during the process
        \Log::error('Error fetching appointments: ' . $e->getMessage(), ['exception' => $e]);

        // Return a generic error response
        return response()->json(['error' => 'Failed to fetch appointments'], 500);
    }
}

public function updateStatus(Request $request, $appointment_id)
{
    // Validate the request to ensure the value is boolean
    $request->validate([
        'status' => 'required|string',  // Ensure the value is a boolean
    ]);

    // Find the feedback record
    $appointment = Appointment::find($appointment_id);

    if (!$appointment) {
        return response()->json(['error' => 'appointment not found'], 404);
    }

    // Update the resolved status
    $appointment->status = $request->input('status');
    $appointment->save();

    return response()->json($appointment);  // Return the updated feedback record
}

}

