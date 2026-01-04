<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $primaryKey = 'ID';
    protected $table = 'image';

    public function imageanimal()
    {
        return $this->belongsTo(imageanimal::class, 'ImageID');
    }
}
