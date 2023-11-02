import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { All, Response } from '../interface/article';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ArticleVenteRequest, ArticleVenteResponse, Confection } from '../interface/vente';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class VenteServiceService extends RestService<Response<All>>{
   uri:string="articleVente"
  constructor(private _http:HttpClient){
    super(_http);
  }
  getAll(){
    return this.all("articleVente/all");
  }
  store(data:ArticleVenteRequest):Observable<Response<ArticleVenteResponse>>{
    return this._http.post<Response<ArticleVenteResponse>>(`${environment.apiUrl}${this.uri}`,data)
  }
  paginate(page:number,taille?:number):Observable<Response<ArticleVenteResponse>>{
    return this._http.get<Response<ArticleVenteResponse>>(`${environment.apiUrl}${this.uri}/paginate/${taille}?page=${page}`)
  }
  update(data:ArticleVenteRequest,id:number):Observable<Response<ArticleVenteResponse>>{
    return this._http.put<Response<ArticleVenteResponse>>(`${environment.apiUrl}${this.uri}/update/${id}`,data);
  }
  supprimer(data:Confection[],id:number):Observable<Response<ArticleVenteResponse>>{
    return this._http.post<Response<ArticleVenteResponse>>(`${environment.apiUrl}${this.uri}/supprimer/${id}`,data);
  }
}
