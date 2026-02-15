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
    const [itemCount, setCount] = useState(data.length);
    const [searchKeyword, setSearchKeyword] = useState("");

    // Update items when hitNumbers changes (new item sealed by roulette)
    useEffect(() => {
        // Reset search and show all items when hitNumbers changes
        setSearchKeyword("");
        setItems(data);
        setCount(data.length);
    }, [data]);

    const filterList = (e) => {
        const keyword = e.target.value;
        setSearchKeyword(keyword);
        
        // If search box is empty, show all items
        if (keyword === "") {
            setItems(data);
            setCount(data.length);
            return;
        }
        
        // Otherwise, filter by keyword
        const updateList = data.filter((item) => {
            return item.toLowerCase().search(keyword.toLowerCase()) !== -1;
        });
        const count = (!!updateList) ? updateList.length : 0;
        setItems(updateList);
        setCount(count);
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
                <FixedSizeList height={400} width={300} itemSize={itemSize} itemCount={itemCount} itemData={items}>
                    {renderRow}
                </FixedSizeList>
            </CustomBox>
        </div>
    );
}

export default RestrictedItems;
