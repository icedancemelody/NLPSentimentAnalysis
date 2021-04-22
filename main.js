const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
const { ipcMain } = require('electron')
const exec = require('child_process').exec
const spawn = require('child_process').spawn
const fs = require('fs')

const devMode = true
const openDevTools = false

const pyDir = `${__dirname}/py`
const command = `python ${pyDir}/calc.py`
const filePath_dataToPy = `${pyDir}/dataToPy.json`
const filePath_dataToNodeJs = `${pyDir}/dataToNodeJs.json`

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

    // 监听渲染进程事件
    ipcMainHandleEvents(mainWindow)

    // 启动 python
    startPython()

    // 执行轮询
    getCheckFileFunc(mainWindow)()
  })

/**
 * 监听渲染进程事件
 * @param { BrowserWindow } mainWindow 
 */
function ipcMainHandleEvents(mainWindow) {
  ipcMain.on('closeMainWindow', () => {
    mainWindow.close()
  })

  ipcMain.on('singleAnalyses', (event, dataString) => {
    const data = {
      data: [dataString],
      type: 'single',
      status: 'new'
    }
    fs.writeFile(filePath_dataToPy, JSON.stringify(data), () => { })
  })

  ipcMain.on('multipleAnalyses', (event, dataString) => {
    const data = {
      data: JSON.parse(dataString).data,
      type: 'multiple',
      status: 'new'
    }
    fs.writeFile(filePath_dataToPy, JSON.stringify(data), () => { })
  })
}

/**
 * 安全 json.parse
 * @param { string } jsonString 
 * @returns { any }
 */
function secureJsonParse(jsonString) {
  try {
    const obj = JSON.parse(jsonString)
    return obj
  }
  catch (e) {
    return undefined
  }
}

/**
 * 获取轮询函数
 * @param { BrowserWindow } mainWindow 
 * @returns 
 */
function getCheckFileFunc(mainWindow) {
  const checkFile = () => {
    // 定义下次查询
    setTimeout(checkFile, 200)
    // 读文件，设定回调
    fs.readFile(filePath_dataToNodeJs, (err, dataString) => {
      // 安全转 json
      const data = secureJsonParse(dataString.toString())

      // 不是新数据
      if (!data || data.status !== 'new') {
        return
      }

      // 标记文件为旧数据
      data.status = 'old'
      fs.writeFile(filePath_dataToNodeJs, JSON.stringify(data), () => { })

      // 通知渲染进程
      if (data.type === 'single') {
        mainWindow.webContents.send('singleAnalysesCompleted', JSON.stringify(data.data[0]))
      }
      else if (data.type === 'multiple') {
        mainWindow.webContents.send('multipleAnalysesCompleted', JSON.stringify(data.data))
      }
    })
  }
  return checkFile
}

/**
 * 启动 python
 */
function startPython() {
  spawn(
    'python',
    [`${pyDir}/calc.py`],
    { cwd: pyDir },
    (error, stdout, stderr) => {
      error && ipcMain.emit('singleAnalysesError', error)
    }
  )
}
