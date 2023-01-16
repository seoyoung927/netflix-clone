import { motion } from "framer-motion";
import styled from "styled-components";
import { getGenres } from "../utils";

const InfoWrapper = styled(motion.div)`
background-color: ${(props) => props.theme.black.lighter};
position: absolute;
width: 100%;
height: 100px;
bottom: -100px;
overflow: hidden;
border-bottom-right-radius: 15px;
border-bottom-left-radius: 15px;
display: none;
padding: 8px;
opacity: 0;
h4{
    font-size: 14px;
    font-weight: 500;
    font-weight: 600;
}
.spanWrapper{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-bottom: 2px;
}
span{
    font-size: 12px;
    padding-right: 4px;
    .highlight{
        font-weight: 600;
    }
}
`;

const infoVariants = {
    hover: {
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "tween",
            delay: 0.4,
        }
    }
}

interface IGenre{
    id: number;
    name: string;
}
interface IInfo{
    id: number;
    title?: string;
    release_date?: string;
    vote_average: number;
    genre_ids: number[];
    genres?: IGenre[];
}
function Info({title,release_date,genre_ids,vote_average,genres}:IInfo){
    return <InfoWrapper variants={infoVariants}>
    <h4>{title}</h4>
    <div className="spanWrapper" style={{ paddingBottom: "4px" }}>
        {release_date && <span>{release_date.slice(0, 4)}</span>}
    </div>
    <div className="spanWrapper">
        {genre_ids.toString().split(",").slice(0, 3).map((i) =>
            <span key={i} className="highlight">
                {getGenres(Number(i), genres)}
            </span>)}
    </div>
    <div>
        {title && title.length <= 13 ? <div className="spanWrapper">
            <span>평점:{(vote_average / 2).toFixed(1)}</span>
        </div> : null}
    </div>
    </InfoWrapper>;
}

export default Info;
