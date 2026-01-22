<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Animal extends Model
{

    protected $primaryKey = 'ID';
    protected $table = 'animal';
    public $timestamps = false;
    protected $fillable = [
        'SpeciesName',
        'Quantity',
        'ForSaleQuantity',
        'Description',
        'SpeciesID',
        'OriginID',
        'Habitat',
        'Feeding'
    ];

    public function species()
    {
        return $this->belongsTo(species::class, 'SpeciesID');
    }

    public function image()
    {
        return $this->hasMany(image::class, 'AnimalID');
    }

    public function origin()
    {
        return $this->belongsTo(origin::class, 'OriginID');
    }
}
