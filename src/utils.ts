import { IGenre } from "./apis/movie";

export function makeImagePath(id: string, format?:string){
    return `https://image.tmdb.org/t/p/${format?format:"original"}/${id}`;
}

export function getGenres(genreId:number, genres?: IGenre[]){
    if(!genres) return;
    return genres.find((element)=>element.id===genreId)?.name;
}
