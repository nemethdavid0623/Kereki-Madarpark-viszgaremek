<?php

namespace App\Http\Controllers;

use App\Models\Species;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SpeciesController extends Controller
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
            'Name.required' => 'Fajnév megadása kötelező!',
            'Name.string' => 'Hibás formátum!'
        ]);
        if ($validator->fails()) {
            return response()->json(["success" => false, "message" => "Hiba a hozzáadaás során!", $validator->errors()->toArray()], 400);
        }
        $NewRecord = new Species();
        $NewRecord->Name = $request->Name;
        $NewRecord->save();
        return response()->json(["success" => true, "message" => "Record sikeresen hozzáadva!"], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Species $species)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Species $species)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Species $species)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Species $ID)
    {
        $species = Species::find($ID);

        if (!empty($species)) {
            $species->delete();
            return response()->json(["Message" => "Fajta törölve!"], status: 202);
        } else {
            return response()->json(["Message" => "Fajta nem található!"], 404);
        }
    }
}
