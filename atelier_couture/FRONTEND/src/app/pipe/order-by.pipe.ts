import { Pipe, PipeTransform } from '@angular/core';
import { ResponseVente } from '../interface/vente';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: ResponseVente[],sortDirect:string): ResponseVente[] {
   
    let multiple=1;
    if(sortDirect !== "desc" && sortDirect !=="asc"){
      return value;
    }
    if(!value){
      return [];
    }
    if(sortDirect=='desc'){
      multiple= -1
    }
    value.sort((a:ResponseVente,b:ResponseVente)=>{
      if(a.quantitestock < b.quantitestock){
        return -1*multiple;
      }else if(a.quantitestock > b.quantitestock){
        return 1 *multiple;
      }else{
        return 0
      }
    })
    return value;
  }

}
