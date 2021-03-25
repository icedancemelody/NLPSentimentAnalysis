// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require("url");
const { ipcMain } = require('electron')

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  // and load the index.html of the app.
  // mainWindow.loadFile('index.html')
  const dev = true
  if (dev) {
    mainWindow.loadURL('http://localhost:3000')
  }
  else {
    // mainWindow.loadFile('./build/index.html')
    mainWindow.loadURL(`file://${path.join(__dirname, './build/index.html')}`)
    // mainWindow.loadURL(url.format({
    //   pathname: path.join(__dirname, './build/index.html'),
    //   protocol: 'file:',
    //   slashes: true
    // }))
  }
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
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

const filePath = 'py/dataToNodeJs.json'

ipcMain.on('singleAnalyses', (event, arg) => {
  exec('python py/calc.py', (error, stdout, stderr) => {
    const data = fs.readFileSync(filePath)
    event.sender.send('singleAnalysesCompleted', data.toString())
  })
})

const filePath2 = 'py/dataToNodeJs2.json' // py 端测试代码弄好之后，使用 filePath1

ipcMain.on('multipleAnalyses', (event, arg) => {
  exec('python py/calc.py', (error, stdout, stderr) => {
    const data = fs.readFileSync(filePath2)
    event.sender.send('multipleAnalysesCompleted', data.toString())
  })
})