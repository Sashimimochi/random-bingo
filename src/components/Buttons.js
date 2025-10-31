import { Button, IconButton, styled } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import RefreshIcon from "@mui/icons-material/Refresh";
import CloseIcon from "@mui/icons-material/Close";
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



export const ConfigButton = (props) => {
    const openMenu = props.openMenu;
    return (
        <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={() => openMenu(true)}
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
    const [timeId, setTimeId] = useState();
    const bingoNumbers = createBingoNumbers(min, max, hitNumbers);
    return (
        <StartButton
            onClick={() => {
                if (Object.keys(bingoNumbers).length === 0) {
                    return
                }
                setReel(!reel);
                if (reel) {
                    clearInterval(timeId);
                    const hitNumber = DrawNumber(bingoNumbers);
                    hitNumbers.push(hitNumber);
                    setHitNumbers(hitNumbers);
                    setCurrentNumber(<BingoNumber size="big" isHit={true} value={hitNumber} />)
                    return
                };
                Reel(min, max, setCurrentNumber, setTimeId);
            }}
            startIcon={reel ? <StopIcon />: <PlayArrowIcon />}
        >
            {reel ? "stop" : "start"}
        </StartButton>
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
