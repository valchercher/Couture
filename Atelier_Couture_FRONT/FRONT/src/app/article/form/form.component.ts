
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
selection:boolean=false;
selectcategorie:string|undefined=""
  choiceFourniseur:Fournisseur[]|undefined;
  valeurSelect:string[]=[];
  reference!:number|null;
  formData?:Article |undefined;
  searchResults: Fournisseur[]=[];
  selectedFournisseurs: Fournisseur[] = [];
  categorieSelectionnee!:Categorie;
  searchTerm: string = '';
  isTyping: boolean = false;
  page:number=1;
  fournisseurs:string="";
  idFournisseurs:number[]=[]
  idCategorie!:any;
  count:number=1;
  selectedImage?: File | null ;
  image?:string;
  @Input() isEditer:boolean=false;
  uploadedImageUrl:string  = '../assets/image/Capture d’écran du 2023-05-17 18-40-07.png'; 
  constructor(private formBuilder: FormBuilder) {} 
  ngOnInit(): void {
    this.createFormulaire()
  }
  createFormulaire(): void {   
    this.formulaire = this.formBuilder.group({
      libelle: ['', [Validators.required, Validators.minLength(3),Validators.pattern('[a-zA-Z ]*')]],
      prix:    ['', [Validators.required, Validators.min(5)]],
      stock:   ['', [Validators.required, Validators.min(0)]],
      categorie: [, Validators.required], 
      fournisseur: [[],[]],
      reference: ['REF___'],
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
      fournisseur: this.idFournisseurs,
      categorie: this.idCategorie,
      photo:this.uploadedImageUrl,
      count:1
    };
    console.log(this.uploadedImageUrl);
    
    console.log(articleData);
    
    this.dataSent.emit(articleData)
    this.formulaire.reset()
    this.selectedFournisseurs=[];
    this.searchResults=[];
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
  
   onChangeCategorie(event?:Event) { 
    const val=event?.target as HTMLSelectElement;
    const valSelct=val.options[val.selectedIndex];
    const hidden=valSelct.querySelector('input[type="hidden"]') as HTMLInputElement;
    this.idCategorie=hidden.value;       
      const reference ="REF_"+this.formulaire.value.libelle.substring(0,3).toUpperCase()+"__"
      this.formulaire.patchValue({reference:reference});
      const categorie=this.formulaire.get('categorie')?.value;      
      if(categorie){
        const count  =this.dataArticle?.filter(article=>article.categorie?.libelle===this.formulaire.get('categorie')?.value).length;
        const nombre=+count! +1;   
        const reference ="REF_"+this.formulaire.value.libelle.substring(0,3).toUpperCase()+"_"+`${this.formulaire.value.categorie.toUpperCase()}_`+nombre; 
        this.formulaire.patchValue({reference:reference});
      }   
  }
    // searchFournisseurs() {  
    //     this.searchResults = this.dataFournisseur?.filter(fournisseur =>
    //       fournisseur.libelle.toLowerCase().includes(this.formulaire.value.rechercher.toLowerCase()) &&
    //       !this.selectedFournisseurs.includes(fournisseur.libelle)
    //     );         
    //   }    
    //   addSelectedFournisseur(fournisseur: string) {
    //     this.selectedFournisseurs.push(fournisseur);
    //     this.searchResults = [];
    //     this.formulaire.patchValue({rechercher: ''});
    //   }      
    //   updateSearchTerm() {
    //     return this.selectedFournisseurs.join(',');     
    // }
    searchFournisseurs()
  {
    this.searchResults  =this.dataFournisseur?.filter((fournisseur:Fournisseur)=>fournisseur.libelle?.toLowerCase().includes(this.formulaire.value.fournisseur.toLowerCase()) && 
    !this.selectedFournisseurs.includes(fournisseur)) !;
    console.log(this.searchResults);
    console.log(this.dataFournisseur);
    
  }
  addSelectedFournisseur(fournisseur:Fournisseur,id:number) {
    if (fournisseur !== undefined) {
      if(!this.selection==true){
        this.selectedFournisseurs.push(fournisseur);
        this.idFournisseurs.push(id);
        const indexToRemove = this.searchResults.indexOf(fournisseur);
        if (indexToRemove !== -1) {
          this.searchResults.splice(indexToRemove, 1);
        }
        console.log(fournisseur);
        
        console.log(this.searchResults);
        
        
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
   recupererEditer(){
    console.log(this.editerArticle);
    
   }
   vider(four:Fournisseur){
    console.log(four);
    this.searchResults.push(four)
    const valeurFourn=this.selectedFournisseurs.indexOf(four);
    if(valeurFourn!==-1){
      this.selectedFournisseurs.splice(valeurFourn,1)
    }
    
console.log("ok");

   }
}
