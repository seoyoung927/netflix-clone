import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getGenres, getTv, getPopular, getTopRated, IGetTvResult, IGetTVGenresResult } from "../apis/tv";
import { PathMatch, useMatch } from "react-router-dom";
import { AnimatePresence, useScroll } from "framer-motion";
import { useRecoilValue } from "recoil";
import { dataTypeState } from "../recoil/type";
import styled from "styled-components";
import Banner from "../components/Banner";
import Slider from "../components/Slider";
import Modal from "../components/Modal";

const Container = styled.div`
    background-color: ${(props) => props.theme.black.veryDark};
`;
const Loader = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const SliderWrapper = styled.div`
    position: relative;
    top: -80px;
    @media all and (max-width: 768px){
        //브라우저 창 width가 768px보다 작아지는 순간부터 적용
        //모바일
        top: -160px;
    }
    /* top: -104px;
    @media all and (max-width: 768px){
        //브라우저 창 width가 768px보다 작아지는 순간부터 적용
        //모바일
        top: -184px;
    } */
`;
const SliderTitle = styled.h1`
    font-size: 16px;
    font-weight: 600;
    padding-left: 64px;
    margin-top: 32px;
    margin-bottom: 16px;
    @media all and (max-width: 768px){
        //브라우저 창 width가 768px보다 작아지는 순간부터 적용
        //모바일
        padding-left: 32px;
    }
`;

function Tv() {
    //data
    const { data, isLoading: IsData } = useQuery<IGetTvResult>(["Tv", "nowPlaying"], getTv);
    const { data: popular, isLoading: IsPopular } = useQuery<IGetTvResult>(["Tv", "Popular"], getPopular);
    const { data: topRated, isLoading: IsTopRated } = useQuery<IGetTvResult>(["Tv", "TopRated"], getTopRated);
    const { data: genres, isLoading: IsGenres} = useQuery<IGetTVGenresResult>(["Tv","genres"],getGenres);
    const [isLoading, setIsLoading] = useState(true);
    const [offset, setOffset] = useState(window.outerWidth < 768 ? 3 : 6);
    useEffect(() => {
        window.addEventListener('resize', () => {
            if (window.outerWidth < 768) {
                setOffset(3);
            } else {
                setOffset(6);
            }
        });
        setIsLoading(false);
    }, []);
    const tvPathMatch: PathMatch<string> | null = useMatch(`${process.env.PUBLIC_URL}/tv/:tvId`);
    const clickedTv = data?.results.find(tv => tv.id.toString() === tvPathMatch?.params.tvId);
    const clickedPopular = popular?.results.find(tv => tv.id.toString() === tvPathMatch?.params.tvId);
    const clickedTopRated = topRated?.results.find(tv => tv.id.toString() === tvPathMatch?.params.tvId);
    const {scrollY} = useScroll();
    //recoil
    const dataType = useRecoilValue(dataTypeState);

    return <Container>{isLoading&&IsData&&IsPopular&&IsTopRated ? <Loader>Loading...</Loader> : <>
        <Banner
            title={data?.results[0].name} 
            overview={data?.results[0].overview}
            backdrop_path={data?.results[0].backdrop_path}
        />
        <SliderWrapper>
            <SliderTitle>현재 상영중인 TV</SliderTitle>
            <Slider data={data} genres={genres} offset={offset} dataType="now"/>
            <SliderTitle>인기 TV</SliderTitle>
            <Slider data={popular} genres={genres} offset={offset} dataType="popular"/>
            <SliderTitle>평점 좋은 작품</SliderTitle>
            <Slider data={topRated} genres={genres} offset={offset} dataType="top"/>

        </SliderWrapper>
        <AnimatePresence>
            {tvPathMatch && <Modal
                movieId={tvPathMatch?.params.tvId}
                clickedMovie={dataType==="now" ? clickedTv : dataType==="popular" ? clickedPopular : clickedTopRated}
                YPosition={scrollY.get()}
                dataType={dataType}
                />}
        </AnimatePresence>
    </>}</Container>;
}

export default Tv;
