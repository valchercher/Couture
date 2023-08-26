import { Component,OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { ApiCategorieService } from './api-categorie.service';
import { HttpHeaders } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { categorie } from '../interface/categorie';
import { CategEnum } from '../categ-enum';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
//   Donnee!:categorie
//   page:number=1;
//   constructor(private form:ApiCategorieService){}
// ngOnInit(): void {
  
// }

// fetData(){
//   this.form.getdata(this.page).subscribe(response=>{
    
//   })
// }
  donnee:any;
  page:number=1;
  count:number=0;
  tableSize?:number;
  tableSizes?:number;
  btnOk=true;
  inputValue:string="";
  toggleValue:boolean=false;
  isOkActive:boolean=false;
  textColor:string="";
  textColorAjout:string="blue";
  isClickable:string="";
  libelleValue:string='';
  checkedValue:boolean[]=[];
  boutton:boolean=true;
  butt:string="";
  idCategorie:string="";
  messageValue:any;
  message:string=""
  selectValue:boolean=false;
  desactiveSupp:boolean=true;
  IdAsupprimer:number[]=[]
  don!:number;
  messageConfirm:string="";
  notify:any;
  contentText:string=""
  selectedIds: boolean =true;
  selectAllChecked = true;
  selectALL:boolean=true
index!:number
tabIds:number[]=[]
tableauxIds:number[]=[]
tabBool:boolean[]=[]
ischeckAll:number[]=[]
tableaux:number[]=[]
valeurSelect!:string
typeCateg:string[]=["confection","vente"];
  constructor(private _apiservice:ApiCategorieService,private fb:FormBuilder){
  }
 
  ngOnInit(){
   
    
    this.fetData(this.page);
    this.isLibelleExiste()

  }
  fetData(page:number){ 
    this._apiservice.getdata(page).subscribe(response=>{
      this.donnee=response;
      this.tableSize=this.donnee.data.per_page
      this.tableSizes=this.donnee.data.total
      
      console.log(response);
      console.log(this.tableSizes);
      
    })
  }
 onTableDataChange(event:any){
    this.page=event;
    
    // this.selectedIds = [];
    console.log(event);
    
  this.selectAllChecked = false;
    this.fetData(event);
   
  }
  onTableSizeChange(event:any):void{
    this.tableSize=event.target.value;
    this.page=1;
    // this.fetData(this.page);
  }
  // activeok(){
  //   this.isOkActive = this.inputValue.length === 3;
  //   console.log(this.inputValue);
    

  // }
  categorieCreate(dataEnvoi:any){ 
      this._apiservice.postData(dataEnvoi).subscribe(
        response => {
          console.log(response);
          this.notify=response;
        this.notification(this.notify.message)
        this.fetData(this.page)
          console.log('Réponse du serveur:', response);
        },
        error => {
          console.error('Erreur:', error);
        }
      );
    }
    typeCategorie(event :Event){
      const select=event.target as HTMLSelectElement
      const val=select.options[select.selectedIndex].text
      this.valeurSelect=val
      console.log(val);
      

    }
    ajouterCategorie(){
      console.log(this.idCategorie);

      
      let data={
        "libelle":this.inputValue,
        "type":this.valeurSelect
      }
      if(this.toggleValue){
        this.editerCategorie(data);
        this.fetData(this.page)
        this.inputValue=""
        return;     
      }
      this.categorieCreate(data)
      this.fetData(this.page)
      this.inputValue=""
      
    }
    toggleClick(){
      console.log(this.toggleValue);
      this.textColor='';
      this.textColorAjout=""

      if(!this.toggleValue){
        this.boutton=true
        this.textColor = 'red';
        this.isClickable="pointer"

        return
      }
      this.textColorAjout='blue',
      this.isClickable=""
      
    }
    inputFocus(value:string,valeur:string):void{
      this.inputValue=value;
      this.idCategorie=valeur;
      this.isLibelleExiste();
      this.boutton=true
    
      
      
    }

     checkedClick(){
      const ischeck=this.donnee.data.data.filter((cat:any)=>cat.checked);
      console.log(ischeck);
      
      const id=ischeck.map((cat:any)=>cat.id)
      
      this.tableaux=id
      
      if (ischeck.length>0) {
        this.desactiveSupp=false;
      }else{
        this.desactiveSupp=true;
      }
      const filtre=this.donnee.data.data.filter((cat:any)=>!cat.checked);
      if (filtre) {
        this.selectValue=true;
      }
      const taille=this.donnee.data.data.length
      if(this.tableaux.length==taille){
        this.selectValue=false;
        return 
      }
      this.selectValue=true
     }
     
    editerCategorie(data:any){
      
      const httpEdit={
        Headers: new HttpHeaders({'Content-Type':'application/json'})
      }
      this._apiservice.editData(this.idCategorie,data,httpEdit).subscribe(
        response => {
          console.log(response);
          this.notify=response
        this.notification(this.notify.message)
          this.fetData(this.page)
          console.log('Réponse du serveur:', response);
        },
        error => {
          console.error('Erreur:', error);
        }
      );
        
    }
    isLibelleExiste(){
      const specialCharacters = "*=-+$££:$)#";
      const firstChar = this.inputValue.trim()[0];
      
      if (this.inputValue.trim().length < 3 || specialCharacters.includes(firstChar)) {
        this.boutton =true;
        return
      }
      this.boutton= false;
    
      this.message=""
      this._apiservice.rechercherData(this.inputValue).subscribe(response=>{
        console.log('Reponse ',response);
        this.messageValue=response;
        if(this.messageValue.message=="Ce libelle existe"){
          this.boutton=true;
          return
        }
        this.message=this.messageValue.message;
        this.boutton=false;
      },error=>{
        console.error('Erreur',error)
      }
      )
    }
 
  selectionnerAll(){
    
      if (this.selectValue) {
      const mesId =this.donnee.data.data.map((cat:any)=>(cat.checked=this.selectValue))
      const mesIds =this.donnee.data.data.filter((cat:any)=>(cat.checked)).map((cat:any)=>(cat.id))
      console.log(mesIds);
      this.tableaux=mesIds
      
      this.desactiveSupp=false;
      }else{
        this.donnee.data.data.map((cat:any)=>(cat.checked=false))
        this.desactiveSupp=true;
      }
    }
    supprimerLibelle(){
      console.log(this.IdAsupprimer);
      const data={
        'id':this.IdAsupprimer
      }
     console.log(data);
     
      return this._apiservice.supprimerData(data).subscribe(donnee=>{
        console.log("reponse avec succès",donnee);
        this.notify=donnee
        this.notification(this.notify.message)
        this.fetData(this.page)
      },error=>{
        console.error("reponse invalide",error);
        
      });
    }
    notification(message:any){
      this.messageConfirm=message
      setTimeout(()=>{
        this.messageConfirm=""
      },5000)
      console.log(this.messageConfirm);
      
      
    }
   
   
    
}
