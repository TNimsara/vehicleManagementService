<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('feedbacks', function (Blueprint $table) {
            $table->id('feedback_id');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('vehicle_id')->unique();
            $table->date('feedback_date');
            $table->date('service_date');
            $table->integer('rating');
            $table->text('description');
            $table->boolean('is_resolved')->default(false);
            $table->string('feedback_type');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('feedbacks');
    }
};
