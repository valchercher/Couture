<?php

namespace App\Http\Resources;
use App\Models\Article;
use App\Models\Categorie;
use Illuminate\Http\Request;
use App\Http\Resources\CategorieResource;
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
            'data' => $this->collection,
            'pagination' => [
                'current_page' => $this->currentPage(),
                'last_page' => $this->lastPage(),
                'prev_page_url' => $this->previousPageUrl(),
                'next_page_url' => $this->nextPageUrl(),
                'total' => $this->total(),
            ],
        ];
    }
}
