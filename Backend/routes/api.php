<?php

use App\Http\Controllers\AnimalController;
use App\Http\Controllers\OriginController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;


Route::post('/login', [UserController::class, 'login'])->name('login');
Route::get('/AllData', [AnimalController::class, "index"]);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [UserController::class, 'logout']);
    Route::post('/NewAnimal', [AnimalController::class, "store"]);
    Route::post('/NewOrigin', [OriginController::class, "store"]);
    Route::delete('/DeleteAnimal/{id}', [AnimalController::class, "destroy"]);
});
