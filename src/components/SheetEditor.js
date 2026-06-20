import { useEffect, useState } from "react";
import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const columns = ["id", "name", "importance", "rarity", "description"];

const createEmptyRow = (id) => ({
    id,
    name: `No:${id}`,
    importance: "A",
    rarity: "S",
    description: `${id}`,
});

const normalizeRow = (row, index) => ({
    id: Number(row.id) || index + 1,
    name: row.name ?? "",
    importance: row.importance ?? "",
    rarity: row.rarity ?? "",
    description: row.description ?? "",
});

const sortRows = (rows) => rows.slice().sort((a, b) => Number(a.id) - Number(b.id));

export const validateSheetRows = (rows) => {
    if (rows.length === 0) {
        window.confirm("[ERROR] 1行以上入力してください。");
        return false;
    }

    const ids = new Set();
    for (const row of rows) {
        if (!Number.isInteger(Number(row.id)) || Number(row.id) < 0) {
            window.confirm("[ERROR] idには0以上の整数を入力してください。");
            return false;
        }
        if (ids.has(Number(row.id))) {
            window.confirm("[ERROR] idが重複しています。");
            return false;
        }
        ids.add(Number(row.id));
        if (row.importance === "") {
            window.confirm("[ERROR] すべての行でimportanceを指定してください。");
            return false;
        }
    }
    return true;
};

export function SheetEditor(props) {
    const { data, hitNumbers, saveAndRestartConfigArea } = props;
    const [rows, setRows] = useState(() => (data ?? []).map(normalizeRow));

    useEffect(() => {
        setRows((data ?? []).map(normalizeRow));
    }, [data]);

    const updateCell = (index, key, value) => {
        setRows((currentRows) => currentRows.map((row, rowIndex) => {
            if (rowIndex !== index) {
                return row;
            }
            return {
                ...row,
                [key]: key === "id" ? Number(value) : value,
            };
        }));
    };

    const addRow = () => {
        const nextId = rows.length === 0 ? 1 : Math.max(...rows.map((row) => Number(row.id) || 0)) + 1;
        setRows((currentRows) => [...currentRows, createEmptyRow(nextId)]);
    };

    const deleteRow = (index) => {
        setRows((currentRows) => currentRows.filter((_, rowIndex) => rowIndex !== index));
    };

    const createNewSheet = () => {
        setRows([createEmptyRow(1), createEmptyRow(2), createEmptyRow(3), createEmptyRow(4), createEmptyRow(5), createEmptyRow(6), createEmptyRow(7), createEmptyRow(8), createEmptyRow(9)]);
    };

    const saveRows = () => {
        const normalizedRows = sortRows(rows.map(normalizeRow));
        if (!validateSheetRows(normalizedRows)) {
            return;
        }
        const availableIds = normalizedRows.map((row) => row.id);
        const filteredHitNumbers = hitNumbers.filter((hitNumber) => availableIds.includes(hitNumber));
        saveAndRestartConfigArea(normalizedRows, filteredHitNumbers);
    };

    return (
        <Box sx={{ marginTop: "4vh", paddingX: 1 }}>
            <Typography variant="h6" component="h2">
                ブラウザでシート編集
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 1 }}>
                Excelがない場合はここで新規作成・編集して保存できます。
            </Typography>
            <Box sx={{ display: "flex", gap: 1, marginBottom: 1 }}>
                <Button variant="outlined" size="small" onClick={createNewSheet}>
                    新規作成
                </Button>
                <Button variant="outlined" size="small" onClick={addRow} startIcon={<AddIcon />}>
                    行を追加
                </Button>
                <Button variant="contained" size="small" onClick={saveRows}>
                    編集を保存
                </Button>
            </Box>
            <TableContainer component={Paper} sx={{ maxHeight: 420 }}>
                <Table stickyHeader size="small">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => <TableCell key={column}>{column}</TableCell>)}
                            <TableCell>削除</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={`${row.id}-${index}`}>
                                {columns.map((column) => (
                                    <TableCell key={column} sx={{ minWidth: column === "description" ? 180 : 90 }}>
                                        <TextField
                                            type={column === "id" ? "number" : "text"}
                                            value={row[column]}
                                            onChange={(e) => updateCell(index, column, e.target.value)}
                                            size="small"
                                            fullWidth
                                            multiline={column === "description"}
                                            inputProps={column === "id" ? { min: 0, step: 1 } : undefined}
                                        />
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <IconButton aria-label="delete row" onClick={() => deleteRow(index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
