import { Categorie } from "./categorie"

export interface article{
    libelle:string,
    prix:number,
    stock:number,
    categorie:string,
}
export interface Vente{
    id:number
    libelle:string
    qteStock:number
    categorie:Categorie
}
export interface Response<T>{
    data:T
}
export interface tableaux<t>{
    data:t[],
    message:string
}
export interface All{
categorie:Categorie[]
articlevente:Vente[]
}