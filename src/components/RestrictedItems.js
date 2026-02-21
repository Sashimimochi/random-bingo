import { Box, FormControl, ListItem, ListItemText, styled, TextField, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import { useState, useEffect, useMemo } from "react";
import { FixedSizeList } from "react-window";


const CustomForm = styled(FormControl)({
    width: '100%',
    height: 100,
    maxWidth: 500,
    backgroundColor: 'background.paper'
});

const CustomBox = styled(Box)({
    width: '100%',
    height: 400,
    maxWidth: 300,
    backgroundColor: 'background.paper'
});

function renderRow(props) {
    const { data, index, style } = props;

    return (
        <ListItem button style={style} key={index}>
            <ListItemText primary={`${data[index]}`} />
        </ListItem>
    );
}

renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
};

function RestrictedItems(props) {
    const hitNumbers = props.hitNumbers;
    const data = useMemo(() => {
        return hitNumbers.map(i => {
            return (!!props.data && props.data.length >= i) ? props.data[i - 1].name : `No.${i}`;
        });
    }, [hitNumbers, props.data]);
    const itemSize = 46;

    const [items, setItems] = useState(data);
    const [searchKeyword, setSearchKeyword] = useState("");

    // Update items when hitNumbers or data changes (new item sealed by roulette or data updated)
    useEffect(() => {
        // Reset search and show all items
        setSearchKeyword("");
        setItems(data);
    }, [hitNumbers, data]);

    const filterList = (e) => {
        const keyword = e.target.value;
        setSearchKeyword(keyword);
        
        // If search box is empty, show all items
        if (keyword === "") {
            setItems(data);
            return;
        }
        
        // Otherwise, filter by keyword using case-insensitive substring match
        const keywordLower = keyword.toLowerCase();
        const updateList = data.filter((item) => {
            return item.toLowerCase().includes(keywordLower);
        });
        setItems(updateList);
    }

    return (
        <div className="restricted-list">
            <CustomBox>
                <Typography variant="h5" component="h5">
                    封印リスト
                </Typography>
                <br />
                <div>
                    <CustomForm noValidate autoComplete="off">
                        <TextField 
                            id="standard-basic" 
                            label="検索キーワード" 
                            value={searchKeyword}
                            onChange={filterList} 
                        />
                    </CustomForm>
                </div>
                <FixedSizeList height={400} width={300} itemSize={itemSize} itemCount={items.length} itemData={items}>
                    {renderRow}
                </FixedSizeList>
            </CustomBox>
        </div>
    );
}

export default RestrictedItems;
