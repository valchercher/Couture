import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { All, Article, Daum, Response, Root } from '../interface/article';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

type NewType = Response<All>;

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends RestService<NewType>{
constructor(private _http:HttpClient){
  super(_http);
}

getAll(){
 return this.all('article/categ/four');
}
getarticlePaginate():Observable<Response<Root>>{
  return   this._http.get<Response<Root>>(environment.apiUrl+"article/allArticle");
}
}
