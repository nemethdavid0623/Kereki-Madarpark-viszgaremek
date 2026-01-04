<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Animal extends Model
{

    protected $table = 'animal';

    public function species()
    {
        return $this->hasMany(species::class, 'SpeciesID');
    }

    public function imageanimal()
    {
        return $this->hasMany(imageanimal::class, 'AnimalID');
    }

    public function origin()
    {
        return $this->hasMany(origin::class, 'OriginID');
    }
}
