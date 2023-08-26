export interface article{
    libelle:string,
    prix:number,
    stock:number,
    categorie:string,
}
export interface Response<T>{
    data:tableaux<T>
}
export interface tableaux<t>{
    data:t[],
    message:string
}