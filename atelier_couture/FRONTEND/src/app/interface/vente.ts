import { Categorie } from "./categorie"

export interface ArticleVenteRequest{
    libelle:string
    categorie_id:number
    quantitestock:number
    coutFabrication:number
    prixVente:number
    marge:number
    valeurPromo?:number
    reference:string
    confections:Confection[]
}
export interface Confection{
    article_id:number
    quantite:number
    libelle?:string
    categorie?:string
    prix:number
}
export interface ArticleVenteResponse{
    articleVente:ResponseVente[]
    pagination:Pagination
}
export interface Pagination {
    current_page:number,
    total:number,
    per_page: number,
    last_page: number
}
export interface ConfectionResponse extends Categorie{
    prix:number
    quantite:number
    categorie:Categorie
    
}
export interface ResponseVente{
    id:number
    libelle:string
    categorie_id:Categorie
    quantitestock:number
    coutFabrication:number
    prixVente:number
    marge:number
    reference:string
    valeurPromo?:number
    confections:Confection[]
}