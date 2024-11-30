<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $table = 'appointments';

    protected $primaryKey = 'appointment_id';

    protected $fillable = [
        'appointment_id',
        'user_id',
        'vehicle_id',
        'description',
        'appointment_date',
        'appointment_time',
        'status',
        'service_type',
    ];


}
