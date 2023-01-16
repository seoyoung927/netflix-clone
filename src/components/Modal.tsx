import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { IMovie } from "../apis/movie";
import { makeImagePath } from "../utils";
import { ITv } from "../apis/tv";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";

const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.6);
    opacity: 0;
    z-index: 2;
`;
const ModalWrapper = styled(motion.div)`
    position: absolute;
    width: 800px;
    @media all and (max-width: 768px){
        //브라우저 창 width가 768px보다 작아지는 순간부터 적용
        //모바일
        width: 400px;
    }
    @media all and (max-width: 400px){
        //브라우저 창 width가 768px보다 작아지는 순간부터 적용
        //모바일
        width: 320px;
    }
    @media all and (max-width: 280px){
        //브라우저 창 width가 768px보다 작아지는 순간부터 적용
        //모바일
        width: 280px;
    }
    left: 0;
    right: 0;
    margin: auto;
    overflow: hidden;
    background-color: ${(props) => props.theme.black.lighter};
    z-index: 2;
`;
const Cover = styled.div`
    width: 100%;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    background-size: cover;
    background-position: center center;
    height: 400px;
    position: relative;
`;
const Title = styled.h3<{length:number}>`
    color: ${(props) => props.theme.white.lighter};
    text-align: center;
    padding: 20px;
    font-size: 32px;
    font-weight: 600;
    position: relative;
    top: ${(props)=>props.length > 13 ? "-120px" : "-60px"};
`;
const Overview = styled.p<{length:number}>`
    padding: 20px;
    color: ${(props) => props.theme.white.lighter};
    position: relative;
    top: ${(props)=>props.length > 13 ? "-120px" : "-80px"};
`;
const Btn = styled.button`
    position: absolute;
    right: 16px;
    top: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    border: 0px;
    border-radius: 100%;
    background-color: rgba(200,200,200,0.5);
    &:hover{
        border: 1px solid grey;
    }
    cursor: pointer;
`;


interface IModal {
    movieId?: string;
    clickedMovie?: IMovie | ITv;
    YPosition: number;
    dataType: string;
}

function Modal({ movieId, clickedMovie, YPosition, dataType }: IModal) {
    const navigate = useNavigate();
    const onOverlayClick = () => {
        navigate(-1);
    }

    return <>
        <Overlay onClick={onOverlayClick}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}></Overlay>
        <ModalWrapper
            style={{ top: YPosition + 100, borderRadius: "15px" }}
            exit={{ opacity: 0 }}
            layoutId={movieId + dataType}
        >
            {clickedMovie && (
                <>
                    <Cover
                        style={{
                            backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                                clickedMovie.backdrop_path,
                                "w500"
                            )})`
                        }}>
                        <Btn onClick={() => onOverlayClick()}><AiOutlineClose size={16} /></Btn>
                    </Cover>
                    <Title length={clickedMovie?.title ? clickedMovie?.title.length : clickedMovie?.name ? clickedMovie?.name.length : 0}>
                        {clickedMovie?.title ? clickedMovie?.title : clickedMovie?.name}</Title>
                    <Overview length={clickedMovie?.title ? clickedMovie?.title.length : clickedMovie?.name ? clickedMovie?.name.length : 0}>{clickedMovie?.overview ? clickedMovie?.overview : "서비스 준비 중 ..."}</Overview>
                </>
            )}
        </ModalWrapper>
    </>;
}

export default Modal;
