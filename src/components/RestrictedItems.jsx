import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {FixedSizeList} from 'react-window';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: 400,
        maxWidth: 300,
        backgroundColor: theme.palette.background.paper,
    },
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
    const itemCount = (!!hitNumbers) ? hitNumbers.length : 200;
    const itemSize = 46;
    const data = hitNumbers.map(i => {
        return (!!props.data && props.data.length >= i) ? props.data[i-1].name : `No.${i}`;
    });

    return (
        <div className={classes.root}>
            <Typography variamt="h3" component="h3">封印リスト</Typography>
            <br />
            <FixedSizeList height={400} width={300} itemSize={itemSize} itemCount={itemCount} itemData={data}>
                {renderRow}
            </FixedSizeList>
            <br />
        </div>
    );
}