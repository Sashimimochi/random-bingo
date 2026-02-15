import './App.css';
import { createTheme, ThemeProvider } from '@mui/material';
import { blue, red } from '@mui/material/colors';
import BingoNumbers from './components/BingoNumbers';
import RestrictedItems from './components/RestrictedItems';
import { ConfigArea, validateMin, validateMax } from './components/ConfigArea';
import { useState } from 'react';
import { ClearButton, LotteryButton } from './components/Buttons';
import HeaderItems from './components/Header';
import HitItemDetails from './components/ItemDetails';
import { BingoNumber } from './components/BingoNumber';

const myTheme = createTheme({
  typography: {
    fontFamily: [
      "Noto Sans JP",
      "Lato",
      "游ゴシック Medium",
      "游ゴシック体",
      "Yu Gothic Medium",
      "YuGothic",
      "ヒラギノ角ゴ ProN",
      "Hiragino Kaku Gothic ProN",
      "メイリオ",
      "Meiryo",
      "ＭＳ Ｐゴシック",
      "MS PGothic",
      "sans-serif",
    ].join(","),
    fontSize: 20,
  },
  palette: {
    primary: blue,
    secondary: red,
  },
});


const initData = (from, to) => {
  const ar = []
  for (let i = from; i <= to; i++) {
    ar.push({ "id": i, "name": `No:${i}`, "importance": "A", "rarity": "S", "description": `${i}` })
  }
  return ar
}


function App() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(9);
  const [resetMin, setResetMin] = useState(min);
  const [resetMax, setResetMax] = useState(max);
  const [excelData, setExcelData] = useState(initData(min, max));
  const [maxSize, setMaxSize] = useState((excelData) ? excelData.length : max);
  const [open, setOpen] = useState(false);
  const [currentNumbers, setCurrentNumbers] = useState([<BingoNumber key={0} size="big" isHit={true} value={0} />]);
  const [reel, setReel] = useState(false);
  const [hitNumbers, setHitNumbers] = useState([]);
  const [reSettingMinError, setReSettingMinError] = useState("");
  const [reSettingMaxError, setReSettingMaxError] = useState("");
  const [drawCount, setDrawCount] = useState(1);

  const saveAndRestartConfigArea = (data, hitNumbers) => {
    const newMin = data !== undefined ? data[0].id : resetMin
    const newMax = data !== undefined ? data.slice(-1)[0].id : resetMax

    if (!(validateMin(newMin, setReSettingMinError) && validateMax(newMin, newMax, setReSettingMaxError))) {
      return
    }
    const newData = data !== undefined ? data : initData(newMin, newMax);
    const newHitNumbers = hitNumbers !== undefined ? hitNumbers : []

    setMin(newMin);
    setMax(newMax);
    resetAll(newHitNumbers);
    setOpen(false);
    setExcelData(newData);
    setMaxSize(newData.length);
  }

  const resetMinValue = (e) => {
    const resetMin = e.target.value
    setResetMin(Number(resetMin));
    if (!validateMin(resetMin, setReSettingMinError)) {
      return
    }
    setReSettingMinError("")
  }

  const resetMaxValue = (e) => {
    const resetMax = e.target.value
    setResetMax(Number(resetMax));
    if (!validateMax(resetMin, resetMax, setReSettingMaxError)) {
      return
    }
    setReSettingMaxError("")
  }

  const resetAll = (hitNumbers) => {
    const newHitNumbers = hitNumbers !== undefined ? hitNumbers : []
    const shouldReset = window.confirm("抽選結果をすべてクリアしてよろしいですか？")
    if (shouldReset) {
      setHitNumbers(newHitNumbers);
      setCurrentNumbers([<BingoNumber key={0} size="big" isHit={true} value={0} />]);
    }
  }

  return (
    <div className="App">
      <ThemeProvider theme={myTheme}>
        <HeaderItems openMenu={setOpen} open={open} />
        <ConfigArea
          min={min}
          max={max}
          reSettingMinError={reSettingMinError}
          reSettingMaxError={reSettingMaxError}
          resetMinValue={resetMinValue}
          resetMaxValue={resetMaxValue}
          open={open}
          saveAndRestartConfigArea={saveAndRestartConfigArea}
          closeConfigArea={setOpen}
          data={excelData}
          hitNumbers={hitNumbers}
        />
        <ClearButton
          resetAll={resetAll}
        />
        <LotteryButton
          min={min}
          max={max}
          setCurrentNumbers={setCurrentNumbers}
          reel={reel}
          setReel={setReel}
          hitNumbers={hitNumbers}
          setHitNumbers={setHitNumbers}
          drawCount={drawCount}
          setDrawCount={setDrawCount}
        />
        <HitItemDetails
          currentNumbers={currentNumbers}
          hitSize={hitNumbers.length}
          maxSize={maxSize}
          hitNumbers={hitNumbers}
          itemList={excelData}
        />
        <BingoNumbers
          min={min}
          max={max}
          hitNumbers={hitNumbers}
        />
        <RestrictedItems
          data={excelData}
          hitNumbers={hitNumbers}
        />
      </ThemeProvider>
    </div>
  );
}

export default App;
