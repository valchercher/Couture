<?php

namespace App\Http\Controllers;

use App\Models\Fournisseur;




use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class FournisseurController extends Controller
{
    public function ajouterFournisseur(Request $request)
    {
        $validator=Validator::make($request->all(),[
            "libelle"=>'required|unique:fournisseurs,libelle'
        ]);
        if($validator->fails()){
            return response()->json([
                "status"=>Response::HTTP_NOT_FOUND,
                "message"=>""
            ]);
        }
        $fourn=Fournisseur::create([
            'libelle'=>$request->libelle
        ]);
        return response()->json([
            "status"=>Response::HTTP_OK,
            "message"=>"le fournisseur est inséres avec succès",
            "data"=>$fourn
        ]);

    }
    public function searchFournisseur(Request $request,$fournisseur)
{
    $libelle = $request->input('libelle');

    $fournisseurs = Fournisseur::where('libelle', 'like', '%' . $fournisseur . '%')->get();

    return response()->json([
        "status" => Response::HTTP_OK,
        "message" => "Résultats de la recherche",
        "data" => $fournisseurs
    ]);
}

}
