<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\FournisseurController;
use App\Http\Controllers\ArticleVenteController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('categorie/ajouter',[CategorieController::class,'store']);
Route::get('categorie/afficher',[CategorieController::class,'afficheCategorie']);
Route::put('categorie/edit/{id}',[CategorieController::class,'edit']);
Route::get('categorie/rechercher/{libelle}',[CategorieController::class,'rechercher']);
Route::post('categorie/supprimer',[CategorieController::class,'supprimer']);
// fournisseur
Route::post('fournisseur/ajouter',[FournisseurController::class,'ajouterFournisseur']);
Route::get('fournisseur/rechercher/{fournisseur}',[FournisseurController::class,'searchFournisseur']);
// Article
Route::post('article/ajouter',[ArticleController::class,'store']);
Route::get('article/afficher',[ArticleController::class,'index']);
// Route::get('article/{categorie}',[ArticleController::class,'countId']);
Route::get('all',[ArticleController::class,'AlllArticleCategorieFournisseur']);
Route::put('article/edit/{id}',[ArticleController::class,'editer']);
Route::Delete('article/supprimer/{id}',[ArticleController::class,'supprimer']);
Route::get('articlefournisseur/{idarticle}',[ArticleController::class,'articleFournisseur']);
// image
Route::post('image',[ImageController::class,'store']);

// ========version wane ===============================================
Route::post('article/add',[ArticleController::class,'createArticle']);
Route::put('article/editer/{id}',[ArticleController::class,"update"]);
Route::get('article/categ/four',[ArticleController::class,'all']);
Route::get('article/allArticle',[ArticleController::class,'AllArticle']);
// ===========================article de confection ==========================================
Route::post('articleVente',[ArticleVenteController::class,'store']);
Route::put('articleVente/edit/{id}',[ArticleVenteController::class,'edit']);
Route::delete('articleVente/supp/{id}',[ArticleVenteController::class,'supprimer']);
Route::get('articleVente/all',[ArticleVenteController::class,'index']);
Route::get('articleVente/search/{libelle}',[ArticleVenteController::class,'recherche']);