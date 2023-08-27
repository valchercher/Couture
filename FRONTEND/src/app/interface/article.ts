import { Categorie } from "./categorie"
import { Fournisseur } from "./fournisseur"

export interface Article {  
    id: number
    libelle: string
    prix: number
    stock: number
    photo: string
    Reference: string
    categorie: Categorie[]
    fournisseurs: Fournisseur[]
}

export interface Response<T>{
    message:string
    data:T
}
export interface All{
    categorie:Categorie[]
    fournisseur:Fournisseur[]
}
export interface Root {
    data: Daum[]
    links: Link[]
  }
  
  export interface Daum {
    data:Article
  }
  
//   export interface Fournisseur {
//     id: number
//     libelle: string
//   }
  
  export interface Pivot {
    article_id: number
    fournisseur_id: number
  }
  
//   export interface Categorie {
//     id: number
//     libelle: string
//     type: string
//   }
  
  export interface Link {
    url?: string
    label: string
    active: boolean
  }
  