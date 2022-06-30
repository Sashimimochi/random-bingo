import { Box, FormControl, ListItem, ListItemText, styled, TextField, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import { useState } from "react";
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
    const data = hitNumbers.map(i => {
        return (!!props.data && props.data.length >= i) ? props.data[i - 1].name : `No.${i}`;
    });
    const itemSize = 46;
    const initItemCount = (!!hitNumbers) ? hitNumbers.length : 200;

    const [items, setItems] = useState(data);
    const [itemCount, setCount] = useState(initItemCount);

    const filterList = (e) => {
        const updateList = data.filter((item) => {
            return item.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
        });
        const count = (!!updateList) ? updateList.length : 200
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
                        <TextField id="standard-basic" label="検索キーワード" onChange={filterList} />
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
