import { Injectable } from '@angular/core';
import { RestserviseService } from '../service/restservise.service';
import { All, Response } from '../interface/article';

@Injectable({
  providedIn: 'root'
})
export class  VenteserviseService extends RestserviseService<Response<All>> {

 getAll(){
 return this.all("articleVente/all");
 }
}
