<?php

use App\Http\Controllers\AnimalController;
use App\Http\Controllers\OriginController;
use Illuminate\Support\Facades\Route;


Route::get('/AllData', [AnimalController::class, "index"]);
Route::post('/NewAnimal', [AnimalController::class, "store"]);
Route::post('/NewOrigin', [OriginController::class, "store"]);