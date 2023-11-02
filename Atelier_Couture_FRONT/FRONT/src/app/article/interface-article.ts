
export interface All {
    categorie: Categorie[]
    fournisseur: Fournisseur[]
    article: Article[]
  }
  
  export interface Categorie {
    id: number|string
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
    Fournisseur?:Fournisseur[]
    fournisseur?:string|number[]
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
    status?:number
  }
  export interface supprimer{
    status:number
    messsage:string
  }