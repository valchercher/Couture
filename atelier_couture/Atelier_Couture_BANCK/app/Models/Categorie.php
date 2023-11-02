<?php

namespace App\Models;

use App\Models\Article;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Categorie extends Model
{
    use HasFactory;
    use SoftDeletes;
   
    protected $guarded=[

    ];
    
    public function scopeCategorieByLibelle(Builder $builder,$libelle){
        return $builder->where('libelle','=',$libelle);
    }
    public function articles()
    {
        return $this->hasMany(Article::class);
    }
    public function scopeCategorieById(Builder $builder,$id)
    {
        return $builder->findOrFail($id);
    }
}
