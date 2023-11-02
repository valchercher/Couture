<?php

namespace App\Http\Requests;

use Illuminate\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class ArticleRequest extends FormRequest
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
            "libelle"=>'required|unique:articles,libelle',
            "prix"=>"required|numeric|min:0",
            "stock"=>"required|numeric|min:0",
            "categorie"=>"required|exists:categories,id",
            "fournisseur" => "required|array",
            "fournisseur.*" => "exists:fournisseurs,id",          
        ];
    }
    public function validatorFonction(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            "success"=>false,
            "error"=>true,
            "message"=>"erreur de validation",
            "errorlist"=>$validator->errors(),
        ]));
    }
    public function message()
    {
       return [
        "libelle.required"=>"libelle doit être requi",
        "libelle.unique"=>"libelle est  unique",
        "prix.required"=>"le prix doit être founi",
        "prix.numeric"=>"le prix doit être un nombre positive",
        "stock.required"=>"le stock doit être founi",
        "stock.numeric"=>"le stock doit être un nombre positive",
        "categorie.required"=>"categorie doit être fourni",
        "categorie.exists"=>"le categorie n'existe pas ",
        "fournisseurs.required"=>"fournisseur doit être fourni",
        "fournisseurs.array"=>"fournisseur est un tableau",
        "fournisseurs.exists"=>"le fournisseur n'existe pas ",
        "photo.required"=>"image doit être requi",
        "photo.mimes"=>"image doit avoir que ces extension jpeg,jpg,png",


       ];
    }
}
