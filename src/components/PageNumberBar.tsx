import { useEffect, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useRecoilState } from "recoil";
import { currentPageState } from "../recoil/searchPagination";
import styled from "styled-components";

const PageBar = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0);
    button{
        background-color: rgba(0,0,0,0);
        color: ${props => props.theme.white.lighter};
        font-size: 16px;
        padding: 4px;
        width: 28px;
        height: 28px;
        border: 0px;
        border-radius: 100%;
        margin: 0px 2px;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover{
            background-color: rgba(200,200,200,0.5);
        }
        cursor: pointer;
    }
    .selected{
        background-color: rgba(200,200,200,0.5);
    }
`;

interface IPageNumberBar{
    perPage: number;
    resultLength: number;
}
function PageNumberBar({perPage,resultLength}:IPageNumberBar) {
    const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
    const [pageEnd, setPageEnd] = useState<number>(10);
    useEffect(()=>{
        if((currentPage/10)*perPage<resultLength){
            setPageEnd(Math.ceil((resultLength-(Math.floor(currentPage/10)*perPage))/10));
        }else{
            setPageEnd(Math.ceil(resultLength/perPage));
        }
    },[resultLength]);

    return (<PageBar>
        {Math.ceil(currentPage/10) !== 1 &&
            <button onClick={() => {setCurrentPage(cur=>cur-1);}}>
                <BiChevronLeft size={12} />
            </button>}

        {[...Array(pageEnd)].map((i, index) => index+1===currentPage ? 
            <button onClick={() => setCurrentPage(Math.floor(currentPage/10)* 10 + index + 1)} className="selected" key={index}>
                {Math.floor(currentPage/10)* 10 + index + 1}
            </button>:
            <button onClick={() => setCurrentPage(Math.floor(currentPage/10)* 10 + index + 1)} key={index}>
                {Math.floor(currentPage/10)* 10 + index + 1}
            </button>)}
            
        {(Math.ceil(currentPage/10)) * perPage <= resultLength &&
            <button style={{ display: "none" }}>
                <BiChevronRight size={12} />
            </button>}
    </PageBar>);
}

export default PageNumberBar;
