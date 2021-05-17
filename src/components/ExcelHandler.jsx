import React from 'react'
import XLSX from 'xlsx'

import Button from '@material-ui/core/Button';

import PublishIcon from '@material-ui/icons/Publish';
import GetAppIcon from '@material-ui/icons/GetApp';

export default class ExcelHandler extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fileInput: {
        current: null
      },
      fileName: '',
      excelData: ''
    };
  }

  handleTriggerReadFile = () => {
    if (this.state.fileInput.current) {
      this.state.fileInput.current.click()
    }
  }

  handleReadFile = (fileObj) => {
    if (fileObj) {
      this.setState({fileName: fileObj.name})
      fileObj.arrayBuffer().then((buffer) => {
        const workbook = XLSX.read(buffer, { type: 'buffer', bookVBA: true })
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]
        const data = XLSX.utils.sheet_to_json(worksheet)
        this.setState({excelData: data})
      })
    }
  }

  handleWriteFile = () => {
    var wb = XLSX.utils.book_new();
    const ws_name = 'sheet1';
    var result = this.state.excelData.slice();
    this.props.hitNumbers.map(index => {
      result[index-1].hit = 1;
      return null;
    })
    const ws = XLSX.utils.json_to_sheet(result);
    XLSX.utils.book_append_sheet(wb, ws, ws_name);
    XLSX.writeFile(wb, 'out.xlsx');
  }

  render () {
    return (
      <div align="center">
        <p style={{ paddingBottom: '20px' }}>Excelファイルをアップロードする</p>
        <Button variant="contained" onClick={() => this.handleTriggerReadFile()}>
          <PublishIcon />upload
        </Button>
        <br /><br />
        {!!this.state.fileName && <span>ファイル名：{this.state.fileName}</span>}
        <form style={{ display: 'none' }}>
          <input
            type="file"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            ref={this.state.fileInput}
            onChange={(e) => {
              e.preventDefault()
              this.handleReadFile(e.currentTarget.files[0])
            }}
          />
        </form>
        <br /> <br />
        <Button
          disabled={this.state.excelData === ""}
          variant="contained"
          onClick={() => this.handleWriteFile()}>
          <GetAppIcon /> download
        </Button>
      </div>
    )
  }
}
