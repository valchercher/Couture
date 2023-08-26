<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use Illuminate\Http\Request;
use App\Http\Requests\CategorieRequest;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class CategorieController extends Controller
{
    public function store(CategorieRequest $request){
      $cat= new Categorie();
      $cat->libelle=$request->libelle;
      $cat->type=$request->type;
      $cat->save();
       return response()->json([
        "status"=>Response::HTTP_OK,
        "message"=>"les données sont insereés avec succès",
        "data"=>$cat
       ]);
    }
    public function afficheCategorie(){
        $libele=Categorie::paginate(5);
        if($libele->isEmpty()){
            return response()->json([
                "status"=>Response::HTTP_NOT_FOUND,
                "message"=>"Ce table n'a de  donner",
            ]);
        }
        return response()->json([
            "status"=>Response::HTTP_OK,
            "message"=>"",
            "data"=>$libele,
        ]);
    }
    public function rechercher($libelle){
        $libele=Categorie::categorieByLibelle($libelle)->first();
        if(!$libele){
            
            return response()->json([
                "status"=>Response::HTTP_NOT_FOUND,
                "message"=>"",
            ]);
        }
        return response()->json([
            "status"=>Response::HTTP_OK,
            "message"=>"Ce libelle existe",
            "data"=>$libele,
        ]);
    }
    public function edit(Request $request,$id){
        $libel=Categorie::find($id);
       
        if(!$libel){
            return response()->json([
                "status"=>Response::HTTP_NOT_FOUND,
                "message"=>"cette libelle n'existe pas !",
            ]);
        }
        $libel->update(['libelle'=>$request->libelle,"type"=>$request->type]);
        return response()->json([
            "status"=>Response::HTTP_OK,
            "message"=>" libelle mise en jour",
        ]);
    }
    public function supprimer(Request $request)
    {
        $ids = $request->id;
        
    if (!empty($ids) && is_array($ids)) {
        foreach($ids as $id){

            Categorie::whereIn('id',[$id])->delete();
        }
        return response()->json(['message' => 'Catégories supprimées avec succès']);
    }

        return response()->json(['error' => 'Ids non valides'], 400);
    }
        
       
}
