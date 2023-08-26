
import { All, Article, Response } from '../interface/article';
import { Categorie } from '../interface/categorie';
import { Fournisseur } from '../interface/fournisseur';
import { ArticleService } from '../service/article.service';
import { ApiserviceService } from './../../../../Atelier_Couture_FRONT/FRONT/src/app/apiservice.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  ReponseCategorie!:Categorie[] ;
  ReponseFournisseur:Fournisseur[]=[]
  ResponseArticle:Article=[]
constructor(private apiService:ArticleService){}
ngOnInit(): void {
  this.getAll()
}
getAll()
{
  this.apiService.getAll().subscribe({
    next:(response:Response<All>)=>{
      console.log(response);
      this.ReponseCategorie=response.data.categorie;
      this.ReponseFournisseur=response.data.fournisseur
      console.log(this.ReponseFournisseur);          
    }
  })
}
articlePaginate(){
  this.apiService.getarticlePaginate().subscribe({
    next:(resp:Response<Article>)=>{
      console.log(resp);
      this.ResponseArticle=resp.data
      
    }
  })
}
}
