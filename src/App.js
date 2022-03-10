import React from 'react'

import BingoNumber from './components/BingoNumber.jsx'
import BingoNumbers from './components/BingoNumbers.jsx'
import BingoDrawer from './service/BingoDrawer.js'

import DoButton from './components/DoButton.jsx'
import ConfigButton from './components/ConfigButton.jsx'

import ItemTable from './components/ItemTable.jsx'
import RestrictedItems from './components/RestrictedItems.jsx'
import ExcelHandler from './components/ExcelHandler.jsx'

import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import RefreshIcon from '@material-ui/icons/Refresh';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import ConfigArea from './components/ConfigArea.jsx'
import { blue } from '@material-ui/core/colors'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const BINGO_MIN_NUMBER = 1
const BINGO_MAX_NUMBER = 10

const KEY_CODE_ENTER = 13

const myTheme = createMuiTheme({
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
    primary: blue
  },
});


class BingoGame extends React.Component {
  constructor() {
    super()
    this.state = {
      currentNumber : <BingoNumber size="big" isHit={true} value={0} />,
      nowDrawing: false,
      doButton: <DoButton label="Start" onClick={this.startDrawing.bind(this)} />,
      bingoDrawer: new BingoDrawer({min: BINGO_MIN_NUMBER, max: BINGO_MAX_NUMBER}),
      hitNumbers: [],
      isOpenConfig:  false,
      max: BINGO_MAX_NUMBER,
      min: BINGO_MIN_NUMBER,
      reSettingMax: BINGO_MAX_NUMBER,
      reSettingMin: BINGO_MIN_NUMBER,
      reSettingMaxError: '',
      reSettingMinError: '',
      excelData: null
    }
    this.excelElement = React.createRef();
  }

  componentWillMount() {
    document.body.addEventListener('keydown', this.onEnterKeyDown.bind(this))
    document.body.addEventListener('keyup', this.onEnterKeyUp.bind(this))
  }

  onEnterKeyDown(e) {
    if(KEY_CODE_ENTER === e.keyCode) {
      document.activeElement.blur()
    }
  }

  onEnterKeyUp(e) {
    if(KEY_CODE_ENTER !== e.keyCode) {
      return
    }

    if(this.state.nowDrawing) {
      this.finishDrawing()
    } else {
      this.startDrawing()
    }
  }

  componentDidUpdate() {
    this.setState({doButton: this.state.nowDrawing}) ?
    <DoButton label="Stop" onClick={this.finishDrawing.bind(this)}  /> :
    <DoButton label="Start" onClick={this.startDrawing.bind(this)} />
  }

  isFinished() {
    return this.state.hitNumbers.length >= ((this.state.max - this.state.min) + 1)
  }

  startDrawing() {
    if(this.state.nowDrawing) {
      return
    }

    if(this.isFinished()) {
      return
    }

    this.setState({nowDrawing: setInterval(() => {
      const randomNumber = Math.floor(Math.random() * (this.state.max - this.state.min + 1) + this.state.min)
      this.setState({
        currentNumber: <BingoNumber size="big" isHit={true} value={randomNumber} />
      })
    }, 85)})
  }

  finishDrawing() {
    if(!this.state.nowDrawing) {
      return
    }

    clearInterval(
      this.state.nowDrawing
    )

    const hitNumber = this.state.bingoDrawer.draw()
    const hitNumbers = this.state.hitNumbers
    hitNumbers.push(hitNumber)

    this.setState({
      nowDrawing: false,
      doButton: <DoButton label="Start" onClick={this.startDrawing.bind(this)} />,
      currentNumber: <BingoNumber size="big" isHit={true} value={hitNumber} />,
      hitNumbers
    })
  }

  resetAll() {
    const shouldReset = window.confirm('抽選結果をすべてクリアしてよろしいですか？')
    if(shouldReset) {
      clearInterval(
        this.state.nowDrawing
      )

      this.setState({
        currentNumber: <BingoNumber size="big" isHit={true} value={0} />,
        nowDrawing: false,
        doButton: <DoButton label="Start" onClick={this.startDrawing.bind(this)} />,
        bingoDrawer: new BingoDrawer({min: this.state.min, max: this.state.max}),
        hitNumbers: [],
        reSettingMaxError: '',
        reSettingMinError: ''
      })
    }
  }

  toggleConfigArea() {
    this.setState({ isOpenConfig: !this.state.isOpenConfig })
    const hitNumbers = this.state.hitNumbers
    this.state.bingoDrawer.delete(hitNumbers)
  }

  syncValue(e) {
    const changedState = {}
    changedState[e.target.name] = e.target.value

    this.setState(changedState)
  }

  clearConfigErrorMessage() {
    this.setState({
      reSettingMaxError: '',
      reSettingMinError: ''
    })
  }

  saveConfigAndRestart() {
    this.clearConfigErrorMessage()

    const reSettingMax = +this.state.reSettingMax
    const reSettingMin = +this.state.reSettingMin

    const validateTargets = [
      {
        target: 'min',
        value: reSettingMin
      },
      {
        target: 'max',
        value: reSettingMax
      }
    ]

    const isNanError = ((validateTargets, _this) => {
      let result = false
      validateTargets.forEach(props => {
        if(!props.value || isNaN(props.value) || 0 > props.value) {
          const errorMessage = {}
          errorMessage[`reSetting${props.target.charAt(0).toUpperCase() + props.target.slice(1)}Error`] = `${props.target}には1以上の半角数値を入力してください`
          _this.setState(errorMessage)
          result = true
          return
        }
      })
      return result
    })(validateTargets, this)

    if(isNanError) {
      return
    }

    if(reSettingMin >= reSettingMax) {
      this.setState({
        reSettingMaxError: 'minより大きい値を入力してください',
      })
      return
    }

    clearInterval(
      this.state.nowDrawing
    )

    this.setState({
      currentNumber: <BingoNumber size="big" isHit={true} value={0} />,
      nowDrawing: false,
      doButton: <DoButton label="Start" onClick={this.startDrawing.bind(this)} />,
      bingoDrawer: new BingoDrawer({min: reSettingMin, max: reSettingMax}),
      hitNumbers: [],
      max: reSettingMax,
      min: reSettingMin,
      isOpenConfig: !this.state.isOpenConfig,
      reSettingMaxError: '',
      reSettingMinError: ''
    })
  }

