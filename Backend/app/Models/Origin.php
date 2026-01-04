<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Origin extends Model
{
    protected $table = 'origin';

    public function animal()
    {
        return $this->belongsTo(animal::class, 'OriginID');
    }
}
