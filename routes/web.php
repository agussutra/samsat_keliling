<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\InformasiController;
use App\Http\Controllers\JadwalSamlingController;
use App\Http\Controllers\PendaftaranOfflineController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/pendaftaran_offline', [PendaftaranOfflineController::class, 'index']);
Route::get('/pendaftaran_offline/form', [PendaftaranOfflineController::class, 'form']);
Route::post('/pendaftaran_offline', [PendaftaranOfflineController::class, 'store']);
Route::put('/pendaftaran_offline/{id}', [PendaftaranOfflineController::class, 'update']);
Route::delete('/pendaftaran_offline/{id}', [PendaftaranOfflineController::class, 'delete']);

Route::resource('/user', RegisteredUserController::class)->names('user');
Route::resource('/informasi', InformasiController::class)->names('informasi');
Route::resource('/jadwal_samling', JadwalSamlingController::class)->names('jadwal_samling');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

require __DIR__.'/auth.php';