  getExcelData = () => {
    const excelElement = this.excelElement.current;
    return (!!excelElement && !!excelElement.state) ? excelElement.state.excelData : null
  }

  setExcelData() {
    const data = this.getExcelData()
    const columns = ['name', 'importance', 'rarity', 'description']
    var _hitNumbers = []
    if (!!data) {
      for (let idx in columns) {
        let col = columns[idx]
        if(data[0][col] === undefined) {
          window.confirm(`[WARNING] ${col}カラムがありません。正常に動作しない可能性があります。`)
        }
      }

      for (let idx in data) {
        if (data[idx].importance === undefined) {
          window.confirm("[ERROR] すべての行でimportanceを指定してください")
        }
      }

      _hitNumbers = data.map(function(d, index) {
        return (d.hit === 1) ? index+1 : null
      })
      _hitNumbers = _hitNumbers.filter(function(_hitNumber) {
        return _hitNumber !== null
      })
    }

    const _min = (!!data && !!_hitNumbers) ? 1 : this.state.min
    const _max = (!!data) ? data.length : this.state.max
    const _currentNumber = (!!_hitNumbers) ? _hitNumbers[_hitNumbers.length-1] : 0

    clearInterval(
      this.state.nowDrawing
    )

    this.setState({
      excelData: data,
      nowDrawing: false,
      doButton: <DoButton label="start" onClick={this.startDrawing.bind(this)} />,
      currentNumber: <BingoNumber size="big" isHit={true} value={_currentNumber} />,
      hitNumbers: _hitNumbers,
      min: _min,
      max: _max,
      bingoDrawer: new BingoDrawer({min: _min, max: _max})
    })
  }

  getMaxSize() {
    const maxSize = (this.state.excelData) ? this.state.excelData.length : this.state.max
    return maxSize
  }

  render() {
    return (
      <div>
        {this.state.doButton}

        <AppBar position='static'>
            <Toolbar>
              <Typography type='title'>
                ランダム縛りビンゴ
              </Typography>
              <ConfigButton
                onClick={this.toggleConfigArea.bind(this)}
              />
            </Toolbar>
        </AppBar>

        <br />

        <ConfigArea
          onRequestChange={this.toggleConfigArea.bind(this)}
          open={this.state.isOpenConfig}
        >
          <br />
          <TextField
            error={this.state.reSettingMinError !== ""}
            label="Min"
            style={{marginLeft: '1vw'}}
            defaultValue={this.state.min}
            onChange={this.syncValue.bind(this)}
            name="reSettingMin"
            helperText={this.state.reSettingMinError}
          />
          <br />
          <TextField
            error={this.state.reSettingMaxError !== ""}
            label="Max"
            style={{marginLeft: '1vw'}}
            defaultValue={this.state.max}
            onChange={this.syncValue.bind(this)}
            name="reSettingMax"
            helperText={this.state.reSettingMaxError}
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            fullWidth={true}
            onClick={this.saveConfigAndRestart.bind(this)}
          >
            <RefreshIcon /> save & restart
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{marginTop: '4.0vh'}}
            fullWidth={true}
            onClick={this.toggleConfigArea.bind(this)}
          >
            <CloseIcon /> close
          </Button>
          <br />
          <ExcelHandler ref={this.excelElement} hitNumbers={this.state.hitNumbers} />
          <br />
          <div align="center">
            <p style={{ paddingBottom: '20px' }}>アップロードしたリストをルーレットに反映させる</p>
            <Button
              variant="contained"
              onClick={this.setExcelData.bind(this)}
            >
              <CheckCircleIcon /> apply
            </Button>
          </div>
        </ConfigArea>

        <button
          type="button"
          className="button-clear"
          onClick={this.resetAll.bind(this)}
        >
          Clear
        </button>

        <div className="main">
          {this.state.currentNumber}
          <br />
          <div className="restricted-percentage">
            <Typography variant="subtitle2" component="h6">
              封印率: {this.state.hitNumbers.length} / {this.getMaxSize()} ({(this.state.hitNumbers.length/this.getMaxSize()*100).toFixed(2)} %)
            </Typography>
          </div>
          <ItemTable
            itemNo={this.state.hitNumbers.slice(-1)[0]-1}
            itemList={this.state.excelData}/>
        </div>

        <BingoNumbers
          min={this.state.min}
          max={this.state.max}
          hitNumbers={this.state.hitNumbers}
        />

        <div className="restricted-list">
          <RestrictedItems data={this.state.excelData} hitNumbers={this.state.hitNumbers}/>
        </div>
      </div>
    )
  }
}

export default class App extends React.Component {
  render() {
      return (
        <div>
          <div id="bingo-game">
            <MuiThemeProvider theme={myTheme}>
              <BingoGame />
            </MuiThemeProvider>
          </div>
        </div>
      )
    }
}
