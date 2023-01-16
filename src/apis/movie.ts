const API_KEY=process.env.REACT_APP_API_KEY;
const BASE_PATH="https://api.themoviedb.org/3";

export interface IMovie {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title?: string;
    name?: string;
    overview: string;
    genre_ids: number[];
    adult: boolean;
    first_air_date?: string;
    release_date?: string;
    vote_average: number;
}
export interface IGetMoviesResult{
    dates:{
        maximum: string;
        minimum: string;
    };
    page: number;
    results: IMovie[],
    total_page: number,
    total_result: number,
}
export function getMovies(){
    return fetch(`${BASE_PATH}/movie/now_playing?language=ko&api_key=${API_KEY}`).then(
        (response)=>response.json()
    );
}
export function getPopular(){
    return fetch(`${BASE_PATH}/movie/popular?language=ko&api_key=${API_KEY}`).then(
        (response)=>response.json()
    );
}
export function getTopRated(){
    return fetch(`${BASE_PATH}/movie/top_rated?language=ko&api_key=${API_KEY}`).then(
        (response)=>response.json()
    );
}
export function getUpcoming(){
    return fetch(`${BASE_PATH}/movie/upcoming?language=ko&api_key=${API_KEY}`).then(
        (response)=>response.json()
    );
}

export interface IGenre{
    id: number;
    name: string;
}
export interface IGetGenresResult{
    genres: IGenre[];
}
export function getGenres(){
    return fetch(`${BASE_PATH}/genre/movie/list?language=ko&api_key=${API_KEY}`).then(
        (response)=>response.json()
    );
}
