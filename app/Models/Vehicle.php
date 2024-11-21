<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Vehicle extends Model
{
    use HasFactory;

     // Specify the table name (optional if it's plural of the model name)
     protected $table = 'vehicles';

     // The primary key for the table (optional if it's 'id')
     protected $primaryKey = 'vehicle_id';
 
     // The attributes that are mass assignable
     protected $fillable = [
         'vehicle_id',
         'user_id',
         'year',
         'last_service_date',
         'category',
         'colour',
         'brand',
         'photo',
     ];

 
     // Define any additional relationships or methods below, if needed
 
     // Disable timestamps if not using created_at/updated_at (optional)
     public $timestamps = true;
}
