import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { All, Response, Vente } from 'src/app/interface/article';
import { ArticleVenteRequest, ArticleVenteResponse, Confection, ResponseVente } from 'src/app/interface/vente';

@Component({
  selector: '#app-itemv',
  templateUrl: './itemv.component.html',
  styleUrls: ['./itemv.component.css']
})
export class ItemvComponent implements OnInit{
@Input('dataVenteLister') Response:Response<All> =<Response<All>>{}
@Input('dataItem') vente!:ResponseVente;
@Output('dataUpdate') dataUpdate=new EventEmitter<ResponseVente>();
@Output('dataDelete') dataDelte:EventEmitter<ResponseVente> = new EventEmitter<ResponseVente>()
@Input('dataPginate') ResponsePaginate:Response<ArticleVenteResponse> =<Response<ArticleVenteResponse>>{}
@Input("dataConf") dataConf:Confection[]=[]

ngOnInit(): void {}
updateArticle(event:ResponseVente){
  this.dataUpdate.emit(event);
}
supprimerArticle(event:ResponseVente){
  this.dataDelte.emit(event);
}
getPaginate(){

}

}
