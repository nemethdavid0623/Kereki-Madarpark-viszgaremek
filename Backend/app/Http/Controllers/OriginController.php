<?php

namespace App\Http\Controllers;

use App\Models\Origin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OriginController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [

            'Name' => 'required|string',
        ], [
            'Name.required' => 'Származási hely megadása kötelező!',
            'Name.string' => 'Hibás formátum!'
        ]);
        if ($validator->fails()) {
            return response()->json(["success" => false, "message" => "Hiba a hozzáadaás során!", $validator->errors()->toArray()], 400);
        }
        $NewRecord = new Origin();
        $NewRecord->Name = $request->Name;
        $NewRecord->save();
        return response()->json(["success" => true, "message" => "Record sikeresen hozzáadva!"], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Origin $origin)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Origin $origin)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Origin $origin)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Origin $ID)
    {
    }
}
