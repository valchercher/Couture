import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { EnumValue } from 'src/app/enum/enum-value';
import { All, Response } from 'src/app/interface/article';
import { ArticleVenteRequest, ArticleVenteResponse, Confection, ResponseVente } from 'src/app/interface/vente';

@Component({
  selector: 'app-listerv',
  templateUrl: './listerv.component.html',
  styleUrls: ['./listerv.component.css']
})
export class ListervComponent implements OnInit {
@Input('dataVente') Response:Response<All> =<Response<All>>{}
@Input('dataPginate') ResponsePaginate:Response<ArticleVenteResponse> =<Response<ArticleVenteResponse>>{}
@Output('dataUpdate') dataUpdate=new EventEmitter<ResponseVente>();
@Output('dataDelete') dataDelete:EventEmitter<ResponseVente> =new EventEmitter<ResponseVente>()
@Output('numberPage') numberPage=new EventEmitter<PageEvent>();
@Output('searchLibelle') searchLibelle=new EventEmitter<string>();
pageIndex!:number;
pageSize?:number;
length?:number;
itemsPerPage?:number
currentPage?:number;
total!:number
couleurASC:string="";
couleurDESC:string="";
tabArtVente:ResponseVente[]=[]
search:string="";
ordre:string="";
constructor(private fb:FormBuilder){

}
ngOnInit(): void {
  this.getPanite();
  console.log(this.search);
  
}

  UpdateVente(event:ResponseVente){
    this.dataUpdate.emit(event); 
  }
  DeleteVente(event:ResponseVente){
    this.dataDelete.emit(event);
  }
  getPanite(){
  }
  onChangePage(event:number){
    if(this.ResponsePaginate.data.pagination){
      this.total=this.ResponsePaginate.data.pagination.total
      this.itemsPerPage=this.ResponsePaginate?.data.pagination?.per_page;
    }
    // this.numberPage.emit(event);
  }
   getServerData(event:PageEvent){
     this.length=this.ResponsePaginate.data.pagination.total 
    this.numberPage.emit(event);
    console.log(event);  
  }
  ascendante(){  
    this.ordre=EnumValue.ASC; 
  }
  descendante(){
    this.ordre=EnumValue.DESC
  }
  searchLibelleArtVente(event:Event){
    console.log(this.search);
    
    const input=event.target as HTMLInputElement;
    if(input.value.length>=3){
      this.tabArtVente=this.ResponsePaginate.data.articleVente.filter(vente=>vente.libelle.toLowerCase().includes(input.value.toLowerCase()));
      console.log(this.tabArtVente);
      
    }
  }
  trierParOrdreASC=(AS:boolean)=>{
    const valeur=(a:ResponseVente,b:ResponseVente)=>AS ? a.quantitestock - b.quantitestock : b.quantitestock - a.quantitestock; 
     const resultats=this.ResponsePaginate.data.articleVente.sort(valeur);
     return resultats;
     
      
    
    // const des=(a:any,b:any)=>b.quantitestock -a.quantitestock;
    // const tab=this.ResponsePaginate.data.articleVente.sort(des) 
    // console.log(tab);
    
  }
}
