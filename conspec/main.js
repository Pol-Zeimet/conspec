
const { app, BrowserWindow } = require('electron')
let win;




function createWindow () {
  win = new BrowserWindow({
    width: 1050,
    height: 600,
    minWidth: 1050,
    minHeight: 600,
    backgroundColor: '#007bff',
    show: false,
    icon: `file://${__dirname}/assets/icons/png/64x64.png`, 
    titleBarStyle: 'hidden'
  })
  win.setMenu(null);
  win.loadURL(`file://${__dirname}/dist/index.html`)

  //win.webContents.openDevTools()
  
  win.once('ready-to-show', () => {
    win.show()
})

  win.on('closed', function () {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (win === null) {
    createWindow()
  }
})
