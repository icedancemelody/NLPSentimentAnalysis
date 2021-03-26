const { app, BrowserWindow } = require('electron')
const path = require('path')
const { ipcMain } = require('electron')

const devMode = false
const openDevTools = false

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  devMode
    ? mainWindow.loadURL('http://localhost:3000')
    : mainWindow.loadFile(`${__dirname}/build/index.html`)

  openDevTools
    && mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

const exec = require('child_process').exec
const fs = require('fs')

const cmdToCallPython = `python ${__dirname}/py/calc.py`
const filePath_dataToPy = `${__dirname}/py/dataToPy.json`
const filePath_dataToNodeJs = `${__dirname}/py/dataToNodeJs.json`
const filePath_dataToNodeJs2 = `${__dirname}/py/dataToNodeJs2.json` // py 端测试代码弄好之后，使用 filePath_dataToNodeJs

ipcMain.on('singleAnalyses', (event, dataString) => {
  fs.writeFileSync(filePath_dataToPy, dataString)
  exec(cmdToCallPython, (error, stdout, stderr) => {
    const data = fs.readFileSync(filePath_dataToNodeJs)
    event.sender.send('singleAnalysesCompleted', data.toString())
  })
})

ipcMain.on('multipleAnalyses', (event, dataString) => {
  fs.writeFileSync(filePath_dataToPy, dataString)
  exec(cmdToCallPython, (error, stdout, stderr) => {
    const data = fs.readFileSync(filePath_dataToNodeJs2)
    event.sender.send('multipleAnalysesCompleted', data.toString())
  })
})