import React from 'react'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/';


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    tablecell_default: {
        color: 'gray'
    },
    tablecell_important: {
        color: 'red',
        fontSize: 54,
        fontWeight: 'bolder'
    }
});
  

export default function ItemTable(props) {
    const classes = useStyles();
    const itemNo = props.itemNo;
    var itemList = props.itemList;
    if (itemList === null) {
      itemList = []
    }

    var item = itemList[itemNo]

    if (item === undefined) {
        item = {
            'name': 'name',
            'importance': 'importance',
            'rarity': '-',
            'description': 'description'
        }
    }

    return (
      <div>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableBody>
                    <TableRow key={`name-${item.name}`}>
                        <TableCell component="th" scope="row" className={classes.tablecell_default}>
                            名前
                        </TableCell>
                        <TableCell align="right" className={classes.tablecell_default}>
                            {item.name}
                        </TableCell>
                    </TableRow>
                    <TableRow key={`imp-${item.importance}`}>
                        <TableCell component="th" scope="row" className={classes.tablecell_default}>
                            重要度
                        </TableCell>
                        <TableCell align="right" className={(String(item.importance).indexOf('S') > -1) ? classes.tablecell_important : classes.tablecell_default}>
                            {item.importance}
                        </TableCell>
                    </TableRow>
                    <TableRow key={`rarity-${item.rarity}`}>
                        <TableCell component="th" scope="row" className={classes.tablecell_default}>
                            レア度
                        </TableCell>
                        <TableCell align="right" className={classes.tablecell_default}>
                            {item.rarity}
                        </TableCell>
                    </TableRow>
                    <TableRow key={`desc-${item.description}`}>
                        <TableCell component="th" scope="row" className={classes.tablecell_default}>
                            説明
                        </TableCell>
                        <TableCell align="right" className={classes.tablecell_default}>
                            {item.description}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
      </div>
    );
}
