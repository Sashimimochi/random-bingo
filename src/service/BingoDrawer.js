import ArrayExtention from '../utils/ArrayExtention.js'

export default class BingoDrawer {
    constructor(props) {
        this.bingoNumbers = this._createBingoNumbers(props)
    }

    draw() {
        const stockNumbers = Object.keys(this.bingoNumbers)
        if (0 === stockNumbers.length) {
            return
        }

        const drawIndex = stockNumbers[Math.floor(Math.random() * stockNumbers.length)]
        const drawNumber = this.bingoNumbers[drawIndex]

        delete this.bingoNumbers[drawIndex]

        return drawNumber
    }

    delete(drawIndexs) {
        drawIndexs.forEach(drawIndex => {
            delete this.bingoNumbers[drawIndex]
        })
    }

    _createBingoNumbers({min, max}) {
        const bingoNumbers = {}
        ArrayExtention
            .range(min, max)
            .forEach(number => bingoNumbers[number] = number)
        return bingoNumbers
    }
}