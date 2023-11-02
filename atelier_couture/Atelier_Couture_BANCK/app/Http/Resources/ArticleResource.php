<?php

namespace App\Http\Resources;
use App\Models\Article;
use App\Models\Categorie;
use Illuminate\Http\Request;
use App\Http\Resources\CategorieResource;
use App\Http\Resources\FournisseurResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        //  return parent::toArray($request);
       
         return [
           
                'id'=>$this->id,
                'libelle'=>$this->libelle,
                'prix'=>$this->prix,
                'stock'=>$this->stock,
                "reference"=>$this->Reference,
                "photo"=>$this->photo,
                "Fournisseur"=>FournisseurResource::collection($this->fournisseurs),
                "categorie"=>new FournisseurResource($this->categorie),
            
            
        ];
    }
}
