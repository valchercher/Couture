import { Categorie } from 'src/app/interface/categorie';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { All, Article, Response ,objet} from 'src/app/interface/article';
import { ArticleVenteRequest, Confection } from 'src/app/interface/vente';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-formv',
  templateUrl: './formv.component.html',
  styleUrls: ['./formv.component.css']
})
export class FormvComponent  implements OnInit{
  itemsValue!: FormArray;
  promotion:boolean=false;
  cacherElement:boolean=true;
  tabReduce:number[]=[];
  selectedArticle: Article[]=[];
   searchArticle:Article[]=[]
  isEditer:boolean=false;
  index!:number
  tabCateg:string[]=[];
  categ:string[]=["tissu","boutton","fil"];
  activeRowIndex: number = -1;
  compte:number=1+this.index;
  count:number=0;
  diff:string[]=[]
@Input("message") message:string="";
@ViewChild('ValeurPromo', { static: false }) valeurPromo!: ElementRef;
@Input('dataCategorie') Response:Response<All> =<Response<All>>{}
@Output('dataStore') dataStore=new EventEmitter<ArticleVenteRequest>()
  formulaireVente!:FormGroup
  messageCategorie:string="";
  constructor(public form:FormBuilder){}
  ngOnInit(): void {
   this.validation();
    
  }
  validation(){
    this.formulaireVente=this.form.group({
      libelle:['',[Validators.required,Validators.minLength(3),Validators.pattern('["A-Za-z0-9 "]*')]],
      categorie_id:[{},[Validators.required]],
      quantitestock:['',[Validators.required,Validators.min(0)]],
      valeurPromo:['',[Validators.min(0),Validators.max(100)]],
      photo:['../assets/image/Capture d’écran du 2023-03-24 16-38-06.png'],
      reference:["REF___",''],
      promo:['',],
      prixVente:[''],
      coutFabrication:[''],
      marge:['',[Validators.required,this.margeValidator]],     
      confections:this.form.array([
        this.createItem()     
      ],this.categorieValidator)
    })
  }
   margeValidator(control: AbstractControl): { [key: string]: boolean} | null {
    const margeValue = control.value;
    const coutValue = control.parent?.get('coutFabrication')?.value;
    if (margeValue && coutValue) {
      const tiersCoutValue = coutValue / 3;
  
      if (margeValue < 5000 || margeValue > tiersCoutValue) {
        return { 'horsMarge': true };
      }
    }
    return null;
  }
  get confections():FormArray {
    return this.formulaireVente.get('confections') as FormArray;
  }
  get photos(){
    return this.formulaireVente.get('photo')?.value
  }
  addItem() {
    this.confections.push(this.createItem());
  }
  createItem(): FormGroup {
    return this.form.group({
      article_id:"",
      libelle: ['',[Validators.required,Validators.pattern('[A-Za-z ]*'),Validators.minLength(3)]],
      categorie:['',],
      prix:"",
      quantite: ['',[Validators.required,Validators.min(5)]],
    });
  }
  categorieValidator: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {  
    const categorie = control?.value;
    categorie.forEach((ele:Confection) => {
      this.tabCateg.push(ele?.categorie!)      
    });
    this.diff=this.compareTableau(this.tabCateg,this.categ);
    if (this.diff.length<=3) {
      this.messageCategorie=`Pour avoir l'article de vente, il vous reste au moins ${this.diff.length} articles de confection des catégories ${this.diff.join(' et ')}.`;
    }
     return null;
  }
  
