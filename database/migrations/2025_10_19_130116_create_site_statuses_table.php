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
        Schema::create('site_statuses', function (Blueprint $table) {
            $table->id();
            $table->string('crowd_level', 20);
            $table->string('weather_summary')->nullable();
            $table->string('temperature')->nullable();
            $table->string('wind')->nullable();
            $table->boolean('is_raining')->default(false);
            $table->text('advisory')->nullable();
            $table->json('metrics')->nullable();
            $table->boolean('is_current')->default(true);
            $table->timestamp('reported_at')->nullable();
            $table->timestamp('valid_until')->nullable();
            $table->foreignId('reported_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->index(['crowd_level', 'is_current']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('site_statuses');
    }
};
