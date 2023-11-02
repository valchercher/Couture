<?php

namespace App\Models;

use App\Models\Categorie;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ArticleArticleVente extends Model
{
    use HasFactory;
    use SoftDeletes;
    public function categorie(){
        return $this->belongsTo(Categorie::class);
    }
}
