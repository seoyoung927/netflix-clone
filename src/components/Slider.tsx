import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IGetGenresResult, IGetMoviesResult } from "../apis/movie";
import { IGetTVGenresResult, IGetTvResult } from "../apis/tv";
import { makeImagePath } from "../utils";
import { TiChevronLeftOutline, TiChevronRightOutline } from "react-icons/ti";
import { useSetRecoilState } from "recoil";
import { dataTypeState } from "../recoil/type";
import styled from "styled-components";
import Info from "./Info";

const Container = styled.div`
    width: 100%;
    height: 100%;
    margin-bottom: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 40px;
    @media all and (max-width: 768px){
        //브라우저 창 width가 768px보다 작아지는 순간부터 적용
        //모바일
        padding-left: 8px;
    }
`;
const Row = styled(motion.div)`
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(6,1fr);
    @media all and (max-width: 768px){
        //브라우저 창 width가 768px보다 작아지는 순간부터 적용
        //모바일
        grid-template-columns: repeat(3,1fr);
    }
    width: 100%;
`;
const Box = styled(motion.div)<{ bgPhoto: string }>`
    height: 120px;
    font-size: 16px;
    position: relative;
    background-image: url(${(props) => props.bgPhoto});
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    cursor: pointer;
    &:hover{
        div{
            display: block;
        }
    }
    &:first-child {
        transform-origin: center left;
    }
    &:last-child {
        transform-origin: center right;
    }
`;
const Btn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
    border: 0px;
    border-radius: 100%;
    background-color: rgba(0,0,0,0);
    color: ${(props) => props.theme.white.darker};
    width: 24px;
    height: 24px;
    z-index: 1;
    &:hover{
        background-color: #363636;
        border: 1px solid ${(props) => props.theme.white.darker};
    }
    cursor: pointer;
`;

const rowVariants = {
    hidden: {
        x: 200,
    },
    visible: {
        x: 0,
        transition: {
            duration: 1,
        }
    },
    exit: {
        x: -200,
        transition: {
            duration: 0.1,
        }
    }
}
const boxVariants = {
    normal: {
        scale: 1,
    },
    hover: {
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        zIndex: 1,
        scale: 1.2,
        y: -20,
        transition: {
            duration: 0.1,
            type: "tween",
            delay: 0.4,
        }
    },
}

interface ISlider {
    data?: IGetMoviesResult | IGetTvResult,
    genres?: IGetGenresResult | IGetTVGenresResult,
    offset: number,
    dataType: string,
}

function Slider({ data, genres, offset, dataType }: ISlider) {
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const toggleLeaving = () => setLeaving((prev) => !prev);
    const decreaseIndex = () => {
        if (data) {
            if (leaving) return;
            toggleLeaving();
            let maxIndex: number = Math.floor((data.results.length - 1) / offset);
            setIndex((prev) => prev <= 0 ? maxIndex - 1 : prev - 1);
        }
    }
    const increaseIndex = () => {
        if (data) {
            if (leaving) return;
            toggleLeaving();
            let maxIndex: number = Math.floor((data.results.length - 1) / offset);
            setIndex((prev) => prev >= maxIndex - 1 ? 0 : prev + 1);
        }
    }
    const navigate = useNavigate();
    const setDataType = useSetRecoilState(dataTypeState);
    const onBoxClicked = (Id: number) => {
        setDataType(dataType);
        navigate(`./${Id}`);
    }

    return <>
        <Container>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                <Btn onClick={decreaseIndex}><TiChevronLeftOutline size={16} /></Btn>
                <Row
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ type: "tween", duration: 0.5 }}
                    key={index}>
                    {data?.results.slice(1).slice(offset * index, offset * index + offset).map((movie) =>
                        <AnimatePresence>
                            <Box
                                layoutId={movie.id.toString()+dataType}
                                key={movie.id}
                                variants={boxVariants}
                                initial="normal"
                                whileHover="hover"
                                bgPhoto={movie.backdrop_path ? makeImagePath(movie.backdrop_path) : makeImagePath(movie.poster_path)}
                                transition={{ type: "tween" }}
                                onClick={() => onBoxClicked(movie.id)} >
                                <Info 
                                    id={movie.id}
                                    title={movie.title ? movie.title: movie.name}
                                    release_date={movie?.release_date}
                                    genre_ids={movie?.genre_ids}
                                    vote_average={movie.vote_average}
                                    genres={genres?.genres} /> 
                            </Box>
                        </AnimatePresence>
                    )}
                </Row>
            </AnimatePresence>
            <Btn onClick={increaseIndex}><TiChevronRightOutline size={16} /></Btn>
        </Container>
    </>;
}

export default Slider;
