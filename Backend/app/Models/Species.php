<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Species extends Model
{
    protected $table = 'species';

    public function animal()
    {
        return $this->belongsTo(animal::class, 'SpeciesID');
    }
}
