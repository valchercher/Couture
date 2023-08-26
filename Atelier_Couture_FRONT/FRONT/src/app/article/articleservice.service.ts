import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environement } from 'src/environments/environment.development';
import { All,Article,Response, supprimer } from './interface-article';
@Injectable({
  providedIn: 'root'
})
export class ArticleserviceService {

  constructor(private _http:HttpClient) { }

  
  getAll():Observable<Response<All>>{
    return  this._http.get<Response<All>>(environement.urlart+'all');
  }
  createArticle(data:Article):Observable<Response<Article>>{
    return this._http.post<Response<Article>>(environement.urlart+'article/ajouter',data,environement.heard)
  }
  editArticle(data:Article,id?:number):Observable<Response<Article>>{
    return this._http.put<Response<Article>>(environement.urlart+'article/edit/'+id,data)
  }
  supprimerArticle(id?:number):Observable<supprimer>{
    return this._http.delete<supprimer>(environement.urlart+'article/supprimer/'+id)
  }
}