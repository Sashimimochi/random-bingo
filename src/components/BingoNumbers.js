import ArrayExtention from '../utils/ArrayExtention.js'
import { BingoNumber } from "./BingoNumber";


function ShowBingoNumbers(props) {
    const hitNumbers = props.hitNumbers;
    const min = props.min;
    const max = props.max;
    return (
        ArrayExtention
            .range(min, max)
            .map(number => {
                const isHit = hitNumbers.some(hitNumber => hitNumber === number)
                return <BingoNumber value={number} key={number} isHit={isHit} />
            })
    );
}

function BingoNumbers(props) {
    return (
        <div className="results">
            <ShowBingoNumbers min={props.min} max={props.max} hitNumbers={props.hitNumbers} />
        </div>
    );
}

export default BingoNumbers;
