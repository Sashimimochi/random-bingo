import { Paper, styled, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";

const CustomTable = styled(Table)({
    minWidth: 650
});

const ImportantTableCell = styled(TableCell)({
    color: 'red',
    fontSize: 54,
    fontWeight: 'border'
})
const DefaultTableCell = styled(TableCell)({
    color: 'gray'
})

const importanceCell = (importance) => {
    if (importance.indexOf('S') > -1) {
        return (
            <ImportantTableCell align="right">
                {importance}
            </ImportantTableCell>
        );
    } else {
        return (
            <DefaultTableCell align="right">
                {importance}
            </DefaultTableCell>
        );
    }
}

const ImportanceCell = (props) => {
    const importance = props.importance;
    return (
        <TableRow key={`imp-${importance}`}>
            <DefaultTableCell component="th" scope="row">
                重要度
            </DefaultTableCell>
            {importanceCell(importance)}
        </TableRow>
    );
}

const RarityCell = (props) => {
    const rarity = props.rarity;
    return (
        <TableRow key={`rarity-${rarity}`}>
            <DefaultTableCell component="th" scope="row">
                レア度
            </DefaultTableCell>
            <DefaultTableCell align="right">
                {rarity}
            </DefaultTableCell>
        </TableRow>
    );
}

const NameCell = (props) => {
    const name = props.name;
    return (
        <TableRow key={`name-${name}`}>
            <DefaultTableCell component="th" scope="row">名前</DefaultTableCell>
            <DefaultTableCell align="right">
                {name}
            </DefaultTableCell>
        </TableRow>
    );
}

const DescriptionCell = (props) => {
    const description = props.description;
    return (
        <TableRow key={`desc-${description}`}>
            <DefaultTableCell component="th" scope="row">
                説明
            </DefaultTableCell>
            <DefaultTableCell align="right">
                {description}
            </DefaultTableCell>
        </TableRow>
    );
}

function ItemTable(props) {
    const itemNo = props.itemNo;
    var itemList = props.itemList;
    if (itemList === null) {
        itemList = []
    }

    var item = itemList.filter((item) => {
        return item.id === itemNo
    })[0]

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
                <CustomTable>
                    <TableBody>
                        <NameCell name={item.name} />
                        <ImportanceCell importance={item.importance} />
                        <RarityCell rarity={item.rarity} />
                        <DescriptionCell description={item.description} />
                    </TableBody>
                </CustomTable>
            </TableContainer>
        </div>
    );
}

export default ItemTable;
