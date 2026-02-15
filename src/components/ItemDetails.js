import { Typography, Box } from '@mui/material';
import ItemTable from './ItemTable';

const HitItemDetails = (props) => {
    const currentNumbers = props.currentNumbers || [];
    const hitNumbers = props.hitNumbers;
    const hitSize = props.hitSize;
    const maxSize = props.maxSize;
    const itemList = props.itemList;
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
            <ItemTable
                itemNo={hitNumbers.slice(-1)[0]}
                itemList={itemList}
            />
        </div>
    );
}

export default HitItemDetails;
