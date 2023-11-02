<?php

namespace App\Http\Requests;


use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class ArticleVenteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            "libelle"=>"required|unique:article_ventes,libelle|min:3",
            "categorie_id"=>"required|exists:categories,id",
            "marge"=>"required|numeric|min:5000",
            "confections"=>"required|array|",
            "photo"=>"required"
        ];
    }
    public function  failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            "success"=>false,
            "error"=>true,
            "message"=>"erreur de validation",
            "errorList"=>$validator->errors(),
        ]));
    }
    public function message()
    {
       return [
        "libelle.required"=>"le libelle doit etre requi",
        "libelle.unique"=>"le libelle doit etre unique",
        "categorie.required"=>"categorie doit etre requi",
        "categorie.exists"=>"categorie doit exister",
        "marge.required"=>"marge doit etre requi",
        "marge.min"=>"le marge doit etre au  minimun 5000",
        "article.required"=>"l'article doit etre requi",
        "article.array"=>"l'article doit etre un tableau",
        "article.exists"=>"l'article doit exister",
       ];
    }
}
