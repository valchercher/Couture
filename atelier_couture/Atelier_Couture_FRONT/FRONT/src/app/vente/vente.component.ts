import { Component, OnInit } from '@angular/core';
import { VenteserviseService } from './venteservise.service';
import { All, Response } from '../interface/article';

@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.css']
})
export class VenteComponent implements OnInit {
  constructor(private venteService:VenteserviseService){}
  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.venteService.getAll().subscribe({
      next:(response:Response<All>)=>{
        console.log(response);
        
      }
    });
  }
}
