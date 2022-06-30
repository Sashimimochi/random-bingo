import { createRef } from "react";
import { UploadButton } from "./Buttons";
import { read, utils, writeFile } from 'xlsx';

const validateData = (data) => {
    const columns = ["id", "name", "importance", "rarity", "description"]
    if (!!data) {
        const nullCols = columns.filter((col) => {
            return data[0][col] === undefined
        })
        if (nullCols.length > 0) {
            window.confirm(`[ERROR] ${nullCols.join(", ")} カラムがありません。`)
            return false
        }

        const nullImportance = data.filter((row) => {
            return row.importance === undefined
        })
        if (nullImportance.length > 0) {
            window.confirm("[ERROR] すべての行でimportanceを指定してください。")
            return false
        }
        return true
    }
}

const handleReadFile = (fileObj, props) => {
    const saveAndRestartConfigArea = props.saveAndRestartConfigArea;
    if (fileObj) {
        fileObj.arrayBuffer().then((buffer) => {
            const workbook = read(buffer, { type: "buffer", bookVBA: true });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const data = utils.sheet_to_json(worksheet);
            if (!validateData(data)) {
                return
            }
            const hitData = data.filter((d) => {
                return d.hit === 1
            })
            const hitNumbers = hitData.map((d) => {
                return d.id
            })
            saveAndRestartConfigArea(data, hitNumbers);
        })
    }
}

export function UploadForm(props) {
    const saveAndRestartConfigArea = props.saveAndRestartConfigArea;
    const fileInput = createRef();

    const handleTriggerReadFile = () => {
        if (fileInput.current) {
            fileInput.current.click()
        }
    }

    return (
        <div>
            <UploadButton handleTriggerReadFile={handleTriggerReadFile} />
            <form style={{ display: "none" }}>
                <input
                    type="file"
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    ref={fileInput}
                    onChange={(e) => {
                        e.preventDefault()
                        handleReadFile(e.currentTarget.files[0], { "saveAndRestartConfigArea": saveAndRestartConfigArea })
                    }}
                />
            </form>
        </div>
    );
}

export const handleWriteFile = (data, hitNumbers) => {
    var wb = utils.book_new();
    const ws_name = "sheet1"
    const result = data.slice();
    data.forEach((d, index) => {
        const hit = hitNumbers.includes(d.id) ? 1 : 0;
        result[index]["hit"] = hit;
    })
    const ws = utils.json_to_sheet(result)
    utils.book_append_sheet(wb, ws, ws_name);
    writeFile(wb, "out.xlsx");
}
