import { TextField, Drawer, styled } from "@mui/material";
import { SaveButton, CloseButton, DownloadButton } from "./Buttons";
import { UploadForm } from "./ExcelHander";

const CustomDrawer = styled(Drawer)({
    width: 400
})

export const validateMin = (resetMin, setReSettingMinError) => {
    if (resetMin < 0 || isNaN(resetMin)) {
        setReSettingMinError("正数値を入力してください")
        return false
    }
    return true
}

export const validateMax = (resetMin, resetMax, setReSettingMaxError) => {
    if (resetMax < 0 || isNaN(resetMax)) {
        setReSettingMaxError("正数値を入力してください")
        return false
    }
    if (resetMin >= resetMax) {
        setReSettingMaxError("minより大きい値を入力してください")
        return false
    }
    return true
}

export function ConfigArea(props) {
    const min = props.min;
    const max = props.max;
    const reSettingMinError = props.reSettingMinError;
    const reSettingMaxError = props.reSettingMaxError;
    const resetMinValue = props.resetMinValue;
    const resetMaxValue = props.resetMaxValue;
    const open = props.open;
    const saveAndRestartConfigArea = props.saveAndRestartConfigArea;
    const closeConfigArea = props.closeConfigArea;
    const data = props.data;
    const hitNumbers = props.hitNumbers;

    return (
        <CustomDrawer
            variant="persistent"
            anchor="right"
            open={open}
        >
            <TextField
                error={reSettingMinError !== ""}
                label="Min"
                style={{ marginLeft: '1vw' }}
                defaultValue={min}
                name="reSettingMin"
                helperText={reSettingMinError}
                onChange={resetMinValue}
            />
            <TextField
                error={reSettingMaxError !== ""}
                label="Max"
                style={{ marginLeft: '1vw' }}
                defaultValue={max}
                name="reSettingMax"
                helperText={reSettingMaxError}
                onChange={resetMaxValue}
            />
            <SaveButton
                saveAndRestartConfigArea={saveAndRestartConfigArea}
            />
            <CloseButton closeConfigArea={closeConfigArea} />
            <UploadForm
                saveAndRestartConfigArea={saveAndRestartConfigArea}
            />
            <DownloadButton
                data={data}
                hitNumbers={hitNumbers}
            />
        </CustomDrawer>
    );
}
