<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index(){
        $users = User::all();
        return Inertia::render('Admin/UserManagement',['users'=>$users]);
    }
    public function store(Request $request){

        $data = ($request)->validate([
            'name'=>'required',
            'email'=>'required',
            'userType'=>'required',
            'password'=>'required',
        ]);


        $newUser = User::create($data);
        return redirect(route('usersub'));
    }

    // In UserController.php
    public function getAllUsers()
    {
        $users = User::all(); // Get all users
        return response()->json($users); // Return users as JSON
    }

    public function deleteUser(Request $request, $id)
{
    $user = User::findOrFail($id);

    // Validate the password (you might need to use Auth::check() to validate the logged-in user's password)
    if (!Hash::check($request->password, Auth::user()->password)) {
        return response()->json(['errors' => ['password' => 'Incorrect password.']], 400);
    }

    // Delete the user
    $user->delete();

    return response()->json(['message' => 'User deleted successfully']);
}

}
