
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Response, categorie, categorieId } from '../interface/categorie';
import { environement } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ApiCategorieService {
  constructor(private _http:HttpClient) { 

  }
  getdata(page:number):Observable<Response<categorie>>{
    return this._http.get<Response<categorie>>(environement.urlart+`categorie/afficher?page=${page}`)
  }
  postData(data:any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this._http.post(environement.urlart+'categorie/ajouter', data, httpOptions);
  }
  editData(id:string,data:object,Json:object){
    return this._http.put(environement.urlart+'categorie/edit/'+id,data,Json);
  }
  rechercherData(search:string){
    return this._http.get(environement.urlart+"categorie/rechercher/"+search)
  }
  supprimerData(data:any){
    
    const httpOpt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this._http.post(environement.urlart+'categorie/supprimer', data,httpOpt);
  }
}
