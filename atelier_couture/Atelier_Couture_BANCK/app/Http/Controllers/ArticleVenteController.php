<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Categorie;
use Illuminate\Support\Str;
use App\Models\ArticleVente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\ArticleResource;
use App\Http\Resources\CategorieResource;
use App\Http\Requests\ArticleVenteRequest;
use App\Http\Resources\ArticleVenteResource;
class ArticleVenteController extends Controller
{
    public function index($index){
        $ind = (isset($index) && is_numeric($index) && $index > 0) ? $index : 3;
        $articleVente=ArticleVente::paginate($ind);
        return response()->json([
            "message"=>"success",
            "data"=>[
                "articleVente"=>ArticleVenteResource::collection($articleVente),
                "pagination" => [
                    "current_page" => $articleVente->currentPage(),
                    "total" => $articleVente->total(),
                    "per_page" => $articleVente->perPage(),
                    "last_page" => $articleVente->lastPage(),
                ]
            ]
        ]);
    }
    public function  All(){
        $articlevent=ArticleVente::with('articles','categorie')->get();
        $categorie=Categorie::where('type','vente')->get();
        $article=Article::all();
        return response()->json([
            "message"=>"succès",
            "data"=>[
                "articleVente"=>ArticleVenteResource::collection($articlevent),
                "categorie"=>CategorieResource::collection($categorie),
                "article"=>ArticleResource::collection($article)
            ]
        ]);
    }
    public function store(ArticleVenteRequest $request)
    {  
        
        return DB::transaction(function () use ($request) {
            $idArticle=[];
           foreach($request->confections as $confection){
           $idArticle[]=$confection["article_id"];
           }
            $categ=Categorie::where('id',$request->categorie_id)->where('type','vente');
            $count=$categ->count()+1;
            $libelleCateg=$categ->first()->libelle;
            $tabCategMin=["tissu","boutton","fil"];
            if(count($idArticle)>=3){
                $articleExi=Article::whereIn('id',$idArticle);
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
                    $reference="REF_".strtoupper(str::substr($request->libelle,0,3))."_".strtoupper($libelleCateg)."_".$count;
                    $articleVente=new ArticleVente([
                        "libelle"=>$request->libelle,
                        "quantitestock"=>$request->quantitestock,
                        "categorie_id"=>$request->categorie_id,
                        "coutFabrication"=>$request->coutFabrication,
                        "marge"=>$request->marge,
                        "photo"=>$request->photo,
                        "prixVente"=>$request->prixVente,
                        "valeurPromo"=>$request->valeurPromo,
                        "reference"=>$reference,
                    ]);          
                     $articleVente->save();                    
                        $confectionVente= $articleVente->articles()->attach($request->confections);
                    return [
                        "status"=>200,
                        "message"=>"l'article est  inserer avec succes",
                       "data"=>[
                        "articleVente"=>[ArticleVenteResource::make($articleVente)]
                       ]
                    ];
                
              }
                
            }
            return response()->json([
                "status"=>201,
                "message"=>"l'article de vente doit contenir minimun trois articles de confection",
            ]);
        });
    }
    public function edit(Request $request,$id)
    {
     
        $articlevente=ArticleVente::find($id);
        if($articlevente){
            $idArticle=[];
            foreach($request->confections as $confection){
            $idArticle[]=$confection["article_id"];
            }
            $categ=Categorie::where('id',$request->categorie_id)->where('type','vente');
            $count=$categ->count()+1;
            $libelleCateg=$categ->first()->libelle;           
            $reference="REF_".strtoupper(str::substr($request->libelle,0,3))."_".strtoupper($libelleCateg)."_".$count;
            $tabCategMinexist=["tissu","boutton","fil"];
            if(count($idArticle)>=3){
                $articleExiste=Article::whereIn('id',$idArticle)->get();
               
                $idcateg=[];
                foreach($articleExiste as $art){
                   
                   $idcateg[]=Categorie::where('id',$art->categorie_id)->first()->libelle;
                  
                }
                if(array_diff($tabCategMinexist,$idcateg))
                {
                    return response()->json([
                        "status"=>201,
                        "message"=>"l'article de vente doit contenir minimun trois articles de confection tissu,boutton et fil",
                    ]);
                    
                }else{
                    $articlevente->update([
                        "libelle"=>$request->libelle,
                        "categorie_id"=>$request->categorie_id,
                        "quantitestock"=>$request->quantitestock,
                        "photo"=>$request->photo,
                        "coutFabrication"=>$request->coutFabrication,
                        "marge"=>$request->marge,
                        "prixVente"=>$request->prixVente,
                        "reference"=>$reference,
                        "valeurPromo"=>$request->valeurPromo,
                    ]);                   
                    $articlevente->articles()->sync($request->confections);                                 
                    return response()->json([
                        "status"=>2001,
                        "message"=>"mise en jour avec success",
                        "data"=>[
                            "articleVente"=>[ArticleVenteResource::make($articlevente)]
                        ]
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
            $suppart->articles()->detach($request->confections);
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
