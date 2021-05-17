import React from 'react'

import BingoNumber from './BingoNumber.jsx'

import ArrayExtention from '../utils/ArrayExtention.js'

export default class BingoNumbers extends React.Component {
    _showBingoNumbers({min, max, hitNumbers}) {
        return ArrayExtention
            .range(min, max)
            .map(number => {
                const isHit = hitNumbers.some(hitNumber => hitNumber === number)
                return <BingoNumber value={number} key={number} isHit={isHit} />
            })
    }

    render() {
        return (
            <div className="results">
                {this._showBingoNumbers(this.props)}
            </div>
        )
    }
}