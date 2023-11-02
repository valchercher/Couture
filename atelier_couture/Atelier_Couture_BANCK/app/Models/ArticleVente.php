<?php

namespace App\Models;

use App\Models\Article;
use App\Models\Categorie;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ArticleVente extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $guarded=[

    ];
    public function articles()
    {
        return $this->belongsToMany(Article::class)->withpivot('quantite');
    }
    public function categorie(){
        return $this->belongsTo(Categorie::class);
    }
}
