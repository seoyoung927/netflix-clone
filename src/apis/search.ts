const API_KEY=process.env.REACT_APP_API_KEY;
const BASE_PATH="https://api.themoviedb.org/3";

export interface IResult{
    id: number;
    name: string;
}
export interface IGetSearchResult{
    page: number,
    results: IResult[],
    total_pages: number;
    total_result: number;
}
export function getSearch(keyword: string, page: number){
    return fetch(`${BASE_PATH}/search/keyword?language=ko&api_key=${API_KEY}&query=${keyword}&page=${page}`).then(
        (response)=>response.json()
    );
}

export interface IGetSearchMovieResult{
    backdrop_path: string|null;
    poster_path: string|null;
    title?: string;
    name?: string;
    overview: string|null;
}
export function getSearchMovie(id: number){
    return fetch(`${BASE_PATH}/movie/${id}?language=ko&api_key=${API_KEY}`).then(
        (response)=>response.json()
    );
}
export interface IGetSearchTvResult{
    backdrop_path: string|null;
    poster_path: string|null;
    title?: string;
    name?: string;
    overview: string|null;
}
export function getSearchTv(id: number){
    return fetch(`${BASE_PATH}/tv/${id}?language=ko&api_key=${API_KEY}`).then(
        (response)=>response.json()
    );
}
