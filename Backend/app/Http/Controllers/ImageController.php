<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ImageController extends Controller
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

            'ImageData' => 'required|string',
        ], [
            'ImageData.required' => 'Kép megadása kötelező!',
            'ImageData.string' => 'Hibás formátum!'
        ]);
        if ($validator->fails()) {
            return response()->json(["success" => false, "message" => "Hiba a hozzáadaás során!", $validator->errors()->toArray()], 400);
        }
        $NewRecord = new Image();
        $NewRecord->ImageData = $request->ImageData;
        $NewRecord->save();
        return response()->json(["success" => true, "message" => "Record sikeresen hozzáadva!"], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Image $image)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Image $image)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Image $image)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Image $image)
    {
        //
    }
}
