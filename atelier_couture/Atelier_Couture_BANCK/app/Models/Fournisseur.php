<?php

namespace App\Models;

use App\Models\Article;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Fournisseur extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $guarded=[

    ];

    public function articles(){
        return $this->belongsToMany(Article::class);
    }
}
