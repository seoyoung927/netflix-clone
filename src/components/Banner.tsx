import { makeImagePath } from "../utils";
import styled from "styled-components";

const Container = styled.div<{ bgPhoto: string }>`
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    position: relative;
    height: 100vh;
    padding: 64px;
    padding-bottom: 128px;
    @media all and (max-width: 768px){
        //브라우저 창 width가 768px보다 작아지는 순간부터 적용
        //모바일
        padding: 32px;
        padding-bottom: 160px;
    }
    background-image: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.9)), url(${(props) => props.bgPhoto});
    background-size: cover;
    background-position: center;
`;
const Wrapper = styled.div`
    position: absolute;
    /* bottom: 104px;
    @media all and (max-width: 768px){
        //브라우저 창 width가 768px보다 작아지는 순간부터 적용
        //모바일
        bottom: 184px;
    } */
    margin-bottom: 16px;
`;
const Title = styled.h2`
    font-weight: 600;
    font-size: 48px;
    @media all and (max-width: 768px){
        //브라우저 창 width가 768px보다 작아지는 순간부터 적용
        //모바일
        font-size: 24px;
    }
    margin-bottom: 12px;
`;
const Overview = styled.p`
    font-size: 14px;
    width: 80%;
    @media all and (max-width: 768px){
        //브라우저 창 width가 768px보다 작아지는 순간부터 적용
        //모바일
        font-size: 14px;
    }
`;

interface IBanner {
    backdrop_path?: string;
    title?: string;
    overview?: string;
}

function Banner({backdrop_path, title, overview}:IBanner){
    return (<Container bgPhoto={makeImagePath(backdrop_path || "")}>
    <Wrapper>
        <Title>{title}</Title>
        <Overview>{overview}</Overview>
    </Wrapper>
    </Container>);
}

export default Banner;
