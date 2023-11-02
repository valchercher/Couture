
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { All, Article, Daum, Response, Root } from 'src/app/interface/article';
import { Categorie } from 'src/app/interface/categorie';
import { Fournisseur } from 'src/app/interface/fournisseur';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  formulaire!:FormGroup;
 @Input('dataCategorie') ResponseCategorie:Categorie[]=[]
 @Input() ResponseFournisseur:Fournisseur[]=[]
 @Input('dataArticle') ResponseArticle!:Article[]
 searchResults: Fournisseur[]=[];
  selectedFournisseurs: string[] = [];
  searchTerm: string = '';
  selection:boolean=false;
  selectedImage?: File | null ;
  image?:string;
  @Input() isEditer:boolean=false;
  uploadedImageUrl:string  = '../assets/image/Capture d’écran du 2023-03-24 16-38-06.png'; 
constructor(private fb:FormBuilder){
  this.validation();
}
  ngOnInit(): void {
       
  }
  validation(){
    this.formulaire=this.fb.group({
      libelle:[null,[Validators.required,Validators.minLength(4),Validators.pattern('[A-Za-z0-9]*')]],
      prix:[null,[Validators.required,Validators.min(500)]],
      stock:[null,[Validators.required,Validators.min(5)]],
      categorie:[null,Validators.required],
      fournisseur:[[],[]],
      photo:[null,],
      reference:[null,]
    })
  }
  SeachFournisseur()
  {
    this.searchResults=this.ResponseFournisseur.filter((fournisseur:Fournisseur)=>fournisseur.libelle?.toLowerCase().includes(this.formulaire.value.fournisseur.toLowerCase()) && 
    !this.selectedFournisseurs.includes(fournisseur.libelle));
    console.log(this.searchResults);
    console.log(this.ResponseFournisseur);
    
  }
  addSelectedFournisseur(fournisseur: string |undefined) {
    if (fournisseur !== undefined) {
      if(!this.selection==true){
        this.selectedFournisseurs.push(fournisseur);
       this.formulaire.patchValue({fournisseur: ''});      
      }else if(this.selection){
        const indexToRemove = this.selectedFournisseurs.findIndex(item => item === fournisseur);
        console.log(indexToRemove);
        if (indexToRemove !== -1) {
          this.selectedFournisseurs.splice(indexToRemove, 1);
          this.selection=false
        }

        // this.searchResults = [];
        
        this.formulaire.patchValue({fournisseur: ''});
      }
    }
  }      
  updateSearchTerm() {
    return this.selectedFournisseurs;     
  }
  vider(fournisseur:string){
   const item= this.selectedFournisseurs.filter(item=>item!==fournisseur);
   this.selectedFournisseurs=item
   this.selection=false;
   console.log(item);
   console.log(fournisseur);
   
   
    // this.searchResults.push(fournisseur)
  }
  onImageChange(event: any) {
    this.selectedImage = event.target.files[0];  
    console.log(event.target.files);
    if ( event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formulaire.get('file')?.setValue(file);
      this.image=event.target.files[0].name;      
      this.uploadedImageUrl = URL.createObjectURL(file);  
    }  
  }
  uploadImage() {  
    if (this.selectedImage) {
      const formData = new FormData();
      formData.append('photo', this.selectedImage);
    }
  }
  onChangeCategorie() {  
    console.log(this.ResponseArticle);
    console.log(this.formulaire.value.categorie);
    console.log(this.ResponseArticle);
 
    const count: number | undefined = this.ResponseArticle.filter((article: Article) => {
      return article.categorie.libelle === this.formulaire.value.categorie;
    }).length;
    
    if(count!==undefined){
      const nombre=count+1;  
      const reference = "REF_"+this.formulaire.value.libelle.substring(0,3).toUpperCase()+"_"+`${this.formulaire.value.categorie.toUpperCase()}_`+nombre;  
      this.formulaire.patchValue({reference:reference});
    }else{// const count:number|undefined=this.ResponseArticle.filter((article:Article)=>article.categorie===this.formulaire.value.categorie).length;
    if(count!==undefined){
      const nombre=count+1;  
      const reference = "REF_"+this.formulaire.value.libelle.substring(0,3).toUpperCase()+"_"+`${this.formulaire.value.categorie.toUpperCase()}_`+nombre;  
      this.formulaire.patchValue({reference:reference});
    }else{
      console.log(' le nombre n\'est pas definit'); 
    }
      console.log(' le nombre n\'est pas definit'); 
    }
  }
}
