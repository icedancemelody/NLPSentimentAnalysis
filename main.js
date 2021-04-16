const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
const { ipcMain } = require('electron')

const devMode = true
const openDevTools = false

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady()
  .then(() => {
    Menu.setApplicationMenu(null) // 隐藏菜单栏
    const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      minWidth: 600,
      minHeight: 400,
      frame: false,
      backgroundColor: '#f7f7f7',
      transparent: true,
      maximizable: false,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
        contextIsolation: false
      }
    })

    // 加载完成后去除背景色，体现窗口圆角
    mainWindow.once('ready-to-show', () => {
      mainWindow.setBackgroundColor('#00000000')
    })

    devMode
      ? mainWindow.loadURL('http://localhost:3000')
      : mainWindow.loadFile(`${__dirname}/build/index.html`)

    openDevTools
      && mainWindow.webContents.openDevTools()

    app.on('activate', function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') app.quit()
    })

    ipcMainHandleEvents(mainWindow)
  })

/**
 * 处理 ipc 事件
 * @param { BrowserWindow } mainWindow 
 */
function ipcMainHandleEvents(mainWindow) {
  const exec = require('child_process').exec
  const fs = require('fs')

  const pyDir = `${__dirname}/py`
  const command = `python ${pyDir}/calc.py`
  const filePath_dataToPy = `${pyDir}/dataToPy.json`
  const filePath_dataToNodeJs = `${pyDir}/dataToNodeJs.json`

  ipcMain.on('closeMainWindow', () => {
    mainWindow.close()
  })

  ipcMain.on('singleAnalyses', (event, dataString) => {
    fs.writeFileSync(filePath_dataToPy, dataString)
    exec(command, { cwd: pyDir }, (error, stdout, stderr) => {
      const data = fs.readFileSync(filePath_dataToNodeJs)
      error
        ? event.sender.send('singleAnalysesError', error)
        : event.sender.send('singleAnalysesCompleted', data.toString())
    })
  })

  ipcMain.on('multipleAnalyses', (event, dataString) => {
    fs.writeFileSync(filePath_dataToPy, dataString)
    exec(command, { cwd: pyDir }, (error, stdout, stderr) => {
      const data = fs.readFileSync(filePath_dataToNodeJs)
      error
        ? event.sender.send('multipleAnalysesError', error)
        : event.sender.send('multipleAnalysesCompleted', data.toString())
    })
  })
}