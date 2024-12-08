<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Carbon\Carbon;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        // Update or Insert a user (Example)
        DB::table('users')->updateOrInsert(
            ['email' => 'tharushi@example.com'], // Match on email
            [
                'name' => 'Tharushi',
                'user_type' => 'admin', // or 'user', depending on the type
                'email_verified_at' => Carbon::now(), // set the email_verified_at to the current timestamp
                'password' => Hash::make('12345678'), // hashed password
            ]
        );

        // Update or Insert multiple users (Example)
        DB::table('users')->updateOrInsert(
            ['email' => 'ravi@example.com'], // Match on email
            [
                'name' => 'Ravi',
                'user_type' => 'receptionist',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('12345678'),
            ]
        );

        DB::table('users')->updateOrInsert(
            ['email' => 'nimesha@example.com'], // Match on email
            [
                'name' => 'Nimesha',
                'user_type' => 'customer',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('12345678'),
            ]
        );
    }
}
