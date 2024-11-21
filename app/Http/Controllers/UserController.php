<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
}