  deleteItemLine(i:number){
    this.confections.removeAt(i);
  }
  isPromo(){
    if(this.formulaireVente.value.promo==false){  
      this.cacherElement=false
      return
    }
      this.cacherElement=true
  }
  onChangeReference() {
    const valueCateg = this.formulaireVente.get('categorie_id');
    if (this.Response && this.Response.data && this.Response.data.categorie) {
      const reference = "REF_" + this.formulaireVente.value.libelle.substr(0, 3).toUpperCase() + "__";
      this.formulaireVente.patchValue({ reference: reference });
      if (valueCateg && valueCateg.value.libelle) {
        const count = this.Response.data.categorie.filter(article => article.libelle === valueCateg.value.libelle).length;
        const nombre = count + 1;
        const valRef = "REF_" + this.formulaireVente.value.libelle.substr(0, 3).toUpperCase() + "_" + valueCateg.value.libelle.toUpperCase() + "_" + nombre;
        this.formulaireVente.patchValue({ reference: valRef });
      }
    }
  }
  selecteLibelle(i:number,event:Event){
    const input=event.target as HTMLInputElement;
    this.activeRowIndex=i;
    if(input.value.toLowerCase().length>=3){
      const articleSearch=this.formulaireVente.get('confections')?.value; 
      this.searchArticle  =this.Response.data.article?.filter((article:Article)=>article.libelle?.toLowerCase().includes(input?.value.toLowerCase())
         && !this.selectedArticle.includes(article)) !;
    }
  }
  selectArticle(art:Article,i:number){ 
    this.confections.at(i).get('article_id')?.setValue(art?.id);
    this.confections.at(i).get('libelle')?.setValue(art?.libelle);
    this.confections.at(i).get('prix')?.setValue(art?.prix);
    this.confections.at(i).get('categorie')?.setValue(art?.categorie.libelle)
    // this.tabCateg.push(art.categorie.libelle!)
  //  const categFiltre= this.compareTableau(this.tabCateg,this.categ);
  //  if (categFiltre.length >= 2) {
  //   this.messageCategorie = `Pour avoir l'article de vente, il vous reste au moins deux articles de confection des catégories ${categFiltre.join(' et ')}.`;
  // } else if (categFiltre.length === 1) {
  //   this.messageCategorie = `Pour avoir l'article de vente, il vous reste au moins un article de confection de la catégorie ${categFiltre[0]}.`;
  // }else if(categFiltre.length==0){
  //   this.messageCategorie=""
  // } else {
  //   this.messageCategorie = "L'article de confection doit contenir au moins " + categFiltre.join(' et ') + ".";
  // }
  this.selectedArticle.push(art);
  if(this.selectedArticle){
    this.searchArticle=[]
  }
  }
  private  compareTableau(tab1:string[],tab2:string[]) {
    return tab2.filter(element=>!tab1.includes(element));
  }
  addCount(valeur:number,event:Event){
    let inputQte=event.target as HTMLInputElement;
    
    let quantit=this.confections.at(valeur).get('quantite')?.value;
    let prix=this.confections.at(valeur).get('prix')?.value;
     this.count += quantit * prix;
  this.formulaireVente.get('coutFabrication')?.setValue( this.count);
   this.formulaireVente.get('prixVente')?.setValue(
    this.formulaireVente.get('marge')?.value +
    this.formulaireVente.get('coutFabrication')?.value
  );
  }
  addMarge(){
    let marge=this.formulaireVente.get('marge')?.value;
    const value=this.formulaireVente.get('coutFabrication')?.value;
   if(value){ 
    const prixvente=value + +marge;
    this.formulaireVente.get('prixVente')?.setValue(
      this.formulaireVente.get('marge')?.value +
      this.formulaireVente.get('coutFabrication')?.value
    );
   }
  }
  onSubmit(){
  
    const idCateg=this.formulaireVente.get('categorie_id')?.value
    this.formulaireVente.get('categorie_id')?.setValue(idCateg.id)
    const formData=this.formulaireVente.value ;
    console.log(formData);
    
    formData.confections =this.confections.value.map((confect:any)=>{
      return {
        article_id:confect.article_id,
        quantite:confect.quantite
      }
    })
    console.log(formData);
    this.dataStore.emit(formData);
  }
  compareCategorie=function(option:Categorie,valeur:Categorie):boolean{
    return   option && valeur ? option.id === valeur.id : option === valeur
  }
  onChangeImage(event:Event){
    const image=event.target as HTMLInputElement;
    if(image.files && image.files.length>0){
      let reader=new FileReader();   
      reader.onload=()=>{
        const imageBase_64:string = reader.result as string
        this.formulaireVente.get('photo')?.setValue(imageBase_64);
        // console.log(reader.result);
      }
      reader.readAsDataURL(image.files[0]);
     
      
    }
  }
}
