import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formv',
  templateUrl: './formv.component.html',
  styleUrls: ['./formv.component.css']
})
export class FormvComponent  implements OnInit{

  formulaireVente!:FormGroup
  constructor(private form:FormBuilder){}
  ngOnInit(): void {
    this.validation()
  }
  validation(){
    this.formulaireVente=this.form.group({
      libelle:[null,[Validators.required,Validators.minLength(0),Validators.pattern("A-Z,a-z")]],
      categorie:[null,null],
      valeur:[null,''],
      photo:[null,""],
      reference:[null,'']

    })
  }
}
