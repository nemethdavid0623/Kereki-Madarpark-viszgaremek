<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function login(Request $request)
    {
        // 1. Validáció módosítása: email helyett username
        $credentials = $request->validate([
            'username' => 'required|string',
            'password' => 'required',
        ]);

        // Az Auth::attempt alapértelmezetten a megadott tömb kulcsait nézi az adatbázisban
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Hibás felhasználónév vagy jelszó'
            ], 401);
        }

        // 2. Felhasználó lekérése username alapján
        $user = User::where('username', $request->username)->first();
        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Sikeres kijelentkezés'
        ]);
    }
}
