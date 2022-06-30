const SMALL_FONT_STYLE = { fontSize: '2.3em' }
const BIG_FONT_STYLE = { fontSize: '11.2em' }

export const BingoNumber = (props) => {
    const value = props.value || '';
    const size = props.size || 'small';
    const skeleton = props.isHit ? '' : '-skeletion';

    const fontStyle = ((value, size) => {
        if (100 > value) {
            return {}
        }

        if ('small' === size) {
            return SMALL_FONT_STYLE
        }

        if ('big' === size) {
            return BIG_FONT_STYLE
        }
    })(value, size)

    return (
        <div className={`circle ${size} purple${skeleton}`}>
            <div className={`char-${size} style=${fontStyle}`}>
                {value}
            </div>
        </div>
    );
}
