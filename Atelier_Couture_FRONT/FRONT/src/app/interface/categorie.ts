export interface categorie{
    currentPage:number,
    tablesize:number,
    tableSizes:number,
    donnee:number[],
}
export interface categorieId{
    id:number,
    libelle:string,
    checked?:boolean
}
export interface Response<T>{
    data:Tab<T>
}
export interface Tab<T>{
    donnee:T[]
    message:string,

}