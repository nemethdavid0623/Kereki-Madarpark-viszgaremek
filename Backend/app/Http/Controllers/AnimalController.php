<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\Mime\Message;

class AnimalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $allData = Animal::with('image', 'species')->get();
        return response()->json($allData);
    }

    public function forSale()
    {
        $forSale = Animal::with(['image', 'species'])->where('ForSaleQuantity', '>', 0)->get();

        return response()->json($forSale);;
    }

    public function parkQuantity()
    {
        $quantity = Animal::with(['image', 'species'])->where('Quantity', '>', 0)->get();
        return response()->json($quantity);;
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

            'SpeciesName' => 'required|string',
            'Quantity' => 'required|numeric',
            'ForSaleQuantity' => 'required|numeric|min:0',
            'Description' => 'required|string',
            'More' => 'required|string',
            'SpeciesID' => 'required|numeric',

        ], [
            'SpeciesName.required' => 'Fajnév megadása kötelező',
            'SpeciesName.string' => 'Hibás formátum',

            'Quantity.required' => 'A mennyiség megadása kötelező',
            'Quantity.numeric' => 'A mennyiség csak szám lehet',

            'ForSaleQuantity.required' => 'Az eladásra szánt mennyiség megadása kötelező',
            'ForSaleQuantity.numeric' => 'Az eladásra szánt mennyiség csak szám lehet',
            'ForSaleQuantity.min' => 'Az eladásra szánt mennyiség nem lehet negatív',

            'Description.required' => 'A leírás megadása kötelező',
            'Description.string' => 'A leírás formátuma hibás',
            'More.required' => 'A leírás megadása kötelező',
            'More.string' => 'A leírás formátuma hibás',

            'SpeciesID.required' => 'A faj azonosító megadása kötelező',
            'SpeciesID.numeric' => 'A faj azonosító csak szám lehet'

        ]);
        if ($validator->fails()) {
            return response()->json(["success" => false, "message" => "Hiba a hozzáadaás során!", $validator->errors()->toArray()], 400);
        }

        $NewRecord = new Animal();
        $NewRecord->SpeciesName = $request->SpeciesName;
        $NewRecord->Quantity = $request->Quantity;
        $NewRecord->ForSaleQuantity = $request->ForSaleQuantity;
        $NewRecord->Description = $request->Description;
        $NewRecord->More = $request->More;
        $NewRecord->SpeciesID = $request->SpeciesID;

        $NewRecord->save();

        return response()->json(["success" => true, "data" => $NewRecord], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Animal $animal)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Animal $animal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Animal $animal)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $animal = Animal::find($id);

        if (!empty($animal)) {
            $animal->delete();
            return response()->json(["Message" => "Állat törölve!"], status: 202);
        } else {
            return response()->json(["Message" => "Állat nem található!"], 404);
        }
    }
}
