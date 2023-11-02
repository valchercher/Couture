import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { VenteServiceService } from '../service/vente-service.service';
import { All, Response, Resultat } from '../interface/article';
import { Categorie } from '../interface/categorie';
import { ArticleVenteRequest, ArticleVenteResponse, ResponseVente } from '../interface/vente';
import { FormvComponent } from './formv/formv.component';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.css']
})
export class VenteComponent implements OnInit{
  Response:Response<All> =<Response<All>>{}
  message:string="";
  idArtVente!:number;
  page:number=1
size:number=3
search:string="";
  ResponsePaginate:Response<ArticleVenteResponse> =<Response<ArticleVenteResponse>>{}
  @ViewChild(FormvComponent,{static:false}) formv =<FormvComponent>{}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  today=new Date();
  constructor(private venteServie:VenteServiceService,private fb:FormBuilder,private dialog: MatDialog){}
  ngOnInit(): void {
    this.getData();  
    this.paginate(this.page,this.size); 
  }
  getData(){
    this.venteServie.getAll().subscribe({
      next:(response:Response<All>)=>{
        this.Response=response       
      }
    })
  }
  paginate(page:number,size?:number){ 
    this.venteServie.paginate(page,size).subscribe({
      next:(value:Response<ArticleVenteResponse>)=> {
        this.ResponsePaginate=value  
        console.log(value);
           
      },
    })
  }
  storeForm(event:ArticleVenteRequest) {
    const confect = this.formv.formulaireVente.get('confections') as FormArray; 
    if(!this.formv.isEditer){
      this.venteServie.store(event).subscribe({
        next:(resp:Response<ArticleVenteResponse>)=>{
          if(resp.status==200){
            this.notification(resp.message)
            this.ResponsePaginate.data.articleVente.unshift(...resp.data.articleVente);
            this.formv.formulaireVente.reset();
            while(confect.length){
              confect.clear()
            }
          }        
        }
      })
    }else{
      this.venteServie.update(event,this.idArtVente).subscribe({
        next:(resp:Response<ArticleVenteResponse>)=>{
          if(resp.status==2001){
            this.notification(resp.message);           
           let existeIndex:number =0
           if (this.ResponsePaginate && this.ResponsePaginate.data) {
            resp.data.articleVente.forEach(elt => {
              existeIndex = this.ResponsePaginate.data.articleVente.findIndex(item => item.id === elt.id);
              if (existeIndex !== -1) {
                this.ResponsePaginate.data.articleVente.splice(existeIndex, 1, elt);
              }
            });
          }
          this.formv.formulaireVente.reset();
          while(confect.length){
            confect.clear()
          }
        }      
        }
      })
    }
  }
  notification(message:string){
    this.formv.message=message
    setTimeout(()=>{
      this.formv.message=""
    },5000) 
  }
  updateArticleVente(event: ResponseVente) {
    console.log(event);
    
    this.formv.formulaireVente.patchValue(event)
    const confectionsArray = this.formv.formulaireVente.get('confections') as FormArray;  
    while (confectionsArray.length) {
      confectionsArray.removeAt(0);
    }
    if(event.valeurPromo!==0){
      this.formv.formulaireVente.get('promo')?.setValue(true);
      this.formv.cacherElement=false
    }else{
      this.formv.formulaireVente.get('promo')?.setValue(false);
      this.formv.cacherElement=true
    }
    event.confections.forEach((ele) => {
      confectionsArray.push(this.formv.form.group({
        libelle: ele.libelle,
        article_id:ele.article_id,
        categorie: ele.categorie,
        quantite:ele.quantite,
        prix:ele.prix
      }));
    });
    this.formv.isEditer=true
    this.idArtVente=event.id; 
  }
  deleteVente(event: ResponseVente) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { message: `Êtes-vous sûr de vouloir supprimer cet article ${event.libelle} ?`}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true){
        this.venteServie.supprimer(event.confections, event.id).subscribe({
          next: (response) => {
            const index = this.ResponsePaginate.data.articleVente.findIndex(item => item.id === event.id);
            if (index !== -1) {
              this.ResponsePaginate.data.articleVente.splice(index, 1);
            }
            this.notification(response.message);
          }
        });
      }
    });
  } 
  numberPage(event:PageEvent){
    this.page=event.pageIndex;
    this.size=event.pageSize;
    this.paginate(event.pageIndex,event.pageSize);
    
  }
  searchLibelle(event:string){
    this.search=event
    this.paginate(this.page,this.size);
  }
}
  

