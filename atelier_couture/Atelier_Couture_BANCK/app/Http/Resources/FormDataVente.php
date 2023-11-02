<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\CategorieResource;
use Illuminate\Http\Resources\Json\JsonResource;

class FormDataVente extends JsonResource
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
            "article_id"=>$this->id,
            "libelle"=>$this->libelle,
            "prix"=>$this->prix,
            "quantite"=>$this->pivot->quantite,
            "categorie"=>$this->categorie->libelle
            ];
    }
}
