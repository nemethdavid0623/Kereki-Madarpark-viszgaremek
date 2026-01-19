<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $primaryKey = 'ID';
    protected $table = 'image';
    public $timestamps = false;

    public function animal()
    {
        return $this->hasMany(animal::class, 'ImageID');
    }
}
