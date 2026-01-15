<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Imageanimal extends Model
{
    protected $primaryKey = 'ID';
    protected $table = 'imageanimal';

    public function animal()
    {
        return $this->belongsTo(animal::class, 'AnimalID');
    }

    public function image()
    {
        return $this->belongsTo(image::class, 'ImageID');
    }
}
