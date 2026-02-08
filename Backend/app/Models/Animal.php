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
        'More',
        'SpeciesID'
    ];

    public function species()
    {
        return $this->belongsTo(species::class, 'SpeciesID');
    }

    public function images()
    {
        return $this->hasMany(image::class, 'AnimalID');
    }
}
