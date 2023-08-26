
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { All, Article,Response,Categorie, Fournisseur } from '../interface-article';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent  implements OnInit {
@Input() formulaire!:FormGroup;
@Input() editerFormulaire!:FormGroup
@Input() dataCategorie?:Categorie[];
@Input() dataFournisseur?:Fournisseur[] ;
@Input() dataArticle?:Article[] ;
@Input() reponse!: Response<All> ;
@Output() dataSent = new EventEmitter<Article>();
@Input() message:string|undefined;
@Input() editerArticle!:Article;
  choiceFourniseur:Fournisseur[]|undefined;
  valeurSelect:string[]=[];
  reference!:number|null;
  formData?:Article |undefined;
  searchResults: Fournisseur[]|undefined=[];
  selectedFournisseurs: string[] = [];
  searchTerm: string = '';
  isTyping: boolean = false;
  page:number=1;
  fournisseurs:string="";
  count:number=1;
  selectedImage?: File | null ;
  image?:string;
  @Input() isEditer:boolean=false;
  uploadedImageUrl:string  = '../assets/image/WhatsApp Image 2023-07-29 at 23.01.24(1).jpeg'; 
  constructor(private formBuilder: FormBuilder) {} 
  ngOnInit(): void {
    this.createFormulaire()
  }
  createFormulaire(): void {   
    this.formulaire = this.formBuilder.group({
      libelle: ['', [Validators.required, Validators.minLength(3),Validators.pattern('[a-zA-Z ]*')]],
      prix:    ['', [Validators.required, Validators.min(5)]],
      stock:   ['', [Validators.required, Validators.min(0)]],
      categorie: ['', Validators.required], 
      fournisseur: [''],
      reference: [''],
      rechercher: [''],
      image: [''], 
    }) 
  }
  onSubmit(){
    const extension = this.selectedImage?.name.split('.').pop();
    const imageName = `${new Date().getTime()}.${extension}`;
    const articleData: Article = {
      libelle: this.formulaire.value.libelle,
      prix: this.formulaire.value.prix,
      stock: this.formulaire.value.stock,
      fournisseur: this.selectedFournisseurs?.join(),
      categorie: this.formulaire.value.categorie,
      photo:this.uploadedImageUrl,
      count:1
    };
    console.log(this.uploadedImageUrl);
    
    console.log(articleData);
    
    this.dataSent.emit(articleData)
    this.formulaire.patchValue({})
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
      formData.append('image', this.selectedImage);
    }
  }
   onChangeCategorie() {  
    const count:number|undefined=this.dataArticle?.filter(article=>article.categorie===this.formulaire.value.categorie).length;
    if(count!==undefined){
      const nombre=count+1;  
      const reference = "REF_"+this.formulaire.value.libelle.substring(0,3).toUpperCase()+"_"+`${this.formulaire.value.categorie.toUpperCase()}_`+nombre;  
      this.formulaire.patchValue({reference:reference});
    }else{
      console.log(' le nombre n\'est pas definit'); 
    }
    }
    searchFournisseurs() {  
        this.searchResults = this.dataFournisseur?.filter(fournisseur =>
          fournisseur.libelle.toLowerCase().includes(this.formulaire.value.rechercher.toLowerCase()) &&
          !this.selectedFournisseurs.includes(fournisseur.libelle)
        );         
      }    
      addSelectedFournisseur(fournisseur: string) {
        this.selectedFournisseurs.push(fournisseur);
        this.searchResults = [];
        this.formulaire.patchValue({rechercher: ''});
      }      
      updateSearchTerm() {
        return this.selectedFournisseurs.join(',');     
    }
   recupererEditer(){
    console.log(this.editerArticle);
    
   }
   vider(){
console.log("ok");

   }
}
