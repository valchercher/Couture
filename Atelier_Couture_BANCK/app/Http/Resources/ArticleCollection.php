<?php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class ArticleCollection extends ResourceCollection
{
    public function toArray($request)
    {
        return [
            'data' => $this->collection,
            'pagination' => [
                'current_page' => $this->currentPage,
                'last_page' => $this->lastPage,
                'prev_page_url' => $this->previousPageUrl,
                'next_page_url' => $this->nextPageUrl,
                'total' => $this->total,
            ],
        ];
    }
}
