const API_KEY=process.env.REACT_APP_API_KEY;
const BASE_PATH="https://api.themoviedb.org/3";

export interface ITv {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title?: string;
    name?: string;
    overview: string;
    genre_ids: number[];
    first_air_date?: string;
    release_date?: string;
    vote_average: number;
}
export interface IGetTvResult{
    page: number;
    results: ITv[],
    total_page: number,
    total_result: number,
}
export function getTv(){
    return fetch(`${BASE_PATH}/tv/on_the_air?language=ko&api_key=${API_KEY}`).then(
        (response)=>response.json()
    );
}
export function getPopular(){
    return fetch(`${BASE_PATH}/tv/popular?language=ko&api_key=${API_KEY}`).then(
        (response)=>response.json()
    );
}
export function getTopRated(){
    return fetch(`${BASE_PATH}/tv/top_rated?language=ko&api_key=${API_KEY}`).then(
        (response)=>response.json()
    );
}

export interface IGenre{
    id: number;
    name: string;
}
export interface IGetTVGenresResult{
    genres: IGenre[];
}
export function getGenres(){
    return fetch(`${BASE_PATH}/genre/tv/list?language=ko&api_key=${API_KEY}`).then(
        (response)=>response.json()
    );
}

