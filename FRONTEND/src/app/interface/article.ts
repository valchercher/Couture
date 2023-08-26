import { Categorie } from "./categorie"
import { Fournisseur } from "./fournisseur"

export interface Article {

}

export interface Response<T>{
    data:T
}
export interface All{
    categorie:Categorie[]
    fournisseur:Fournisseur[]
}