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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('tagline')->nullable();
            $table->text('summary')->nullable();
            $table->longText('body')->nullable();
            $table->string('location')->nullable();
            $table->string('status', 20)->default('draft');
            $table->boolean('is_featured')->default(false);
            $table->timestamp('start_at')->nullable();
            $table->timestamp('end_at')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->string('event_type')->nullable();
            $table->string('organizer')->nullable();
            $table->string('contact_person')->nullable();
            $table->string('registration_url')->nullable();
            $table->string('cover_image')->nullable();
            $table->json('gallery')->nullable();
            $table->json('metadata')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->index(['status', 'start_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
