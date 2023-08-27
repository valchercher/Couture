<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Categorie;
use App\Models\Fournisseur;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\ArticleFournisseur;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\ArticleRequest;
use App\Http\Resources\ArticleResource;
use App\Http\Resources\ArticleCollection;
use App\Http\Resources\CategorieResource;
use Symfony\Component\HttpFoundation\Response;

class ArticleController extends Controller
{   
    public function all(){
        $categorie=Categorie::all();
        $fournisseur=Fournisseur::all();
        return response()->json([
            "message"=>"",
          "data"=>[
            "categorie"=> $categorie,
            "fournisseur"=>$fournisseur
          ]
        ]);
        
    }
    public function AllArticle(){
        $articles = Article::with('fournisseurs', 'categorie')->paginate(3);

        return response()->json([
            "message"=>"",
            "data"=>[
                $articles
            ]
        ]);
    }

    public function createArticle(ArticleRequest $request)
    {
        return DB::transaction(function () use ($request){
            $libelleCateg=Categorie::categorieById($request->categorie)->first()->libelle;      
            $count=Article::articleCountByCateg($request->categorie)->count();
            $article=new Article([
            "libelle"=>$request->libelle,
            "prix"=>$request->prix,
            "stock"=>$request->stock,
            "categorie_id"=>$request->categorie,
            "photo"=>base64_encode($request->photo),
            "reference"=>"REF_".strtoupper(str::substr($request->libelle,3))."_".strtoupper($libelleCateg)."_".$count+1
        ]);
            $article->save();
            $fournisseur=$article->fournisseurs()->attach($request->fournisseurs);
            return response()->json([
                "status"=>200,
                "message"=>"les données sont insérées avec succès",
                "data"=>[
                    "article"=>$article,
                    "fournisseur"=>$fournisseur
                ]
            ]);
        });
    }
    public function update(Request $request,$id)
    {
        $updatearticle=Article::find($id);
        if(!$updatearticle)
        {
        return [
            "message"=>"l'article n'existe pas",
        ];
        }else{
            $data=[
                "libelle"=>$request->input('libelle'),
                "prix"=>$request->input('prix'),
                "stock"=>$request->input('stock'),
                "categorie_id"=>$request->input('categorie'),
            ];
            $updatearticle->update($data);
        $updateArticleFournisseur=$updatearticle->fournisseurs()->sync($request->input('fournisseurs'));
        return response()->json([
            "status"=>Response::HTTP_OK,
            "message"=>"mise en jour avec succès",
        ]);
        }
    }






































    // public function index(){
    //     $article= Article::paginate(4);
    //     return ArticleResource::collection($article);
    // }
    // public function store(ArticleRequest $request)
    // {
    //     $idfournisseur=[];
    //     foreach(explode(',',$request->fournisseur) as $fou){
    //         $fournisseur=Fournisseur::where('libelle',$fou)->first();
    //         $idfournisseur[]=$fournisseur->id;
    //     }
       
    //     $article=new Article();
    //     $article->libelle=$request->libelle;
    //     $article->prix=$request->prix;
    //     $article->stock=$request->stock;
    //     // $imageName =time().'.'.$request->photo->extension();
    //     $destination='public/images';
    //     $image=$request->file('photo');
    //     //  $image_name=$image->getClientOriginalName();
    //     // $path=$request->file('photo')->storeAs($destination,$image);
    //     $base64Image = base64_encode($request->photo);
    //     $article->photo=$base64Image;
    //     $idCategorie=Categorie::where('libelle',$request->categorie)->first();
    //     $count=Article::where('categorie_id',$idCategorie->id)->count();
    //     $article->categorie_id=$idCategorie->id;
    //     $cat=Str::limit($request->categorie, 3,'');
    //     $num=$count+1;
    //     $article->Reference="REF_".strtoupper($request->libelle)."_".strtoupper($cat)."_".$num;
    //     $article->save();
    //     foreach($idfournisseur as $idf){
    //     $articlefournisseur= new ArticleFournisseur();
    //     $articlefournisseur->article_id=$article->id;
    //     $articlefournisseur->fournisseur_id=$idf;
    //     $articlefournisseur->save();
    //   }  
    //     return response()->json([
    //         "status"=>Response::HTTP_OK,
    //         "message"=>"Les données sont inséres avec succès",
    //         "data"=>$article,$articlefournisseur
    //     ]);
    // }
    // public function AlllArticleCategorieFournisseur()
    // {
    //     $categorie=Categorie::all();
    //     $fournisseur=Fournisseur::all();
    //     $article=Article::orderBy('created_at','desc')->get();
    //     return response()->json([
    //        "data"=> ["categorie"=>CategorieResource::collection($categorie),
    //         "fournisseur"=>CategorieResource::collection($fournisseur),
    //         "article"=>ArticleResource::collection($article),]
    //     ]);
    // }
    // public function editer(Request $request,$id)
    // { 
    //     $updateArticle=Article::find($id);
    //     if($updateArticle){
    //         $idCategorie=Categorie::where('libelle',$request->categorie)->first();
    //         $count=Article::where('categorie_id',$idCategorie->id)->count();
    //         $cat=Str::limit($request->categorie, 3,'');
    //         $num=$count+1;
    //         $Reference="REF_".strtoupper($request->libelle)."_".strtoupper($cat)."_".$num;
    //         $updateArticle->update([
    //             "libelle"=>$request->has('libelle') ? $request->libelle:$updateArticle->libelle,
    //             "prix"=>$request->has('prix') ? $request->prix:$updateArticle->prix,
    //             "stock"=>$request->has('stock') ? $request->stock:$updateArticle->stock,
    //             "categorie_id"=>$request->has('categorie') ? $idCategorie->id:$updateArticle->categorie_id,
    //             "reference"=>$request->has('categorie','libelle') ? $Reference :$updateArticle->reference,
    //         ]);
    //         $idFournisseur=Fournisseur::where('libelle',$request->fournisseur)->first()->id;
    //         $articleFournisseur=ArticleFournisseur::where('article_id',$id)->update([
    //             "fournisseur_id"=>$request->has('fournisseur')? $idFournisseur : $articleFournisseur->fournisseur_id
    //         ]);
    //         return response()->json([
    //             "status"=>200,
    //             "message"=>"Mise en jours avec succès",
    //         ]);
    //     }     
    // }
    // public function supprimer(Request $request,$idArticle){
    //     $articleSupp=Article::find($idArticle);
    //     if($articleSupp){
    //         $articleSupp->delete();
    //         return response()->json([
    //             "status"=>Response::HTTP_OK,
    //             "message"=>"Suppression avec succès",
    //         ]);

    //     }

    // }
    // public function articleFournisseur(Request $request,$idArticle)
    // {
    //     $articleFourn=DB::table('article_fournisseurs')
    //                         ->join('articles','article_fournisseurs.article_id','=','articles.id')
    //                         ->join('fournisseurs','article_fournisseurs.fournisseur_id','=','fournisseurs.id')
    //                         ->where('articles.id','=',$idArticle)->get();
    //    return $articleFourn;                     
    // }
}