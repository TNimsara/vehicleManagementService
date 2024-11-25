<?php

namespace App\Http\Controllers;
use App\Models\Feedback;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FeedbackController extends Controller
{
    public function store(Request $request){

          // Log the incoming request data for debugging
        Log::info('Incoming feedback submission data', [
            'input' => $request->all(),  // Log all input data coming from the frontend
        ]);

        Log::info('User ID:');
        try{
            $request->validate([
                'vehicle_id' => 'nullable|exists:vehicles,vehicle_id',
                'rating'=> 'required|integer|min:1|max:5',
                'description'=> 'required|string',
                'feedback_type' => 'required|string',
                'service_date'=> 'nullable|date',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation failed for feedback submission', [
                'errors' => $e->errors(),
                'input' => $request->all(), // Log the input data as well for context
            ]);
        }

        if (!Auth::check()) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }
            $feedback = Feedback::create([
                'user_id' => Auth::id(),
                'vehicle_id' => $request->vehicle_id,
                'feedback_date' => now(),
                'service_date'=> $request->service_date,
                'rating' => $request->rating,
                'description' => $request->description,
                'is_resolved' => false,
                'feedback_type' => $request->feedback_type,
            ]);
        
            // Return a success response with feedback data
    return response()->json([
        'message' => 'Feedback submitted successfully!',
        'feedback' => $feedback,
    ], 201);  // HTTP status code 201 for successful creation
    }

    //create view feedbacks
    public function viewAllFeedback(Request $request){

        $type = $request->input('type');

        if($type!=null){
            $feedbacks = Feedback::where('feedback_type', $type)->get();
        }else{
            $feedbacks = Feedback::all();
        }
        //return response()->json(['Feedbacks' => $feedbacks]);
        return response()->json($feedbacks);

    }
}
