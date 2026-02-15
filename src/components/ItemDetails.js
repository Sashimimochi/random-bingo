import { Typography, Box } from '@mui/material';
import ItemTable from './ItemTable';

const HitItemDetails = (props) => {
    const currentNumbers = props.currentNumbers || [];
    const hitNumbers = props.hitNumbers;
    const recentDrawnNumbers = props.recentDrawnNumbers || [];
    const hitSize = props.hitSize;
    const maxSize = props.maxSize;
    const itemList = props.itemList;
    
    // If we have recently drawn numbers, use those. Otherwise, use the last hit number
    const numbersToDisplay = recentDrawnNumbers.length > 0 
        ? recentDrawnNumbers 
        : (hitNumbers.length > 0 ? [hitNumbers.slice(-1)[0]] : []);
    
    return (
        <div className="main">
            <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                justifyContent: 'center', 
                gap: 2,
                marginBottom: 2 
            }}>
                {currentNumbers}
            </Box>
            <br />
            <div className="restricted-percentage">
                <Typography variant="subtitle2" component="h6">
                    封印率: {hitSize} / {maxSize} ({(hitSize / maxSize * 100).toFixed(2)}%)
                </Typography>
            </div>
            <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                justifyContent: 'center', 
                gap: 2,
                marginTop: 2 
            }}>
                {numbersToDisplay.map((itemNo, index) => (
                    <ItemTable
                        key={index}
                        itemNo={itemNo}
                        itemList={itemList}
                    />
                ))}
            </Box>
        </div>
    );
}

export default HitItemDetails;
