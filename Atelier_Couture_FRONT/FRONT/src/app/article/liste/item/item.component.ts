import { article } from './../../../interface/article';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup,FormControl, FormBuilder } from '@angular/forms';
import { Article } from '../../interface-article';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class ItemComponent implements OnInit {
  @Input() itemArticle!:FormGroup
  @Input() dataArticle?:Article[];
  // @Input() page?:number;
  // @Input() itemsPerPage?:number|undefined;
  @Output() editerData=new EventEmitter<Article>();
  @Output() supprimer =new EventEmitter<number>();
  // @Input() currentPage?:number; 
  // @Input() totalItems?:number; 
  isConfirmationVisible: boolean = false;
  count: number = 3;
  page:number = 1;
  tableSize:number = 3;
  total = 10; 
  countInterval: ReturnType<typeof setInterval>|undefined; 
  constructor(private formBuilder:FormBuilder){
  }
  ngOnInit(): void {
    this.itemArticle = this.formBuilder.group({});
  }
  // onChangePage(pageNumber: number) {
  //   this.currentPage = pageNumber; 
  // }
  onChangePage(event:number){
    this.page=event;
  }
  
  editer(item:Article)
  {
    console.log(item);
    this.editerData.emit(item) 
  }
  supprimerArticle(id?:number){
    console.log(id);
    const article=this.dataArticle?.find(item=>item.id==id);
    if(article){
      article.isConfirmerDelete = true;
      this.countInterval = setInterval(() => {
        this.count--;
        if (this.count === 0) {
          this.confirmerSuppression(article);
        }
        return
      }, 1000);
    }
  }
 confirmerSuppression(article:Article,id?:number) {
    clearInterval(article.countdownInterval);
    article.isConfirmerDelete = false;
    this.count = 3;
    this.supprimer.emit(id);
    
  }

}
