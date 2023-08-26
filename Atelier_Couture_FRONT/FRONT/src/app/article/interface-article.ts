
export interface All {
    categorie: Categorie[]
    fournisseur: Fournisseur[]
    article: Article[]
  }
  
  export interface Categorie {
    id: number
    libelle: string
  }
  
  export interface Fournisseur {
    id: number
    libelle: string
  }
  
  export interface Article {
    id?:number
    message?:string
    libelle: string
    prix: number
    stock: number
    Reference?: string
    categorie?: Categorie
    fournisseur?:string
    photo?:string|undefined
    isConfirmerDelete?: boolean;
    count: number;
    countdownInterval?: any;
  }
  
  export interface Categorie2 {
    id: number
    libelle: string
  }
  export interface Response<T>{
    data:T
    message?:string
  }
  export interface supprimer{
    status:number
    messsage:string
  }