import { Component, OnInit, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiCategorieService } from '../categorie/api-categorie.service';
import { ArticleserviceService } from './articleservice.service';
import { Response,All,Categorie,Fournisseur,Article, supprimer } from './interface-article';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-article',
  templateUrl:'./article.component.html', 
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit{
  formulaire!:FormGroup;
  listerArticle!:FormGroup;
  pagination!:FormGroup
  listerItems!:FormGroup;
  listers!:object;
  public dataCategorie?:Categorie[];
  public dataFournisseur?:Fournisseur[];
  public dataArticle:Article[]=[];
  public reponse!: Response<All> ;
  public message:string|undefined;
  public editerArticle!:Article;
  isEditer:boolean=false;
  idEdit?:number
  file!:File|string
  uploadedImageUrl?:string|undefined =''
  public currentPage:number = 1;
  itemsPerPage:number = 3;
  totalItems = 10;
  page=1 
  constructor(private formBuilder:FormBuilder,private apiArticle:ArticleserviceService){}
  ngOnInit(){
    this.getDataAll()
  console.log(this.recevoirDataEditer);    
  }
  // =============recupreation d'Article ,Categorie et Fournisseur==================================
  getDataAll(){ 
    this.apiArticle.getAll().subscribe((response:Response<All>)=>{
      this.reponse=response
      this.dataCategorie=response.data.categorie
        this.dataArticle=response.data.article
        this.dataFournisseur=response.data.fournisseur
    })
  }
  // ======================== Ajouter et Modifier un Article ======================================
  receiveData(data: Article) {
   if(!this.isEditer){
     this.apiArticle.createArticle(data)
       .subscribe(response => {
         console.log('Données sont envoyées  avec succès :', response);
         this.notification(response?.message)
       });
       return 
   }
    this.apiArticle.editArticle(data,this.idEdit).subscribe({
      next:(reponse)=>{
        console.log("mise en jour avec success",reponse);
        this.notification(reponse?.message)     
      }
    })
  }
  handlePageChange(page:number) {
    this.currentPage = page;
  }
  // ====================message de notifiaction===========================================
  notification(message:string|undefined){
    this.message=message
    setTimeout(()=>{
      this.message=""
    },5000)
    console.log(this.message);  
  }
  // =========================Recuperation des données à modifier=====================================
  recevoirDataEditer(event:Article,forme:FormComponent)
  {
    this.editerArticle=event;
    forme.formulaire.patchValue(event)
    // forme.uploadedImageUrl=event.photo;
    forme.formulaire.patchValue({photo:event.photo})
    
    forme.isEditer=true
    console.log(this.isEditer);
    this.idEdit=event.id
  }
  // ==============================Article a Supprimer=====================================
  idAsupprimer(id?:number)
  {
    this.apiArticle.supprimerArticle(id).subscribe({
      next:(reponse:supprimer)=>{

        console.log(reponse);
      }
      
    })
    
  }
}
