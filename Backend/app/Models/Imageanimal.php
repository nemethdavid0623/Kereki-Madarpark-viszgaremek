<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Imageanimal extends Model
{
    protected $primaryKey = 'ID';
    protected $table = 'imageanimal';

    public function animal()
    {
        return $this->hasMany(animal::class, 'AnimalID');
    }

    public function image()
    {
        return $this->hasMany(image::class, 'ImageID');
    }
}
