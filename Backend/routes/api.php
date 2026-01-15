<?php

use App\Http\Controllers\AnimalController;
use Illuminate\Support\Facades\Route;


Route::get('/AllData', [AnimalController::class, "index"]);
Route::post('/NewAnimal', [AnimalController::class, "store"]);
