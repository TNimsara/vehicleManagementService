<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\User;
use App\Models\Feedback;

class DashboardController extends Controller
{
    public function getDashboardStats()
    {
        try {
            $appointmentsCount = Appointment::count();
            $usersCount = User::count();
            $feedbacksCount = Feedback::count(); 

            log:info( $feedbacksCount);

            
            return response()->json([
                'appointments' => $appointmentsCount,
                'users' => $usersCount,
                'feedbacks' => $feedbacksCount,
            ]);
        } catch (\Exception $e) {
            \Log::error('Error fetching dashboard stats: ' . $e->getMessage());
            \Log::error('Stack trace: ' . $e->getTraceAsString());
            return response()->json(['error' => 'An error occurred while fetching data'], 500);
        }
    }
}
