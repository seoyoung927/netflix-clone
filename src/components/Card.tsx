import { useQuery } from "react-query";
import { getSearchMovie, getSearchTv, IGetSearchMovieResult, IResult } from "../apis/search";
import { makeImagePath } from "../utils";
import styled from "styled-components";

const Container = styled.div`
    width: 240px;
    height: 160px;
    @media all and (max-width: 768px){
        //브라우저 창 width가 768px보다 작아지는 순간부터 적용
        //모바일
        width: 160px;
        height: 120px;
    }
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    background-color: #BCBCBC;
    font-size: 16px;
    margin: 8px;
    h2{
        z-index: 1;
        padding: 4px;
        font-weight: 600;
        font-size: 16px;
    }
`;
const Img = styled.div<{ bgPhoto: string }>`
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url(${(props) => props.bgPhoto});
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
`
interface ICard {
    data: IResult,
}
function Card({ data }: ICard) {
    const { data:movie, isLoading: IsData } = useQuery<IGetSearchMovieResult>(["search","movie",data.id], ()=>getSearchMovie(data?.id));
    const { data:tv, isLoading: IsTv } = useQuery<IGetSearchMovieResult>(["search","tv",data.id], ()=>getSearchTv(data?.id));
    
    return (<Container>
        {movie?.backdrop_path && <Img bgPhoto={makeImagePath(movie?.backdrop_path)} />}
        {tv?.backdrop_path && <Img bgPhoto={makeImagePath(tv?.backdrop_path)} />}
        <h2>{data.name}</h2>
    </Container>);
}

export default Card;