<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
class AnimalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $allData = Animal::with( 'imageanimal','origin', 'species')->get();
        return response()->json($allData);
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
         $validator=Validator::make($request->all(), [
        
        'SpeciesName'=> 'required|string',
        'Quantity'=> 'required|numeric',
        'ForSaleQuantity'=> 'required|numeric|min:0',
        'Description'=>'required|string',
        'SpeciesID'=>'required|numeric',
        'OriginID'=>'required|numeric',
        'Habitat'=>'required|string',
        'Feeding'=>'required|string',



       ],[
        'SpeciesName.required'=> 'Fajnév megadása kötelező',
        'SpeciesName.string'=> 'Hibás formátum',

        'Quantity.required' => 'A mennyiség megadása kötelező',
        'Quantity.numeric'  => 'A mennyiség csak szám lehet',

        'ForSaleQuantity.required' => 'Az eladásra szánt mennyiség megadása kötelező',
        'ForSaleQuantity.numeric'  => 'Az eladásra szánt mennyiség csak szám lehet',
        'ForSaleQuantity.min'      => 'Az eladásra szánt mennyiség nem lehet negatív',

        'Description.required' => 'A leírás megadása kötelező',
        'Description.string'   => 'A leírás formátuma hibás',

        'SpeciesID.required' => 'A faj azonosító megadása kötelező',
        'SpeciesID.numeric'  => 'A faj azonosító csak szám lehet',

        'OriginID.required' => 'A származás megadása kötelező',
        'OriginID.numeric'  => 'A származás azonosító csak szám lehet',

        'Habitat.required' => 'Az élőhely megadása kötelező',
        'Habitat.string'   => 'Az élőhely formátuma hibás',

        'Feeding.required' => 'A táplálkozás megadása kötelező',
        'Feeding.string'   => 'A táplálkozás formátuma hibás',

        
       ]);
       if ($validator->fails()) {
        return response()->json(["success"=>false,"message"=>"Hiba a hozzáadaás során", $validator->errors()->toArray()],400);
       }

       $NewRecord=new Animal();
       $NewRecord->SpeciesName=$request->SpeciesName;
       $NewRecord->Quantity=$request->Quantity;
       $NewRecord->ForSaleQuantity=$request->ForSaleQuantity;
       $NewRecord->Description=$request->Description;
       $NewRecord->SpeciesID=$request->SpeciesID;
       $NewRecord->OriginID=$request->OriginID;
       $NewRecord->Habitat=$request->Habitat;
       $NewRecord->Feeding=$request->Feeding;
      
       
       $NewRecord->save();

       return response()->json(["success"=>true,"message:Record sikeresen hozzáadva"],201) ;
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
    public function destroy(Animal $animal)
    {
        //
    }
}
