<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\BusinessHourController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\FeedbackController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Route::get('/business-hours/view', [BusinessHourController::class, 'index']);
// Route::post('/vehicles/store', [VehicleController::class, 'store'])->name('vehicles/store');

// Route::put('vehicles/update/{id}', [VehicleController::class, 'update'])->name('vehicles/update');

// Route::get('/vehicle-ids', [VehicleController::class, 'getVehiclesForUser'])->name('vehicle-ids');
Route::get('/getAvailableTimes/{appointment_date}', [AppointmentController::class, 'getAvailableTimes'])->name('getAvailableTimes');

Route::get('/vehicle-ids', [VehicleController::class, 'getVehiclesForUser'])->name('vehicle-ids');

//view feedbacks
// Route::get('/viewAllFeedback', [FeedbackController::class, 'viewAllFeedback'])->name('viewAllFeedback');

Route::put('/updateStatus/{feedback_id}', [FeedbackController::class, 'updateStatus'])->name('updateStatus');
