import ArrayExtension from "../utils/ArrayExtention";
import { BingoNumber } from "./BingoNumber"

const Lottery = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const Bingo = (props) => {
    const min = props.min;
    const max = props.max;
    const randomNumber = Lottery(min, max);
    return (
        <BingoNumber size="big" isHit={true} value={randomNumber} />
    );
}

export const Reel = (min, max, setCurrentNumber, setTimeId) => {
    ;
    const timeId = setInterval(() => {
        setCurrentNumber(Bingo({ "min": min, "max": max }))
        setTimeId(timeId);
    }, 85);
}

function initBingoNumbers(min, max) {
    const bingoNumbers = {}
    ArrayExtension
        .range(min, max)
        .forEach(number => bingoNumbers[number] = number)
    return bingoNumbers;
}

export function createBingoNumbers(min, max, hitNumbers) {
    var bingoNumbers = initBingoNumbers(min, max);
    hitNumbers.forEach(hitNumber => {
        delete bingoNumbers[hitNumber]
    })
    return bingoNumbers;
}

export function DrawNumber(bingoNumbers) {
    const stockIndexes = Object.keys(bingoNumbers)
    if (0 === stockIndexes.length) {
        return
    }

    const drawIndex = stockIndexes[Math.floor(Math.random() * stockIndexes.length)];
    return bingoNumbers[drawIndex];
}
