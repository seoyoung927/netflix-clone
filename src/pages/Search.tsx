import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSearch, IResult } from "../apis/search";
import { useRecoilValue } from "recoil";
import { currentPageState } from "../recoil/searchPagination";
import Card from "../components/Card";
import styled from "styled-components";
import PageNumberBar from "../components/PageNumberBar";

const Container = styled.div`
    position: absolute;
    top: 120px;
    background-color: ${(props) => props.theme.black.veryDark};
`;
const CardWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;
const Wrapper = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    
`

function Search() {
    const params = useParams();
    const [result, setResult] = useState<IResult[]>([]);
    //pagination
    const [totalLength, setTotalLength] = useState(0); 
    const currentPage = useRecoilValue(currentPageState);
    const perPage = 10;

    useEffect(() => {
        const initial = async () => {
            const keyword = params.keyword;
            if (keyword) {
                const res = await getSearch(keyword,1);
                setResult(res.results);
                setTotalLength(res.total_results);
            }
            return [];
        }
        initial();
    }, [params]);

    useEffect(()=>{
        const getResult = async () => {
            const keyword = params.keyword;
            const page = (currentPage-1)/2+1;
            const offset = (currentPage-1)%2*10;
            if (keyword) {
                const res = await getSearch(keyword,page);
                if(offset===0){
                    setResult(res.results.slice(0,10));
                }else{
                    setResult(res.results.slice(offset,20));
                }
            }
            return ;
        }
        getResult();
    },[currentPage]);

    return <Container>
        <CardWrapper>
            {result?.map((r, index) => <Card key={index} data={r} />)}
        </CardWrapper>
        <Wrapper>
            <PageNumberBar perPage={perPage} resultLength={totalLength}/>
        </Wrapper>    
    </Container>;
}

export default Search;
