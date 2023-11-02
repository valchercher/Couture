<?php

namespace App\Http\Resources;

use App\Models\Categorie;
use Illuminate\Http\Request;
use App\Http\Resources\FormDataVente;
use App\Http\Resources\ArticleResource;
use App\Http\Resources\CategorieResource;
use App\Http\Resources\FournisseurResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleVenteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
        'id'=>$this->id,
        'libelle'=>$this->libelle,
        'quantitestock'=>$this->quantitestock,
        "coutFabrication"=>$this->coutFabrication,
        "prixVente"=>$this->prixVente,
        "marge"=>$this->marge,
        "valeurPromo"=>$this->valeurPromo ,
        "reference"=>$this->reference,
        "photo"=>$this->photo,
        "categorie_id"=>CategorieResource::make($this->categorie),
        "confections"=>FormDataVente::collection($this->articles),
        
        ];
    
    }
}
