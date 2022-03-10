import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import {FixedSizeList} from 'react-window';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: 400,
        maxWidth: 300,
        backgroundColor: theme.palette.background.paper,
    },
    search: {
        width: '100%',
        height: 100,
        maxWidth: 500,
        backgroundColor: theme.palette.background.paper,
    }
}));

function renderRow(props) {
    const {data, index, style} = props;

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

export default function RestrictedItems(props) {
    const classes = useStyles();
    const hitNumbers = props.hitNumbers;
    const initItemCount = (!!hitNumbers) ? hitNumbers.length : 200;
    const itemSize = 46;
    const init = true;
    const data = hitNumbers.map(i => {
        return (!!props.data && props.data.length >= i) ? props.data[i-1].name : `No.${i}`;
    });

    const [items, setItems] = useState(data);
    const [itemCount, setCount] = useState(initItemCount);

    useEffect(() => {
        if (items.length === 0 || init) {
            setItems(data);
            setCount(initItemCount);
        }
    }, [data, init, initItemCount, items.length]);

    const filterList = (e) => {
        const updateList = data.filter((item) => {
            return item.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
        })
        setItems(updateList);
        const count = (!!updateList) ? updateList.length : 200
        setCount(count);
    }

    return (
        <div className={classes.root}>
            <Typography variamt="h3" component="h3">封印リスト</Typography>
            <br />
            <div>
                <form className={classes.search} noValidate autoComplete="off">
                    <TextField id="standard-basic" label="検索キーワード" onChange={filterList}/>
                </form>
            </div>
            <FixedSizeList height={400} width={300} itemSize={itemSize} itemCount={itemCount} itemData={items}>
                {renderRow}
            </FixedSizeList>
            <br />
        </div>
    );
}
