<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EventController;
use App\Http\Controllers\Admin\SiteStatusController;
use App\Http\Controllers\Admin\SpotController;
use App\Http\Controllers\Admin\StoryController;
use App\Http\Controllers\Admin\UmkmController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/', DashboardController::class)->name('dashboard');

        Route::resource('spots', SpotController::class);
        Route::resource('umkm', UmkmController::class);
        Route::resource('events', EventController::class);
        Route::resource('stories', StoryController::class);
        Route::resource('site-statuses', SiteStatusController::class)->except('show');
    });

