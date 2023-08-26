import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { All, Response } from '../interface/article';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

type NewType = Response<All>;

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends RestService<NewType>{
// constructor(private _http:HttpClient){
//   super(_http);
// }

getAll(){
 return this.all('article/categ/four');
}
getarticlePaginate(){
  return  this.all('article/allArticle')
}
}
