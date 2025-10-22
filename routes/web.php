<?php

use App\Http\Controllers\Web\AboutController;
use App\Http\Controllers\Web\CommunityController;
use App\Http\Controllers\Web\ConservationController;
use App\Http\Controllers\Web\ExploreController;
use App\Http\Controllers\Web\HomeController;
use App\Http\Controllers\Web\QrisController;
use App\Http\Controllers\Web\StoryController as PublicStoryController;
use App\Http\Controllers\Web\SupportController;
use App\Http\Controllers\Web\UmkmController as PublicUmkmController;
use App\Http\Controllers\Web\VisitController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');
Route::get('/rencanakan-kunjungan', VisitController::class)->name('visit.plan');
Route::get('/jelajah-aktivitas', ExploreController::class)->name('explore.index');
Route::get('/umkm', PublicUmkmController::class)->name('umkm.directory');
Route::get('/konservasi-edukasi', ConservationController::class)->name('conservation.index');
Route::get('/komunitas', CommunityController::class)->name('community.index');
Route::get('/dukungan', SupportController::class)->name('support.index');
Route::get('/pembayaran-qris', QrisController::class)->name('qris.index');
Route::get('/cerita', PublicStoryController::class)->name('stories.index');
Route::get('/tentang', AboutController::class)->name('about.index');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return redirect()->route('admin.dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
