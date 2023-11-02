import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup,FormControl, FormBuilder } from '@angular/forms';
import { Article, Fournisseur } from '../interface-article';

@Component({
  selector: 'app-liste',
  templateUrl:'./liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent implements OnInit {
@Input() listerArticle!:FormGroup
@Input() dataArticle:Article[]=[]
@Input() itemArticle!:FormGroup
@Input() page?:number;
@Input() itemsPerPage?:number;

@Input() currentPage?:number; 
@Input() totalItems?:number; 
@Output() receiveDataEditer=new EventEmitter<Article>();
@Output() Articlesupprimer= new EventEmitter<number>();
public ArticleListe?:Article[]
constructor(private formBuilder:FormBuilder){}
ngOnInit(){
  this.listerArticler();
  this.listerArticle = this.formBuilder.group({
  });
  
}
listerArticler(){
  console.log(this.dataArticle);
  this.ArticleListe=this.dataArticle
 
}
receiveEditer(event:Article){
  console.log(event);
  this.receiveDataEditer.emit(event);
  
}
suppressionArticle(id?:number){
  console.log(id);
  this.Articlesupprimer.emit(id);
}


}
