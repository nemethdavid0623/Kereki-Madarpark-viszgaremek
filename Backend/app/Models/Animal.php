<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Animal extends Model
{

    protected $primaryKey = 'ID';
    protected $table = 'animal';

    public function species()
    {
        return $this->belongsTo(species::class, 'SpeciesID');
    }

    public function imageanimal()
    {
        return $this->hasMany(imageanimal::class, 'AnimalID');
    }

    public function origin()
    {
        return $this->belongsTo(origin::class, 'OriginID');
    }
}
