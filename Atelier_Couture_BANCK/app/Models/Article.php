<?php

namespace App\Models;

use App\Models\Categorie;
use App\Models\Fournisseur;
use App\Models\ArticleVente;
use App\Models\ArticleFournisseur;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Article extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $guarded=[

    ];
    public function categorie()
    {
        return $this->belongsTo(Categorie::class);
    }
    public function fournisseurs(){
        return $this->belongsToMany(Fournisseur::class);
    }
    public function create(){
        $article->fournisseurs()->attach($request->fournisseurs);
    }
    public function scopeArticleCountByCateg(Builder $builder,$id)
    {
        return $builder->where('categorie_id',$id);
    }
    public function articleventes()
    {
        return $this->belongsToMany(ArticleVente::class);
    }
    public function scopeArticleByPrix(Builder $builder,$id)
    {
        return $builder->where('id',$id);
    }
}
