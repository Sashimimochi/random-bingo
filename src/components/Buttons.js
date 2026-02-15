import { Button, IconButton, styled, TextField, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import RefreshIcon from "@mui/icons-material/Refresh";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import GitHubIcon from '@mui/icons-material/GitHub';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import ClearIcon from '@mui/icons-material/Clear';
import { createBingoNumbers, DrawNumber, Reel } from "./Bingo";
import { useState } from "react";
import { BingoNumber } from "./BingoNumber";
import { handleWriteFile } from "./ExcelHander";

const PrimaryButton = styled(Button)(({ theme }) => ({
    color: "white",
    backgroundColor: theme.palette.primary.light,
    "&:hover": {
        color: theme.palette.primary.light,
        border: `3px solid ${theme.palette.primary.light}`,
        backgroundColor: `rgba(45, 191, 100, 0)`,
    }
}))

const SecondaryButton = styled(Button)(({ theme }) => ({
    color: "white",
    backgroundColor: theme.palette.secondary.light,
    "&:hover": {
        color: theme.palette.secondary.light,
        border: `3px solid ${theme.palette.secondary.light}`,
        backgroundColor: `rgba(45, 191, 100, 0)`,
    }
}))

const SuccessButton = styled(Button)(({ theme }) => ({
    marginTop: "4.0vh",
    color: "white",
    backgroundColor: theme.palette.success.light,
    "&:hover": {
        color: theme.palette.success.light,
        border: `3px solid ${theme.palette.success.light}`,
        backgroundColor: `rgba(45, 191, 100, 0)`,
    }
}))

const InfoButton = styled(Button)(({ theme }) => ({
    marginTop: "4.0vh",
    color: "white",
    backgroundColor: theme.palette.info.light,
    "&:hover": {
        color: theme.palette.info.light,
        border: `3px solid ${theme.palette.info.light}`,
        backgroundColor: `rgba(45, 191, 100, 0)`,
    }
}))

export const SaveButton = (props) => {
    const saveAndRestartConfigArea = props.saveAndRestartConfigArea;
    return (
        <PrimaryButton
            variant="contained"
            style={{ marginTop: "4.0vh" }}
            fullWidth={true}
            onClick={() => saveAndRestartConfigArea()}
            startIcon={<RefreshIcon />}
        >
            save &amp; restart
        </PrimaryButton>
    );
}

export const CloseButton = (props) => {
    const closeConfigArea = props.closeConfigArea;
    return (
        <SecondaryButton
            variant="contained"
            style={{ marginTop: "4.0vh" }}
            fullWidth={true}
            onClick={() => closeConfigArea(false)}
            startIcon={<CloseIcon />}
        >
            close
        </SecondaryButton>
    );
}

export const ApplyButton = (props) => {
    return (
        <SuccessButton
            fullWidth={true}
            onClick={() => console.log("apply")}
            startIcon={<CheckCircleIcon />}
        >
            apply
        </SuccessButton>
    );
}

export const ConfigButton = (props) => {
    const openMenu = props.openMenu;
    const open = props.open;
    return (
        <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={() => openMenu(!open)}
        >
            <MenuIcon fontSize="large" />
        </IconButton>
    )
}

export const ClearButton = (props) => {
    const resetAll = props.resetAll;
    return (
        <SecondaryButton
            variant="contained"
            color="secondary"
            onClick={() => resetAll()}
            startIcon={<ClearIcon />}
        >
            Clear
        </SecondaryButton>
    );
}

const StartButton = styled(Button)(({ theme }) => ({
    color: "white",
    backgroundColor: theme.palette.success.light,
    "&:hover": {
        color: theme.palette.success.light,
        border: `3px solid ${theme.palette.success.light}`,
        backgroundColor: `rgba(45, 191, 100, 0)`,
    }
}))


export const LotteryButton = (props) => {
    const min = props.min;
    const max = props.max;
    const setCurrentNumber = props.setCurrentNumber;
    const reel = props.reel;
    const setReel = props.setReel;
    const hitNumbers = props.hitNumbers;
    const setHitNumbers = props.setHitNumbers;
    const drawCount = props.drawCount;
    const setDrawCount = props.setDrawCount;
    const [timeId, setTimeId] = useState();
    const bingoNumbers = createBingoNumbers(min, max, hitNumbers);
    
    const handleDrawCountChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value > 0) {
            setDrawCount(value);
        }
    };
    
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
            <TextField
                type="number"
                label="抽選数"
                value={drawCount}
                onChange={handleDrawCountChange}
                inputProps={{ min: 1, max: Object.keys(bingoNumbers).length }}
                sx={{ width: '120px' }}
                size="small"
            />
            <StartButton
                onClick={() => {
                    if (Object.keys(bingoNumbers).length === 0) {
                        return
                    }
                    setReel(!reel);
                    if (reel) {
                        clearInterval(timeId);
                        const newHitNumbers = [...hitNumbers];
                        const currentBingoNumbers = createBingoNumbers(min, max, newHitNumbers);
                        const actualDrawCount = Math.min(drawCount, Object.keys(currentBingoNumbers).length);
                        
                        for (let i = 0; i < actualDrawCount; i++) {
                            const updatedBingoNumbers = createBingoNumbers(min, max, newHitNumbers);
                            const hitNumber = DrawNumber(updatedBingoNumbers);
                            if (hitNumber !== undefined) {
                                newHitNumbers.push(hitNumber);
                            }
                        }
                        
                        setHitNumbers(newHitNumbers);
                        if (newHitNumbers.length > hitNumbers.length) {
                            const lastHitNumber = newHitNumbers[newHitNumbers.length - 1];
                            setCurrentNumber(<BingoNumber size="big" isHit={true} value={lastHitNumber} />);
                        }
                        return
                    };
                    Reel(min, max, setCurrentNumber, setTimeId);
                }}
                startIcon={reel ? <StopIcon />: <PlayArrowIcon />}
            >
                {reel ? "stop" : "start"}
            </StartButton>
        </Box>
    );
}

export const UploadButton = (props) => {
    const handleTriggerReadFile = props.handleTriggerReadFile;
    return (
        <SuccessButton
            variant="contained"
            fullWidth={true}
            onClick={() => handleTriggerReadFile()}
            startIcon={<UploadFileIcon />}
        >
            upload
        </SuccessButton>
    );
}

export const DownloadButton = (props) => {
    const data = props.data;
    const hitNumbers = props.hitNumbers;
    return (
        <InfoButton
            variant="contained"
            fullWidth={true}
            onClick={() => handleWriteFile(data, hitNumbers)}
            startIcon={<FileDownloadIcon />}
        >
            download
        </InfoButton>
    );
}

export const GitHubButton = () => {
    return(
        <IconButton
            target="_blank"
            href="https://github.com/Sashimimochi/random-bingo"
        >
            <GitHubIcon />
        </IconButton>
    );
}
