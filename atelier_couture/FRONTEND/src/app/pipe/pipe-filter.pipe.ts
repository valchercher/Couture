import { Pipe, PipeTransform } from '@angular/core';
import { ResponseVente } from '../interface/vente';

@Pipe({
  name: 'pipeFilter'
})
export class PipeFilterPipe implements PipeTransform {

  transform(value: ResponseVente[],search: string,libelle:string): ResponseVente[]{
    if(!value){
      return [];
    }
    if(!search){
      return value   
    }
    return value.filter(item => {
      if (item && item.libelle) {
        return item.libelle.toLowerCase().includes(search.toLowerCase());
      }
      return false;
    })
  }
}
