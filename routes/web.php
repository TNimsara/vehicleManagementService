<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\VehicalController;
use App\Http\Controllers\BusinessHourController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\VehicleController;

use App\Models\Feedback;
use App\Models\Vehical;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController;
use App\Mail\FirstMail;
use Illuminate\Container\Attributes\Log;
use Illuminate\Support\Facades\Log as FacadesLog;
use Illuminate\Support\Facades\Mail;


Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::post('/send-mail', function(Request $request){
    $email = $request->input('email');
    FacadesLog::info($email);
    Mail::to($email)->send(new FirstMail());
});

Route::get('/dashboard', function () {
    return Inertia::render('Admin/AdminDashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::get('/customer',[CustomerController::class,'index'])->name('customer.index');
Route::post('/customer',[CustomerController::class, 'store'])->name('customer.store');


Route::get('/vehical',[VehicalController::class,'index'])->name('vehical.index');
Route::post('/vehical',[VehicalController::class, 'store'])->name('vehical.store');
Route::get('/vehical-ids', [VehicalController::class, 'getVehicalIds'])->name('vehical-ids');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//Web
Route::get('/Services', function () {
    return Inertia::render('Service'); // Ensure the casing matches
})->name('Services');

Route::get('/Media', function () {
    return Inertia::render('Media'); // Ensure the casing matches
})->name('Media');

Route::get('/About', function () {
    return Inertia::render('About'); // Ensure the casing matches
})->name('About');

Route::get('/fullservice', function () {
    return Inertia::render('Fullservice'); // Ensure the casing matches
})->name('fullservice');

Route::get('/normalservice', function () {
    return Inertia::render('Normalservice'); // Ensure the casing matches
})->name('normalservice');

Route::get('/ContactUs', function () {
    return Inertia::render('Contact'); // Ensure the casing matches
})->name('ContactUs');

//Admin
Route::get('/AdminDashboard', function () {
    return Inertia::render('Admin/AdminDashboard'); // Ensure the casing matches
})->name('AdminDashboard');

Route::get('/BusinessHours', function () {
    return Inertia::render('Admin/BusinessHours'); // Ensure the casing matches
})->name('BusinessHours');

Route::get('/ViewBusinessHours', function () {
    return Inertia::render('Admin/ViewBusinessHours'); // Ensure the casing matches
})->name('ViewBusinessHours');

Route::get('/business-hours/view', [BusinessHourController::class, 'index'])->name('business-hours/view');

Route::get('/viewFeedback',function(){
    return Inertia::render('Admin/viewFeedback');
})->name('viewFeedback');

//Customer
Route::get('/CustomerDashboard', function () {
    return Inertia::render('Customer/CustomerDashboard'); // Ensure the casing matches
})->middleware(['auth', 'verified'])->name('CustomerDashboard');

//vehicle
Route::post('/vehicles/store', [VehicleController::class, 'store'])->name('vehicles/store');
Route::put('vehicles/update/{id}', [VehicleController::class, 'update'])->name('vehicles/update');



Route::get('/create', function () {
    return Inertia::render('Appointments/Create'); // Ensure the casing matches
})->name('create');

Route::get('/viewappointments', function () {
    return Inertia::render('Appointments/viewappointments'); // Ensure the casing matches
})->name('viewappointments');

Route::get('/personal', function () {
    return Inertia::render('Customer/Personalinfo'); // Ensure the casing matches
})->name('profile');

Route::get('/vehiclereg', function () {
    return Inertia::render('Vehicle/VehicleRegistration'); // Ensure the casing matches
})->name('vehiclereg');

Route::get('/service',function(){
    return Inertia::render('Customer/ServiceHistory');
})->name('service');




//Receptionist
Route::get('/AppointmentHandle',function(){
    return Inertia::render('Receptionist/AppointmentHandle');
})->name('AppointmentHandle');


require __DIR__.'/auth.php';

// Admin auth
Route::get('Admin/Dashboard', [HomeController::class, 'index1'])->name('Admin.AdminDashboard');

// Appointments
Route::post('/appointments', [AppointmentController::class, 'store'])->name('appointments');
Route::put('/business-hours/update/{dayOfWeek}', [BusinessHourController::class, 'update'])->name('business.hours.update');
Route::get('/booked-times/{date}', [AppointmentController::class, 'getBookedTimes'])->name('booked-times');
Route::get('/business-hours/{dayOfWeek}', [BusinessHourController::class, 'show']);
Route::get('/closed-days', [BusinessHourController::class, 'getClosedDays'])->name('closed-days');
Route::get('/appointmenthandle', [AppointmentController::class, 'index'])->name('appointmenthandle');



//User Registration
Route::get('/usersub',function(){
    return Inertia::render('Admin/UserManagement');
})->name('usersub');
Route::post('/user',[UserController::class, 'store'])->name('user.store');

// Route::post('/appointments/{id}/finish', [AppointmentController::class, 'finish'])->name('finish');
Route::put('/appointments/{id}', [AppointmentController::class, 'updateStatus'])->name('appointments.update');
Route::get('/viewappointmentss', [AppointmentController::class, 'displayCustomerAppointments'])->name('viewappointmentss');
// Route::post('/send-email', [EmailController::class, 'sendEmail'])->name('send-email');


Route::get('/feedback', [FeedbackController::class, 'viewFeedback'])->name('feedback');


//feedback
Route::get('/feedbacksub',function(){
    return Inertia::render('Customer/Feedback');
})->name('feedbacksub');
Route::post('/feedback',[FeedbackController::class, 'store'])->name('feedback.store');

//reciption
Route::get('/ReceptionDashboard', function () {
    return Inertia::render('Receptionist/ReciptionDashboard'); // Ensure the casing matches
})->middleware(['auth', 'verified'])->name('ReceptionDashboard');

//Dashboards
Route::get('/dashboard/stats', [DashboardController::class, 'getDashboardStats'])->name('dashboard.stats');

Route::get('/mailtest', function () {
    return Inertia::render('Mail/firstmail'); // Ensure the casing matches
})->name('mailtest');
//Mail
Route::post('/send-mail',function(Request $request){
    Mail::to('test@test.com')->send(new FirstMail());
});


