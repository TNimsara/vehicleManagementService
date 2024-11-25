<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Feedback extends Model
{
    use HasFactory;

    protected $table = 'feedbacks';

    protected $primaryKey = 'feedback_id';

    protected $fillable = [
        'feedback_id',
        'user_id',
        'vehicle_id',
        'feedback_date',
        'service_date',
        'rating',
        'description',
        'is_resolved',
        'feedback_type',
    ];

    
}
