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
        Schema::create('umkms', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('owner_name')->nullable();
            $table->string('category')->nullable();
            $table->string('tagline')->nullable();
            $table->text('description')->nullable();
            $table->string('whatsapp_number')->nullable();
            $table->string('maps_url')->nullable();
            $table->string('instagram_url')->nullable();
            $table->string('facebook_url')->nullable();
            $table->string('status', 20)->default('published');
            $table->boolean('is_featured')->default(false);
            $table->json('opening_hours')->nullable();
            $table->json('products')->nullable();
            $table->string('address')->nullable();
            $table->string('hero_image')->nullable();
            $table->json('gallery')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();

            $table->index(['category', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('umkms');
    }
};
