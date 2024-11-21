<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\BusinessHour;

class BusinessHoursSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
{
    $businessHours = [
        ['dayOfWeek' => 'Monday', 'openingTime' => '09:00', 'closingTime' => '17:00', 'isOpen' => true, 'step' => 30],
        ['dayOfWeek' => 'Tuesday', 'openingTime' => '09:00', 'closingTime' => '17:00', 'isOpen' => true, 'step' => 30],
        ['dayOfWeek' => 'Wednesday', 'openingTime' => '09:00', 'closingTime' => '17:00', 'isOpen' => true, 'step' => 30],
        ['dayOfWeek' => 'Thursday', 'openingTime' => '09:00', 'closingTime' => '17:00', 'isOpen' => true, 'step' => 30],
        ['dayOfWeek' => 'Friday', 'openingTime' => '09:00', 'closingTime' => '17:00', 'isOpen' => true, 'step' => 30],
        ['dayOfWeek' => 'Saturday', 'openingTime' => '10:00', 'closingTime' => '14:00', 'isOpen' => true, 'step' => 60],
        ['dayOfWeek' => 'Sunday', 'openingTime' => null, 'closingTime' => null, 'isOpen' => false, 'step' => null], // Closed on Sunday
    ];

    foreach ($businessHours as $hours) {
        // Use updateOrCreate to avoid duplicate entries
        BusinessHour::updateOrCreate(
            ['dayOfWeek' => $hours['dayOfWeek']], // Condition to find the record
            $hours // Data to be updated or created
        );
    }
}

}
