
import { All, Article, Daum, Response, Root } from '../interface/article';
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
  ResponseArticle:Daum[]=[]
constructor(private apiService:ArticleService){}
ngOnInit(): void {
  this.getAll();
  this.articlePaginate()
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
    next:(resp:Response<Root>)=>{
      console.log(resp);
      console.log(resp.data);
      
      this.ResponseArticle=resp.data.data
      console.log(this.ResponseArticle);
      
    }
  })
}
}
