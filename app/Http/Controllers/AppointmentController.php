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

        // Log::info('Received request to get available times', [
        //     'appointment_date' => $appointment_date->toDateString(),
        // ]);
    
        // Log::info('Calculated day of the week for the appointment date', [
        //     'appointment_date' => $appointment_date->toDateString(),
        //     'dayOfWeek' => $dayOfWeek,
        // ]);

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
    
            // if ($appointment_date->isToday()) {
            //     // Get current time
            //     $now = Carbon::now();
                
            //     // Log the current time
            //     Log::info('Current time retrieved', [
            //         'current_time' => $now->toDateTimeString(),
            //     ]);
                
            //     // Restrict available times to those that are at least 5 hours ahead of the current time
            //     $availableTimes = array_filter($availableTimes, function ($time) use ($now) {
            //         $timeCarbon = Carbon::createFromFormat('H:i', $time);
            
            //         // Log the comparison between the current time and the available time
            //         Log::info('Comparing available time', [
            //             'available_time' => $time,
            //             'current_time' => $now->toDateTimeString(),
            //             'time_to_compare' => $timeCarbon->toDateTimeString(),
            //             'is_greater_than_5_hours' => $timeCarbon->greaterThanOrEqualTo($now->addHours(5)),
            //         ]);
            
                //     return $timeCarbon->greaterThanOrEqualTo($now->addHours(5));
                // });
            
                // Log the available times after filtering
            //     Log::info('Available times after filtering based on 5-hour rule', [
            //         'available_times' => $availableTimes,
            //     ]);
            // }
            
            // Log::info('Generated available times', [
            //     'availableTimes' => $availableTimes,
            // ]);
    
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
}
