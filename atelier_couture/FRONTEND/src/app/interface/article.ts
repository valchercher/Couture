import { Categorie } from "./categorie"
import { Fournisseur } from "./fournisseur"

export interface Article {  
    id: number
    libelle: string
    prix: number
    stock: number
    photo: string
    Reference: string
    categorie: Categorie
    fournisseurs: Fournisseur[]
}

export interface Response<T>{
    status:number
    message:string
    data:T
}
export interface Resultat<T>{
  data:T[]
}
export interface Vente{
  id:number
  libelle:string
  quantitestock:number
  article:Article[]
  categorie:Categorie
}
export interface All{
    categorie:Categorie[]
    fournisseur:Fournisseur[]
    articleVente:Vente[]
    article:Article[]
}
export interface Root {
    article: Article[]
  }
  
  export interface Daum {
    id: number
    libelle: string
    prix: number
    stock: number
    reference: string
    photo: string
    fournisseur: Fournisseur[]
    categorie?: Categorie
  }
  

  
//   export interface Fournisseur {
//     id: number
//     libelle: string
//   }
  
  export interface Pivot {
    article_id: number
    fournisseur_id: number
  }
  
export interface objet{
  libelleArticle:string
  quantite:number
}
  export interface Link {
    url?: string
    label: string
    active: boolean
  }
  