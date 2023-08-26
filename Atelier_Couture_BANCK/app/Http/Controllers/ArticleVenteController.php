<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Categorie;
use Illuminate\Support\Str;
use App\Models\ArticleVente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\ArticleResource;
use App\Http\Requests\ArticleVenteRequest;

class ArticleVenteController extends Controller
{
    public function  index(){
        $articlevent=ArticleVente::paginate(3);
        return response()->json([
            "message"=>"succès",
            "data"=>$articlevent
        ]);
    }
    public function store(ArticleVenteRequest $request)
    {
        return DB::transaction(function () use ($request) {
            $categ=Categorie::where('id',$request->categorie)->where('type','confection');
            $count=$categ->count()+1;
            $libelleCateg=$categ->first()->libelle;
            $tabCategMin=["tissu","boutton","fil"];
            if(count($request->article)>=3){
                $articleExi=Article::whereIn('id',$request->article);
               $articleExiste=$articleExi->get();
                $idcateg=[];
                $coutFabrication=[];
                $tabquantite=[];
                foreach($articleExiste as $art){
                   
                   $idcateg[]=Categorie::where('id',$art->categorie_id)->first()->libelle;
                  $tabprix[]=$art->prix;
                  $tabquantite[]=$art->stock;
                }
                
              if(array_diff($tabCategMin,$idcateg )){
                  return response()->json([
                      "message"=>"vous ne pouvez pas construire un article de confection qui n'a pas de tissu,boutton et fil",
                    ]);
                }else{
                    
                    foreach($request->article as $index=> $articl){
                        $qant=$request->quantite[$index];
                        $arti=Article::find($articl);
                        $prix=$arti->prix;
                       $qte=$arti->stock;
                       $coutFabrication[]=$prix * $qant;
                       if($qte < $qant){
                        return response()->json([
                            "message"=>"la quantité choisie ne doit pas superieur a la quantite stock",
                            
                        ]);
                       }                    
                    }
                    $cout=array_reduce($coutFabrication, function( $a, $b){
                        return $a+$b;
                    });
                    $prixvente=$cout +$request->marge;
                    $reference="REF_".strtoupper(str::substr($request->libelle,3))."_".strtoupper($libelleCateg)."_".$count;
                    $articleVente=new ArticleVente([
                        "libelle"=>$request->libelle,
                        "quantitestock"=>$request->qteStock,
                        "categorie_id"=>$request->categorie,
                        "coutFabrication"=>$cout,
                        "marge"=>$request->marge,
                        "prixVente"=>$prixvente,
                        "reference"=>$reference,
                    ]);          
                    $articleVente->save();
                    foreach ($request->article as $key=> $articleId) {
                        if(isset($request->quantite[$key])){
                            $quantite = $request->quantite[$key];
                            $confectionVente=$articleVente->articles()->attach($articleId, ['quantite' => $quantite]);             
                        }
                    }
                    return [
                        "articleVente" => $articleVente,
                        "confectionVente" => $articleVente->articles()->find($request->article),
                    ];
                
              }
                
            }
            return response()->json([
                "status"=>201,
                "message"=>"l'article de vente doit contenir minimun trois articles de confection",
            ]);
        });
    }
    public function edit(ArticleVenteRequest $request,$id)
    {
        $articlevente=ArticleVente::find($id);
        if($articlevente){
            $categ=Categorie::where('id',$request->categorie)->where('type','confection');
            $count=$categ->count()+1;
            $libelleCateg=$categ->first()->libelle;           
            $reference="REF_".strtoupper(str::substr($request->libelle,3))."_".strtoupper($libelleCateg)."_".$count;
            $tabCategMinexist=["tissu","boutton","fil"];
            if(count($request->article)>=3){
                $articleExiste=Article::whereIn('id',$request->article)->get();
               
                $idcateg=[];
                foreach($articleExiste as $art){
                   
                   $idcateg[]=Categorie::where('id',$art->categorie_id)->first()->libelle;
                  
                }
                if(array_diff($tabCategMinexist,$idcateg))
                {
                    return response()->json([
                        "status"=>201,
                        "message"=>"l'article de vente doit contenir minimun trois articles de confection",
                    ]);
                    
                }else{
                    $articlevente->update([
                        "libelle"=>$request->libelle,
                        "categorie_id"=>$request->categorie,
                        "coutFabrication"=>$request->cout,
                        "marge"=>$request->marge,
                        "prixVente"=>$request->prixvente,
                        "reference"=>$reference,
                    ]);
                    
                    if(isset($request->quantite[$key])){
                        $quantite = $request->quantite[$key];
                        $confectionVente=$articleVente->articles()->sync($articleId, ['quantite' => $quantite]);             
                    }
                    return response()->json([
                        "article de vente"=>$articlevente,
                        "confection_vente"=>$articlevente->articles()->find($request->article)
                    ]);
                }
               
        }
        return response()->json([
            "message"=>"impossible de mettre en jour cet article ",
        ]);
        }
        return response()->json([
            "message"=>" cet article n'existe pas ",
        ]);
    }
    public function supprimer(Request $request, $id)
    {
        $suppart=ArticleVente::find($id);
        if($suppart)
        {
            $suppart->articles()->detach($request->article);
            $suppart->delete();
            return response()->json([
                "message"=>"suppression avec succès",
            ]);
        }
    }
    public function recherche($libelle)
    {
  
        $articleSearch=ArticleVente::where('libelle','=',$libelle)->first();
        if($articleSearch){
            return response()->json([
                "data"=> $articleSearch,
            ]);
        }else{
            return response()->json([
                "message"=>"libelle n'existe pas" ,
            ]);
        }
    }
}
